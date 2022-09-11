package network

import (
	"bytes"
	"encoding/gob"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/tensor-programming/golang-blockchain/blockchain"
	"github.com/tensor-programming/golang-blockchain/trade"
	"gopkg.in/vrecan/death.v3"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"runtime"
	"syscall"
	"time"
)

const (
	protocol         = "tcp"
	version          = 1
	commandLength    = 12
	HttpConnHost     = "localhost"
	HttpConnPort     = "2000"
	LastNthBlockDTOs = 10
	mineAfter        = 1
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"getTrades",
		"GET",
		"/blocks",
		getTrades,
	},
	Route{
		"addTrade",
		"POST",
		"/trades/add",
		addTrades,
	},
}

type Trades []trade.SignalDetail

var trades []trade.SignalDetail

// LastNthMinifiedBlocks used for caching last n blocks and sending as response to http requests
var LastNthMinifiedBlocks = make([]BlockDto, LastNthBlockDTOs)

//ticker and related chanel to mine automatically
var ticker = time.NewTicker(mineAfter * time.Minute)

// stopTicker reserved for further use cases in case we needed to stop auto mining
var stopTicker = make(chan bool)

var (
	nodeAddress     string
	mineAddress     string
	KnownNodes      = []string{"localhost:3000"}
	blocksInTransit = [][]byte{}
	memoryPool      = make(map[string]blockchain.Transaction)
	tradePool       = make(map[string]trade.SignalDetail)
)

type Trade struct {
	AddrFrom    string
	TradeDetail trade.SignalDetail
}

type Addr struct {
	AddrList []string
}

type Block struct {
	AddrFrom string
	Block    []byte
}

type GetBlocks struct {
	AddrFrom string
}

// BlockDto :data access object as a minified block
type BlockDto struct {
	Hash      []byte               `json:"blockHash"`
	Timestamp time.Time            `json:"timestamp"`
	TradeData []trade.SignalDetail `json:"trades"`
	Height    int                  `json:"blockNo"`
}

type GetData struct {
	AddrFrom string
	Type     string
	ID       []byte
}

type Inv struct {
	AddrFrom string
	Type     string
	Items    [][]byte
}

type Tx struct {
	AddrFrom    string
	Transaction []byte
}

type Version struct {
	Version    int
	BestHeight int
	AddrFrom   string
}

// mineRepeatedly function is used for mining automatically
func mineRepeatedly(chain *blockchain.BlockChain) {
	for {
		select {
		//this case is never used, only reserve for further use cases
		case <-stopTicker:
			return
		case <-ticker.C:
			MineTx(chain, true)
		}
	}
}

// setLastNthBlockDTOs function is used for the http GET /blocks endpoint
func setLastNthBlockDTOs(lastN int, chain *blockchain.BlockChain) {
	iter := chain.Iterator()
	for {
		block := iter.Next()
		LastNthMinifiedBlocks[lastN-1] = BlockDto{
			block.Hash,
			time.Unix(block.Timestamp, 0),
			block.TradeData,
			block.Height}
		lastN--
		if len(block.PrevHash) == 0 || lastN == 0 {
			break
		}
	}
}

func getTrades(w http.ResponseWriter, r *http.Request) {
	fmt.Println("inside add trades")
	json.NewEncoder(w).Encode(LastNthMinifiedBlocks)
}

func addTrades(w http.ResponseWriter, r *http.Request) {
	fmt.Println("not inside add trades")
	tradeData := trade.SignalDetail{}
	err := json.NewDecoder(r.Body).Decode(&tradeData)
	if err != nil {
		log.Print("error occurred while decoding trade data :: ", err)
		return
	}
	fmt.Println(tradeData.TradeNumber)
	log.Printf(
		"adding trade data Time :: %s with Total number as :: %s and Daily number as :: %s ",
		tradeData.Time,
		tradeData.TradeNumber,
		tradeData.DailyNumber,
	)
	json.NewEncoder(w).Encode(trades)
	SendTrade(nodeAddress, tradeData)
}

func CmdToBytes(cmd string) []byte {
	var bytes [commandLength]byte

	for i, c := range cmd {
		bytes[i] = byte(c)
	}

	return bytes[:]
}

func AddRoutes(router *mux.Router) *mux.Router {
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
	return router
}

func BytesToCmd(bytes []byte) string {
	var cmd []byte

	for _, b := range bytes {
		if b != 0x0 {
			cmd = append(cmd, b)
		}
	}

	return fmt.Sprintf("%s", cmd)
}

func ExtractCmd(request []byte) []byte {
	return request[:commandLength]
}

func RequestBlocks() {
	for _, node := range KnownNodes {
		SendGetBlocks(node)
	}
}

func SendTrade(addr string, detail trade.SignalDetail) {
	data := Trade{nodeAddress, detail}
	payload := GobEncode(data)
	request := append(CmdToBytes("trade"), payload...)

	SendData(addr, request)
}

func SendAddr(address string) {
	nodes := Addr{KnownNodes}
	nodes.AddrList = append(nodes.AddrList, nodeAddress)
	payload := GobEncode(nodes)
	request := append(CmdToBytes("addr"), payload...)

	SendData(address, request)
}

func SendBlock(addr string, b *blockchain.Block) {
	data := Block{nodeAddress, b.Serialize()}
	payload := GobEncode(data)
	request := append(CmdToBytes("block"), payload...)

	SendData(addr, request)
}

func SendData(addr string, data []byte) {
	conn, err := net.Dial(protocol, addr)

	if err != nil {
		fmt.Printf("%s is not available\n", addr)
		var updatedNodes []string

		for _, node := range KnownNodes {
			if node != addr {
				updatedNodes = append(updatedNodes, node)
			}
		}

		KnownNodes = updatedNodes

		return
	}

	defer conn.Close()

	_, err = io.Copy(conn, bytes.NewReader(data))
	if err != nil {
		log.Panic(err)
	}
}

func SendInv(address, kind string, items [][]byte) {
	inventory := Inv{nodeAddress, kind, items}
	payload := GobEncode(inventory)
	request := append(CmdToBytes("inv"), payload...)

	SendData(address, request)
}

func SendGetBlocks(address string) {
	payload := GobEncode(GetBlocks{nodeAddress})
	request := append(CmdToBytes("getblocks"), payload...)

	SendData(address, request)
}

func SendGetData(address, kind string, id []byte) {
	payload := GobEncode(GetData{nodeAddress, kind, id})
	request := append(CmdToBytes("getdata"), payload...)

	SendData(address, request)
}

func SendTx(addr string, tnx *blockchain.Transaction) {
	data := Tx{nodeAddress, tnx.Serialize()}
	payload := GobEncode(data)
	request := append(CmdToBytes("tx"), payload...)

	SendData(addr, request)
}

func SendVersion(addr string, chain *blockchain.BlockChain) {
	bestHeight := chain.GetBestHeight()
	payload := GobEncode(Version{version, bestHeight, nodeAddress})

	request := append(CmdToBytes("version"), payload...)

	SendData(addr, request)
}

func HandleTrade(request []byte) {
	var buff bytes.Buffer
	var payload Trade

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	tradeDetail := payload.TradeDetail
	fmt.Printf("%sTHHHHHEEE TRRRRD\n", tradeDetail)
	tradePool[tradeDetail.TradeNumber] = tradeDetail
	fmt.Printf("%sTHHHHHEEE TRRRRD\n", tradePool[tradeDetail.TradeNumber])

	fmt.Printf("%s, %d", nodeAddress, len(tradePool))

	if nodeAddress == KnownNodes[0] {
		for _, node := range KnownNodes {
			if node != nodeAddress && node != payload.AddrFrom {
				SendTrade(node, tradeDetail)
			}
		}
	}
}

func HandleAddr(request []byte) {
	var buff bytes.Buffer
	var payload Addr

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)

	}

	KnownNodes = append(KnownNodes, payload.AddrList...)
	fmt.Printf("there are %d known nodes\n", len(KnownNodes))
	RequestBlocks()
}

func HandleBlock(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload Block

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	blockData := payload.Block
	block := blockchain.Deserialize(blockData)

	fmt.Println("Recevied a new block!")
	chain.AddBlock(block)

	for _, trd := range block.TradeData {
		delete(tradePool, trd.TradeNumber)
	}

	LastNthMinifiedBlocks = append(
		LastNthMinifiedBlocks[1:],
		BlockDto{
			block.Hash,
			time.Unix(block.Timestamp, 0),
			block.TradeData,
			block.Height,
		})
	//lastNthMinifiedBlocks
	fmt.Printf("Added block %x\n", block.Hash)

	if len(blocksInTransit) > 0 {
		blockHash := blocksInTransit[0]
		SendGetData(payload.AddrFrom, "block", blockHash)

		blocksInTransit = blocksInTransit[1:]
	} else {
		UTXOSet := blockchain.UTXOSet{chain}
		UTXOSet.Reindex()
	}
}

func HandleInv(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload Inv

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	fmt.Printf("Recevied inventory with %d %s\n", len(payload.Items), payload.Type)

	if payload.Type == "block" {
		blocksInTransit = payload.Items

		blockHash := payload.Items[0]
		SendGetData(payload.AddrFrom, "block", blockHash)

		newInTransit := [][]byte{}
		for _, b := range blocksInTransit {
			if bytes.Compare(b, blockHash) != 0 {
				newInTransit = append(newInTransit, b)
			}
		}
		blocksInTransit = newInTransit
	}

	if payload.Type == "tx" {
		txID := payload.Items[0]

		if memoryPool[hex.EncodeToString(txID)].ID == nil {
			SendGetData(payload.AddrFrom, "tx", txID)
		}
	}
}

func HandleGetBlocks(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload GetBlocks

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	blocks := chain.GetBlockHashes()
	SendInv(payload.AddrFrom, "block", blocks)
}

func HandleGetData(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload GetData

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	if payload.Type == "block" {
		block, err := chain.GetBlock([]byte(payload.ID))
		if err != nil {
			return
		}

		SendBlock(payload.AddrFrom, &block)
	}

	if payload.Type == "tx" {
		txID := hex.EncodeToString(payload.ID)
		tx := memoryPool[txID]

		SendTx(payload.AddrFrom, &tx)
	}
}

func HandleTx(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload Tx

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	txData := payload.Transaction
	tx := blockchain.DeserializeTransaction(txData)
	memoryPool[hex.EncodeToString(tx.ID)] = tx

	fmt.Printf("%s, %d", nodeAddress, len(memoryPool))

	if nodeAddress == KnownNodes[0] {
		for _, node := range KnownNodes {
			if node != nodeAddress && node != payload.AddrFrom {
				SendInv(node, "tx", [][]byte{tx.ID})
			}
		}
	} else {
		if len(memoryPool) >= 2 && len(mineAddress) > 0 {
			MineTx(chain, false)
		}
	}
}

func MineTx(chain *blockchain.BlockChain, forceMine bool) {
	var txs []*blockchain.Transaction
	var tradeDetails []trade.SignalDetail

	for id := range memoryPool {
		fmt.Printf("tx: %s\n", memoryPool[id].ID)
		tx := memoryPool[id]
		if chain.VerifyTransaction(&tx) {
			txs = append(txs, &tx)
		}
	}

	if len(txs) == 0 && !forceMine {
		fmt.Println("All Transactions are invalid")
		return
	}

	cbTx := blockchain.CoinbaseTx(mineAddress, "")
	txs = append(txs, cbTx)

	/*
		each SignalDetail's trade number needs be checked in every single block to prevent duplicate insert
	*/

	var existedTrade bool
	iter := chain.Iterator()
	for {
		block := iter.Next()

		fetchedTrades := block.TradeData
		for _, trd := range fetchedTrades {
			_, existedTrade = tradePool[trd.TradeNumber]
			if existedTrade {
				delete(tradePool, trd.TradeNumber)
			}
		}

		if len(block.PrevHash) == 0 {
			break
		}
	}

	for _, trd := range tradePool {
		tradeDetails = append(tradeDetails, trd)
	}

	newBlock := chain.MineBlock(txs, tradeDetails)

	LastNthMinifiedBlocks = append(
		LastNthMinifiedBlocks[1:],
		BlockDto{
			newBlock.Hash,
			time.Unix(newBlock.Timestamp, 0),
			newBlock.TradeData,
			newBlock.Height,
		})

	UTXOSet := blockchain.UTXOSet{chain}
	UTXOSet.Reindex()

	fmt.Println("New Block mined")

	for _, tx := range txs {
		txID := hex.EncodeToString(tx.ID)
		delete(memoryPool, txID)
	}
	// Clearing all trades prev trades for new incoming trades and next block (trade pool simulation)
	for _, trd := range tradeDetails {
		delete(tradePool, trd.TradeNumber)
	}

	for _, node := range KnownNodes {
		if node != nodeAddress {
			SendInv(node, "block", [][]byte{newBlock.Hash})
		}
	}

	if len(memoryPool) > 0 {
		MineTx(chain, false)
	}

	// reset the ticker after last mine
	ticker.Reset(mineAfter * time.Minute)
}

func HandleVersion(request []byte, chain *blockchain.BlockChain) {
	var buff bytes.Buffer
	var payload Version

	buff.Write(request[commandLength:])
	dec := gob.NewDecoder(&buff)
	err := dec.Decode(&payload)
	if err != nil {
		log.Panic(err)
	}

	bestHeight := chain.GetBestHeight()
	otherHeight := payload.BestHeight

	if bestHeight < otherHeight {
		SendGetBlocks(payload.AddrFrom)
	} else if bestHeight > otherHeight {
		SendVersion(payload.AddrFrom, chain)
	}

	if !NodeIsKnown(payload.AddrFrom) {
		KnownNodes = append(KnownNodes, payload.AddrFrom)
	}
}

func HandleConnection(conn net.Conn, chain *blockchain.BlockChain) {
	req, err := ioutil.ReadAll(conn)
	defer conn.Close()

	if err != nil {
		log.Panic(err)
	}
	command := BytesToCmd(req[:commandLength])
	fmt.Printf("Received %s command\n", command)

	switch command {
	case "addr":
		HandleAddr(req)
	case "block":
		HandleBlock(req, chain)
	case "inv":
		HandleInv(req, chain)
	case "getblocks":
		HandleGetBlocks(req, chain)
	case "getdata":
		HandleGetData(req, chain)
	case "tx":
		HandleTx(req, chain)
	case "version":
		HandleVersion(req, chain)
	case "trade":
		HandleTrade(req)
	default:
		fmt.Println("Unknown command")
	}

}

func StartServer(nodeID, minerAddress string) {
	nodeAddress = fmt.Sprintf("localhost:%s", nodeID)
	mineAddress = minerAddress
	ln, err := net.Listen(protocol, nodeAddress)
	if err != nil {
		log.Panic(err)
	}
	defer ln.Close()

	chain := blockchain.ContinueBlockChain(nodeID)
	defer chain.Database.Close()
	go CloseDB(chain)

	setLastNthBlockDTOs(LastNthBlockDTOs, chain)

	if nodeAddress == KnownNodes[0] {
		go startHttpServer()
	}

	if nodeAddress != KnownNodes[0] {
		SendVersion(KnownNodes[0], chain)
		go mineRepeatedly(chain)
	}
	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Panic(err)
		}
		go HandleConnection(conn, chain)
	}
}

func startHttpServer() {
	fmt.Println("Starting http server on 2000")
	muxRouter := mux.NewRouter().StrictSlash(true)
	router := AddRoutes(muxRouter)

	// Uncomment in case you want to have a builtin html based files
	//router.PathPrefix("/").Handler(http.FileServer(http.Dir("./assets/")))

	httpErr := http.ListenAndServe(HttpConnHost+":"+HttpConnPort, router)
	if httpErr != nil {
		log.Fatal("error starting http server :: ", httpErr)
	}
}

func GobEncode(data interface{}) []byte {
	var buff bytes.Buffer

	enc := gob.NewEncoder(&buff)
	err := enc.Encode(data)
	if err != nil {
		log.Panic(err)
	}

	return buff.Bytes()
}

func NodeIsKnown(addr string) bool {
	for _, node := range KnownNodes {
		if node == addr {
			return true
		}
	}

	return false
}

func CloseDB(chain *blockchain.BlockChain) {
	d := death.NewDeath(syscall.SIGINT, syscall.SIGTERM, os.Interrupt)

	d.WaitForDeathWithFunc(func() {
		defer os.Exit(1)
		defer runtime.Goexit()
		chain.Database.Close()
	})
}

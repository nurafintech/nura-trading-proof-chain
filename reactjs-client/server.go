package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

const (
	CONN_HOST = "localhost"
	CONN_PORT = "2222"
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
		"getEmployees",
		"GET",
		"/employees",
		getEmployees,
	},
	Route{
		"getEmployees",
		"GET",
		"/trades",
		getTrades,
	},
	Route{
		"addEmployee",
		"POST",
		"/employee/add",
		addEmployee,
	},
	Route{
		"addTrade",
		"POST",
		"/trade/add",
		addTrade,
	},
}

type Employee struct {
	Id        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type Trade struct {
	TradeNumber string `json:"tradeNumber"`
	DailyNumber string `json:"dailyNumber"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	Exchange    string `json:"exchange"`
	CallType    string `json:"callType"`
	TradeType   string `json:"tradeType"`
	Pair        string `json:"pair"`
	FirstEntry  string `json:"firstEntry"`
	SecondEntry string `json:"secondEntry"`
	Target      string `json:"target"`
	Stoploss    string `json:"stoploss"`
	Leverage    string `json:"leverage"`
	BaseCandle  string `json:"baseCandle"`
	Source      string `json:"source"`
	TradeStatus string `json:"tradeStatus"`
}

type Employees []Employee
type Trades []Trade

var employees []Employee
var trades []Trade

func init() {
	employees = Employees{
		Employee{Id: "1", FirstName: "Foo", LastName: "Bar"},
		Employee{Id: "2", FirstName: "Baz", LastName: "Qux"},
	}
	trades = Trades{
		Trade{TradeNumber: "1", DailyNumber: "1"},
		Trade{TradeNumber: "2", DailyNumber: "2"},
	}
}

func getTrades(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(trades)
}

func getEmployees(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(employees)
}

func addEmployee(w http.ResponseWriter, r *http.Request) {
	employee := Employee{}
	err := json.NewDecoder(r.Body).Decode(&employee)
	if err != nil {
		log.Print("error occurred while decoding employee data :: ", err)
		return
	}
	log.Printf("adding employee id :: %s with firstName as :: %s and lastName as :: %s ", employee.Id, employee.FirstName, employee.LastName)
	employees = append(employees, Employee{Id: employee.Id, FirstName: employee.FirstName, LastName: employee.LastName})
	json.NewEncoder(w).Encode(employees)
}

func addTrade(w http.ResponseWriter, r *http.Request) {
	trade := Trade{}
	err := json.NewDecoder(r.Body).Decode(&trade)
	if err != nil {
		log.Print("error occurred while decoding employee data :: ", err)
		return
	}
	log.Printf("adding trade.tradeNumber %s, trade.dailyNumber %s", trade.TradeNumber, trade.DailyNumber)
	trades = append(trades, Trade{trade.TradeNumber, trade.DailyNumber, trade.Date,
		trade.Time, trade.Exchange, trade.CallType, trade.TradeType,
		trade.Pair, trade.FirstEntry, trade.SecondEntry, trade.Target,
		trade.Stoploss, trade.Leverage, trade.BaseCandle, trade.Source, trade.TradeStatus})
	json.NewEncoder(w).Encode(trades)
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

func main() {
	muxRouter := mux.NewRouter().StrictSlash(true)
	router := AddRoutes(muxRouter)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./assets/")))
	err := http.ListenAndServe(CONN_HOST+":"+CONN_PORT, router)
	if err != nil {
		log.Fatal("error starting http server :: ", err)
		return
	}
}

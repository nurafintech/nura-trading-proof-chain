package trade

type SignalDetail struct {
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

type Trades struct {
	Trades []SignalDetail
}

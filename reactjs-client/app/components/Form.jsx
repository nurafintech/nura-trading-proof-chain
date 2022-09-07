import React, { Component } from "react";

const styles = {
    divFormSectionStyle: "w-full bg-gray-100 mx-auto max-w-6xl py-24 px-12 lg:px-24 shadow-xl mb-24",
    divFormStyle: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col",
    divRowStyle: "-mx-3 md:flex mb-6",
    divLabelInputStyle: "md:w-1/4 px-3",
    labelStyle: "uppercase tracking-wide text-black text-xs font-bold mb-2",
    inputStyle: "w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-2.5 px-4 mb-3",
    selectStyle: "w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight hover:bg-white focus:outline-none focus:bg-white focus:border-gray-500",
    sectionButton: "md:mx-48 sm:mx-10 md:flex mt-2",
    divButton: "md:w-full px-3",
    buttonStyle: "flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
}

export default class Form extends Component {
    render() {
        return (
            <div className={styles.divFormSectionStyle}>
                <form>
                    <div className={styles.divFormStyle}>
                        <div className={styles.divRowStyle}>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Trade Number
                                </label>
                                <input className={styles.inputStyle} id="trade-num" type="text" placeholder="Ex: 1234" ref="trade" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle}>
                                    Daily Number
                                </label>
                                <input className={styles.inputStyle} id="daily-num" type="text" placeholder="Ex: 123" ref="DailyNumber" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Date
                                </label>
                                <input className={styles.inputStyle} id="title" type="text" placeholder="Ex: 01/01/01" ref="date" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Time
                                </label>
                                <input className={styles.inputStyle} id="title" type="text" placeholder="Ex: 00:00" ref="time" />
                            </div>
                        </div>
                        <div className={styles.divRowStyle}>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Exchange
                                </label>
                                <div class="relative">
                                    <select className={styles.selectStyle} id="exchange" ref="exchange">
                                        <option>Binance</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Call Type
                                </label>
                                <div class="relative">
                                    <select className={styles.selectStyle} id="call-type" ref='callType'>
                                        <option>Buy(Long)</option>
                                        <option>Sell(Short)</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Trade Type
                                </label>
                                <div>
                                    <select className={styles.selectStyle} id="trade-type" ref="tradeType">
                                        <option>Intraday</option>
                                        <option>Swing</option>
                                        <option>Long Swing</option>
                                        <option>Hold</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Pair
                                </label>
                                <input className={styles.inputStyle} id="pair" type="text" placeholder="Ex: BTC/USDT" ref="pair" />
                            </div>
                        </div>
                        <div className={styles.divRowStyle}>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    First Entry Price
                                </label>
                                <input className={styles.inputStyle} id="entry1" type="text" placeholder="First Entry Price" ref="firstEntry" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Second Entry Price
                                </label>
                                <input className={styles.inputStyle} type="text" placeholder="Second Entry Price" ref="secondEntry" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Target Price
                                </label>
                                <input className={styles.inputStyle} id="target" type="text" placeholder="Target Price" ref="target" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Stop Loss
                                </label>
                                <input className={styles.inputStyle} id="stop" type="text" placeholder="Stop Loss" ref="stoploss" />
                            </div>
                        </div>
                        <div className={styles.divRowStyle}>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Leverage
                                </label>
                                <div>
                                    <select className={styles.selectStyle} id="status" ref="leverage">
                                        <option>10x</option>
                                        <option>5x</option>
                                        <option>3x</option>
                                        <option>0x</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Base Candle Time
                                </label>
                                <div>
                                    <select className={styles.selectStyle} id="status" ref="baseCandle">
                                        <option>1d</option>
                                        <option>4h</option>
                                        <option>1h</option>
                                        <option>15min</option>
                                        <option>5min</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Source
                                </label>
                                <input className={styles.inputStyle} id="source" type="text" placeholder="Source" ref="source" />
                            </div>
                            <div className={styles.divLabelInputStyle}>
                                <label className={styles.labelStyle} >
                                    Status
                                </label>
                                <div>
                                    <select className={styles.selectStyle} id="status" ref="tradeStatus" >
                                        <option>4 Confirmed</option>
                                        <option>3 Confirmed</option>
                                        <option>2 Confirmed</option>
                                        <option>1 Confirmed</option>
                                        <option>Unconfirmed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={styles.sectionButton}>
                            <div className={styles.divButton}>
                                <button className={styles.buttonStyle} onClick={(e) => this.handleClick(e)}>
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
    handleClick(e) {

        const tradeNumber = this.refs.trade.value.trim()
        // const dailyNumber = this.refs.dailyNumber.value.trim()
        // const date = this.refs.date.value.trim()
        // const time = this.refs.time.value.trim()
        // const exchange = this.refs.exchange.value.trim()
        // const callType = this.refs.callType.value.trim()
        // const tradeType = this.refs.tradeType.value.trim()
        // const pair = this.refs.pair.value.trim()
        // const firstEntry = this.refs.firstEntry.value.trim()
        // const secondEntry = this.refs.secondEntry.value.trim()
        // const target = this.refs.target.value.trim()
        // const stoploss = this.refs.stoploss.value.trim()
        // const leverage = this.refs.leverage.value.trim()
        // const baseCandle = this.refs.baseCandle.value.trim()
        // const source = this.refs.source.value.trim()
        // const tradeStatus = this.refs.tradeStatus.value.trim()

        // this.props.addTrade(tradeNumber, dailyNumber, date, time, exchange, callType, tradeType, pair, firstEntry, secondEntry, target, stoploss, leverage, baseCandle, source, tradeStatus)

        this.props.addTrade(tradeNumber)

        // tradeNumber.value = ''
        // dailyNumber.value = ''
        // date.value = ''
        // time.value = ''
        // exchange.value = ''
        // callType.value = ''
        // tradeType.value = ''
        // pair.value = ''
        // firstEntry.value = ''
        // secondEntry.value = ''
        // target.value = ''
        // stoploss.value = ''
        // leverage.value = ''
        // baseCandle.value = ''
        // source.value = ''
        // tradeStatus.value = ''
    }
};

function handleClick1(e) {
    // tradeNumber.value = ''
    // dailyNumber.value = ''
    // date.value = ''
    // time.value = ''
    // exchange.value = ''
    // callType.value = ''
    // tradeType.value = ''
    // pair.value = ''
    // firstEntry.value = ''
    // secondEntry.value = ''
    // target.value = ''
    // stoploss.value = ''
    // leverage.value = ''
    // baseCandle.value = ''
    // source.value = ''
    // tradeStatus.value = ''

    // const tradeNumber = this.refs.tradeNumber.value.trim()
    // const dailyNumber = this.refs.dailyNumber.value.trim()
    // const date = this.refs.date.value.trim()
    // const time = this.refs.time.value.trim()
    // const exchange = this.refs.exchange.value.trim()
    // const callType = this.refs.callType.value.trim()
    // const tradeType = this.refs.tradeType.value.trim()
    // const pair = this.refs.pair.value.trim()
    // const firstEntry = this.refs.firstEntry.value.trim()
    // const secondEntry = this.refs.secondEntry.value.trim()
    // const target = this.refs.target.value.trim()
    // const stoploss = this.refs.stoploss.value.trim()
    // const leverage = this.refs.leverage.value.trim()
    // const baseCandle = this.refs.baseCandle.value.trim()
    // const source = this.refs.source.value.trim()
    // const tradeStatus = this.refs.tradeStatus.value.trim()


    this.props.addTrade(tradeNumber, dailyNumber, date,
        time, exchange, callType, tradeType,
        pair, firstEntry, secondEntry, target,
        stoploss, leverage, baseCandle, source, tradeStatus)

    const tradeNumber = this.refs.test.value.trim()
    this.props.addTrade(tradeNumber)

    tradeNumber.value = ''
    dailyNumber.value = ''
    date.value = ''
    time.value = ''
    exchange.value = ''
    callType.value = ''
    tradeType.value = ''
    pair.value = ''
    firstEntry.value = ''
    secondEntry.value = ''
    target.value = ''
    stoploss.value = ''
    leverage.value = ''
    baseCandle.value = ''
    source.value = ''
    tradeStatus.value = ''
}



'use strict'
import React, { Component } from 'react'
import axios from 'axios'
import Form from './Form.jsx'
import HeroSection from './HeroSection.jsx'
import Table from './BlockTable.jsx'
import TradeDetailTable from './TradeDetailTable.jsx'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      trades: [],
      tableData: [
        {
          blockNo: '2',
          blockHash: '0xdfa99921111342',
          trades: [{ tradeNumber: '2', dailyNumber: '1' }],
          timestamp: '14:00 day',
        },
        {
          blockNo: '1',
          blockHash: '0xaaa99921111112',
          trades: [{ tradeNumber: '1', dailyNumber: '1' }],
          timestamp: '11:00 day',
        },
      ],
    }
    this.addTrade = this.addTrade.bind(this)

    this.Axios = axios.create({
      headers: { 'content-type': 'application/json' },
    })
  }
  componentDidMount() {
    let _this = this
    this.Axios.get('/trades')
      .then(function (response) {
        _this.setState({ trades: response.data })
      })
      .catch(function (error) {})
    this.Axios.get('/blocks')
      .then(function (response) {
        _this.setState({ tableData: response.data })
      })
      .catch(function (error) {})
  }
  addTrade(
    tradeNumber,
    dailyNumber,
    date,
    time,
    exchange,
    callType,
    tradeType,
    pair,
    firstEntry,
    secondEntry,
    target,
    stoploss,
    leverage,
    baseCandle,
    source,
    tradeStatus,
  ) {
    let _this = this
    this.Axios.post('/trade/add', {
      tradeNumber,
      dailyNumber,
      date,
      time,
      exchange,
      callType,
      tradeType,
      pair,
      firstEntry,
      secondEntry,
      target,
      stoploss,
      leverage,
      baseCandle,
      source,
      tradeStatus,
    })
      .then(function (response) {
        _this.setState({ trades: response.data })
      })
      .catch(function (error) {})
  }
  render() {
    console.log(this.state.tableData)

    return (
      <div>
        <HeroSection />
        <Form addTrade={this.addTrade} />
        <Table tableData={this.state.tableData} />
      </div>
    )
  }
}

import React, { Component } from 'react'
import TradeDetailData from './TradeDetailData'
import axios from 'axios'

const styles = {
  divThStyle:
    'text-center items-center font-bold px-1 py-4 border-b border-l border-gray-700 text-left bg-indigo-700 text-white',
}

export default class TradeDetailTable extends Component {
  constructor(props) {
    super(props)
    this.state = { trades: [], render: false }
    this.Axios = axios.create({
      headers: { 'content-type': 'application/json' },
    })
  }
  componentDidMount() {
    const b = this.props.blockNumber
    let _this = this
    this.Axios.get('/blocks')
      .then(function (response) {
        _this.setState({ trades: (response.data)[b].trades })
      })
      .catch(function (error) { })
  }

  render() {
    let TradeData = null;
    if (this.state.trades) {
      TradeData = this.state.trades.map((tData, i) => {
        return (
          <TradeDetailData
            key={i}
            tradeNumber={tData.tradeNumber}
            date={tData.date}
            time={tData.time}
            callType={tData.callType}
            pair={tData.pair}
            entry={tData.firstEntry}
            target={tData.target}
            stop={tData.stoploss}
            candle={tData.baseCandle}
            status={tData.tradeStatus}
          />
        )
      })
    }
    return (

      <table className="rounded">

        <thead>
          {TradeData ? <tr>
            <th className={styles.divThStyle}>No. </th>
            <th className={styles.divThStyle}>Date </th>
            <th className={styles.divThStyle}>Time</th>
            <th className={styles.divThStyle}>Call Type</th>
            <th className={styles.divThStyle}>Pair</th>
            <th className={styles.divThStyle}>Entry</th>
            <th className={styles.divThStyle}>Target</th>
            <th className={styles.divThStyle}>Stop</th>
            <th className={styles.divThStyle}>Candle</th>
            <th className={styles.divThStyle}>Status</th>
          </tr> : <h1>
            There is no trade data in this Block.
            </h1>}
        </thead>
        <tbody>{TradeData}</tbody>
      </table>
    )
  }
}

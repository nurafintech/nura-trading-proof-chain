import React, { Component } from 'react'

const styles = {
  divTdStyle: 'p-2 border-b border-l text-center text-sm',
  divTrStyle: 'bg-white hover:!bg-stone-200 text-sm',
}

export default function TradeDetailData(props) {
  return (
    <tr className={styles.divTrStyle}>
      <td className={styles.divTdStyle}>{props.tradeNumber}</td>
      <td className={styles.divTdStyle}>{props.date}</td>
      <td className={styles.divTdStyle}>{props.time}</td>
      <td className={styles.divTdStyle}>{props.callType}</td>
      <td className={styles.divTdStyle}>{props.pair}</td>
      <td className={styles.divTdStyle}>{props.entry}</td>
      <td className={styles.divTdStyle}>{props.target}</td>
      <td className={styles.divTdStyle}>{props.stop}</td>
      <td className={styles.divTdStyle}>{props.candle}</td>
      <td className={styles.divTdStyle}>{props.status}</td>
    </tr>
  )
}

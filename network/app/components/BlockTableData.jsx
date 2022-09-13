import React, { Component } from 'react'
import Modal from './Modal'

const styles = {
  divFormSectionStyle:
    'w-full rounded mx-auto justify-center flex py-12 px-12 lg:px-24 mb-12',
  divThStyle:
    'items-center font-bold px-20 py-4 border-b border-l border-gray-700 text-left bg-indigo-700 text-white',
  divTdStyle: 'p-2 border-b border-l text-center',
  divTrStyle: 'bg-white hover:!bg-stone-200',
  divBlockNumberStyle:
    'items-center font-bold px-3 py-4 border-b border-l border-gray-700 text-left bg-indigo-700 text-white',
  divFormStyle: 'bg-gray-100 shadow rounded px-8 pt-6 pb-8 mb-4 flex flex-col',
  spanStyle:
    'px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100',
}

export default class BlockTableData extends Component {
  render() {
    return (
      <tr className={styles.divTrStyle}>
        <td className={styles.divTdStyle}>{this.props.tableData.blockNo}</td>
        <td className={styles.divTdStyle}>{this.props.tableData.blockHash}</td>
        <td className={styles.divTdStyle}>
          {console.log("blockNOOOOO",this.props.blockNo)}
          <Modal buttonTitle="Show Trade Data" modalTitle="Trades Detail" blockNumber={this.props.blockNo} />
        </td>
        <td className={styles.divTdStyle}>{this.props.tableData.timestamp}</td>
        <td className={styles.divTdStyle}>
          <span className={styles.spanStyle}>Approved</span>
        </td>
      </tr>
    )
  }
}

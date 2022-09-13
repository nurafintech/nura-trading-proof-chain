import React, { Component } from 'react'
import TableData from './BlockTableData'

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
  // divTableStyle: "shadow-md",
}

export default class BlockTable extends Component {
  // var trades = this.props.tableData

  
  render() {
    var tableData = this.props.tableData.map((tData, i) => (
      <TableData key={i} tableData={tData} blockNo={i}  />
    ))
    console.log(this.props.tableData)
    return (
      <div className={styles.divFormStyle}>
        <div className={styles.divFormSectionStyle}>
          <table className="rounded">
            <thead>
              <tr>
                <th className={styles.divBlockNumberStyle}>Block No </th>
                <th className={styles.divThStyle}>Block Hash</th>
                <th className={styles.divThStyle}>Trades</th>
                <th className={styles.divThStyle}>Timestamp</th>
                <th className={styles.divThStyle}>Block Status</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

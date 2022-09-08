import React, { Component } from "react";
import TableData from "./TableData";

const styles = {
    divFormSectionStyle: "w-full rounded mx-auto justify-center flex py-12 px-12 lg:px-24 mb-12",
    divThStyle: "items-center font-bold px-20 py-4 border-b border-l border-gray-700 text-left bg-indigo-700 text-white",
    divTdStyle: "p-2 border-b border-l text-center",
    divTrStyle: "bg-white hover:!bg-stone-200",
    divBlockNumberStyle: "items-center font-bold px-3 py-4 border-b border-l border-gray-700 text-left bg-indigo-700 text-white",
    divFormStyle: "bg-gray-100 shadow rounded px-8 pt-6 pb-8 mb-4 flex flex-col",
    // divTableStyle: "shadow-md",

}

export default class Table extends Component {
    // var trades = this.props.tableData

    render() {
        var tableData = this.props.tableData.map((tData, i) =>
            <TableData key={i} tableData={tData} />
        );
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
                        <tbody>
                            {tableData}
                            {/* <tr className={styles.divTrStyle}>
                                <td className={styles.divTdStyle}>1</td>
                                <td className={styles.divTdStyle}>Malcolm Lockyer</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>
                                    <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                        Approved
                                    </span>
                                </td>
                            </tr>
                            <tr className={styles.divTrStyle}>
                                <td className={styles.divTdStyle}>2</td>
                                <td className={styles.divTdStyle}>Malcolm Lockyer</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>
                                    <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                        Approved
                                    </span>
                                </td>
                            </tr>
                            <tr className={styles.divTrStyle}>
                                <td className={styles.divTdStyle}>3</td>
                                <td className={styles.divTdStyle}>Malcolm Lockyer</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>1961</td>
                                <td className={styles.divTdStyle}>
                                    <span
                                        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                        Approved
                                    </span>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
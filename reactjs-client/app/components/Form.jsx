import React from "react";

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


const Form = () => {
    return (
        <div className={styles.divFormSectionStyle}>
            <form>
                <div className={styles.divFormStyle}>
                    <div className={styles.divRowStyle}>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="company">
                                Trade Number
                            </label>
                            <input className={styles.inputStyle} id="trade-num" type="text" placeholder="Ex: 1234" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Daily Number
                            </label>
                            <input className={styles.inputStyle} id="daily-num" type="text" placeholder="Ex: 123" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Date
                            </label>
                            <input className={styles.inputStyle} id="title" type="text" placeholder="Ex: 01/01/01" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Time
                            </label>
                            <input className={styles.inputStyle} id="title" type="text" placeholder="Ex: 00:00" />
                        </div>
                    </div>
                    <div className={styles.divRowStyle}>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="exchange">
                                Exchange
                            </label>
                            <div class="relative">
                                <select className={styles.selectStyle} id="exchange">
                                    <option>Binance</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Call Type
                            </label>
                            <div class="relative">
                                <select className={styles.selectStyle} id="call-type">
                                    <option>Buy(Long)</option>
                                    <option>Sell(Short)</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Trade Type
                            </label>
                            <div>
                                <select className={styles.selectStyle} id="trade-type">
                                    <option>Intraday</option>
                                    <option>Swing</option>
                                    <option>Long Swing</option>
                                    <option>Hold</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Pair
                            </label>
                            <input className={styles.inputStyle} id="pair" type="text" placeholder="Ex: BTC/USDT" />
                        </div>
                    </div>
                    <div className={styles.divRowStyle}>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="company">
                                First Entry Price
                            </label>
                            <input className={styles.inputStyle} id="entry1" type="text" placeholder="First Entry Price" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Second Entry Price
                            </label>
                            <input className={styles.inputStyle} type="text" placeholder="Second Entry Price" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Target Price
                            </label>
                            <input className={styles.inputStyle} id="target" type="text" placeholder="Target Price" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Stop Loss
                            </label>
                            <input className={styles.inputStyle} id="stop" type="text" placeholder="Stop Loss" />
                        </div>
                    </div>
                    <div className={styles.divRowStyle}>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="company">
                                Leverage
                            </label>
                            <div>
                                <select className={styles.selectStyle} id="status">
                                    <option>10x</option>
                                    <option>5x</option>
                                    <option>3x</option>
                                    <option>0x</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Base Candle Time
                            </label>
                            <div>
                                <select className={styles.selectStyle} id="status">
                                    <option>1d</option>
                                    <option>4h</option>
                                    <option>1h</option>
                                    <option>15min</option>
                                    <option>5min</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Source
                            </label>
                            <input className={styles.inputStyle} id="source" type="text" placeholder="Source" />
                        </div>
                        <div className={styles.divLabelInputStyle}>
                            <label className={styles.labelStyle} for="title">
                                Status
                            </label>
                            <div>
                                <select className={styles.selectStyle} id="status">
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
                            <button className={styles.buttonStyle}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>);
};

export default Form;
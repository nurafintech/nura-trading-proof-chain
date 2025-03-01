import React from "react";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Logo = "https://github.com/AminMortezaie/nura-proof-chain-ui/blob/main/app/img/naico.png?raw=true"


const styles = {
    itemStyle: "",
    imgStyle: "sm:h-10 object-cover h-20 w-32",
    divPopoverStyle: "-mr-2 flex items-center md:hidden",
    popoverButtonStyle: "inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500",
    divNavStyle: "flex w-full items-center justify-between md:w-auto",
    divNavbarStyle: "flex flex-shrink-0 flex-grow items-center lg:flex-grow-0",
    divNavbarMobileStyle: "overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5",
    navStyle: "relative flex items-center justify-between sm:h-10 lg:justify-start",
    divNavCompStyle: "relative px-4 pt-6 sm:px-6 lg:px-8",
    navigationStyle: "font-medium text-gray-500 hover:text-gray-900",
    navigationMobileStyle: "block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900",
    divNavigationStyle: "hidden md:ml-10 md:block md:space-x-8 md:pr-4",
    popoverPanelStyle: "absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden",
}


const navigation = [
    { name: 'Blockchain Data', href: '#' },
    { name: 'Submit Trading Data', href: '#' },
]
export default function Navbar() {
    return (
        <Popover>
            <div className={styles.divNavCompStyle}>
                <nav className={styles.navStyle} aria-label="Global">
                    <div className={styles.divNavbarStyle}>
                        <div className={styles.divNavStyle}>
                            <a href="/">
                                <img
                                    alt="Naico"
                                    className={styles.imgStyle}
                                    src={Logo}
                                />
                            </a>
                            <div className={styles.divPopoverStyle}>
                                <Popover.Button className={styles.popoverButtonStyle}>
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divNavigationStyle}>
                        {navigation.map((item) => (
                            <a key={item.name} href={item.href} className={styles.navigationStyle}>
                                {item.name}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>

            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className={styles.popoverPanelStyle}
                >
                    <div className={styles.divNavbarMobileStyle}>
                        <div className="flex items-center justify-between px-5 pt-4">
                            <div className="-mr-2">
                                <Popover.Button className={styles.popoverButtonStyle}>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={styles.navigationMobileStyle}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
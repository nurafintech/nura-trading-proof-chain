import React from "react";

const LogoSrc = "https://github.com/AminMortezaie/nura-proof-chain-ui/blob/main/myapp/src/assets/naico.png?raw=true"
const styles = {
    imgStyle: "sm:h-10 object-cover h-20 w-32"
}


const navigation = [
    { name: 'Intro', href: '#' },
    { name: 'Blockchain Data', href: '#' },
    { name: 'Trading Data', href: '#' },
]

export default function Navbar() {
    return (

        <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
                <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <a href="/">
                            <img
                                alt="Naico"
                                className={styles.imgStyle}
                                src={LogoSrc}
                            />
                        </a>
                        <div className="-mr-2 flex items-center md:hidden">
                            <button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open main menu</span>
                                <icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                            {item.name}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    )
}
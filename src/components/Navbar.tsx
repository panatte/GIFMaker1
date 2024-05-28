'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link';
import { Modal } from 'flowbite';

function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href ? 'text-blue-700 md:text-fuchsia-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white' : 'text-fuchsia-700 md:text-fuchsia-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white';
  };

  return (
    <nav className="bg-indigo-900 border-gray-200 dark:bg-gray-900 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logogif.png" className="h-[85px] w-[290px]" alt="Logo"/>
          {/* <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white text-white">GIFMaker</span> */}
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/login">
            <button type="button" className="text-white font-semibold text-2xl shadow-lg bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 w-[150px] h-[70px] ml-2 ">Login</button>
          </Link>
          <Link href="/register">
            <button type="button" className="text-white font-semibold text-2xl shadow-lg bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800 w-[180px] h-[70px] ml-2">Register</button>
          </Link>

          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="bg-indigo-900">
              <Link href="/" className={`text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300 ${isActive('/')}`}>Home</Link>
            </li>
            <li className="bg-indigo-900">
              <Link href="/about" className={`text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300 ${isActive('/about')}`}>About Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

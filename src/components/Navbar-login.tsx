'use client'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { FaHome, FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";

function Navbar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");

  const getProfile = async () => {
    // const address = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    fetch("/api/Checkcookies", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          if (data.data.path_profile !== 'null') {
            setProfile(data.data.path_profile);
            setName(data.data.name);
          } else {
            setProfile("/images/profile.png");
            setName(data.data.name);
          }

        }
      });
  }

  useEffect(() => {
    getProfile();
  }, []);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setDropdownVisible(false);
    }, 100); // หน่วงเวลาการซ่อน dropdown 300 มิลลิวินาที (คุณสามารถปรับเวลาได้ตามต้องการ)
  };

  const isActive = (href: string) => {
    return pathname === href ? 'text-blue-700 md:text-fuchsia-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white' : 'text-gray-900 md:text-fuchsia-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white shadow-md';
  };

  return (
    <nav className="bg-indigo-900 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logogif.png" className="h-[85px] w-[290px]" alt="Logo" />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative cursor-pointer">
          <Link href="/profile" legacyBehavior>
            <div
              className="flex items-center p-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-700 relative "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img src={profile} className="w-12 h-12 rounded-full" />
              <span className="m-2 hidden md:block text-2xl text-white font-semibold">{name}</span>
              {dropdownVisible && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 bg-indigo-700 rounded-md shadow-lg py-2 z-20 transition-transform duration-300 ease-in-out"
                  style={{
                    transform: dropdownVisible ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: dropdownVisible ? 1 : 0,
                  }}
                >
                  <Link href="/profile" legacyBehavior>
                    <a className="block px-4 py-2 text-fuchsia-300 hover:text-fuchsia-500 text-xl font-semibold hover:bg-indigo-800 ">My Work</a>
                  </Link>
                  <Link href="/profile/account" legacyBehavior>
                    <a className="block px-4 py-2 text-fuchsia-300 hover:text-fuchsia-500 text-xl font-semibold hover:bg-indigo-800">Account</a>
                  </Link>
                  <Link href="/login" legacyBehavior>
                    <a className="block px-4 py-2 text-fuchsia-300 hover:text-fuchsia-500 text-xl font-semibold hover:bg-indigo-800">Logout</a>
                  </Link>
                </div>
              )}
            </div>
          </Link>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className='bg-indigo-900'>
              <Link href="/" className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:border-gray-700${isActive('/')}`}>
                <span className="flex items-center text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300"> Home</span>
              </Link>
            </li>
            <li className='bg-indigo-900'>
              <Link href="/create" className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:border-gray-700 ${isActive('/create')}`}>
                <span className="text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300"> Create Gif </span>
              </Link>
            </li>
            <li className='bg-indigo-900'>
              <Link href="/upload" className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:border-gray-700 ${isActive('/upload')}`}>
                <span className="text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300"> Upload </span>
              </Link>
            </li>
            <li className='bg-indigo-900'>
              <Link href="/about" className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:border-gray-700 ${isActive('/about')}`}>
                <span className="text-3xl font-semibold block py-2 px-3 md:p-0 rounded hover:bg-fuchsia-500 md:hover:bg-transparent md:hover:text-fuchsia-500 md:dark:hover:text-fuchsia-300 dark:border-fuchsia-300"> About Us </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
{/* <FaHome className="mx-[16px] m-2 w-6 h-6 text-white" />

<IoIosCreate className=" m-2 w-6 h-6 text-white" />
<FaCloudUploadAlt className="m-2 w-6 h-6 text-white" />
<IoInformationCircleSharp className=" m-2 w-6 h-6 text-white" /> */}
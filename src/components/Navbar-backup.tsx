"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

function Navbar() {
  const pathname = usePathname();
  const tokenExists = Cookies.get('token');

  // กำหนดเมนูเริ่มต้น
  const defaultMenu = [
    {
      name: "หน้าหลัก",
      link: "/"
    },
    {
      name: "เกี่ยวกับ",
      link: "/about"
    }
  ];

  // กำหนดเมนูสำหรับผู้ใช้ที่มี token
  const loggedInMenu = [
    ...defaultMenu,
    {
      name: "สร้าง",
      link: "/create"
    },
    {
      name: "อัพโหลด",
      link: "/upload"
    }
  ];

  // เลือกเมนูที่เหมาะสมตามสถานะการเข้าสู่ระบบ
  const menu = tokenExists ? loggedInMenu : defaultMenu;

  // ฟังก์ชันตรวจสอบว่าเป็นเส้นทางปัจจุบันหรือไม่
  const isActive = (href: string) => {
    return pathname === href ? 'text-blue-700 md:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white' : 'text-gray-900 md:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white';
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GIFMaker</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/login">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เข้าสู่ระบบ</button>
          </Link>
          <Link href="/register">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ marginLeft: '10px' }}>สมัครสมาชิก</button>
          </Link>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menu.map((item: any) => (
              <li key={item.name} className="inline-block">
                <Link href={item.link} className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:border-gray-700 ${isActive(item.link)}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

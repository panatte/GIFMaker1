"use client"

import Navbar from "@/components/Navbar-login";
import Footer from "@/components/Footer";
import { useState } from "react";
import { FaImage,FaCloudUploadAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Portfolio  from "./portfolio";
import Changepass from "./changepass";

export default function Admin() {
    const [activeButton, setActiveButton] = useState("portfolio");
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
        <div className="flex flex-col bg-gray-800 m-[20px] p-14 w-[100rem] min-h-screen rounded-md">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-center text-gray-200 dark:text-gray-200 m-4">
              My Works
            </h1>
          </div>
          {activeButton === "portfolio" && <Portfolio gridClass="grid gap-4" />}
          {activeButton === "changepassword" && <Changepass/>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import Link from 'next/link'
import Navbar from "../../components/Navbar-login";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    < main >
      <Navbar />
      <main className="flex min-h-screen flex-col items-center  p-14 bg-gray-200 text-center">
        <div className="p-6">
        <strong><p style={{ fontSize: '26px' }}>เกี่ยวกับ</p></strong>
        </div>
        <div>
        GIFMaker ถูกสร้างเมื่อ Q4 2023 เป็นเว็บไซต์สำหรับสร้าง อัพโหลด GIF และ แชร์ผลงาน GIF Animation 
        </div>
      </main>
      <Footer />
    </main>
  );
}

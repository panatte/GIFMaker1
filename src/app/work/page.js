'use client'
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';

// SVG Heart Icon Component with custom color
const HeartIcon = () => (
  <svg class="w-[34px] h-[34px] text-blue-600 hover:text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"/>
  </svg>
);

// SVG Share Icon Component with custom color
const ShareIcon = () => (
  <svg class="w-[34px] h-[34px] text-blue-600 hover:text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z"/>
  </svg>  
);

// SVG Share Icon Component with custom color
const ReportIcon = () => (
  <svg class="w-[34px] h-[34px] text-blue-600 hover:text-blue-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clipRule="evenodd"/>
  </svg>
);


export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E1EFFE" }}>
      <Navbar />
      <div className="px-5 py-5" style={{ minHeight: "calc(100vh - 185px)" }}>
        <h1 className="text-2xl font-bold text-center">Placeholder</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
        </div>
        <div className="flex justify-between items-center">
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-4 py-5">
          {/* Placeholder for work showcase */}
          {/* You can add your showcase items here */}
          {/* Row 1 */}
          <div className="relative w-128 h-128 bg-white rounded-lg flex flex-col items-center justify-center border border-black">
            Placeholder
            <div className="absolute top-1 right-10">
              <Link href="/"><HeartIcon /></Link>
            </div>
            <div className="absolute top-1 right-1">
              <Link href="/"><ShareIcon /></Link>
            </div>
            <div className="absolute bottom-1 right-1">
              <Link href="/"><ReportIcon /></Link>
            </div>
          </div>
          <div className="text-center w-full">
              Description:
              <br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis nunc in quam ornare auctor. Vivamus non aliquam nisl. Duis lacinia dapibus diam, quis dapibus libero lacinia ac.
              <br/><br/>
              Like: xx
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

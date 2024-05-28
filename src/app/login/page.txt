import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E1EFFE" }}>
      <Navbar />
      <div style={{ paddingLeft: "17.5%", paddingRight: "17.5%" }}>
        <div className="px-5 py-5" style={{ minHeight: "calc(100vh - 185px)" }}>
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <div className="flex flex-col items-center mt-4 py-5">
            <input type="text" className="border border-gray-400 p-2 mb-2 rounded-lg" style={{ width: "320px"}} placeholder="Username" />
            <input type="password" className="border border-gray-400 p-2 rounded-lg" style={{ width: "320px"}} placeholder="Password" />
          </div>
          <div className="flex flex-col items-center mt-4">
            <Link href="/"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ width: "320px"}}>Login</button></Link>
            <div className="text-left mt-2 text-sm text-blue-700 hover:text-blue-800" ><Link href="/recovery">Forgot Password?</Link></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
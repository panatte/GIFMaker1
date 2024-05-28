import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E1EFFE" }}>
      <Navbar />
      <div style={{ paddingLeft: "17.5%", paddingRight: "17.5%" }}>
        <div className="px-5 py-5" style={{ minHeight: "calc(100vh - 185px)" }}>
          <h1 className="text-2xl font-bold text-center">About Us</h1>
          <div className="text-lg py-10">&nbsp;GIFMaker, launched in the fourth quarter of 2023, is a website dedicated to crafting and sharing GIF animations. To explore user-generated
          examples, simply visit the homepage.</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

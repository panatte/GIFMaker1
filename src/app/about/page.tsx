"use client";
import Link from 'next/link'
import Navbar from "../../components/Navbar";
import Navbar_login from "../../components/Navbar-login";
import Navbar_admin from "../../components/Navbar-admin";
import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [nav, setNav] = useState("");
  const [showPopUp, setShowPopUp] = useState("");
  const [profile, setProfile] = useState({} as any);
  const handleClose = () => {
    setShowPopUp("");
  };

  const address = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  fetch(address + "/api/Checkcookies", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Success") {
        setNav(data.data.role);
        setProfile(data.data.path_profile);
      } else {
        setNav("guest");
      }
    });
  return (
    <main>
      {String(nav) === "admin" ? (
        <Navbar_admin />
      ) : String(nav) === "user" ? (
        <Navbar_login />
      ) : (
        <Navbar />
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-14 bg-gray-900">
      <div className="grid bg-gray-800 m-[20px] p-14 min-h-[80vh] rounded-md min-w-screen">
          <div className="text-center text-white">
          <p className="text-3xl">About Us</p>
          <br></br>
          &nbsp;GIFMaker, launched in the second quarter of 2024, is a website dedicated to crafting and sharing GIF animations. To explore user-generated
          examples, simply visit the homepage.
          </div>
          <hr></hr>
          <div className="text-center text-white">
          <p className="text-3xl">Features</p>
          <br></br>
          <ul>
            <li>Create and upload GIF</li>
            <li>Download and copy link of users&apos; published from the main page</li>
          </ul>
          </div>
          <hr></hr>
          <div className="text-center text-white">
          <p className="text-3xl">License</p>
          <br></br>
          &nbsp;At GIFMaker, we believe in the power of sharing and collaboration. We want to make our content as accessible as possible while still respecting the rights of content creators. That&apos;s why we&apos;ve chosen to license our content under the <b><a href="https://creativecommons.org/licenses/by/4.0/" className="hover:underline" target="_blank" rel="noopener noreferrer">Creative Commons Attribution 4.0 International License (CC BY 4.0)</a></b>.
          </div>
      </div>
      </main>
      <Footer />
    </main>
  );
}
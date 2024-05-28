"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Navbar_login from "../components/Navbar-login";
import Navbar_admin from "../components/Navbar-admin";
import Footer from "../components/Footer";
import Borad from "../components/board";
import SearchBar from "../components/searchbar";
import Sort from "../components/sort";
import React, { useEffect, useState } from "react";
import PopUp from "../components/popup";
import BoardCategories from "../components/boardCategories";

export default function Home() {
  const [nav, setNav] = useState("");
  const [showPopUp, setShowPopUp] = useState("");
  const [profile, setProfile] = useState({} as any);
  const [categories, setCategories] = useState<{ tagID: number, tagName: string }[]>([]);
  const [boardCategories_, setBoardCategories_] = useState<string>("");
  const [checkSortimg, setCheckSortimg] = useState('latest');

  const handleClose = () => {
    setShowPopUp("");
  };

  useEffect(() => {
    const address = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
    fetch(address + "/api/Checkcookies", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("cookie is set", data);
          setNav(data.data.role);
          setProfile(data.data.path_profile);
        } else {
          setNav("guest");
        }
      });
  }, []);

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("share");
    if (page) {
      setShowPopUp(page);
    }
  }, []);

  useEffect(() => {
    fetch("/api/categories", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setCategories(data.data);
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refetch, setRefetch] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSortChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    // setRefetch(true); // Trigger refetch
    setCheckSortimg(newSortOrder);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setRefetch(true); // Trigger refetch
  };

  const handleClickCategories = (categories_: any) => {
    setBoardCategories_(categories_);
    setSelectedCategory(categories_);
    setRefetch(true); // Trigger refetch
  };
  console.log('checkSortimg ............................. ', checkSortimg)
  console.log('sortOrder ............................. ', sortOrder)

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
        <div className="grid bg-gray-800 m-[20px] p-14 min-h-[90vh] rounded-md min-w-screen">
          <div className="grid p-6 grid-cols-2">
            <div className="col-start-1">
              <h1 className="text-4xl font-bold text-white">Tags</h1>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {categories.map((category) => (
                  <Link key={category.tagID} href={`/?category=${category.tagName}`} passHref>
                    <div
                      className={`p-2 rounded-md text-white font-semibold text-center text-xl cursor-pointer transform transition-transform duration-300 ease-in-out ${selectedCategory === category.tagName ? 'bg-gray-900' : 'bg-gray-700'
                        } hover:bg-gray-600 hover:scale-105`}
                      onClick={() => handleClickCategories(category.tagName)}
                    >
                      {category.tagName}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-start-2">
              <Sort onSortChange={handleSortChange} onCategoryChange={setBoardCategories_} onRefetch={setRefetch} />
              <div className="flex justify-end">
                <div className="m-2 w-[300px]">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </div>
          </div>
          <div className="row-start-3">
            {
              boardCategories_ === "" ? (
                (checkSortimg === "latest" || checkSortimg === "popular") && (
                  <Borad gridClass="grid gap-4" sort={sortOrder} search={searchQuery} refecth={refetch} />
                )
              ) : (
                <BoardCategories gridClass="grid gap-4" categories={boardCategories_} refecth={refetch} />
              )
            }
          </div>
        </div>
      </main>
      <Footer />
      {showPopUp && <PopUp imgUrl={showPopUp} onclose={handleClose} />}
    </main>
  );
}

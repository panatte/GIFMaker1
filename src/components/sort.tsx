"use client";
import React, { useState } from 'react';
import { GrPowerReset } from "react-icons/gr";

interface SortProps {
  onSortChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onRefetch: (value: boolean) => void;
}

const YourComponent: React.FC<SortProps> = ({ onSortChange, onCategoryChange, onRefetch }) => {
  const [activeButton, setActiveButton] = useState('latest'); // State to track active button

  return (
    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-md sm:flex flex-row dark:divide-gray-700 dark:text-gray-400 mb-[20px] justify-end">
      <li className="focus-within:z-10 m-2">
        <a
          onClick={() => {
            setActiveButton('latest');
            onSortChange("latest");
            onCategoryChange("");
            onRefetch(false);
          }}
          className={`inline-block text-xl font-semibold p-4 rounded-md transition-colors duration-300 cursor-pointer ${activeButton === 'latest' ? 'bg-rose-700 text-white' : 'bg-rose-400 text-white hover:bg-rose-700'
            }`}
        >
          Last Upload
        </a>
      </li>
      <li className="focus-within:z-10 m-2">
        <a
          onClick={() => {
            setActiveButton('popular');
            onSortChange("popular");
            onCategoryChange("");
            onRefetch(false);
          }}
          className={`inline-block text-xl font-semibold p-4 rounded-md transition-colors duration-300 cursor-pointer ${activeButton === 'popular' ? 'bg-rose-700 text-white' : 'bg-rose-400 text-white hover:bg-rose-700'
            }`}
        >
          Most Popular
        </a>
      </li>
      <li className="focus-within:z-10 m-2">
        <a
          onClick={() => { window.location.reload() }}
          className={`inline-block text-xl font-semibold p-4 rounded-md transition-colors duration-300 cursor-pointer ${activeButton === '' ? 'bg-rose-700 text-white' : 'bg-rose-400 text-white hover:bg-rose-700'
            } flex items-center justify-center`}
        >
          <GrPowerReset />
        </a>
      </li>
    </ul>


  );
}

export default YourComponent;

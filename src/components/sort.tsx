"use client";
import React, { useState } from 'react';
interface SortProps {
  onSortChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onRefetch : (value: boolean) => void;
}

const YourComponent: React.FC<SortProps> = ({ onSortChange, onCategoryChange, onRefetch}) => {
  const [activeButton, setActiveButton] = useState('latest'); // State to track active button
  return (
    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-md sm:flex flex-row dark:divide-gray-700 dark:text-gray-400 mb-[20px] justify-end">
      <li className="focus-within:z-10 m-2 ">
        <a
          href="#"
          onClick={() => { setActiveButton('latest'); onSortChange("latest");onCategoryChange("");onRefetch(false) }} // Set active button to 'old' on click
          className={`inline-block text-xl font-semibold p-4 rounded-md  ${activeButton === 'latest' ? 'bg-rose-700 text-white' : 'bg-rose-400 text-white hover:text-white hover:bg-rose-700 dark:border-rose-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-rose-700'
            } border-r border-rose-200 dark:border-rose-700`}
        >
          Last Upload
        </a>
      </li>
      <li className="focus-within:z-10 m-2">
        <a
          href="#"
          onClick={() => { setActiveButton('popular'); onSortChange("popular");onCategoryChange("");onRefetch(false) }} // Set active button to 'popular' on click
          className={`inline-block text-xl font-semibold p-4 rounded-md  ${activeButton === 'popular' ? 'bg-rose-700 text-white' : 'bg-rose-400 text-white hover:text-white hover:bg-rose-700 dark:border-rose-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-rose-700'
            } border-r border-rose-200 dark:border-rose-700`}
        >
          Most popular
        </a>
      </li>
    </ul>

  );
}

export default YourComponent;

'use client';
import React, { useState } from 'react';
import { BlockPicker } from "react-color";
import { StoreContext } from "@/store";


const ColorPicker = () =>{
  const [color, setColor] = useState<string>("");
  const store = React.useContext(StoreContext);
  const professionalVideoColors = [
    "#000000", // Black
    "#FFFFFF", // White
    "#404040", // Dark Gray
    "#808080", // Gray
    "#C0C0C0", // Silver
    "#E0E0E0", // Light Gray
    "#003366", // Dark Blue
    "#336699", // Medium Blue
    "#6699CC", // Blue
    "#99CCFF", // Light Blue
    "#990000", // Dark Red
    "#CC3333", // Red
    "#FF6666", // Light Red
    "#663300", // Dark Brown
    "#996633", // Brown
    "#CC9966", // Light Brown
    "#006600", // Dark Green
    "#339933", // Green
    "#66CC99", // Light Green
    "#FFFF00", // Yellow
  ];
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleChange = (newColor: any) => {
    setColor(newColor.hex);
    store.setTextColorStore(newColor.hex);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };


  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-white font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 border-2 border-white p-4"
        style={{ backgroundColor: color }}
        onClick={toggleColorPicker}
      >
        <svg
          className="w-6 h-6 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
        </svg>
      </button>
      {showColorPicker && (
        <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10 }}>
          <BlockPicker
            color={color}
            colors={professionalVideoColors}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;



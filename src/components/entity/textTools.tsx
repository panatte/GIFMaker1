'use client';
import React, { useState, useEffect,useContext } from "react";
import FontSelect from "@/components/panels/fontText";
import AlignText from "@/components/panels/alignText";
import StrokeColor from "@/components/panels/strokeColortext";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import ColorPicker from "@/components/panels/colorpicker";


export default function TextTools() {
  const store = useContext(StoreContext);
  
  const handleChange = (newColor: string) => {
    store.setTextColorStore(newColor);
  }

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md m-2">
      <h1 className="text-2xl text-white font-semibold mb-4">Color</h1>
      <div className="flex flex-wrap gap-2">
        <button
          className="text-white font-medium rounded-lg text-sm px-5 py-4 text-center mb-2"
          style={{ backgroundColor: "#000000" }}
          onClick={() => handleChange("#000000")}
        ></button>
        <button
          className="text-white font-medium rounded-lg text-sm px-5 py-4 text-center mb-2"
          style={{ backgroundColor: "#0000FF" }}
          onClick={() => handleChange("#0000FF")}
        ></button>
        <button
          className="text-white font-medium rounded-lg text-sm px-5 py-4 text-center mb-2"
          style={{ backgroundColor: "#FF0000" }}
          onClick={() => handleChange("#FF0000")}
        ></button>
        <button
          className="text-white font-medium rounded-lg text-sm px-5 py-4 text-center mb-2"
          style={{ backgroundColor: "#008000" }}
          onClick={() => handleChange("#008000")}
        ></button>
        <button
          className="text-white font-medium rounded-lg text-sm px-5 py-4 text-center mb-2"
          style={{ backgroundColor: "#FFFFFF" }}
          onClick={() => handleChange("#FFFFFF")}
        ></button>
        <div className="relative w-full">
          <ColorPicker />
        </div>
      </div>

      <h1 className="text-2xl text-white font-semibold mb-4 mt-1">Font</h1>
      <FontSelect />
      <h1 className="text-2xl text-white font-semibold mb-4 mt-1">Align</h1>
      <AlignText />
      <h1 className="text-2xl text-white font-semibold mb-4 mt-1">Stroke Color</h1>
      <StrokeColor />
    </div>
  );
}
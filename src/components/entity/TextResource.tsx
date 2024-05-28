"use client";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";

type TextResourceProps = {
  fontSize: number;
  fontWeight: number;
  textColor: string;
  sampleText: string;
  fontFamily: string;
};

export const TextResource = observer(
  ({ fontSize, fontWeight, sampleText, fontFamily }: TextResourceProps) => {
    const store = React.useContext(StoreContext);

// Only run this effect when fontFamily changes
    const changeFontFamily = (font: any) => {
      console.log('changeFontFamily -------------------------> ', font)
      store.setFontFamily(font);
      store.addText({
        text: sampleText,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textColor: store.textColor,
        fontFamily: store.fontFamily,
        textalign: store.textAlign,
        strokeColor: store.strokeColor,
        strokeSzie: store.strokeSzie,
      })
      
    };

    const addText_ = () => {
      store.addText({
        text: sampleText,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textColor: store.textColor,
        fontFamily: store.fontFamily,
        textalign: store.textAlign,
        strokeColor: store.strokeColor,
        strokeSzie: store.strokeSzie,
      })
      
    };
    return (
      <div className="items-center m-[5px] flex flex-row">
        <div
          className="flex text-black px-2 py-1"
          style={{
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontFamily: fontFamily, // Apply fontFamily here
          }}
        >
          <div
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold text-center mx-2 py-2 px-4 rounded cursor-pointer"
            onClick={() => {
              if (sampleText === 'Arial') {
                changeFontFamily(fontFamily);
              } else if (sampleText === 'Rampart One') {
                changeFontFamily(fontFamily);
              } else if (sampleText === 'Kanit') {
                changeFontFamily(fontFamily);
              } else if (sampleText === 'Jersey 20') {
                changeFontFamily(fontFamily);
              } else {
                addText_();
              }
              
            }}
          >
            {sampleText}
          </div>
        </div>
      </div>
    );
  }
);

"use client";
import React, { useState } from "react";
import { observer } from "mobx-react";
import { TextResource } from "../entity/TextResource";
import { StoreContext } from "@/store";

const TEXT_RESOURCES = [
  {
    name: "Add a heading",
    fontSize: 32,
    fontWeight: 600,
    fontFamily: "Arial", // ตรวจสอบให้แน่ใจว่าได้ระบุ fontFamily
  },
  {
    name: "Add a subheading",
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Arial",
  },
  {
    name: "Add a body text",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Arial",
  },
];

const TextFontfamily = [
  {
    name: "Arial",
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "Arial",
  },
  {
    name: "Rampart One",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Rampart One",
  },
  {
    name: "Kanit",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Kanit",
  },
  {
    name: "Jersey 20",
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Jersey 20",
  },
];

export const TextResourcesPanel = observer(() => {
  const [textColor_, setTextColor_] = useState("#ffffff");
  const store = React.useContext(StoreContext);

  return (
    <div className="bg-gray-800 h-full">
      <div className="px-[16px] pt-[16px] pb-[8px] font-semibold text-2xl text-white bg-gray-900">
        Text
      </div>
      <ul className="divide-y divide-rose-200">
        {TEXT_RESOURCES.map((resource) => (
          <li key={resource.name} className="cursor-pointer">
            <TextResource
              sampleText={resource.name}
              fontSize={resource.fontSize}
              textColor={textColor_}
              fontWeight={resource.fontWeight}
              fontFamily={resource.fontFamily}
            />
          </li>
        ))}
        <div className="px-[16px] pt-[16px] pb-[8px] font-semibold text-2xl text-white bg-gray-900">
         Font Family
        </div>
        {TextFontfamily.map((resource) => (
          
          <li key={resource.name} className="cursor-pointer">
            <TextResource
              sampleText={resource.name}
              fontSize={resource.fontSize}
              textColor={textColor_}
              fontWeight={resource.fontWeight}
              fontFamily={resource.fontFamily}
            />
          </li>
          
        ))}
      </ul>
    </div>
  );
});

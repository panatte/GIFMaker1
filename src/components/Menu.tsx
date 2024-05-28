"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import {
  MdDownload,
  MdVideoLibrary,
  MdImage,
  MdTitle,
  MdOutlineFormatColorFill,
  MdMovieFilter,
} from "react-icons/md";
import { PiSmileyStickerBold } from "react-icons/pi";
import { Store } from "@/store/Store";

export const Menu = observer(() => {
  const store = React.useContext(StoreContext);

  return (
    <ul className="bg-gray-900 h-full flex flex-col md:p-0 p-4 ">
      {MENU_OPTIONS.map((option) => {
        const isSelected = store.selectedMenuOption === option.name;
        return (
          <li
            key={option.name}
            className={`h-[72px] w-[72px] flex flex-col items-center justify-center ${isSelected ? "bg-gray-800" : ""}`}
          >
            <button
              onClick={() => option.action(store)}
              className={`flex flex-col items-center`}
            >
              <option.icon
                size="30"
                color={
                  isSelected ? "#f43f5e" : "#ffffff"
                }
              />
              <div
                className={`text-[0.9rem] hover:text-rose-500 font-semibold ${isSelected ? "text-white" : "text-slate-600"}`}
              >
                {option.name}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
});

const MENU_OPTIONS = [
  {
    name: "Image",
    icon: MdImage,
    action: (store: Store) => {
      store.setSelectedMenuOption("Image");
    },
  },
  {
    name: "Video",
    icon: MdVideoLibrary,
    action: (store: Store) => {
      store.setSelectedMenuOption("Video");
    },
  },
  {
    name: "Text",
    icon: MdTitle,
    action: (store: Store) => {
      store.setSelectedMenuOption("Text");
    },
  },
  {
    name: "Filter",
    icon: MdMovieFilter,
    action: (store: Store) => {
      store.setSelectedMenuOption("Filter");
    },
  },
  {
  name: "Sticker",
  icon: PiSmileyStickerBold,
  action: (store: Store) => {
    store.setSelectedMenuOption("Sticker");
  },
},
  
  {
    name: "Export",
    icon: MdDownload,
    action: (store: Store) => {
      store.setSelectedMenuOption("Export");
    },
  },
];
// {
//   name: "Filter",
//   icon: MdOutlineFormatColorFill,
//   action: (store: Store) => {
//     store.setSelectedMenuOption("Fill");
//   },
// },
// {
//   name: "Audio",
//   icon: MdAudiotrack,
//   action: (store: Store) => {
//     store.setSelectedMenuOption("Audio");
//   },
// },
// {
//   name: "Animation",
//   icon: MdTransform,
//   action: (store: Store) => {
//     store.setSelectedMenuOption("Animation");
//   },
// },
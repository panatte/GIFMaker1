"use client";
import React from "react";
import { EditorElement } from "@/types";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { RiEmojiStickerFill } from "react-icons/ri";
import { MdOutlineTextFields, MdMovie, MdOutlineImage,  } from "react-icons/md";

export type ElementProps = {
  element: EditorElement;
};

export const Element = observer((props: ElementProps) => {
  const store = React.useContext(StoreContext);
  const { element } = props;
  const Icon = element.type === "video" ? MdMovie: element.type === "image" ?  MdOutlineImage: MdOutlineTextFields;
  const isSelected = store.selectedElement?.id === element.id;
  const bgColor = isSelected ? "#f87171" : "";
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={`flex mx-2 my-1 py-2 px-1 flex-row justify-start items-center ${bgColor} hover:'bg-rose-700 rounded-lg hover:bg-rose-500 hover:text-white cursor-pointer transition duration-1'`}
      key={element.id}
      onClick={() => {
        store.setSelectedElement(element);
      }}
    >
      <Icon size="30" color="white"></Icon>
      <div className="truncate text-xl text-white ml-2 flex-1 font-semibold">
        {element.name}
      </div>
      <div>
        {element.type === "video" ? (
          <video
            className="opacity-0 max-w-[20px] max-h-[30px]"
            src={element.properties.src}
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={() => {
              store.refreshElements();
            }}
            height={20}
            width={20}
            id={element.properties.elementId}
          ></video>
        ) : null}
        {element.type === "image" ? (
          <img
            className="opacity-0 max-w-[20px] max-h-[30px]"
            src={element.properties.src}
            onLoad={() => {
              store.refreshElements();
            }}
            onLoadedData={() => {
              store.refreshElements();
            }}
            height={20}
            width={20}
            id={element.properties.elementId}
          ></img>
        ) : null}
      </div>
      <button
        className="bg-white hover:bg-rose-700 hover:text-white text-rose-500 mr-2 text-xl py-1 px-3 rounded "
        onClick={(e) => {
          store.removeEditorElement(element.id);
          store.refreshElements();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        X
      </button>
    </div>
  );
});

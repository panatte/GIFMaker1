"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
  const store = React.useContext(StoreContext);
  return (
    <div className="bg-gray-800 h-full overflow-scroll scrollbar-thumb-rose-500 scrollbar-track-gray-700 scrollbar-thin ">
      <div className="flex flex-row justify-between">
        <div className="text-sm px-[16px] py-[7px] font-semibold text-xl text-white bg-gray-900 w-full">Elements</div>
      </div>
      <div className="flex flex-col">
        {store.editorElements.map((element) => {
          return <Element key={element.id} element={element} />;
        })}
      </div>
    </div>
  );
});

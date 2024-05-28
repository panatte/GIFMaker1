"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ImageResource } from "../entity/ImageResource";
import { UploadButton } from "../shared/UploadButton";

export const ImageResourcesPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    store.addImageResource(URL.createObjectURL(file));
  };
  return (
    <>
      <div className="text-xl px-[16px] pt-[16px] pb-[8px] font-semibold text-white text-xl bg-gray-900">
        Images
      </div>
      <div className="flex justify-start ml-3 mt-3 items-center">
        <UploadButton
          accept="image/*"
          className="bg-rose-500 hover:bg-rose-700 text-white font-bold text-center mx-2 py-2 px-4 rounded cursor-pointer "
          onChange={handleFileChange}
        />
      </div>
      <div >
        {store.images.map((image, index) => {
          return <ImageResource key={image} image={image} index={index} />;
        })}
      </div>

    </>
  );
});

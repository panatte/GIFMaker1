"use client";
import React from "react";
import { StoreContext } from "@/store";
// import { formatTimeToMinSec } from "@/utils";
import { observer } from "mobx-react";
import { VideoEditorElement, ImageEditorElement, EffecType } from "@/types";

const EFFECT_TYPE_TO_LABEL: Record<string, string> = {
  none: "None",
  blackAndWhite: "Black and White",
  sepia: "Sepia",
  invert: "Invert",
  polaroid: "Polaroid",
};
export type EffectResourceProps = {
  editorElement: VideoEditorElement | ImageEditorElement;
};

export const EffectResource = observer((props: EffectResourceProps) => {

  const handleChangeEffectType = (type: EffecType) => {
    console.log("type", type);
    console.log('props.editorElement.id', props.editorElement.id)
    store.updateEffect(props.editorElement.id, { type });
  };

  const store = React.useContext(StoreContext);
  return (
    <div className="flex flex-wrap bg-gray-800">
      {Object.entries(EFFECT_TYPE_TO_LABEL).map(([effectType, label]) => (
        <div
          key={effectType}
          className="rounded-lg overflow-hidden bg-gray-700 m-2 flex flex-col relative min-h-[100px] shadow-md p-2 cursor-pointer"
          onClick={() => handleChangeEffectType(effectType as EffecType)}
        >
          <div
            className="image-container"
            style={{
              filter: effectType === "none" ? "none" : `grayscale(${effectType === "blackAndWhite" ? "100%" : "0%"}) sepia(${effectType === "sepia" ? "100%" : "0%"}) invert(${effectType === "invert" ? "100%" : "0%"}) contrast(${effectType === "polaroid" ? "150%" : "100%"})`,
            }}
          >
            <img src="/images/imgTast.jpg" alt={label} className="w-full h-auto" />
          </div>
          <span className="text-white text-sm font-semibold text-xl mt-2">{label}</span>
        </div>
      ))}
    </div>


  );
});


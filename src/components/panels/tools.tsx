'use client';
import React, { useState, useEffect } from "react";
import FontSelect from "./fontText";
import AlignText from "./alignText";
import StrokeColor from "./strokeColortext";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import ColorPicker from "./colorpicker";
import TextTools from "../entity/textTools";
import { FillPanel } from "./FillPanel";
import { SettingCanvas } from "./SettingCanvas";
export const Toolsobject = observer(((_props: {}) => {
  const store = React.useContext(StoreContext);
  const [hidden_, setHidden] = useState("hidden");
  const [textColor_, setTextColor_] = useState("#ffffff");

  const handleChange = (newColor: string) => {
    setTextColor_(newColor);
    store.setTextColorStore(newColor);
  }
  useEffect(() => {
    if (store.selectedElement?.type === "text") {
      setHidden("");
    } else if (store.selectedElement?.type === "image") {
      setHidden("");
    } else if (store.selectedElement?.type === "video") {
      setHidden("");
    } else {
      setHidden("hidden");
    }

  }, [store.selectedElement]); // เรียกใช้ useEffect เมื่อ store.selectedElement เปลี่ยนแปลง

  return (
    <div className="h-full w-full ">
    { hidden_ === "hidden" && <SettingCanvas />}
    { hidden_ === "" &&
    <div className={hidden_}>
      {store.selectedElement?.type === "text" && <TextTools />}
      { (store.selectedElement?.type === "image" || store.selectedElement?.type === 'video') && <FillPanel /> }
    </div>
    }
    </div>
  );
}));
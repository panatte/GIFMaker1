// components/SettingCanvas.tsx
'use client';
import { observer } from "mobx-react";
import React from "react";
import {StoreContext} from "@/store";
export const SettingCanvas = observer(() => {
  const store = React.useContext(StoreContext);
  const resizeLandscape = () => {
    if (store.canvas) {
      store.canvas.setWidth(670);
      store.canvas.setHeight(380);
    }
  };

  const resizeSquare = () => {
    if (store.canvas) {
      store.canvas.setWidth(500);
      store.canvas.setHeight(500);
    }
  };

  const resizePortrait = () => {
    if (store.canvas) {
      store.canvas.setWidth(250);
      store.canvas.setHeight(450);
    }
  };
  const resizeCanvas = () => {
    if (store.canvas) {
      store.canvas.setWidth(800);
      store.canvas.setHeight(500);
    }
  };
  
  return (
    <div className="bg-gray-700 rounded-lg shadow-md w-full mr-5 p-5">
      <div className="text-2xl font-semibold text-white m-2">Resize canvas</div>
      <div className="flex flex-col gap-2">
        <button onClick={resizeCanvas} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded text-xm">
          Default ( 800 x 500 px)
        </button>
        <button onClick={resizeLandscape} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded text-xm">
          Landscape ( 670 x 380 px )
        </button>
        <button onClick={resizeSquare} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded text-xm">
          Square ( 500 x 500 px )
        </button>
        <button onClick={resizePortrait} className="bg-rose-500 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded text-xm">
          Portrait ( 250 x 450 px )
        </button>
      </div>
    </div>
  );
});

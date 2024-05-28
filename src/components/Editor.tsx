"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { Store } from "@/store/Store";
import "@/utils/fabric-utilsbackup";
import Navbar from '@/components/Navbar-login';
export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 800,
      backgroundColor: "#ededed",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a0f5";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0063d8";
    fabric.Object.prototype.cornerSize = 10;
    // canvas mouse down without target should deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="grid grid-rows-[500px] grid-cols-[_72px_300px_1fr] bg-gray-900">
        <div id="grid-canvas-container" className="col-start-3 bg-gray-900 flex justify-center items-center">
          <canvas id="canvas" className="h-[500px] w-[100px] row bg-gray-900" />
        </div>
        <div className="tile row-start-1 col-start-1 flex flex-col">
          <Menu />
        </div>
        <div className=" col-start-2 row-start-1 flex flex-col overflow-scroll">
          <Resources />
        </div>
      </div>
      <div className="grid grid-rows-[500px] grid-cols-[322px_1fr]">
        <div className="col-start-2 row-start-1 relative px-[10px] py-[4px] overflow-scroll bg-slate-200">
          <TimeLine />
        </div>
        <div className="col-start-1 row-start-1">
          <ElementsPanel />
        </div>
      </div>
    </div>
  );
});

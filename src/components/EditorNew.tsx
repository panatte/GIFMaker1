// Editor.tsx
'use client';// Editor.tsx (continued)
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import DragDropContainer from "./entity/DragDropContainer";
import { Store } from "@/store/Store";
import { EditorElement } from "@/types";
import Navbar from "./Navbar-login";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";
import { Resources } from "./Resources";
import { Toolsobject } from "./panels/tools";
import { ElementsPanel } from "./panels/ElementsPanel";
export const EditorWithStore: React.FC = () => {
  const [store] = useState(() => new Store());
  return (
    <StoreContext.Provider value={store}>
      <EditorNew />
    </StoreContext.Provider>
  );
};

export const EditorNew: React.FC = observer(() => {
  const store = React.useContext(StoreContext);
  
  const [canvasWidth, setCanvasWidth] = useState<number>(800);
  const [canvasHeight, setCanvasHeight] = useState<number>(500);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: canvasHeight,
      width: canvasWidth,
      backgroundColor: "#ededed",
      // selection: false,
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
  }, [canvasWidth, canvasHeight]);

  return (
    <>
      <Navbar />
      <div className="grid grid-rows-[500px] grid-cols-[_72px_300px_1fr_350px] bg-gray-900">
        <div className="tile row-start-1 col-start-1 flex flex-col">
          <Menu />
        </div>
        <div className="h-full flex flex-col md:p-0 p-4 bg-gray-800 overflow-scroll scrollbar-thumb-rose-500 scrollbar-track-gray-700 scrollbar-thin">
          <Resources />
        </div>
        <div id="grid-canvas-container" className="col-start-3 bg-gray-600 flex justify-center items-center overflow-hidden">
          <div className="canvas-container" style={{ border: '1px solid black' }}>
            <canvas id="canvas" style={{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }} />
          </div>
        </div>
        <div className="col-start-4 row-start-1 flex flex-col justify-start bg-gray-800 overflow-scroll scrollbar-thumb-rose-500 scrollbar-track-gray-700 scrollbar-thin">
          <div className="m-5">
            <Toolsobject />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[352px] grid-cols-[372px_1fr] bg-gray-900">
        <div className="col-start-2 row-start-1 relative px-[10px] py-[4px] overflow-scroll scrollbar-thumb-rose-500 scrollbar-track-gray-700 scrollbar-thin bg-gray-800">
          <TimeLine />
        </div>
        <div className="col-start-1 row-start-1">
          {/* <DragDropContainer /> */}
          <ElementsPanel />
        </div>
      </div>
    </>
  );
});

export default EditorNew;


// {
//   id: "1",
//   name: "Text-1",
//   type: "text",
//   properties: {
//   text: "Hello",
//   fontSize: 30,
//   fontWeight: 400,
//   fontFamily: "Arial",
//   textColor: "#000000",
//   textalign: "left",
//   strokeSize: 0,
//   strokeColor: "#000000",
//   splittedTexts: [],
//   effect: { type: "none" },
//   },
//   placement: { x: 100, y: 100, width: 100, height: 100, rotation: 0, scaleX: 1, scaleY: 1 },
//   timeFrame: { start: 0, end: 10 },
// },
// {
//   id: "2",
//   name: "Text-2",
//   type: "text",
//   properties: {
//   text: "World",
//   fontSize: 30,
//   fontWeight: 400,
//   fontFamily: "Arial",
//   textColor: "#000000",
//   textalign: "left",
//   strokeSize: 0,
//   strokeColor: "#000000",
//   splittedTexts: [],
//   effect: { type: "none" },
//   },
//   placement: { x: 200, y: 200, width: 100, height: 100, rotation: 0, scaleX: 1, scaleY: 1 },
//   timeFrame: { start: 0, end: 10 },
// },

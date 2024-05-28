import React from "react";
import { EditorElement } from "@/types";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import DragableView from "./DragableView";

export const TimeFrameView = observer((props: { element: EditorElement }) => {
  const store = React.useContext(StoreContext);
  const { element } = props;
  const disabled = element.type === "audio";
  const isSelected = store.selectedElement?.id === element.id;
  const bgColorOnSelected = isSelected ? "bg-rose-800" : "bg-rose-500";
  const disabledCursor = disabled ? "cursor-no-drop" : "cursor-ew-resize";
  const showDisabledCursor = isSelected ? "" : "hidden";

  const handleStartTimeChange = (value: number) => {
    const newStartTime = Math.min(value, element.timeFrame.end);
    store.updateEditorElementTimeFrame(element, {
      start: newStartTime,
    });
  };

  const handleEndTimeChange = (value: number) => {
    const newEndTime = Math.max(value, element.timeFrame.start);
    store.updateEditorElementTimeFrame(element, {
      end: newEndTime,
    });
  };

  return (
    <div
      onClick={() => {
        store.setSelectedElement(element);
      }}
      key={element.id}
      className={`relative width-full h-[50px] my-2 ${
        isSelected ? "border-2 border-indigo-600 bg-gray-800" : ""
      }`}
    >
      <DragableView
        className="z-10"
        value={element.timeFrame.start}
        total={store.maxTime}
        disabled={disabled}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            start: value,
          });
        }}
      >
        <div
          className={`bg-white border-2 border-rose-400 w-[10px] h-[50px] mt-[calc(25px)] translate-y-[-50%] transform translate-x-[-50%] ${disabledCursor} ${showDisabledCursor}`}
        ></div>
      </DragableView>

      <DragableView
        className={disabled ? "cursor-no-drop" : "cursor-col-resize"}
        value={element.timeFrame.start}
        disabled={disabled}
        style={{
          width: `${
            ((element.timeFrame.end - element.timeFrame.start) /
              store.maxTime) *
            100
          }%`,
        }}
        total={store.maxTime}
        onChange={(value) => {
          const { start, end } = element.timeFrame;
          store.updateEditorElementTimeFrame(element, {
            start: value,
            end: value + (end - start),
          });
        }}
      >
        <div
          className={`${bgColorOnSelected} h-full w-full text-white text-xl min-w-[0px] px-2 leading-[25px] font-semibold`}
        >
          {element.name}
        </div>
      </DragableView>

      <DragableView
        className="z-10"
        disabled={disabled}
        value={element.timeFrame.end}
        total={store.maxTime}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            end: value,
          });
        }}
      >
        <div
          className={` bg-white border-2 border-rose-400 w-[10px] h-[50px] mt-[calc(25px)] translate-y-[-50%] transform translate-x-[-50%] ${disabledCursor} ${showDisabledCursor}`}
        ></div>
      </DragableView>
    </div>
  );
});

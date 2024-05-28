// FillPanel.js
'use client';
import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from "@/store";
import { FillResource } from "../entity/FilterResource";
import { isEditorImageElement, isEditorVideoElement } from "@/store/Store";
// import { FillPanelProps } from '../../types';
import { VideoEditorElement, ImageEditorElement, EffecType } from "@/types";

export const FillPanel = observer(() => {
  const store = React.useContext(StoreContext);
  const selectedElement = store.selectedElement;

  return (
    <div className="bg-gray-700 rounded-lg shadow-md w-full mr-5 p-5">
      <div className="text-2xl font-semibold text-white m-2 font-semibold">Filters</div>
      {selectedElement && (isEditorImageElement(selectedElement) ||
        isEditorVideoElement(selectedElement)) ? (
        <FillResource editorElement={selectedElement} />
      ) : (
        <div className="text-gray-500 italic">No selected element</div>
      )}
    </div>


  );
});

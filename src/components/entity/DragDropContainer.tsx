// DragDropContainer.tsx
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { EditorElement } from "@/types";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "./Element";

const DragDropContainer: React.FC = observer(() => {
  const store = React.useContext(StoreContext);

  const onDragEnd = (result:any) => {
    if (!result.destination) {
      return;
    }

    const reorderedElements = Array.from(store.elements);
    const [removed] = reorderedElements.splice(result.source.index, 1);
    reorderedElements.splice(result.destination.index, 0, removed);

    store.setElements(reorderedElements as EditorElement[]);
  };

  return (
    <>
    <h1>gg</h1>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="drag-drop-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {store?.elements?.map((element: EditorElement, index: number) => (
              <Draggable key={element.id} draggableId={element.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.5 : 1,
                    }}
                  >
                    <Element element={element} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </>
  );
});

export default DragDropContainer;

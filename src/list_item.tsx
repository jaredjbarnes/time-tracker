import React, { useRef } from "react";
import { DomDraggableListDomain } from "./dom_draggable_list_domain";
import { DraggableItem } from "./draggable_item";
import { useAsyncValue } from "./hex/hooks/use_async_value";
import { useAsyncValueEffect } from "./hex/hooks/use_async_value_effect";

export interface ListProps {
  draggableListDomain: DomDraggableListDomain;
  item: DraggableItem;
  children: React.ReactNode;
}

export function ListItem({ draggableListDomain, item, children }: ListProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useAsyncValue(item.isDraggingBroadcast);

  useAsyncValueEffect((position) => {
    const element = rootRef.current;

    if (element != null) {
      element.style.position = "absolute";
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, item.positionBroadcast);

  useAsyncValueEffect((height) => {
    const element = rootRef.current;

    if (element != null) {
      element.style.height = `${height}px`;
    }
  }, item.heightBroadcast);

  function startDrag(event: React.MouseEvent) {
    draggableListDomain.startDrag(event.nativeEvent, item);
  }

  const style: React.CSSProperties = {
    position: "absolute",
    width: "330px",
    top: "0px",
    left: "0px",
    backgroundColor: "#f0eff3",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: item.zIndex,
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  return (
    <div ref={rootRef} onMouseDown={startDrag} style={style}>
      {children}
    </div>
  );
}

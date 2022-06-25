import React from "react";
import { DomDraggableListDomain } from "./dom_draggable_list_domain";
import { useAsyncValue } from "./hex/hooks/use_async_value";
import { ListItem } from "./list_item";

export interface ListProps {
  draggableListDomain: DomDraggableListDomain;
}

export function List({ draggableListDomain }: ListProps) {
  const items = useAsyncValue(draggableListDomain.itemsBroadcast);

  const style: React.CSSProperties = {
    position: "absolute",
    right: 0,
    top: 0,
    width: "380px",
    height: "100%",
    overflowY: "visible",
    overflowX: "visible",
  };

  const contentStyle: React.CSSProperties = {
    height: `${
      draggableListDomain.activeItemHeight +
      (items.length - 1) * draggableListDomain.itemHeight +
      2 * draggableListDomain.itemMargin
    }px`,
    overflow: "visible",
  };

  return (
    <div ref={draggableListDomain.setContainerElement} style={style}>
      <div style={contentStyle}>
        {items.map((item, index) => {
          return (
            <ListItem
              key={index}
              draggableListDomain={draggableListDomain}
              item={item}
            >
              {draggableListDomain.renderItem(item, index)}
            </ListItem>
          );
        })}
      </div>
    </div>
  );
}

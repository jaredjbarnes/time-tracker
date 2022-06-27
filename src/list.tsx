import React from "react";
import { DomDraggableListDomain } from "./dom_draggable_list_domain";
import { useAsyncValue } from "./hex/hooks/use_async_value";
import { ListItem } from "./list_item";

export interface ListProps {
  draggableListDomain: DomDraggableListDomain;
  style?: React.CSSProperties;
}

export function List({
  draggableListDomain,
  style: customStyle = {},
}: ListProps) {
  const items = useAsyncValue(draggableListDomain.itemsBroadcast);
  const height = `${
    draggableListDomain.activeItemHeight +
    (items.length - 1) * draggableListDomain.itemHeight +
    2 * draggableListDomain.itemMargin +
    draggableListDomain.itemMargin * items.length
  }px`;

  const style: React.CSSProperties = {
    overflowY: "scroll",
    overflowX: "hidden",
    textAlign: "right",
  };

  const placementStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
    height,
    width: "380px",
    overflow: "visible",
  };

  const contentStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height,
    overflow: "visible",
    textAlign: "left",
  };

  return (
    <div
      ref={draggableListDomain.setContainerElement}
      style={{ ...customStyle, ...style }}
    >
      <div style={placementStyle}>
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
    </div>
  );
}

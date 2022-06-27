import React from "react";
import { DraggableItem } from "./draggable_item";
import { DraggableListDomain } from "./draggable_list_domain";

export class DomDraggableListDomain<T = any> extends DraggableListDomain<T> {
  private containerElement: HTMLElement | null = null;
  private draggingItem: DraggableItem | null = null;
  private containerRect: DOMRect | null = null;
  private offsetX = 0;
  private offsetY = 0;
  private stackCount = 0;

  renderItem: (item: DraggableItem<T>, index: number) => React.ReactNode;

  constructor(
    itemHeight: number,
    itemMargin: number,
    renderItem: (item: DraggableItem<T>, index: number) => React.ReactNode
  ) {
    super(itemHeight, itemMargin);
    this.renderItem = renderItem;
  }

  startDrag(event: PointerEvent, item: DraggableItem) {
    if (this.containerElement == null) {
      return;
    }

    this.containerRect = this.containerElement.getBoundingClientRect();
    this.draggingItem = item;

    const x = event.clientX - this.containerRect.x;
    const y = event.clientY - this.containerRect.y;
    this.offsetX = item.position.x - x;
    this.offsetY = item.position.y - y;

    this.stackCount++;

    item.startDrag(this.stackCount + this._items.getValue().length);

    document.documentElement.addEventListener("pointermove", this.drag);
    document.documentElement.addEventListener("pointerleave", this.endDrag);
    document.documentElement.addEventListener("pointerup", this.endDrag);

    event.preventDefault();
    event.stopPropagation();
  }

  private drag = (event: PointerEvent) => {
    if (
      this.containerElement == null ||
      this.draggingItem == null ||
      this.containerRect == null
    ) {
      return;
    }

    const x = event.clientX - this.containerRect.x;
    const y = event.clientY - this.containerRect.y;

    this.draggingItem.drag(x + this.offsetX, y + this.offsetY);

    event.preventDefault();
    event.stopPropagation();
  };

  private endDrag = (event: PointerEvent) => {
    if (this.containerRect != null && this.draggingItem != null) {
      const x = event.clientX - this.containerRect.x;
      const y = event.clientY - this.containerRect.y;
      this.draggingItem.endDrag(x + this.offsetX, y + this.offsetY);
    }

    this.draggingItem = null;
    this.containerRect = null;

    document.documentElement.removeEventListener("pointermove", this.drag);
    document.documentElement.removeEventListener("pointerleave", this.endDrag);
    document.documentElement.removeEventListener("pointerup", this.endDrag);

    event.preventDefault();
    event.stopPropagation();
  };

  setContainerElement = (element: HTMLElement | null) => {
    this.containerElement = element;
  };
}

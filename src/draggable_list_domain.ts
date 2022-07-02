import { DraggableItem } from "./draggable_item";
import ObservableValue, {
  ReadonlyObservableValue,
} from "./hex/observable_value";

const ACTIVE_TIME_HEIGHT = 250;

export class DraggableListDomain<T> {
  protected _items = new ObservableValue<DraggableItem<T>[]>([]);
  protected _selectedItem = new ObservableValue<DraggableItem<T> | null>(null);
  protected _itemMargin: number = 0;
  protected _itemHeight: number = 0;

  get size() {
    return this._items.getValue().length;
  }

  get itemsBroadcast(): ReadonlyObservableValue<DraggableItem<T>[]> {
    return this._items;
  }

  get selectedItemBroadcast(): ReadonlyObservableValue<DraggableItem<T> | null> {
    return this._selectedItem;
  }

  get itemMargin() {
    return this._itemMargin;
  }

  get itemHeight() {
    return this._itemHeight;
  }

  get activeItemHeight() {
    return ACTIVE_TIME_HEIGHT;
  }

  constructor(itemHeight: number, itemMargin: number) {
    this._itemHeight = itemHeight;
    this._itemMargin = itemMargin;
  }

  addItem(item: DraggableItem<T>) {
    this._items.transformValue((items) => {
      const index = items.indexOf(item);

      if (index === -1) {
        items.push(item);
        item.onRemove(() => {
          this.removeItem(item);
        });
        item.onDrag(() => {
          this.settleItemIntoPlace(item);
        });
        item.onDragEnd(() => {
          this.settleItemIntoPlace(item);
        });
        item.resize(items.length === 1 ? ACTIVE_TIME_HEIGHT : this._itemHeight);
      }
      return items;
    });

    this.placeItems();
  }

  private settleItemIntoPlace(item: DraggableItem<T>) {
    let index: number;

    if (item.position.y < ACTIVE_TIME_HEIGHT + this._itemMargin) {
      index = 0;
    } else {
      index =
        Math.floor(
          (item.position.y - ACTIVE_TIME_HEIGHT + this._itemMargin) /
            (this._itemHeight + this._itemMargin)
        ) + 1;
    }

    const items = this._items.getValue();
    const oldIndex = items.indexOf(item);

    index = Math.max(Math.min(index, items.length - 1), 0);

    this._items.transformValue((items) => {
      items.splice(oldIndex, 1);
      items.splice(index, 0, item);
      return items;
    });

    this.placeItems();
  }

  private placeItems() {
    const items = this._items.getValue();

    items.forEach((item, index) => {
      const yOffset =
        index === 0
          ? 0
          : (index - 1) * (this._itemHeight + this._itemMargin) +
            ACTIVE_TIME_HEIGHT +
            this._itemMargin;
      const x = 10;
      const y = yOffset + this._itemMargin;

      item.place(x, y, 1000);

      if (index === 0) {
        item.resize(ACTIVE_TIME_HEIGHT);
      } else {
        item.resize(this._itemHeight);
      }

      if (!item.isDragging && index === 0) {
        item.zIndex = items.length;
      } else if (!item.isDragging) {
        item.zIndex = 0;
      }
    });
  }

  removeItem(item: DraggableItem<T>) {
    this._items.transformValue((items) => {
      const index = items.indexOf(item);

      if (index === -1) {
        items.splice(index, 1);
      }

      return items;
    });
  }

  sort(method: (item: DraggableItem<T>) => number) {
    this._items.transformValue((items) => {
      items.sort(method);
      return items;
    });

    this.placeItems();
  }
}

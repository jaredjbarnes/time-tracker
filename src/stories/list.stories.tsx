import React, { useState } from "react";
import { DomDraggableListDomain } from "../dom_draggable_list_domain";
import { DraggableItem } from "../draggable_item";
import ObservableValue from "../hex/observable_value";
import { List } from "../list";
import { Task } from "../task";
import { TaskDomain } from "../task_domain";

export default {
  title: "List",
  component: List,
};

export function Baseline() {
  const [draggableListDomain] = useState(() => {
    const domain = new DomDraggableListDomain<TaskDomain>(
      75,
      10,
      (item, index) => {
        return (
          <Task
            style={{ width: "100%", height: "100%" }}
            taskDomain={item.value}
            index={index}
          />
        );
      }
    );

    for (let x = 0; x < 10; x++) {
      const taskDomain = new TaskDomain(
        new ObservableValue("My Task Name"),
        new ObservableValue([0, 0, 0])
      );
      const item = new DraggableItem<TaskDomain>(taskDomain, 75);
      taskDomain.isActiveBroadcast.onChange((isActive) => {
        if (isActive) {
          const items = domain.itemsBroadcast.getValue();

          for (let i = 0; i < items.length; i++) {
            if (items[i] !== item) {
              items[i].value.deactivate();
            }
          }

          domain.sort((item) => {
            if (item.value.isActive) {
              return -1;
            } else {
              return 0;
            }
          });
        }
      });

      if (x === 0) {
        item.value.activate();
        item.value.playButton.play();
      }

      domain.addItem(item);
    }

    return domain;
  });

  return (
    <List
      draggableListDomain={draggableListDomain}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

import React, { useState } from "react";
import "./App.css";
import { DomDraggableListDomain } from "./dom_draggable_list_domain";
import { List } from "./list";
import { DraggableItem } from "./draggable_item";
import { TaskDomain } from "./task_domain";
import { Task } from "./task";
import ObservableValue from "./hex/observable_value";

function App() {
  const [draggableListDomain] = useState(() => {
    const domain = new DomDraggableListDomain(75, 10, (item, index) => {
      return (
        <Task
          style={{ width: "100%", height: "100%" }}
          taskDomain={item.value}
          index={index}
        />
      );
    });

    for (let x = 0; x < 10; x++) {
      const item = new DraggableItem<TaskDomain>(
        new TaskDomain(
          new ObservableValue("My Task Name"),
          new ObservableValue([0, 0, 0]),
        ),
        75
      );
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

export default App;

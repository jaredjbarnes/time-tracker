import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DomDraggableListDomain } from "./dom_draggable_list_domain";
import { List } from "./list";
import { DraggableItem } from "./draggable_item";

function App() {
  const [draggableListDomain] = useState(() => {
    const domain = new DomDraggableListDomain(100, 10, () => {
      return <div></div>;
    });

    for (let x = 0; x < 10; x++) {
      const item = new DraggableItem<void>(undefined);
      domain.addItem(item);
    }

    return domain;
  });

  return <List draggableListDomain={draggableListDomain} />;
}

export default App;

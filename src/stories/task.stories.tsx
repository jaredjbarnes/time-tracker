import React, { useState } from "react";
import { DraggableItem } from "../draggable_item";
import ObservableValue from "../hex/observable_value";
import { Task } from "../task";
import { TaskDomain } from "../task_domain";
import { TaskLabel } from "../task_label";
import { TaskTime } from "../task_time";
import { TaskTimeDetail } from "../task_time_detail";

export default {
  title: "Task",
  component: TaskLabel,
};

export function LabelExample() {
  const [name] = useState(() => new ObservableValue("My Task Name"));
  return <TaskLabel name={name} />;
}

export function TaskTimeDetailExample() {
  return <TaskTimeDetail value={9} label="HOURS" />;
}

export function TaskTimeExample() {
  const [taskDomain] = useState(
    () =>
      new TaskDomain(
        new ObservableValue("My Task Name"),
        new ObservableValue([0, 0, 0])
      )
  );
  return <TaskTime taskDomain={taskDomain} />;
}

export function TaskExample() {
  const [taskDomain] = useState(
    () =>
      new TaskDomain(
        new ObservableValue("My Task Name"),
        new ObservableValue([0, 0, 0])
      )
  );

  const taskStyle = {
    width: "320px",
    height: "250px",
  };

  function activate() {
    taskDomain.activate();
  }

  function deactivate() {
    taskDomain.deactivate();
  }

  return (
    <div>
      <Task style={taskStyle} taskDomain={taskDomain} index={0} />
      <button onClick={activate}>Activate</button>
      <button onClick={deactivate}>Deactivate</button>
    </div>
  );
}

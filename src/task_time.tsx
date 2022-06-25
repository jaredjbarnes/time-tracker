import React from "react";
import { TaskTimeDetail } from "./task_time_detail";
import { TaskTimeDetailColon } from "./task_time_detail_colon";

export interface TaskTimeProps {
  style?: React.CSSProperties;
}

export const TaskTime = React.forwardRef<HTMLDivElement, TaskTimeProps>(
  function TaskTime({ style: customStyle = {} }: TaskTimeProps, ref) {
    const style = {
      width: "323px",
      height: "60px",
    };

    return (
      <div ref={ref} style={{ ...customStyle, ...style }}>
        <TaskTimeDetail value={0} label="hours" />
        <TaskTimeDetailColon />
        <TaskTimeDetail value={10} label="minutes" />
        <TaskTimeDetailColon />
        <TaskTimeDetail value={32} label="seconds" />
      </div>
    );
  }
);

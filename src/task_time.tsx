import React from "react";
import { useAsyncValue } from "./hex/hooks/use_async_value";
import { TaskDomain } from "./task_domain";
import { TaskTimeDetail } from "./task_time_detail";
import { TaskTimeDetailColon } from "./task_time_detail_colon";

export interface TaskTimeProps {
  style?: React.CSSProperties;
  taskDomain: TaskDomain;
}

export const TaskTime = React.forwardRef<HTMLDivElement, TaskTimeProps>(
  function TaskTime({ style: customStyle = {}, taskDomain }: TaskTimeProps, ref) {
    const isSmall = !useAsyncValue(taskDomain.isActiveBroadcast);
    
    const style = {
      width: "323px",
      height: "60px",
    };

    return (
      <div ref={ref} style={{ ...customStyle, ...style }}>
        <TaskTimeDetail value={0} label="hours" isSmall={isSmall} />
        <TaskTimeDetailColon />
        <TaskTimeDetail value={10} label="minutes" isSmall={isSmall} />
        <TaskTimeDetailColon />
        <TaskTimeDetail value={32} label="seconds" isSmall={isSmall} />
      </div>
    );
  }
);

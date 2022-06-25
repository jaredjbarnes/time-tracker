import React from "react";
import { useAsyncValue } from "./hex/hooks/use_async_value";
import { ReadonlyObservableValue } from "./hex/observable_value";

export interface TaskLabelProps {
  name: ReadonlyObservableValue<string>;
  style?: React.CSSProperties;
}

export const TaskLabel = React.forwardRef<HTMLDivElement, TaskLabelProps>(
  function TaskLabel({ name, style: customStyle }: TaskLabelProps, ref) {
    const currentName = useAsyncValue(name);
    const style: React.CSSProperties = {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color: "#027afe",
      fontFamily: "Helvetica",
      fontSize: "25px",
      fontWeight: "100",
      padding: "0px",
      margin: "0px",
      userSelect: "none",
      height: "30px",
      width: "290px",
    };

    return (
      <div ref={ref} style={{ ...customStyle, ...style }}>
        {currentName}
      </div>
    );
  }
);

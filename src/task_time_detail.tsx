import React from "react";

export interface TaskTimeDetailProps {
  value: number;
  label: string;
  isSmall?: boolean;
}

export function TaskTimeDetail({
  value,
  label,
  isSmall = false,
}: TaskTimeDetailProps) {
  const style: React.CSSProperties = {
    display: "inline-grid",
    gridTemplateRows: "auto 1fr",
    justifyItems: "center",
    alignItems: "center",
    height: "60px",
    width: "100px",
    fontSize: "40px",
    fontFamily: "Helvetica",
    color: "black",
    opacity: 0.5,
    userSelect: "none",
    transition: "width 1s easeInOut",
  };

  const labelStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontSize: "8px",
    letterSpacing: "2px",
  };

  if (isSmall) {
    style.width = "50px";
  }

  return (
    <div style={style}>
      <div>{String(value).padStart(2, "0")}</div>
      <div style={labelStyle}>{label}</div>
    </div>
  );
}

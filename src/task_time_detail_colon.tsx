import React from "react";

export function TaskTimeDetailColon() {
  const style: React.CSSProperties = {
    display: "inline-grid",
    gridTemplateRows: "auto 1fr",
    justifyItems: "center",
    alignItems: "center",
    height: "60px",
    fontSize: "40px",
    fontFamily: "Helvetica",
    color: "black",
    opacity: 0.25,
    userSelect: "none",
  };

  const labelStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontSize: "8px",
    letterSpacing: "2px",
  };

  return (
    <div style={style}>
      <div>:</div>
      <div style={labelStyle}> </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import { useAsyncValueEffect } from "./hex/hooks/use_async_value_effect";
import { PlayButton } from "./play_button";
import { TaskDomain } from "./task_domain";
import { TaskLabel } from "./task_label";
import { TaskTime } from "./task_time";

export interface TaskProps {
  taskDomain: TaskDomain;
  style?: React.CSSProperties;
  index?: number;
}

export function Task({ taskDomain, style: customStyle, index }: TaskProps) {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useAsyncValueEffect((position) => {
    const element = labelRef.current;

    if (element != null && element.firstElementChild != null) {
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
      (
        element.firstElementChild as HTMLDivElement
      ).style.transform = `scale(${position.scale})`;
    }
  }, taskDomain.titlePositionBroadcast);

  useAsyncValueEffect((position) => {
    const element = timeRef.current;

    if (element != null) {
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
      (
        element.firstElementChild as HTMLDivElement
      ).style.transform = `scale(${position.scale})`;
    }
  }, taskDomain.timePositionBroadcast);

  useAsyncValueEffect((style) => {
    const element = panelRef.current;

    if (element != null) {
      element.style.transform = `translate(${style.x}px, ${style.y}px)`;
      element.style.opacity = String(style.opacity);
      (
        element.firstElementChild as HTMLDivElement
      ).style.transform = `scale(${style.scale})`;
    }
  }, taskDomain.panelPositionBroadcast);

  useAsyncValueEffect((style) => {
    const element = buttonRef.current;

    if (element != null) {
      element.style.transform = `translate(${style.x}px, ${style.y}px)`;
    }
  }, taskDomain.buttonPositionBroadcast);

  useEffect(() => {
    if (index === 0) {
      taskDomain.activate();
    } else {
      taskDomain.deactivate();
    }
  }, [index, taskDomain]);

  const defaultStyle: React.CSSProperties = {
    position: "absolute",
    top: "0px",
    left: "0px",
    transformOrigin: "0 0",
  };

  const style: React.CSSProperties = {
    position: "relative",
    backgroundColor: "#f0eff3",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.25)",
  };

  const panelStyle: React.CSSProperties = {
    position: "absolute",
    top: "80px",
    left: "0px",
    transformOrigin: "center center",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 18px rgba(0,0,0,0.25) ",
    width: "370px",
    height: "140px",
  };

  return (
    <div style={{ ...customStyle, ...style }}>
      <div ref={labelRef} style={defaultStyle}>
        <TaskLabel style={defaultStyle} name={taskDomain.name} />
      </div>
      <div ref={panelRef} style={defaultStyle}>
        <div style={panelStyle}></div>
      </div>
      <div ref={timeRef} style={defaultStyle}>
        <TaskTime style={defaultStyle} />
      </div>
      <PlayButton
        ref={buttonRef}
        style={defaultStyle}
        playButtonDomain={taskDomain.playButton}
      />
    </div>
  );
}

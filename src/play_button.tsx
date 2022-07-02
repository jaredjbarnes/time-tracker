import React, { useRef } from "react";
import { useAsyncValueEffect } from "./hex/hooks/use_async_value_effect";
import { PlayButtonDomain } from "./play_button_domain";
import { BiPause, BiPlay } from "react-icons/bi";
import { useAsyncValue } from "./hex/hooks/use_async_value";

export interface PlayButtonProps {
  playButtonDomain: PlayButtonDomain;
  style?: React.CSSProperties;
}

export const PlayButton = React.forwardRef<HTMLDivElement, PlayButtonProps>(
  function PlayButton(
    { playButtonDomain, style: customStyle = {} }: PlayButtonProps,
    ref
  ) {
    const isActive = useAsyncValue(playButtonDomain.isActive);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const playRef = useRef<HTMLDivElement | null>(null);
    const pauseRef = useRef<HTMLDivElement | null>(null);

    useAsyncValueEffect((scale) => {
      const element = rootRef.current;
      if (element != null) {
        element.style.transform = `scale(${scale})`;
      }
    }, playButtonDomain.containerScale);

    useAsyncValueEffect((iconStyles) => {
      const playElement = playRef.current;
      const pauseElement = pauseRef.current;

      if (playElement != null && pauseElement != null) {
        playElement.style.transform = `rotateZ(${iconStyles.rotate.play}deg)`;
        playElement.style.opacity = `${iconStyles.opacity.play}`;
        pauseElement.style.transform = `rotateZ(${iconStyles.rotate.pause}deg)`;
        pauseElement.style.opacity = `${iconStyles.opacity.pause}`;
      }
    }, playButtonDomain.iconStyles);

    const style: React.CSSProperties = {
      display: "grid",
      borderRadius: "50%",
      height: "50px",
      width: "50px",
      color: "rgba(255,255,255,1)",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.25)",
      backgroundColor: "rgba(2, 122, 254, 1)",
      cursor: "pointer",
      boxSizing: "border-box",
      border: "1px solid rgba(2, 122, 254, 1)",
      placeItems: "center center",
      transition:
        "background 1s easeInOut, color 1s easeInOut",
    };

    const iconContainerStyles: React.CSSProperties = {
      position: "relative",
      height: "24px",
      width: "24px",
    };

    const iconStyles: React.CSSProperties = {
      position: "absolute",
      top: "0",
      left: "0",
    };

    function press(event: React.MouseEvent) {
      playButtonDomain.press();
      event.stopPropagation();
      event.preventDefault();
    }

    function release(event: React.MouseEvent) {
      playButtonDomain.release();
    }

    function cancel(event: React.MouseEvent) {
      playButtonDomain.cancel();
    }

    if (!isActive) {
      style.color = "rgba(2, 122, 254, 1)";
      style.backgroundColor = "rgba(2, 122, 254, 0)";
    }

    return (
      <div ref={ref} style={customStyle}>
        <div
          ref={rootRef}
          onPointerDown={press}
          onPointerUp={release}
          onPointerLeave={cancel}
          style={style}
        >
          <div style={iconContainerStyles}>
            <div ref={playRef} style={iconStyles}>
              <BiPlay fontSize={24} />
            </div>
            <div ref={pauseRef} style={iconStyles}>
              <BiPause fontSize={24} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

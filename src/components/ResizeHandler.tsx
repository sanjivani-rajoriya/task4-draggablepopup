import React from "react";

interface Props {
  direction: "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";
  onMouseDown: (e: React.MouseEvent) => void;
}

export default function ResizeHandle({ direction, onMouseDown }: Props) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute ${getPos(direction)} bg-transparent`}
      style={{
        width: ["n", "s"].includes(direction) ? "100%" : "10px",
        height: ["e", "w"].includes(direction) ? "100%" : "10px",
        cursor: `${direction}-resize`
      }}
    />
  );
}

function getPos(dir: string) {
  switch (dir) {
    case "nw":
      return "top-0 left-0";
    case "ne":
      return "top-0 right-0";
    case "sw":
      return "bottom-0 left-0";
    case "se":
      return "bottom-0 right-0";
    case "n":
      return "top-0 left-0";
    case "s":
      return "bottom-0 left-0";
    case "e":
      return "top-0 right-0";
    case "w":
      return "top-0 left-0";
    default:
      return "";
  }
}

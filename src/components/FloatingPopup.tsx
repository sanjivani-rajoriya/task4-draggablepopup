import { usePopupState } from "../hooks/usePopupState";
import { useRef } from "react";
import ResizeHandle from "./ResizeHandler";

interface Props {
  onMinimize: () => void;
}

export default function FloatingPopup({ onMinimize }: Props) {
  const [state, setState] = usePopupState();
  const dragRef = useRef<HTMLDivElement | null>(null);

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const { x, y } = state;

    const onMove = (moveEvent: MouseEvent) => {
      setState((s) => ({
        ...s,
        x: x + (moveEvent.clientX - startX),
        y: y + (moveEvent.clientY - startY)
      }));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const startResize = (dir: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const { x, y, width, height } = state;

    const onMove = (moveEvent: MouseEvent) => {
      let newX = x,
        newY = y,
        newW = width,
        newH = height;

      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (dir.includes("e")) newW = width + dx;
      if (dir.includes("s")) newH = height + dy;
      if (dir.includes("w")) {
        newX = x + dx;
        newW = width - dx;
      }
      if (dir.includes("n")) {
        newY = y + dy;
        newH = height - dy;
      }

      setState({ x: newX, y: newY, width: newW, height: newH });
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      role="dialog"
      aria-label="Floating window"
      className="absolute border border-gray-400 rounded-md shadow-md"
      style={{
        top: state.y,
        left: state.x,
        width: state.width,
        height: state.height,
        background: "var(--popup-bg)"
      }}
    >
      {/* Title Bar */}
      <div
        ref={dragRef}
        onMouseDown={startDrag}
        tabIndex={0}
        className="cursor-move bg-blue-600 text-white p-2 flex justify-between"
      >
        <span>Floating Popup</span>
        <button
          onClick={onMinimize}
          className="bg-blue-800 px-2 rounded hover:bg-blue-700"
        >
          _
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-sm">This is the popup content.</div>

      {/* Resize Handles */}
      {["nw", "ne", "sw", "se", "n", "s", "e", "w"].map((d) => (
        <ResizeHandle key={d} direction={d as any} onMouseDown={startResize(d)} />
      ))}
    </div>
  );
}

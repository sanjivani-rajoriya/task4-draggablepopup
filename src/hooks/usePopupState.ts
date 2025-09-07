import { useEffect, useState } from "react";

export interface PopupState {
  x: number;
  y: number;
  width: number;
  height: number;
}

const STORAGE_KEY = "popup-state";

export function usePopupState() {
  const [state, setState] = useState<PopupState>({
    x: 100,
    y: 100,
    width: 300,
    height: 200
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}

"use client";

import FloatingPopup from "../components/FloatingPopup";
import Toolbar from "../components/Toolbar";
import { useState } from "react";

export default function Page() {
  const [minimized, setMinimized] = useState(false);

  return (
    <main className="h-screen w-screen bg-gray-100">
      {!minimized && <FloatingPopup onMinimize={() => setMinimized(true)} />}
      <Toolbar minimized={minimized} onRestore={() => setMinimized(false)} />
    </main>
  );
}

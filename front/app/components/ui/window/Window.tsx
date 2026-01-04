"use client";

import { useState } from "react";
import WindowButtons from "./WindowButtons";

export default function Window({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    onClose();
  };

  const handleMinimize = () => {
    setIsHidden(!isHidden);
  };

  if (isClosed || isHidden) {
    return null;
  }

  return (
    <div className="w-full h-full bg-gray-800 p-2 rounded-lg">
      <div className="mb-4 grid grid-cols-3">
        <div>
          <WindowButtons onClose={handleClose} onMinimize={handleMinimize} />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
        </div>
      </div>
      {children}
    </div>
  );
}
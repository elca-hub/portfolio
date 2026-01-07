"use client";

import { useState } from "react";
import WindowButtons from "./WindowButtons";
import { motion } from "framer-motion";

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
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    onClose();
  };

  const handleMinimize = () => {
    setIsHidden(!isHidden);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  }

  if (isClosed) {
    return null;
  }

  return (
    <div className={`bg-gray-200 dark:bg-gray-800 p-2 rounded-lg ${isMaximized ? "absolute inset-0" : "w-full h-full"}`}>
      <div className="mb-4 grid grid-cols-3">
        <div>
          <WindowButtons
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isEnabledMinimize={!isMaximized}
            isEnabledMaximize={!isHidden}
          />
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-black dark:text-white text-2xl font-bold">{title}</h1>
        </div>
      </div>
      <motion.div
        initial={isHidden ? "hidden" : "visible"}
        animate={isHidden ? "hidden" : "visible"}
        exit="hidden"
        variants={{
          hidden: { height: 0, opacity: 0, y: -10 },
          visible: { height: "auto", opacity: 1, y: 0 },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
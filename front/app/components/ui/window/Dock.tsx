"use client";

import { IconType } from "react-icons";

export interface DockItem {
  icon: IconType;
  label?: string;
  onClick?: () => void;
}

interface DockProps {
  items: DockItem[];
  className?: string;
}

export default function Dock({ items, className = "" }: DockProps) {
  return (
    <div
      className={`inline-flex items-end gap-2 px-4 py-3 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg ${className}`}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={item.onClick}
            className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-150 hover:z-10"
            aria-label={item.label || `Dock item ${index + 1}`}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group-hover:bg-white/10">
              <Icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
            </div>
          </button>
        );
      })}
    </div>
  );
}


import { Button } from "react-aria-components";
import { MdClose, MdOutlineCloseFullscreen, MdZoomOutMap, MdZoomInMap } from "react-icons/md";
import { useState } from "react";

export default function WindowButtons({
  onClose,
  onMinimize,
  onMaximize
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}) {
  const buttonComponentStyle = "rounded-full border-none cursor-pointer size-6 p-1 hover:scale-90 transition-all duration-300";
  const buttonIconStyle = "text-gray-600 w-full h-full";


  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize();
  }


  return (
    <div className="inline-flex justify-start items-center gap-3 bg-gray-300 dark:bg-gray-600 p-2 rounded-full">
      <Button
        className={`bg-red-400 ${buttonComponentStyle}`}
        onPress={onClose}
      >
        <MdClose className={buttonIconStyle} />
      </Button>
      <Button
        className={`bg-yellow-400 ${buttonComponentStyle}`}
        onPress={onMinimize}
      >
        <MdOutlineCloseFullscreen className={buttonIconStyle} />
      </Button>
      <Button
        className={`bg-green-600 ${buttonComponentStyle}`}
        onPress={handleMaximize}
      >
        {isMaximized ? <MdZoomInMap className={buttonIconStyle} /> : <MdZoomOutMap className={buttonIconStyle} />}
      </Button>
    </div>
  )
}

import { Button } from "react-aria-components";
import { MdClose, MdOutlineCloseFullscreen, MdZoomOutMap } from "react-icons/md";

export default function WindowButtons({
  onClose,
  onMinimize,
}: {
  onClose: () => void;
  onMinimize: () => void;
}) {
  const buttonComponentStyle = "rounded-full border-none cursor-pointer size-6 p-1 hover:scale-90 transition-all duration-300";
  const buttonIconStyle = "text-gray-600 w-full h-full";

  return (
    <div className="inline-flex justify-start items-center gap-3 bg-gray-600 p-2 rounded-full">
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
      <Button className={`bg-green-600 ${buttonComponentStyle}`}>
        <MdZoomOutMap className={buttonIconStyle} />
      </Button>
    </div>
  )
}

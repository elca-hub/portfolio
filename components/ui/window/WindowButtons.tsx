import { Button } from 'react-aria-components'
import { MdClose, MdOutlineCloseFullscreen, MdZoomInMap, MdZoomOutMap } from 'react-icons/md'

export default function WindowButtons({
	isEnabledMinimize,
	isEnabledMaximize,
	onClose,
	onMinimize,
	onMaximize,
}: {
	isEnabledMinimize: boolean
	isEnabledMaximize: boolean
	onClose: () => void
	onMinimize: () => void
	onMaximize: () => void
}) {
	const buttonComponentStyle = 'rounded-full border-none cursor-pointer size-6 p-1 hover:scale-90 transition-all duration-300'
	const buttonIconStyle = 'text-gray-600 w-full h-full'
	const buttonDisabledStyle = 'opacity-50 cursor-not-allowed pointer-events-none'

	return (
		<div className="inline-flex justify-start items-center gap-3 bg-gray-300 dark:bg-gray-600 p-2 rounded-full">
			<Button
				className={`bg-red-400 ${buttonComponentStyle} ${!isEnabledMinimize && buttonDisabledStyle}`}
				onPress={onClose}
				isDisabled={!isEnabledMinimize}
			>
				<MdClose className={buttonIconStyle} />
			</Button>
			<Button
				className={`bg-yellow-400 ${buttonComponentStyle} ${!isEnabledMinimize && buttonDisabledStyle}`}
				onPress={onMinimize}
				isDisabled={!isEnabledMinimize}
			>
				<MdOutlineCloseFullscreen className={buttonIconStyle} />
			</Button>
			<Button
				className={`bg-green-600 ${buttonComponentStyle} ${!isEnabledMaximize && buttonDisabledStyle}`}
				onPress={onMaximize}
				isDisabled={!isEnabledMaximize}
			>
				{isEnabledMaximize && !isEnabledMinimize ? <MdZoomInMap className={buttonIconStyle} /> : <MdZoomOutMap className={buttonIconStyle} />}
			</Button>
		</div>
	)
}

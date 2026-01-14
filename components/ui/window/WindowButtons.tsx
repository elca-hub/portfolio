'use client'

import { useEffect, useState } from 'react'
import { Button } from 'react-aria-components'
import { MdClose, MdOutlineCloseFullscreen, MdZoomInMap, MdZoomOutMap } from 'react-icons/md'

export default function WindowButtons({
	isEnabledMinimize,
	isEnabledMaximize,
	isEnabledClose,
	onClose,
	onMinimize,
	onMaximize,
}: {
	isEnabledMinimize: boolean
	isEnabledMaximize: boolean
	isEnabledClose: boolean
	onClose: () => void
	onMinimize: () => void
	onMaximize: () => void
}) {
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		if (isExpanded) {
			const collapseTimer = setTimeout(() => {
				setIsExpanded(false)
			}, 3000)

			return () => {
				clearTimeout(collapseTimer)
			}
		}
	}, [isExpanded])

	const buttonComponentStyle = `${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'} sm:pointer-events-auto scale-100 rounded-full border-none cursor-pointer size-6 p-1 hover:scale-90 transition-all duration-300`
	const buttonIconStyle = 'text-gray-600 w-full h-full'
	const buttonDisabledStyle = 'opacity-50 cursor-not-allowed pointer-events-none'

	return (
		<div
			className={`inline-flex items-center justify-start gap-3 rounded-full border border-white/10 bg-black/20 p-2 shadow-lg backdrop-blur-xl transition-transform duration-300 sm:pointer-events-none ${isExpanded && 'scale-150 sm:scale-100'}`}
			onTouchStart={() => setIsExpanded(true)}
		>
			<Button
				slot="close"
				className={`bg-red-400 ${buttonComponentStyle} ${!isEnabledClose && buttonDisabledStyle}`}
				onPress={onClose}
				isDisabled={!isEnabledClose}
				data-testid="window-close-button"
			>
				<MdClose className={buttonIconStyle} />
			</Button>
			<Button
				className={`bg-yellow-400 ${buttonComponentStyle} ${!isEnabledMinimize && buttonDisabledStyle}`}
				onPress={onMinimize}
				isDisabled={!isEnabledMinimize}
				data-testid="window-minimize-button"
			>
				<MdOutlineCloseFullscreen className={buttonIconStyle} />
			</Button>
			<Button
				className={`bg-green-600 ${buttonComponentStyle} ${!isEnabledMaximize && buttonDisabledStyle}`}
				onPress={onMaximize}
				isDisabled={!isEnabledMaximize}
				data-testid="window-maximize-button"
			>
				{isEnabledMaximize && !isEnabledMinimize ? <MdZoomInMap className={buttonIconStyle} /> : <MdZoomOutMap className={buttonIconStyle} />}
			</Button>
		</div>
	)
}

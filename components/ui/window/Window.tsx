'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import WindowButtons from './WindowButtons'

export default function Window({
	title,
	children,
	onClose,
	isMaximized = false,
	redirectUrl,
}: {
	title: string
	children: React.ReactNode
	onClose?: () => void
	isMaximized?: boolean
	redirectUrl?: string
}) {
	const router = useRouter()
	const [isHidden, setIsHidden] = useState(false)
	const [isClosed, setIsClosed] = useState(false)

	const handleClose = () => {
		setIsClosed(true)
		if (onClose) {
			onClose()
		}
	}

	const handleMinimize = () => {
		setIsHidden(!isHidden)
	}

	const handleMaximize = () => {
		if (isMaximized) {
			router.push('/')
			return
		}
		if (redirectUrl) {
			router.push(redirectUrl)
			return
		}
	}

	if (isClosed) {
		return null
	}

	return (
		<div
			className={`relative p-4 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg ${isMaximized ? 'absolute top-0 left-0 w-full h-full' : 'w-full h-full'
				}`}
		>
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
				initial={isHidden ? 'hidden' : 'visible'}
				animate={isHidden ? 'hidden' : 'visible'}
				exit="hidden"
				variants={{
					hidden: { height: 0, opacity: 0, y: -10 },
					visible: { height: 'auto', opacity: 1, y: 0 },
				}}
				transition={{
					duration: 0.3,
					ease: 'easeInOut',
				}}
				className="w-full h-full p-4 max-w-[1200px] mx-auto"
			>
				{children}
			</motion.div>
		</div>
	)
}

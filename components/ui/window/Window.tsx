'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import WindowButtons from './WindowButtons'

export default function Window({
	title,
	children,
	onClose,
	isMaximized = false,
	redirectUrl,
	onCopy,
}: {
	title: string
	children: React.ReactNode
	onClose?: () => void
	isMaximized?: boolean
	redirectUrl?: string
	onCopy?: () => void
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
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

	const handleTitleClick = async () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('window', title)
		const url = `${window.location.origin}/?${params.toString()}`

		try {
			await navigator.clipboard.writeText(url)
			if (onCopy) {
				onCopy()
			}
		} catch (error) {
			console.error('Failed to copy to clipboard:', error)
		}
	}

	if (isClosed) {
		return null
	}

	return (
		<div
			className={`relative rounded-3xl border border-white/10 bg-black/20 p-4 shadow-lg backdrop-blur-xl ${isMaximized ? 'absolute inset-0 h-full w-full overflow-y-auto' : 'h-full w-full'} `}
		>
			<div className="mb-4 grid grid-cols-2 sm:grid-cols-3">
				<div>
					<WindowButtons
						onClose={handleClose}
						onMinimize={handleMinimize}
						onMaximize={handleMaximize}
						isEnabledMinimize={!isMaximized}
						isEnabledMaximize={!isHidden}
						isEnabledClose={!isMaximized}
					/>
				</div>
				<div className="flex items-center justify-center">
					<h1
						onClick={handleTitleClick}
						className="cursor-pointer text-2xl font-bold text-white transition-opacity hover:opacity-70"
						title="クリックしてURLをコピー"
					>
						{title}
					</h1>
				</div>
			</div>
			{/* 初回表示時はアニメーションさせず、最小化・最小化解除のときだけアニメーションさせる */}
			<AnimatePresence initial={false}>
				{!isHidden && (
					<motion.div
						initial={{ height: 0, opacity: 0, y: -10 }}
						animate={{ height: 'auto', opacity: 1, y: 0 }}
						exit={{ height: 0, opacity: 0, y: -10 }}
						transition={{
							duration: 0.3,
							ease: 'easeInOut',
						}}
						className="mx-auto h-full w-full max-w-[1200px] overflow-hidden p-4"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

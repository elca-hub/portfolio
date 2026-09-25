'use client'

import { motion } from 'framer-motion'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
import WindowButtons from './WindowButtons'

export default function ModalWindow({
	title,
	children,
	isOpen = false,
	onClose,
}: {
	title: string
	children: React.ReactNode
	isOpen?: boolean
	onClose?: () => void
}) {
	return (
		<ModalOverlay isOpen={isOpen} className="absolute inset-0 z-50 flex h-screen items-center justify-center bg-black/60 backdrop-blur-sm">
			<Modal isDismissable className="w-full max-w-[90dvw] sm:min-w-[600px]">
				{/* ウインドウごと動かす。opacityは使わない（中のコンテンツがフェードして見えるため） */}
				<motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
					<Dialog className="max-h-[80svh] overflow-y-auto rounded-3xl border border-white/10 bg-black/20 p-4 shadow-lg sm:mx-0">
						<div className="mb-4 grid grid-cols-2 sm:grid-cols-3">
							<div>
								<WindowButtons
									isEnabledClose={true}
									onClose={onClose ?? (() => {})}
									onMinimize={() => {}}
									onMaximize={() => {}}
									isEnabledMinimize={false}
									isEnabledMaximize={false}
								/>
							</div>
							<div className="flex items-center justify-center">
								<Heading
									slot="title"
									className="cursor-pointer text-2xl font-bold text-white transition-opacity hover:opacity-70"
									title="クリックしてURLをコピー"
								>
									{title}
								</Heading>
							</div>
						</div>
						{children}
					</Dialog>
				</motion.div>
			</Modal>
		</ModalOverlay>
	)
}

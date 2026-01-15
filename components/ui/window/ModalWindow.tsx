'use client'

import { motion } from 'framer-motion'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
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
			<Modal isDismissable className="w-full max-w-[95dvw] sm:min-w-[600px]">
				<Dialog className="mx-4 max-h-[86dvh] overflow-y-auto rounded-3xl border border-white/10 bg-black/20 p-4 shadow-lg sm:mx-0">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 100 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
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
								<h1
									slot="title"
									className="cursor-pointer text-2xl font-bold text-white transition-opacity hover:opacity-70"
									title="クリックしてURLをコピー"
								>
									{title}
								</h1>
							</div>
						</div>
						{children}
					</motion.div>
				</Dialog>
			</Modal>
		</ModalOverlay>
	)
}

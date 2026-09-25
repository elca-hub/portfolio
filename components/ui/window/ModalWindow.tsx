'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components'
import WindowButtons from './WindowButtons'

const MotionModalOverlay = motion.create(ModalOverlay)

export default function ModalWindow({
	title,
	children,
	isOpen = false,
	onClose,
	onExited,
	isCompact = false,
}: {
	title: string
	children: React.ReactNode
	isOpen?: boolean
	onClose?: () => void
	/** フェードアウトが完了した後に呼ばれる（画面遷移などはここで行う） */
	onExited?: () => void
	/** 中身の大きさに合わせた幅にする（Apps一覧のような小さいコンテンツ向け）。スマホ幅では通常の幅のまま */
	isCompact?: boolean
}) {
	return (
		<AnimatePresence onExitComplete={onExited}>
			{isOpen && (
				/* 表示中はopacityを固定し、閉じるときだけフェードアウトさせる（表示時にフェードすると中のコンテンツが透けて見えるため） */
				<MotionModalOverlay
					isOpen
					onOpenChange={(isOpen) => {
						if (!isOpen) onClose?.()
					}}
					className="absolute inset-0 z-50 flex h-screen items-center justify-center bg-black/60 backdrop-blur-sm"
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
				>
					<Modal isDismissable className={`w-full max-w-[90dvw] ${isCompact ? 'sm:w-fit' : 'sm:min-w-[600px]'}`}>
						{/* ウインドウごと動かす */}
						<motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
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
										<Heading slot="title" className="text-2xl font-bold text-white">
											{title}
										</Heading>
									</div>
								</div>
								{children}
							</Dialog>
						</motion.div>
					</Modal>
				</MotionModalOverlay>
			)}
		</AnimatePresence>
	)
}

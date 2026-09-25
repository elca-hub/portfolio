'use client'

import ModalWindow from '@/components/ui/window/ModalWindow'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface WorkProjectPresentationProps {
	projectName: string
	readme: React.ReactNode
}

/**
 * @package
 */
export default function WorkProjectPresentation({ projectName, readme }: WorkProjectPresentationProps) {
	const router = useRouter()

	const [isOpen, setIsOpen] = useState(true)
	const handleClose = () => {
		setIsOpen(false)
	}
	// フェードアウトが終わってから前のページに戻る
	const handleExited = () => {
		router.back()
	}

	return (
		<ModalWindow title={projectName} isOpen={isOpen} onClose={handleClose} onExited={handleExited}>
			{readme}
		</ModalWindow>
	)
}

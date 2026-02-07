'use client'

import ModalWindow from '@/components/ui/window/ModalWindow'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BlogItemModalPresentationProps {
	title: string
	eyecatch: {
		url: string
	}
	content: React.ReactNode
}

/**
 * @package
 */
export default function BlogItemModalPresentation({ title, eyecatch, content }: BlogItemModalPresentationProps) {
	const router = useRouter()

	const [isOpen, setIsOpen] = useState(true)
	const handleClose = () => {
		setIsOpen(false)
		router.back()
	}

	return (
		<ModalWindow title={title} isOpen={isOpen} onClose={handleClose}>
			{content}
		</ModalWindow>
	)
}

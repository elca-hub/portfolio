'use client'

import ModalWindow from '@/components/ui/window/ModalWindow'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import ReactMarkdown from 'react-markdown'

interface WorkProjectPresentationProps {
	projectName: string
	readme: string
}

/**
 * @package
 */
export default function WorkProjectPresentation({ projectName, readme }: WorkProjectPresentationProps) {
	const title = `Works - ${projectName.toUpperCase()}`

	const body = (
		<div className="prose prose-invert max-w-none">
			<ReactMarkdown>{readme}</ReactMarkdown>
		</div>
	)

	const router = useRouter()

	const [isOpen, setIsOpen] = useState(true)
	const handleClose = () => {
		setIsOpen(false)
		router.back()
	}

	return (
		<ModalWindow title={title} isOpen={isOpen} onClose={handleClose}>
			{body}
		</ModalWindow>
	)
}

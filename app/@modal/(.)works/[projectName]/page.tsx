'use client'

import ModalWindow from '@/components/ui/window/ModalWindow'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function WorksProjectPage() {
	const { projectName } = useParams<{ projectName: string }>()

	const [content, setContent] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchMarkdown = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const res = await fetch(`/works/${projectName}/README.md`)
				if (!res.ok) {
					throw new Error(`README.md が見つかりませんでした (status: ${res.status})`)
				}
				const text = await res.text()
				setContent(text)
			} catch (err) {
				console.error(err)
				setError('コンテンツの読み込みに失敗しました。時間をおいて再度お試しください。')
			} finally {
				setIsLoading(false)
			}
		}

		fetchMarkdown()
	}, [projectName])

	const title = `Works - ${projectName.toUpperCase()}`

	const body = (
		<div className="prose prose-invert max-w-none">
			{isLoading && <p>読み込み中です...</p>}
			{error && <p>{error}</p>}
			{!isLoading && !error && <ReactMarkdown>{content}</ReactMarkdown>}
		</div>
	)

	const router = useRouter()

	const [isOpen, setIsOpen] = useState<boolean>(true)

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

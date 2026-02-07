'use client'

import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import ModalWindow from '@/components/ui/window/ModalWindow'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import BlogItemThumbnail from './components/ui/thumbnail'

interface BlogItemModalPresentationProps {
	blog: MicroCMSBlog
	content: React.ReactNode
}

/**
 * @package
 */
export default function BlogItemModalPresentation({ blog, content }: BlogItemModalPresentationProps) {
	const router = useRouter()

	const [isOpen, setIsOpen] = useState(true)
	const handleClose = () => {
		setIsOpen(false)
		router.back()
	}

	return (
		<ModalWindow title={blog.title} isOpen={isOpen} onClose={handleClose}>
			<BlogItemThumbnail eyecatch={blog.eyecatch} alt={blog.title} />
			{content}
		</ModalWindow>
	)
}

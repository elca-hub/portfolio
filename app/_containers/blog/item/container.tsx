'use server'

import { fetchBlog } from '@/action/blog/fetchBlog'
import HeadContent from '@/components/layout/HeadContent'
import CustomMarkdown from '@/components/layout/markdown/CustomMarkdown'
import { redirect } from 'next/navigation'
import TurndownService from 'turndown'
import BlogItemModalPresentation from './modalPresentation'
import BlogItemPresentation from './presentation'

export default async function BlogItemContainer({ blogId, isModal = false }: { blogId: string; isModal?: boolean }): Promise<React.ReactNode> {
	let content: string
	let title: string
	let eyecatch: {
		url: string
	}
	try {
		const res = await fetchBlog(blogId)
		content = res.blog.content
		title = res.blog.title
		eyecatch = res.blog.eyecatch
	} catch (error) {
		console.error(error)
		redirect('/blog')
	}

	// microCMSはHTML形式で返すので一旦markdownに変換
	const turnDownService = new TurndownService()
	const contentConverted = <CustomMarkdown>{turnDownService.turndown(content)}</CustomMarkdown>

	return isModal ? (
		<BlogItemModalPresentation title={title} eyecatch={eyecatch} content={<div className="text-white">{contentConverted}</div>} />
	) : (
		<>
			<HeadContent title={`${title} | Blog`} des={content} />
			<BlogItemPresentation title={title} eyecatch={eyecatch} content={contentConverted} />
		</>
	)
}

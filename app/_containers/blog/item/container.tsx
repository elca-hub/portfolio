'use server'

import { fetchBlog } from '@/action/blog/fetchBlog'
import HeadContent from '@/components/layout/HeadContent'
import CustomMarkdown from '@/components/layout/markdown/CustomMarkdown'
import { notFound } from 'next/navigation'
import TurndownService from 'turndown'
import BlogItemModalPresentation from './modalPresentation'
import BlogItemPresentation from './presentation'

export default async function BlogItemContainer({ blogId, isModal = false }: { blogId: string; isModal?: boolean }): Promise<React.ReactNode> {
	const res = await fetchBlog(blogId)
	if (res.error) {
		if (res.error.message.includes('404')) {
			return notFound()
		}
		return null // TODO: エラーハンドリング
	}

	if (!res.item) {
		return null // TODO: エラーハンドリング
	}

	const blog = res.item

	// microCMSはHTML形式で返すので一旦markdownに変換
	const turnDownService = new TurndownService()
	const markdown = turnDownService.turndown(blog.content)
	const contentConverted = <CustomMarkdown>{markdown}</CustomMarkdown>

	return isModal ? (
		<BlogItemModalPresentation blog={blog} content={<div className="text-white">{contentConverted}</div>} />
	) : (
		<>
			<HeadContent title={`${blog.title} | Blog`} des={markdown} />
			<BlogItemPresentation blog={blog} content={contentConverted} />
		</>
	)
}

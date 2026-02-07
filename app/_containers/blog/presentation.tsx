'use client'

import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import Window from '@/components/ui/window/Window'
import BlogContent from './content'

type BlogPresentationProps = {
	isWindow?: boolean
	blogs: MicroCMSBlog[]
	totalCount: number
}

/**
 * @package
 */
export default function BlogPresentation({ isWindow = false, blogs, totalCount }: BlogPresentationProps) {
	return (
		<>
			{isWindow ? (
				<Window title="Blog" isMaximized>
					<BlogContent blogs={blogs} totalCount={totalCount} />
				</Window>
			) : (
				<>
					<BlogContent blogs={blogs} totalCount={totalCount} />
				</>
			)}
		</>
	)
}

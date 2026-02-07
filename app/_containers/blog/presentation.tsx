'use client'

import Window from '@/components/ui/window/Window'
import { MicroCMSBlog } from '@/types/micro-cms/blog'
import BlogContent from './content'

/**
 * @package
 */
export default function BlogPresentation({ isWindow = false, blogs }: { isWindow?: boolean; blogs: MicroCMSBlog[] }) {
	return (
		<>
			{isWindow ? (
				<Window title="Blog" isMaximized>
					<BlogContent blogs={blogs} />
				</Window>
			) : (
				<>
					<BlogContent blogs={blogs} />
				</>
			)}
		</>
	)
}

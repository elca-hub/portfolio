'use server'

import { fetchBlogs } from '@/action/blog/featch'
import HeadContent from '@/components/layout/HeadContent'
import BlogPresentation from './presentation'

export default async function BlogContainer({ isWindow = false }: { isWindow?: boolean }) {
	const blogs = await fetchBlogs(isWindow ? 10 : 6)

	return (
		<>
			{isWindow && <HeadContent title="Blog" des="elcaのブログを見ることができます" />}
			<BlogPresentation isWindow={isWindow} blogs={blogs.blogs} totalCount={blogs.totalCount} />
		</>
	)
}

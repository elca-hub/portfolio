'use server'

import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import { client } from '@/const/client'

export async function fetchBlogs(
	limit: number = 10,
	offset: number = 0,
): Promise<{
	blogs: MicroCMSBlog[]
	totalCount: number
}> {
	const blogs = await client.getList<MicroCMSBlog>({
		endpoint: 'blogs',
		queries: {
			limit,
			offset,
		},
	})

	return {
		blogs: blogs.contents,
		totalCount: blogs.totalCount ?? 0,
	}
}

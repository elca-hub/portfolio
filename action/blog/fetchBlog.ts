'use server'

import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import { client } from '@/const/client'

export async function fetchBlog(blogId: string): Promise<{
	blog: MicroCMSBlog
}> {
	const blog = await client.getListDetail<MicroCMSBlog>({
		endpoint: 'blogs',
		contentId: blogId,
	})

	return {
		blog: blog,
	}
}

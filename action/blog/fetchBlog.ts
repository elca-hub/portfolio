'use server'

import { MicroCMSBlog } from '@/action/model/micro-cms/blog'
import { client } from '@/const/client'
import { PFResponse } from '../response'

export async function fetchBlog(blogId: string): Promise<PFResponse<MicroCMSBlog>> {
	try {
		const blog = await client.getListDetail<MicroCMSBlog>({
			endpoint: 'blogs',
			contentId: blogId,
		})
		return PFResponse.success(blog)
	} catch (error) {
		return PFResponse.error(error as Error)
	}
}

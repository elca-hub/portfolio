import { client } from '@/const/client'
import { MicroCMSBlog } from '@/types/micro-cms/blog'

export async function fetchBlogs(limit: number = 10): Promise<MicroCMSBlog[]> {
	const blogs = await client.getList({
		endpoint: 'blogs',
		queries: {
			limit,
		},
	})

	return blogs.contents.map((blog) => ({
		id: blog.id,
		content: blog.content,
		title: blog.title,
		publishedAt: new Date(blog.publishedAt),
		updatedAt: new Date(blog.updatedAt),
		eyecatch: {
			url: blog.eyecatch.url,
			height: blog.eyecatch.height,
			width: blog.eyecatch.width,
		},
		category: {
			id: blog.category.id,
			name: blog.category.name,
		},
	}))
}

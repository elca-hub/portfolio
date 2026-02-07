import { MicroCMSCategory } from './category'

export type MicroCMSBlog = {
	id: string
	content: string
	title: string
	publishedAt: Date
	updatedAt: Date
	eyecatch: {
		url: string
		height: number
		width: number
	}
	category?: MicroCMSCategory
}

import { MicroCMSCategory } from './category'
import { MicroCMSEyecatch } from './eyecatch'
export type MicroCMSBlog = {
	id: string
	content: string
	title: string
	publishedAt: Date
	updatedAt: Date
	eyecatch: MicroCMSEyecatch
	category?: MicroCMSCategory
}

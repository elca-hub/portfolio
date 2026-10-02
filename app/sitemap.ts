import { fetchBlogs } from '@/action/blog/featch'
import { apps } from '@/const/apps'
import { works } from '@/const/works'
import type { MetadataRoute } from 'next'

const domain = 'https://portfolio.elca-web.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const ret: MetadataRoute.Sitemap = [
		{
			url: domain,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]

	// appの登録
	Object.values(apps).forEach((app) => {
		const priority = app.redirectUrl === apps.aboutMe.redirectUrl ? 0.8 : 0.5

		ret.push({
			url: `${domain}${app.redirectUrl}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: priority,
		})
	})

	// work別の登録
	works.forEach((work) => {
		ret.push({
			url: `${domain}${apps.works.redirectUrl}/${work.projectName}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.3,
		})
	})

	// ブログ別の登録
	const AbsoluteUrl = (eyecatchName: string) => {
		if (eyecatchName.charAt(0) !== '/') {
			return eyecatchName
		}

		return `${domain}${eyecatchName}`
	}

	const blogs = await fetchBlogs()

	blogs.blogs.forEach((blog) => {
		ret.push({
			url: `${domain}${apps.blog.redirectUrl}/${blog.id}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.4,
			images: [AbsoluteUrl(blog.eyecatch.url)],
		})
	})

	return ret
}

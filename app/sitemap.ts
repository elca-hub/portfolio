import { apps } from '@/const/apps'
import { works } from '@/const/works'
import type { MetadataRoute } from 'next'

const domain = 'https://portfolio.elca-web.com'

export default function sitemap(): MetadataRoute.Sitemap {
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

	return ret
}

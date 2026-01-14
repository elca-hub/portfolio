import type { MetadataRoute } from 'next'

const domain = 'https://portfolio.elca-web.com'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: domain,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${domain}/about-me`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${domain}/illustrations`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
	]
}

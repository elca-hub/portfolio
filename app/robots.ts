import type { MetadataRoute } from 'next'

const domain = 'https://portfolio.elca-web.com'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '*',
		},
		sitemap: `${domain}/sitemap.xml`,
	}
}

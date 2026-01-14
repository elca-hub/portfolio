import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'elcaのポートフォリオサイト',
		short_name: 'elca PF',
		description: 'elcaのポートフォリオサイト',
		start_url: '/',
		display: 'standalone',
		background_color: '#020617',
		theme_color: '#020617',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}

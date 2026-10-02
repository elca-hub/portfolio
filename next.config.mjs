const nextConfig = {
	experimental: {
		optimizePackageImports: ['@/components/ui'],
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	images: {
		domains: ['images.microcms-assets.io'],
	},
}

export default nextConfig

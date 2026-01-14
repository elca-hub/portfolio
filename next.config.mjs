const nextConfig = {
	experimental: {
		optimizePackageImports: ['@/components/ui'],
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
}

export default nextConfig

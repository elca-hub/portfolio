import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['@/components/ui'],
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
}

export default nextConfig

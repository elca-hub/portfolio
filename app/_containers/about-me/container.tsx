'use client'

import AboutMePresentation from '@/app/_containers/about-me/presentation'

export default function AboutMeContainer({ isWindow = false }: { isWindow?: boolean }) {
	return <AboutMePresentation isWindow={isWindow} />
}

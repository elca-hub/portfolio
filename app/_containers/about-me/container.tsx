'use server'

import AboutMePresentation from '@/app/_containers/about-me/presentation'
import HeadContent from '@/components/layout/HeadContent'

export default async function AboutMeContainer({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			<HeadContent title="About Me" des="elcaの生態について知ることができます" />
			<AboutMePresentation isWindow={isWindow} />
		</>
	)
}

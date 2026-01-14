'use client'

import HeadContent from '@/components/layout/HeadContent'
import Window from '@/components/ui/window/Window'
import AboutMeContent from './content'

/**
 * @package
 */
export default function AboutMePresentation({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			{isWindow ? (
				<Window title="About Me" isMaximized>
					<AboutMeContent />
				</Window>
			) : (
				<>
					<HeadContent title="About Me" des="elcaの生態について知ることができます" />
					<AboutMeContent />
				</>
			)}
		</>
	)
}

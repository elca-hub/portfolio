'use client'

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
					<AboutMeContent />
				</>
			)}
		</>
	)
}

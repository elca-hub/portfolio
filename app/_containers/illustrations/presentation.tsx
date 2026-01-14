'use client'

import Window from '@/components/ui/window/Window'
import IllustrationsContent from './content'

/**
 * @package
 */
export default function IllustrationsPresentation({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			{isWindow ? (
				<Window title="Illustrations" isMaximized>
					<IllustrationsContent />
				</Window>
			) : (
				<>
					<IllustrationsContent />
				</>
			)}
		</>
	)
}

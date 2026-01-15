'use client'

import Window from '@/components/ui/window/Window'
import WorksContent from './content'

/**
 * @package
 */
export default function WorksPresentation({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			{isWindow ? (
				<Window title="Works" isMaximized>
					<WorksContent />
				</Window>
			) : (
				<>
					<WorksContent />
				</>
			)}
		</>
	)
}

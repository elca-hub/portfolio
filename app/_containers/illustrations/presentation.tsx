'use client'

import HeadContent from '@/components/layout/HeadContent'
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
					<HeadContent title="Illustrations" des="elcaが今まで頑張って描いたイラスト作品を見ることができます" />
					<IllustrationsContent />
				</>
			)}
		</>
	)
}

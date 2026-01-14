'use server'

import IllustrationsPresentation from '@/app/_containers/illustrations/presentation'
import HeadContent from '@/components/layout/HeadContent'

export default async function IllustrationsContainer({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			<HeadContent title="Illustrations" des="elcaが今まで頑張って描いたイラスト作品を見ることができます" />
			<IllustrationsPresentation isWindow={isWindow} />
		</>
	)
}

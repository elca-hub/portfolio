'use server'

import HeadContent from '@/components/layout/HeadContent'
import WorksPresentation from './presentation'

export default async function WorksContainer({ isWindow = false }: { isWindow?: boolean }) {
	return (
		<>
			{isWindow && <HeadContent title="Works" des="elcaが今まで頑張って作った作品を見ることができます" />}
			<WorksPresentation isWindow={isWindow} />
		</>
	)
}

'use server'

import HomePresentation from '@/app/_containers/home/presentation'
import HeadContent from '@/components/layout/HeadContent'
import { apps } from '@/const/apps'

export default async function HomeContainer() {
	const defaultActiveApps = [apps.aboutMe, apps.blog, apps.works]

	return (
		<>
			<HeadContent title="Home" des="elcaのポートフォリオサイト" />
			<HomePresentation apps={apps} defaultActiveApps={defaultActiveApps} />
		</>
	)
}

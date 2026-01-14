'use server'

import HomePresentation from '@/app/_containers/home/presentation'
import HeadContent from '@/components/layout/HeadContent'
import { AppType } from '@/const/appType'
import { FaCode, FaPaintBrush } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import AboutMeContainer from '../about-me/container'
import IllustrationsContainer from '../illustrations/container'
import WorksContainer from '../works/container'

export default async function HomeContainer() {
	const apps: Record<string, AppType> = {
		aboutMe: {
			title: 'About Me',
			content: <AboutMeContainer />,
			redirectUrl: '/about-me',
			icon: <FiUser />,
		},
		illustrations: {
			title: 'Illustrations',
			content: <IllustrationsContainer />,
			redirectUrl: '/illustrations',
			icon: <FaPaintBrush />,
		},
		works: {
			title: 'Works',
			content: <WorksContainer />,
			redirectUrl: '/works',
			icon: <FaCode />,
		},
	}
	const defaultActiveApps = [apps.aboutMe, apps.illustrations]

	return (
		<>
			<HeadContent title="Home" des="elcaのポートフォリオサイト" />
			<HomePresentation apps={apps} defaultActiveApps={defaultActiveApps} />
		</>
	)
}

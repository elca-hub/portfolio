'use server'

import HomePresentation from '@/app/_containers/home/presentation'
import { AppType } from '@/const/appType'
import { FaPaintBrush } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import AboutMeContainer from '../about-me/container'
import IllustrationsContainer from '../illustrations/container'

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
	}
	const defaultActiveApps = [apps.aboutMe, apps.illustrations]

	return (
		<>
			<HomePresentation apps={apps} defaultActiveApps={defaultActiveApps} />
		</>
	)
}

import AboutMeContainer from '@/app/_containers/about-me/container'
import BlogContainer from '@/app/_containers/blog/container'
import IllustrationsContainer from '@/app/_containers/illustrations/container'
import WorksContainer from '@/app/_containers/works/container'
import { FaCode, FaPaintBrush } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { GrArticle } from 'react-icons/gr'
import { AppType } from './appType'

export const apps: Record<string, AppType> = {
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
	blog: {
		title: 'Blog',
		content: <BlogContainer />,
		redirectUrl: '/blog',
		icon: <GrArticle />,
	},
}

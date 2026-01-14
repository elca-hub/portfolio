import AboutMeContainer from '@/app/_containers/about-me/container'
import IllustrationsContainer from '@/app/_containers/illustrations/container'
import { AppType } from '@/const/appType'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FaPaintBrush } from 'react-icons/fa'
import { FiFolder, FiUser } from 'react-icons/fi'
import { InteractiveBackground } from '../background/InteractiveBackground'
import Dock from './Dock'

const apps: Record<string, AppType> = {
	aboutMe: {
		title: 'About Me',
		content: <AboutMeContainer />,
		redirectUrl: '/about-me',
		icon: <FiUser />,
	},
	projects: {
		title: 'Projects',
		content: <AboutMeContainer />,
		redirectUrl: '/projects',
		icon: <FiFolder />,
	},
	illustrations: {
		title: 'Illustrations',
		content: <IllustrationsContainer />,
		redirectUrl: '/illustrations',
		icon: <FaPaintBrush />,
	},
}
const defaultActiveApps = [apps.aboutMe, apps.projects]

const meta: Meta<typeof Dock> = {
	title: 'Components/ui/Dock',
	component: Dock,
	args: {
		activeApps: defaultActiveApps,
		apps: apps,
		onClick: () => {},
	},
	decorators: [
		(Story) => (
			<div className="absolute inset-0">
				<InteractiveBackground breathsPerMinute={10}>
					<Story />
				</InteractiveBackground>
			</div>
		),
	],
}

export default meta

type Story = StoryObj<typeof Dock>

export const Default: Story = {}

export const OnPhone: Story = {
	globals: {
		viewport: {
			value: 'mobile1',
		},
	},
}

export const ExpandAppModal: Story = {
	args: {
		activeApps: [apps.aboutMe],
	},
	play: async ({ canvas, userEvent }) => {
		const appButton = canvas.getByTestId('app-list-trigger')
		await userEvent.click(appButton)
	},
}

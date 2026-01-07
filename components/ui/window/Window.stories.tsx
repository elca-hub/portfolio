import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Window from './Window'

const meta: Meta<typeof Window> = {
	title: 'Components/ui/Window',
	component: Window,
	args: {
		title: 'ウインドウのタイトル',
		children: <div>WindowContent</div>,
	},
}

export default meta

export const Default: StoryObj<typeof Window> = {}

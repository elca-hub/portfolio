import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { InteractiveBackground } from '../background/InteractiveBackground'
import Window from './Window'

const meta: Meta<typeof Window> = {
	title: 'Components/ui/Window',
	component: Window,
	args: {
		title: 'ウインドウのタイトル',
		children: <div>WindowContent</div>,
	},
	decorators: [
		(Story) => (
			<div className="absolute inset-0">
				<InteractiveBackground breathsPerMinute={10}>
					<div className="mt-10 flex items-center justify-center">
						<div className="w-max-[1200px] mx-4 h-auto max-h-full sm:mx-0">
							<Story />
						</div>
					</div>
				</InteractiveBackground>
			</div>
		),
	],
	parameters: {
		nextjs: {
			navigation: {
				pathname: '/hoge',
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof Window>

export const Default: Story = {
	play: async ({ canvas }) => {
		expect(canvas.getByTestId('window-close-button')).toBeEnabled()
		expect(canvas.getByTestId('window-minimize-button')).toBeEnabled()
		expect(canvas.getByTestId('window-maximize-button')).toBeEnabled()
	},
}

export const OnPhone: Story = {
	globals: {
		viewport: {
			value: 'mobile1',
		},
	},
}

export const Maximized: Story = {
	args: {
		isMaximized: true,
	},
	play: async ({ canvas }) => {
		expect(canvas.getByTestId('window-close-button')).toBeDisabled()
		expect(canvas.getByTestId('window-minimize-button')).toBeDisabled()
		expect(canvas.getByTestId('window-maximize-button')).toBeEnabled()
	},
}

export const MaximizedOnPhone: Story = {
	globals: {
		viewport: {
			value: 'mobile1',
		},
	},
	args: {
		isMaximized: true,
	},
}

export const Minimized: Story = {
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByTestId('window-minimize-button'))
		expect(canvas.getByTestId('window-close-button')).toBeEnabled()
		expect(canvas.getByTestId('window-minimize-button')).toBeEnabled()
		expect(canvas.getByTestId('window-maximize-button')).toBeDisabled()
	},
}

export const Closed: Story = {
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByTestId('window-close-button'))
	},
}

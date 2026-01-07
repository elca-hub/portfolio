import type { AppType } from '@/const/apps'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FiFolder, FiHome, FiMail, FiSearch, FiSettings, FiUser } from 'react-icons/fi'
import Dock from './Dock'

const meta: Meta<typeof Dock> = {
	title: 'Components/ui/Dock',
	component: Dock,
	args: {
		activeApps: [
			{ title: 'ホーム', content: (() => null) as AppType['content'], redirectUrl: '/home', icon: FiHome },
			{ title: 'フォルダ', content: (() => null) as AppType['content'], redirectUrl: '/folder', icon: FiFolder },
			{ title: '検索', content: (() => null) as AppType['content'], redirectUrl: '/search', icon: FiSearch },
		] as AppType[],
		onClick: () => { },
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
				<Story />
			</div>
		),
	],
}

export default meta

export const Default: StoryObj<typeof Dock> = {}

export const WithActions: StoryObj<typeof Dock> = {
	args: {
		activeApps: [
			{ title: 'ホーム', content: (() => null) as AppType['content'], redirectUrl: '/home', icon: FiHome },
			{ title: 'フォルダ', content: (() => null) as AppType['content'], redirectUrl: '/folder', icon: FiFolder },
			{ title: '検索', content: (() => null) as AppType['content'], redirectUrl: '/search', icon: FiSearch },
			{ title: 'メール', content: (() => null) as AppType['content'], redirectUrl: '/mail', icon: FiMail },
			{ title: 'ユーザー', content: (() => null) as AppType['content'], redirectUrl: '/user', icon: FiUser },
		] as AppType[],
		onClick: (app: AppType) => alert(`${app.title} がクリックされました`),
	},
}

export const Minimal: StoryObj<typeof Dock> = {
	args: {
		activeApps: [
			{ title: 'ホーム', content: (() => null) as AppType['content'], redirectUrl: '/home', icon: FiHome },
			{ title: '設定', content: (() => null) as AppType['content'], redirectUrl: '/settings', icon: FiSettings },
		] as AppType[],
		onClick: () => { },
	},
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FiFolder, FiHome, FiImage, FiMail, FiMusic, FiSearch, FiSettings, FiUser, FiVideo } from 'react-icons/fi'
import Dock from './Dock'

const meta: Meta<typeof Dock> = {
	title: 'Components/ui/Dock',
	component: Dock,
	args: {
		items: [
			{ icon: FiHome, label: 'ホーム' },
			{ icon: FiFolder, label: 'フォルダ' },
			{ icon: FiSearch, label: '検索' },
			{ icon: FiMail, label: 'メール' },
			{ icon: FiImage, label: '画像' },
			{ icon: FiMusic, label: '音楽' },
			{ icon: FiVideo, label: '動画' },
			{ icon: FiSettings, label: '設定' },
		],
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
		items: [
			{ icon: FiHome, label: 'ホーム', onClick: () => alert('ホームがクリックされました') },
			{ icon: FiFolder, label: 'フォルダ', onClick: () => alert('フォルダがクリックされました') },
			{ icon: FiSearch, label: '検索', onClick: () => alert('検索がクリックされました') },
			{ icon: FiMail, label: 'メール', onClick: () => alert('メールがクリックされました') },
			{ icon: FiUser, label: 'ユーザー', onClick: () => alert('ユーザーがクリックされました') },
		],
	},
}

export const Minimal: StoryObj<typeof Dock> = {
	args: {
		items: [
			{ icon: FiHome, label: 'ホーム' },
			{ icon: FiSettings, label: '設定' },
		],
	},
}

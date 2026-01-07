'use client'

import AboutMePresentation from '@/app/_containers/about-me/presentation'
import Dock from '@/components/ui/window/Dock'
import Window from '@/components/ui/window/Window'
import { useState } from 'react'
import { IconType } from 'react-icons'
import { FiFolder, FiUser } from 'react-icons/fi'

/**
 * @package
 */
export default function HomePresentation() {
	type App = {
		title: string
		content: React.ReactNode
		redirectUrl: string
		icon: IconType
	}

	/*
	アプリ一覧(多分別ファイルで管理することなりそう)
	*/
	const apps: Record<string, App> = {
		aboutMe: {
			title: 'About Me',
			content: <AboutMePresentation />,
			redirectUrl: '/about-me',
			icon: FiUser,
		},
		projects: {
			title: 'Projects',
			content: <AboutMePresentation />,
			redirectUrl: '/projects',
			icon: FiFolder,
		}
	}

	/*
	cookieに何も登録されてなかった時のdefaultのウインドウ
	*/
	const defaultWindows = [
		apps.aboutMe,
	]

	let [windows, setWindows] = useState<App[]>(defaultWindows)

	const handleCloseWindow = (title: string) => {
		setWindows(windows.filter((window) => window.title !== title))
	}

	return (
		<>
			<div className='flex flex-col gap-4 items-center justify-center max-w-[1200px] mx-auto my-10'>
				{windows.map((window) => (
					<Window key={window.title} title={window.title} onClose={() => handleCloseWindow(window.title)} redirectUrl={window.redirectUrl}>
						{window.content}
					</Window>
				))}
			</div>
			<div className='absolute bottom-0 left-0 w-full flex items-center justify-center mb-10'>
				<Dock items={Object.values(apps).map((app: App) => ({
					icon: app.icon,
					label: app.title,
					onClick: () => {
						setWindows([...windows, app])
					},
				}))} />
			</div>
		</>
	)
}

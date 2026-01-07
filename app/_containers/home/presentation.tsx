'use client'

import Dock from '@/components/ui/window/Dock'
import Window from '@/components/ui/window/Window'
import Apps, { AppType } from '@/const/apps'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'activeWindows'

/**
 * @package
 */
export default function HomePresentation() {


	/*
	ローカルストレージに何も登録されてなかった時のdefaultのウインドウ
	*/
	const defaultWindows = [
		Apps.aboutMe,
	]

	const [windows, setWindows] = useState<AppType[]>([])

	// ローカルストレージからアクティブなウィンドウを読み込む
	useEffect(() => {
		if (typeof window === 'undefined') return

		const storedTitles = localStorage.getItem(STORAGE_KEY)
		if (storedTitles) {
			try {
				const titles: string[] = JSON.parse(storedTitles)
				// タイトルからAppTypeを復元
				const restoredWindows = titles
					.map(title => Object.values(Apps).find(app => app.title === title))
					.filter((app): app is AppType => app !== undefined)

				if (restoredWindows.length > 0) {
					setWindows(restoredWindows)
					return
				}
			} catch (error) {
				console.error('Failed to parse stored windows:', error)
			}
		}
		// ローカルストレージに何もない場合はdefaultWindowsを使用
		setWindows(defaultWindows)
	}, [])

	// windowsが変更されたらローカルストレージに保存
	useEffect(() => {
		if (typeof window === 'undefined' || windows.length === 0) return

		const titles = windows.map(w => w.title)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(titles))
	}, [windows])

	const openWindow = (app: AppType) => {
		// 同じタイトルのウインドウがすでにあれば追加しない
		if (windows.some((window) => window.title === app.title)) return
		setWindows([...windows, app])
	}

	const handleCloseWindow = (title: string) => {
		setWindows(windows.filter((window) => window.title !== title))
	}

	return (
		<>
			<div className='flex flex-col gap-4 items-center justify-center max-w-[1200px] mx-auto my-10'>
				{windows.map((window) => (
					<Window key={window.title} title={window.title} onClose={() => handleCloseWindow(window.title)} redirectUrl={window.redirectUrl}>
						<window.content />
					</Window>
				))}
			</div>
			<div className='absolute bottom-0 left-0 w-full flex items-center justify-center mb-10'>
				<Dock
					activeApps={windows}
					onClick={openWindow}
				/>
			</div>
		</>
	)
}

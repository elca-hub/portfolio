'use client'

import Dock from '@/components/ui/window/Dock'
import Window from '@/components/ui/window/Window'
import Apps, { AppType } from '@/const/apps'
import { useState } from 'react'
/**
 * @package
 */
export default function HomePresentation() {


	/*
	cookieに何も登録されてなかった時のdefaultのウインドウ
	*/
	const defaultWindows = [
		Apps.aboutMe,
	]

	let [windows, setWindows] = useState<AppType[]>(defaultWindows)

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

'use client'

import Notification from '@/components/ui/Notification'
import Dock from '@/components/ui/window/Dock'
import Window from '@/components/ui/window/Window'
import { AppType } from '@/const/appType'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'activeWindows'

interface homeProps {
	apps: Record<string, AppType>,
	defaultActiveApps: AppType[]
}

/**
 * @package
 */
export default function HomePresentation({ apps, defaultActiveApps }: homeProps) {
	const searchParams = useSearchParams()

	const [windows, setWindows] = useState<AppType[]>([])
	const [isCopied, setIsCopied] = useState(false)

	const [isInitialLoad, setIsInitialLoad] = useState(true)

	const appList = Object.values(apps)

	// ローカルストレージからアクティブなウィンドウを読み込む
	useEffect(() => {
		if (typeof window === 'undefined') return

		const storedTitles = localStorage.getItem(STORAGE_KEY)
		let restoredWindows: AppType[] = []
		let hasStoredData = false

		if (storedTitles) {
			hasStoredData = true
			try {
				const titles: string[] = JSON.parse(storedTitles)
				// タイトルからAppTypeを復元
				restoredWindows = titles.map(title => appList.find(app => app.title === title))
					.filter(app => app !== undefined)
			} catch (error) {
				console.error('Failed to parse stored windows:', error)
			}
		}

		// ローカルストレージに何もない場合（初回アクセス時）のみdefaultWindowsを使用
		// 空の配列が保存されている場合は、意図的に削除された状態として扱う
		if (!hasStoredData && restoredWindows.length === 0) {
			restoredWindows = defaultActiveApps
		}

		// URLパラメータからウィンドウ名を取得
		const windowParam = searchParams.get('window')
		if (windowParam) {
			const targetApp = appList.find(app => app.title === windowParam)
			if (targetApp) {
				// すでに開いている場合は先頭に移動
				const existingIndex = restoredWindows.findIndex(w => w.title === targetApp.title)
				if (existingIndex !== -1) {
					// 既存のウィンドウを削除して先頭に追加
					const reorderedWindows = [
						targetApp,
						...restoredWindows.filter(w => w.title !== targetApp.title)
					]
					setWindows(reorderedWindows)
					return
				} else {
					// 開いていない場合は先頭に追加
					setWindows([targetApp, ...restoredWindows])
					return
				}
			}
		}

		setWindows(restoredWindows)
		setIsInitialLoad(false)
	}, [searchParams])

	// windowsが変更されたらローカルストレージに保存
	useEffect(() => {
		if (typeof window === 'undefined') return
		// 初期化中は保存しない（初期化中の空配列が保存されるのを防ぐ）
		if (isInitialLoad) return

		const titles = windows.map(w => w.title)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(titles))
	}, [windows, isInitialLoad])

	const openWindow = (app: AppType) => {
		// 同じタイトルのウインドウがすでにあれば追加しない
		if (windows.some((window) => window.title === app.title)) return
		setWindows([...windows, app])
	}

	const handleCloseWindow = (title: string) => {
		setWindows(windows.filter((window) => window.title !== title))
	}

	const handleCopy = () => {
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<>
			<div className='flex items-center justify-center w-full'>
				<div className='flex flex-col gap-4 w-full items-center justify-center max-w-[1200px] mx-10 mt-10 mb-30 min-h-[calc(100vh-200px)]'>
					{isInitialLoad ? (
						<p className='text-black/70 dark:text-white/70 text-6xl font-bold'>
							読み込み中...
						</p>
					) : windows.length === 0 ? (
						<p className='text-black/70 dark:text-white/70 text-6xl font-bold'>
							下のDockからアプリを開いてみましょう
						</p>
					) : (
						windows.map((window) => (
							<Window
								key={window.title}
								title={window.title}
								onClose={() => handleCloseWindow(window.title)}
								redirectUrl={window.redirectUrl}
								onCopy={handleCopy}
							>
								{window.content}
							</Window>
						))
					)}
				</div>
			</div>
			<div>
				<Notification isVisible={isCopied} message='URLをコピーしました' type="success" />
				<Dock
					apps={apps}
					activeApps={windows}
					onClick={openWindow}
					onReorder={(windows) => setWindows(windows)}
				/>
			</div>
		</>
	)
}

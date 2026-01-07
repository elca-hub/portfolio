'use client'

import Apps, { AppType } from '@/const/apps'
import { useRef, useState } from 'react'
import { GrAppsRounded } from 'react-icons/gr'

/**
 * const/apps.ts をそのまま配列化した Dock 用のアプリ一覧
 */
const appItems: AppType[] = Object.values(Apps)

interface DockProps {
	/**
	 * 現在アクティブな（ウインドウが開いている）アプリ
	 */
	activeApps: AppType[]
	/**
	 * クリックされたアプリを親コンポーネントで制御するためのハンドラ
	 */
	onClick: (app: AppType) => void
	/**
	 * ホバー / 長押しでウインドウの順番を変えるためのハンドラ
	 */
	onHoverSort?: (app: AppType) => void
	className?: string
}

export default function Dock({ activeApps, onClick, onHoverSort, className = '' }: DockProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const startLongPress = (app: AppType) => {
		if (!onHoverSort) return
		// スマホでの長押し検知（約 400ms）
		longPressTimerRef.current = setTimeout(() => {
			onHoverSort(app)
		}, 400)
	}

	const cancelLongPress = () => {
		if (longPressTimerRef.current) {
			clearTimeout(longPressTimerRef.current)
			longPressTimerRef.current = null
		}
	}

	return (
		<div className={`relative inline-flex items-end gap-2 px-4 py-3 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg ${className}`}>
			{activeApps.map((app, index) => {
				const Icon = app.icon
				return (
					<button
						key={index}
						onClick={() => onClick(app)}
						onMouseEnter={() => onHoverSort?.(app)}
						onTouchStart={() => startLongPress(app)}
						onTouchEnd={cancelLongPress}
						onTouchCancel={cancelLongPress}
						className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-150 hover:z-10"
						aria-label={app.title || `Dock item ${index + 1}`}
					>
						<div className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group-hover:bg-white/10">
							<Icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
						</div>
					</button>
				)
			})}

			{/* Apps 一覧ポップアップボタン */}
			<div className="relative">
				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-150 hover:z-10"
					aria-label="すべてのアプリを表示"
				>
					<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 transition-all duration-300 group-hover:bg-white/20 border border-white/20">
						<span className="text-xs font-medium text-white/90 group-hover:text-white transition-colors duration-300">
							<GrAppsRounded className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
						</span>
					</div>
				</button>

				{isMenuOpen && (
					<div className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl min-w-[180px]">
						<ul className="flex flex-col gap-1 max-h-64 overflow-y-auto">
							{appItems.map((app, index) => {
								const Icon = app.icon
								return (
									<li key={index}>
										<button
											onClick={() => {
												onClick(app)
												setIsMenuOpen(false)
											}}
											className="flex items-center gap-2 w-full px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-left"
										>
											<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5">
												<Icon className="w-4 h-4 text-white/90" />
											</div>
											<span className="text-sm text-white/90">{app.title}</span>
										</button>
									</li>
								)
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

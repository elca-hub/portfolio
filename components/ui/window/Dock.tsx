'use client'

import Apps, { AppType } from '@/const/apps'
import { useState } from 'react'
import { Button, GridList, GridListItem, useDragAndDrop } from 'react-aria-components'
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
	 * ドラッグ＆ドロップによるウインドウの並び替え結果
	 */
	onReorder: (apps: AppType[]) => void
	className?: string
}

function AppList({ initialItems, onClick, onReorder }: { initialItems: AppType[], onClick: (app: AppType) => void, onReorder: (apps: AppType[]) => void }) {
	let { dragAndDropHooks } = useDragAndDrop({
		getItems(keys) {
			// 選択中キーに対応するアプリ情報を渡す
			return initialItems.filter(item => keys.has(item.title)).map(item => ({
				'text/plain': item.title,
				'app': JSON.stringify(item),
			}))
		},
		onReorder(e) {
			if (!e.target.key) return

			// 現在の配列からドラッグ対象とそれ以外を分割
			const draggedKeys = Array.from(e.keys)
			const draggedItems = initialItems.filter(item => draggedKeys.includes(item.title))
			const remainingItems = initialItems.filter(item => !draggedKeys.includes(item.title))

			// ドロップ先のインデックスを計算
			const targetIndex = remainingItems.findIndex(item => item.title === e.target.key)
			if (targetIndex === -1) {
				onReorder(initialItems)
				return;
			}

			let insertIndex = targetIndex
			if (e.target.dropPosition === 'after') {
				insertIndex += 1
			}

			const nextItems = [
				...remainingItems.slice(0, insertIndex),
				...draggedItems,
				...remainingItems.slice(insertIndex),
			]

			// 親(Home)の windows を並び替え
			onReorder(nextItems)
		}
	})

	return (
		<GridList
			aria-label="Dock apps"
			selectionMode="multiple"
			dragAndDropHooks={dragAndDropHooks}
			layout="grid"
			className="grid grid-flow-col auto-cols-max items-end gap-2"
		>
			{initialItems.map((item) => {
				const Icon = item.icon
				return (
					<GridListItem
						id={item.title}
						key={item.title}
						textValue={item.title}
					>
						<Button
							className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-150 hover:z-10"
							onPress={() => onClick(item)}
						>
							<div className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group-hover:bg-white/10">
								<Icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
							</div>
						</Button>
					</GridListItem>
				)
			})}
		</GridList>
	)
}

export default function Dock({ activeApps, onClick, onReorder, className = '' }: DockProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<div className={`relative inline-flex items-end gap-2 px-4 py-3 rounded-3xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg ${className}`}>
			<AppList
				key={activeApps.map((app) => app.title).join('|')}
				initialItems={activeApps}
				onClick={onClick}
				onReorder={onReorder}
			/>

			{/* Apps 一覧ポップアップボタン */}
			<div className="relative">
				<Button
					onPress={() => setIsMenuOpen((prev) => !prev)}
					className="group relative flex flex-col items-center justify-center p-2 transition-all duration-300 hover:scale-150 hover:z-10"
					aria-label="すべてのアプリを表示"
				>
					<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 transition-all duration-300 group-hover:bg-white/20 border border-white/20">
						<span className="text-xs font-medium text-white/90 group-hover:text-white transition-colors duration-300">
							<GrAppsRounded className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
						</span>
					</div>
				</Button>

				{isMenuOpen && (
					<div className="absolute bottom-full right-0 mb-3 px-3 py-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl min-w-[180px]">
						<ul className="flex flex-col gap-1 max-h-64 overflow-y-auto">
							{appItems.map((app, index) => {
								const Icon = app.icon
								return (
									<li key={index}>
										<Button
											onPress={() => {
												onClick(app)
												setIsMenuOpen(false)
											}}
											className="flex items-center gap-2 w-full px-2 py-1.5 rounded-xl hover:bg-white/10 transition-colors text-left"
										>
											<div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5">
												<Icon className="w-4 h-4 text-white/90" />
											</div>
											<span className="text-sm text-white/90">{app.title}</span>
										</Button>
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

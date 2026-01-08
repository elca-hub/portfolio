'use client'

import { AppIconType, AppType } from '@/const/appType'
import React, { useState } from 'react'
import { Button, Dialog, DialogTrigger, GridList, GridListItem, Heading, Modal, ModalOverlay, useDragAndDrop } from 'react-aria-components'
import { GrAppsRounded } from 'react-icons/gr'
import { LuArrowRightToLine } from "react-icons/lu"
import { MdClose } from 'react-icons/md'

interface DockProps {
	apps: Record<string, AppType>,
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
						<AppIcon icon={Icon} onPress={() => onClick(item)} />
					</GridListItem>
				)
			})}
		</GridList>
	)
}

function AppIcon({ icon, title, onPress }: { icon: AppIconType, title?: string, onPress: () => void }) {
	return (
		<Button className="group relative flex flex-col items-center justify-center p-2 cursor-pointer transition-all duration-300 hover:scale-95" onPress={onPress}>
			<div className="flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 group-hover:bg-white/10">
				{React.cloneElement(icon, { className: "size-8 text-white/90 group-hover:text-white transition-colors duration-300" })}
			</div>
			{title && <span className="text-lg text-white/90">{title}</span>}
		</Button>
	)
}

export default function Dock({ apps, activeApps, onClick, onReorder, className = '' }: DockProps) {
	const appItems = Object.values(apps)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isCompactMode, setIsCompactMode] = useState(false)

	return (
		<div
			className={`
				fixed bottom-0
				flex justify-center gap-3 items-center
				px-4 py-3
				rounded-t-3xl
				bg-black/20 backdrop-blur-xl
				border border-white/10
				shadow-lg
				transition-all
				duration-500
				${className}
				${isCompactMode ? 'flex-col w-fit rounded-3xl bottom-2 right-2' : 'flex-row w-full'}
			`}
		>
			{!isCompactMode && (
				<>
					<AppList
						key={activeApps.map((app) => app.title).join('|')}
						initialItems={activeApps}
						onClick={onClick}
						onReorder={onReorder}
					/>

					{/* 区切りの縦棒 */}
					<div className="h-10 w-px bg-white/20 rounded-full" />

				</>
			)}

			{/* Apps 一覧ポップアップボタン */}
			<div className="relative">
				<DialogTrigger isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
					<AppIcon icon={<GrAppsRounded />} onPress={() => { }} />
					<ModalOverlay className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
						<Modal isDismissable>
							<Dialog className="bg-black/20 border border-white/10 shadow-lg p-4 rounded-3xl min-w-[600px]">
								<div className="flex items-center justify-between mb-4">
									<Heading slot="title" className="text-4xl font-bold text-white">
										Apps
									</Heading>
									<Button slot="close" className="cursor-pointer transition-all duration-300 hover:scale-95">
										<MdClose className="w-8 h-8 text-white/90 group-hover:text-white transition-colors duration-300" />
									</Button>
								</div>
								<GridList aria-label="Apps" layout="grid" className="grid grid-flow-col auto-cols-max items-end gap-4">
									{appItems.map((app, index) => {
										const Icon = app.icon
										return (
											<GridListItem key={index}>
												<AppIcon icon={Icon} title={app.title} onPress={() => {
													onClick(app)
													setIsModalOpen(false)
												}} />
											</GridListItem>
										)
									})}
								</GridList>
							</Dialog>
						</Modal>
					</ModalOverlay>
				</DialogTrigger>
			</div>

			<div className="relative">
				<div className={`transition-all duration-500 ${isCompactMode && 'rotate-180'}`}>
					<AppIcon icon={<LuArrowRightToLine />} onPress={() => { setIsCompactMode(!isCompactMode) }} />
				</div>
			</div>
		</div>
	)
}

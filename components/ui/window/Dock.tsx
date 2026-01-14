'use client'

import { AppIconType, AppType } from '@/const/appType'
import React, { useState } from 'react'
import { Button, Dialog, DialogTrigger, GridList, GridListItem, Heading, Modal, ModalOverlay, useDragAndDrop } from 'react-aria-components'
import { GrAppsRounded } from 'react-icons/gr'
import { LuArrowRightToLine } from 'react-icons/lu'
import { MdClose } from 'react-icons/md'

interface DockProps {
	apps: Record<string, AppType>
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

function AppList({
	initialItems,
	onClick,
	onReorder,
}: {
	initialItems: AppType[]
	onClick: (app: AppType) => void
	onReorder: (apps: AppType[]) => void
}) {
	const { dragAndDropHooks } = useDragAndDrop({
		getItems(keys) {
			// 選択中キーに対応するアプリ情報を渡す
			return initialItems
				.filter((item) => keys.has(item.title))
				.map((item) => ({
					'text/plain': item.title,
					app: JSON.stringify(item),
				}))
		},
		onReorder(e) {
			if (!e.target.key) return

			// 現在の配列からドラッグ対象とそれ以外を分割
			const draggedKeys = Array.from(e.keys)
			const draggedItems = initialItems.filter((item) => draggedKeys.includes(item.title))
			const remainingItems = initialItems.filter((item) => !draggedKeys.includes(item.title))

			// ドロップ先のインデックスを計算
			const targetIndex = remainingItems.findIndex((item) => item.title === e.target.key)
			if (targetIndex === -1) {
				onReorder(initialItems)
				return
			}

			let insertIndex = targetIndex
			if (e.target.dropPosition === 'after') {
				insertIndex += 1
			}

			const nextItems = [...remainingItems.slice(0, insertIndex), ...draggedItems, ...remainingItems.slice(insertIndex)]

			// 親(Home)の windows を並び替え
			onReorder(nextItems)
		},
	})

	return (
		<GridList
			aria-label="Dock apps"
			selectionMode="multiple"
			dragAndDropHooks={dragAndDropHooks}
			layout="grid"
			className="hidden auto-cols-max grid-flow-col items-end gap-2 sm:grid"
		>
			{initialItems.map((item) => {
				const Icon = item.icon
				return (
					<GridListItem id={item.title} key={item.title} textValue={item.title}>
						<AppIcon icon={Icon} onPress={() => onClick(item)} />
					</GridListItem>
				)
			})}
		</GridList>
	)
}

function AppIcon({ icon, title, onPress, dataTestId }: { icon: AppIconType; title?: string; onPress: () => void; dataTestId?: string }) {
	return (
		<Button
			className="group relative flex cursor-pointer flex-col items-center justify-center p-1 transition-all duration-300 hover:scale-95 sm:p-2"
			onPress={onPress}
			data-testid={dataTestId}
		>
			<div className="flex size-10 items-center justify-center rounded-2xl transition-all duration-300 group-hover:bg-white/10 sm:size-12">
				{React.cloneElement(icon, { className: 'size-8 text-white/90 group-hover:text-white transition-colors duration-300' })}
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
			className={`fixed flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 sm:right-0 sm:bottom-0 ${className} ${isCompactMode ? 'w-fit flex-col sm:right-2 sm:bottom-2 sm:rounded-3xl' : 'flex-row sm:w-full sm:rounded-t-3xl sm:rounded-b-none'} right-2 bottom-2`}
		>
			{!isCompactMode && (
				<>
					<AppList key={activeApps.map((app) => app.title).join('|')} initialItems={activeApps} onClick={onClick} onReorder={onReorder} />

					{/* 区切りの縦棒 */}
					<div className="hidden h-10 w-px rounded-full bg-white/20 sm:block" />
				</>
			)}

			{/* Apps 一覧ポップアップボタン */}
			<div className="relative">
				<DialogTrigger isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
					<AppIcon icon={<GrAppsRounded />} onPress={() => {}} dataTestId="app-list-trigger" />
					<ModalOverlay className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
						<Modal isDismissable className="min-w-full sm:min-w-[600px]">
							<Dialog className="mx-4 rounded-3xl border border-white/10 bg-black/20 p-4 shadow-lg sm:mx-0">
								<div className="mb-4 flex items-center justify-between">
									<Heading slot="title" className="text-4xl font-bold text-white">
										Apps
									</Heading>
									<Button slot="close" className="cursor-pointer transition-all duration-300 hover:scale-95">
										<MdClose className="h-8 w-8 text-white/90 transition-colors duration-300 group-hover:text-white" />
									</Button>
								</div>
								<GridList aria-label="Apps" layout="grid" className="grid auto-cols-max grid-flow-col items-end gap-4">
									{appItems.map((app, index) => {
										const Icon = app.icon
										return (
											<GridListItem key={index}>
												<AppIcon
													icon={Icon}
													title={app.title}
													onPress={() => {
														onClick(app)
														setIsModalOpen(false)
													}}
												/>
											</GridListItem>
										)
									})}
								</GridList>
							</Dialog>
						</Modal>
					</ModalOverlay>
				</DialogTrigger>
			</div>

			<div className="relative hidden sm:block">
				<div className={`transition-all duration-500 ${isCompactMode && 'rotate-180'}`}>
					<AppIcon
						icon={<LuArrowRightToLine />}
						onPress={() => {
							setIsCompactMode(!isCompactMode)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

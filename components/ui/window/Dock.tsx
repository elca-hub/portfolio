'use client'

import { AppIconType, AppType } from '@/const/appType'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { Button, GridList, GridListItem, useDragAndDrop } from 'react-aria-components'
import { GrAppsRounded } from 'react-icons/gr'
import { LuArrowRightToLine } from 'react-icons/lu'
import ModalWindow from './ModalWindow'

// コンパクト化・解除でDockが伸縮するときの動き。バネで少しだけ余韻を残す。
const DOCK_LAYOUT_TRANSITION = { type: 'spring' as const, stiffness: 300, damping: 32, mass: 0.8 }

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
			className="grid auto-cols-max grid-flow-col items-end gap-2"
		>
			{initialItems.map((item) => {
				const Icon = item.icon
				return (
					<GridListItem id={item.title} key={item.title} textValue={item.title}>
						{/* キーボード・スクリーンリーダー用のドラッグハンドル。
							react-aria が slot="drag" の要素に pointer-events: none を強制するため、
							見た目のアイコンとは分離して視覚的に隠した専用ボタンを置く。
							マウスでのドラッグは GridListItem 自体が担当する。 */}
						<Button slot="drag" className="sr-only" />
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
	// ボタンを押した瞬間の状態。アプリ一覧の退場モーションはここを見て始まる。
	const [isCompactMode, setIsCompactMode] = useState(false)
	// Dock自身の見た目(幅・位置・縦並び)の状態。
	// コンパクト化するときは、アプリ一覧が消え終わってから縮み始めたいので isCompactMode とは分けている。
	const [isCollapsed, setIsCollapsed] = useState(false)

	const handleToggleCompact = () => {
		if (isCompactMode) {
			// 解除時はDockが広がるのとアプリ一覧の登場を同時に始める
			setIsCompactMode(false)
			setIsCollapsed(false)
			return
		}
		// コンパクト化時は退場モーションの完了(onExitComplete)を待つ
		setIsCompactMode(true)
	}

	return (
		// ロード時に画面外(下)からせり上がってくるモーション。
		// コンパクト化・解除にともなう幅と位置の変化は layout アニメーションに任せるため、
		// CSS transition は border-radius だけを担当する。
		<motion.div
			layout
			initial={{ y: '150%', opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 260, damping: 30, delay: 0.2, layout: DOCK_LAYOUT_TRANSITION }}
			className={`fixed flex items-center justify-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 shadow-lg backdrop-blur-xl transition-[border-radius] duration-500 ease-out sm:right-0 sm:bottom-0 ${className} ${isCollapsed ? 'w-fit flex-col sm:right-2 sm:bottom-2 sm:rounded-3xl' : 'flex-row sm:w-full sm:rounded-t-3xl sm:rounded-b-none'} right-2 bottom-2`}
		>
			<AnimatePresence initial={false} onExitComplete={() => setIsCollapsed(true)}>
				{!isCompactMode && (
					<motion.div
						layout
						initial={{ opacity: 0, scale: 0.85 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] } }}
						exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2, ease: 'easeIn' } }}
						className="hidden items-center gap-3 sm:flex"
					>
						<AppList key={activeApps.map((app) => app.title).join('|')} initialItems={activeApps} onClick={onClick} onReorder={onReorder} />

						{/* 区切りの縦棒 */}
						<div className="h-10 w-px rounded-full bg-white/20" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Apps 一覧ポップアップボタン */}
			<motion.div layout className="relative">
				<AppIcon icon={<GrAppsRounded />} onPress={() => setIsModalOpen(true)} dataTestId="app-list-trigger" />
				{/* Appのモーダルと同じウインドウ表現を使う */}
				<ModalWindow title="Apps" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCompact>
					{/* 横に並べきれない幅では折り返す */}
					<GridList aria-label="Apps" layout="grid" className="grid grid-cols-2 items-end justify-items-center gap-4 sm:grid-cols-4">
						{appItems.map((app, index) => {
							const Icon = app.icon
							return (
								<GridListItem key={index} textValue={app.title}>
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
				</ModalWindow>
			</motion.div>

			<motion.div layout className="relative hidden sm:block">
				{/* 回転する要素自体に layout を持たせると projection が壊れるため、外側と内側で役割を分ける */}
				<motion.div animate={{ rotate: isCompactMode ? 180 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
					<AppIcon icon={<LuArrowRightToLine />} onPress={handleToggleCompact} dataTestId="dock-compact-trigger" />
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

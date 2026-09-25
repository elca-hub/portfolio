'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import WindowButtons from './WindowButtons'

// ホーム(/)から全画面表示(/[アプリ名])へ移るとき、Windowが画面いっぱいまで広がるモーション
const EXPAND_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
// 全画面表示からホームへ戻るとき、Windowが少し縮みながら消えるモーション
const COLLAPSE_TRANSITION = { duration: 0.28, ease: [0.4, 0, 1, 1] as const }
// 画面遷移をまたがない、通常の登場モーション
const APPEAR_TRANSITION = { duration: 0.4, ease: 'easeOut' as const }
// 全画面表示でAppの中身が現れるときのモーション
const CONTENT_FADE_IN_TRANSITION = { duration: 0.35, ease: 'easeOut' as const }
// 画面遷移の直前に、入れ替わる中身を先に消しておくモーション
const CONTENT_FADE_OUT_TRANSITION = { duration: 0.15, ease: 'easeIn' as const }

// 全画面表示へ遷移する直前に、画面いっぱいまで広がったWindowのタイトルを記録しておくキー。
// 遷移先ではこれを見て「すでに広がりきっているWindowの続き」として描画し、登場モーションを省く。
const EXPANDED_WINDOW_KEY = 'expandedWindow'

type Box = { top: number; left: number; width: number; height: number }

/**
 * 画面遷移をまたぐモーションの進行状況。
 * idle 以外のときは、Windowをその場に固定(position: fixed)して伸び縮みさせる。
 */
type TransitionPhase = 'idle' | 'detached' | 'expanding' | 'collapsing'

/**
 * position: fixed の原点を実測する。
 * 祖先に transform を持つ要素があると fixed の基準が画面ではなくその祖先になるため、
 * 同じ親に一時的な要素を置いて「画面のどこが原点になるのか」を確かめる。
 */
function measureFixedOrigin(el: HTMLElement): { top: number; left: number } {
	const parent = el.parentElement
	if (!parent) return { top: 0, left: 0 }

	const probe = document.createElement('div')
	probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;'
	parent.appendChild(probe)
	const { top, left } = probe.getBoundingClientRect()
	probe.remove()

	return { top, left }
}

/** 全画面表示になったときのWindowの大きさ。スクロールバー領域を含まない実寸を使う。 */
function measureViewport(el: HTMLElement): Box {
	const viewport = el.closest('[data-window-viewport]')
	if (viewport) {
		const { top, left, width, height } = viewport.getBoundingClientRect()
		return { top, left, width, height }
	}
	return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
}

function readExpandedWindowTitle(): string | null {
	if (typeof window === 'undefined') return null
	try {
		return window.sessionStorage.getItem(EXPANDED_WINDOW_KEY)
	} catch {
		return null
	}
}

export default function Window({
	title,
	children,
	onClose,
	isMaximized = false,
	redirectUrl,
	onCopy,
}: {
	title: string
	children: React.ReactNode
	onClose?: () => void
	isMaximized?: boolean
	redirectUrl?: string
	onCopy?: () => void
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const prefersReducedMotion = useReducedMotion()
	const panelRef = useRef<HTMLDivElement>(null)
	const [isHidden, setIsHidden] = useState(false)
	const [isClosed, setIsClosed] = useState(false)
	const [phase, setPhase] = useState<TransitionPhase>('idle')
	// 画面に固定して伸ばすときの、開始位置と終了位置(どちらも fixed の原点からの相対値)
	const [bridge, setBridge] = useState<{ from: Box; to: Box } | null>(null)
	// 直前の画面で広がりきったWindowの続きとして描くかどうか
	const [isContinuation] = useState(() => isMaximized && readExpandedWindowTitle() === title)
	// 全画面表示のときだけ、Appの中身を遅れてフェードインさせる
	const [isContentRevealed, setIsContentRevealed] = useState(!isMaximized)

	const navigateUrl = isMaximized ? '/' : redirectUrl

	// 記録は一度使ったら消す。リロードなどで古い記録が残り続けないようにする。
	useEffect(() => {
		try {
			window.sessionStorage.removeItem(EXPANDED_WINDOW_KEY)
		} catch {
			// 参照できない環境では何もしない
		}
	}, [])

	// 遷移先を先読みしておく。押してから読み込みを始めると、モーションの後に待ち時間が生まれるため。
	useEffect(() => {
		if (!navigateUrl) return
		router.prefetch(navigateUrl)
	}, [navigateUrl, router])

	// 中身を囲む AnimatePresence は initial={false} を指定しているため、その配下では登場モーションが効かない。
	// そのため、描画されたあとに状態を切り替えることでフェードインさせる。
	useEffect(() => {
		if (isContentRevealed) return

		const frameId = requestAnimationFrame(() => setIsContentRevealed(true))
		return () => cancelAnimationFrame(frameId)
	}, [isContentRevealed])

	// 画面に固定した直後のフレームから広がり始める。
	// 固定した瞬間は見た目が変わらないので、そこを起点にすると位置が飛ばない。
	useEffect(() => {
		if (phase !== 'detached') return

		const frameId = requestAnimationFrame(() => setPhase('expanding'))
		return () => cancelAnimationFrame(frameId)
	}, [phase])

	// 閉じるモーションを再生してから親に通知したいので、ここでは状態を倒すだけにする。
	// 実際の削除通知は AnimatePresence の onExitComplete で行う。
	const handleClose = () => {
		setIsClosed(true)
	}

	const handleMinimize = () => {
		setIsHidden(!isHidden)
	}

	const navigate = () => {
		if (!navigateUrl) return
		if (!isMaximized) {
			try {
				window.sessionStorage.setItem(EXPANDED_WINDOW_KEY, title)
			} catch {
				// 参照できない環境では、遷移先の登場モーションが通常どおりになるだけ
			}
		}
		router.push(navigateUrl)
	}

	const handleMaximize = () => {
		if (phase !== 'idle') return
		if (!navigateUrl) return

		// 動きを減らす設定のときは、モーションを挟まずそのまま遷移する
		if (prefersReducedMotion) {
			navigate()
			return
		}

		if (isMaximized) {
			setPhase('collapsing')
			return
		}

		const panel = panelRef.current
		if (!panel) {
			navigate()
			return
		}

		const origin = measureFixedOrigin(panel)
		const current = panel.getBoundingClientRect()
		const viewport = measureViewport(panel)
		setBridge({
			from: { top: current.top - origin.top, left: current.left - origin.left, width: current.width, height: current.height },
			to: { top: viewport.top - origin.top, left: viewport.left - origin.left, width: viewport.width, height: viewport.height },
		})
		setPhase('detached')
	}

	// 伸び縮みが終わってから遷移する。遷移先が描けるまで現在の画面は残るので、
	// 広がりきった状態のまま次の画面につながる。
	const handleAnimationComplete = () => {
		if (phase !== 'expanding' && phase !== 'collapsing') return
		navigate()
	}

	const handleTitleClick = async () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('window', title)
		const url = `${window.location.origin}/?${params.toString()}`

		try {
			await navigator.clipboard.writeText(url)
			if (onCopy) {
				onCopy()
			}
		} catch (error) {
			console.error('Failed to copy to clipboard:', error)
		}
	}

	// 画面に固定して伸ばしている最中かどうか
	const isFloating = phase === 'detached' || phase === 'expanding'
	const isTransitioning = isFloating || phase === 'collapsing'
	const isContentHidden = isTransitioning || !isContentRevealed

	const panelAnimate = () => {
		if (bridge && phase === 'detached') return { opacity: 1, y: 0, scale: 1, ...bridge.from }
		if (bridge && phase === 'expanding') return { opacity: 1, y: 0, scale: 1, ...bridge.to }
		if (phase === 'collapsing') return { opacity: 0, y: 0, scale: 0.96 }
		return { opacity: 1, y: 0, scale: 1 }
	}

	const panelTransition = () => {
		// 固定した瞬間は見た目を変えたくないので、位置合わせだけを一瞬で済ませる
		if (phase === 'detached') return { duration: 0 }
		if (phase === 'expanding') return EXPAND_TRANSITION
		if (phase === 'collapsing') return COLLAPSE_TRANSITION
		return APPEAR_TRANSITION
	}

	return (
		<>
			{/* 画面に固定している間、元の位置に同じ大きさの余白を残して周りがずれないようにする */}
			{isFloating && bridge && <div aria-hidden style={{ width: bridge.from.width, height: bridge.from.height }} />}
			{/* 表示時のフェードインと、closeボタンを押したときの縮小フェードアウト。
			    Window自身に持たせることで、Dockから開いたとき・初回ロード時・全画面表示時のいずれでも効く。 */}
			<AnimatePresence onExitComplete={onClose}>
				{!isClosed && (
					<motion.div
						ref={panelRef}
						// 全画面表示へ遷移してきた直後は、広がりきったWindowがそのまま置き換わるだけなので登場モーションを省く
						initial={isContinuation ? false : { opacity: 0, y: 16 }}
						animate={panelAnimate()}
						exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2, ease: 'easeIn' } }}
						transition={panelTransition()}
						onAnimationComplete={handleAnimationComplete}
						style={isFloating ? { position: 'fixed', zIndex: 50 } : undefined}
						className={`relative rounded-3xl border border-white/10 bg-black/20 p-4 shadow-lg backdrop-blur-xl ${isFloating ? 'overflow-hidden' : isMaximized ? 'absolute inset-0 h-full w-full overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]' : 'h-full w-full'} `}
					>
						<div className="mb-4 grid grid-cols-2 sm:grid-cols-3">
							<div>
								<WindowButtons
									onClose={handleClose}
									onMinimize={handleMinimize}
									onMaximize={handleMaximize}
									isEnabledMinimize={!isMaximized}
									isEnabledMaximize={!isHidden}
									isEnabledClose={!isMaximized}
								/>
							</div>
							<div className="flex items-center justify-center">
								<h1
									onClick={handleTitleClick}
									className="cursor-pointer text-2xl font-bold text-white transition-opacity hover:opacity-70"
									title="クリックしてURLをコピー"
								>
									{title}
								</h1>
							</div>
						</div>
						{/* 初回表示時はアニメーションさせず、最小化・最小化解除のときだけアニメーションさせる */}
						<AnimatePresence initial={false}>
							{!isHidden && (
								<motion.div
									initial={{ height: 0, opacity: 0, y: -10 }}
									animate={{ height: 'auto', opacity: 1, y: 0 }}
									exit={{ height: 0, opacity: 0, y: -10 }}
									transition={{
										duration: 0.3,
										ease: 'easeInOut',
									}}
									className="mx-auto h-full w-full max-w-[1200px] overflow-hidden p-4"
								>
									{/* 全画面表示では、枠が現れたあとに中身をフェードインさせる。
									    また、中身は遷移の前後で入れ替わるため、枠だけを残して先にフェードアウトさせておく。 */}
									<motion.div
										initial={false}
										animate={{ opacity: isContentHidden ? 0 : 1, y: isContentRevealed ? 0 : 8 }}
										transition={
											isTransitioning ? CONTENT_FADE_OUT_TRANSITION : { ...CONTENT_FADE_IN_TRANSITION, delay: isContinuation ? 0.05 : 0.12 }
										}
									>
										{children}
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}

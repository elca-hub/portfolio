'use client'

import { MotionConfig } from 'framer-motion'
import { useEffect, useRef } from 'react'

type InteractiveBackgroundProps = {
	children: React.ReactNode
	// 1分間あたりの「呼吸」回数（デフォルト: 60回）
	breathsPerMinute?: number
}

// ポインタ追従グラデーションの直径。vmax 基準にすることで、画面比率が変わっても見た目の大きさを揃える。
const BLOB_SIZE_VMAX = 90
// ポインタに追いつくまでの時間。追従に少しだけ遅れを持たせる。
const POINTER_TRANSITION = 'transform 300ms ease-out'
// アイドル時のゆっくりした移動。移動そのものは CSS transition に任せるので、
// JS 側は「次のゴール」をこの間隔で決めるだけでよい。
const IDLE_STEP_MS = 6000
const IDLE_TRANSITION = `transform ${IDLE_STEP_MS}ms ease-in-out`
// ポインタが止まってから自動移動に切り替わるまでの時間
const IDLE_DELAY_MS = 10000
// 動きを抑える設定のときの固定位置（画面中央）
const CENTER_TRANSFORM = 'translate3d(50vw, 50vh, 0)'

export function InteractiveBackground({ children, breathsPerMinute = 60 }: InteractiveBackgroundProps) {
	const blobRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const blob = blobRef.current
		if (!blob) return

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		// ポインタが粗いデバイス（スマートフォンなど）には追従先がないので、常に自動移動にする
		const coarsePointer = window.matchMedia('(pointer: coarse)')

		let frameId = 0
		let idleTimerId = 0
		let pendingTransform: string | null = null

		const commit = () => {
			frameId = 0
			if (pendingTransform === null) return
			blob.style.transform = pendingTransform
			pendingTransform = null
		}

		// 位置の更新は state ではなく DOM に直接書き込む。
		// transform だけを動かすので、再レンダリングもレイアウトもペイントも発生せず、合成のみで済む。
		const moveTo = (transform: string, transition: string) => {
			blob.style.transition = transition
			pendingTransform = transform
			// pointermove は 1 フレームに複数回発火しうるため、書き込みは rAF で 1 回にまとめる
			if (!frameId) frameId = requestAnimationFrame(commit)
		}

		const scheduleIdleMove = (delay: number) => {
			window.clearTimeout(idleTimerId)
			idleTimerId = window.setTimeout(() => {
				// vw / vh で指定しておくと、ウインドウサイズが変わっても位置が破綻しない
				moveTo(`translate3d(${Math.random() * 100}vw, ${Math.random() * 100}vh, 0)`, IDLE_TRANSITION)
				scheduleIdleMove(IDLE_STEP_MS)
			}, delay)
		}

		const handlePointerMove = (event: PointerEvent) => {
			moveTo(`translate3d(${event.clientX}px, ${event.clientY}px, 0)`, POINTER_TRANSITION)
			// 操作が続いている間は自動移動に切り替わらないよう、待ち時間を延長し続ける
			scheduleIdleMove(IDLE_DELAY_MS)
		}

		// メディアクエリの変化でモードが変わるため、購読のやり直しをまとめて行う
		const setup = () => {
			window.removeEventListener('pointermove', handlePointerMove)
			window.clearTimeout(idleTimerId)

			if (reduceMotion.matches) {
				moveTo(CENTER_TRANSFORM, 'none')
				return
			}

			if (!coarsePointer.matches) {
				window.addEventListener('pointermove', handlePointerMove)
			}
			scheduleIdleMove(coarsePointer.matches ? 0 : IDLE_DELAY_MS)
		}

		moveTo(CENTER_TRANSFORM, 'none')
		setup()

		reduceMotion.addEventListener('change', setup)
		coarsePointer.addEventListener('change', setup)

		return () => {
			window.removeEventListener('pointermove', handlePointerMove)
			reduceMotion.removeEventListener('change', setup)
			coarsePointer.removeEventListener('change', setup)
			window.clearTimeout(idleTimerId)
			if (frameId) cancelAnimationFrame(frameId)
		}
	}, [])

	return (
		// framer-motion 側のアニメーションも OS の「視差効果を減らす」設定に従わせる
		<MotionConfig reducedMotion="user">
			<div className="relative min-h-screen overflow-hidden bg-gray-300 text-slate-50 dark:bg-slate-950">
				{/* 背景グラデーション。
				    「呼吸」はこのレイヤー全体の opacity アニメーションで表現する。
				    opacity は合成のみで完結するため、以前のように毎フレーム全画面を塗り直す必要がない。
				    opacity-70 はアニメーションが無効な場合（動きを減らす設定）の基準値も兼ねる。 */}
				<div
					aria-hidden
					className="pointer-events-none fixed inset-0 overflow-hidden opacity-70"
					style={{ animation: `breathe ${60 / breathsPerMinute}s ease-in-out infinite` }}
				>
					{/* 四隅の固定グラデーション。一度描いたら変化しない。 */}
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
								radial-gradient(circle at 0% 0%, rgba(94, 234, 212, 0.22), transparent 60%),
								radial-gradient(circle at 100% 100%, rgba(129, 140, 248, 0.22), transparent 60%)
							`,
						}}
					/>
					{/* ポインタ追従グラデーション。transform で動かすだけなので再ペイントが起きない。 */}
					<div
						ref={blobRef}
						className="absolute top-0 left-0 will-change-transform"
						style={{
							width: `${BLOB_SIZE_VMAX}vmax`,
							height: `${BLOB_SIZE_VMAX}vmax`,
							marginLeft: `${-BLOB_SIZE_VMAX / 2}vmax`,
							marginTop: `${-BLOB_SIZE_VMAX / 2}vmax`,
							backgroundImage: 'radial-gradient(circle closest-side, rgba(56, 189, 248, 0.47), transparent)',
						}}
					/>
				</div>
				{/* 横スクロールバーは出さない。また縦スクロールバーの出入りで幅が変わると
				    Windowのフェードイン・縮小解除中に横ブレが起きるため、常に領域を確保しておく。 */}
				<div data-window-viewport className="absolute inset-0 z-10 overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]">
					{children}
				</div>
			</div>
		</MotionConfig>
	)
}

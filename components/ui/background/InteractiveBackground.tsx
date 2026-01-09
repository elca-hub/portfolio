'use client'

import { useEffect, useState } from 'react'

type InteractiveBackgroundProps = {
	children: React.ReactNode
	// 1分間あたりの「呼吸」回数（デフォルト: 60回）
	breathsPerMinute?: number
}

export function InteractiveBackground({ children, breathsPerMinute }: InteractiveBackgroundProps) {
	const [position, setPosition] = useState({ x: 50, y: 50 })
	const [intensity, setIntensity] = useState(0.5)
	const [isMobile, setIsMobile] = useState(false)
	const [isRandom, setIsRandom] = useState(false)
	const [target, setTarget] = useState<{ x: number; y: number } | null>(null)
	const [lastPointerAt, setLastPointerAt] = useState<number | null>(null)

	// デバイスがスマートフォン（ポインタが粗いデバイス）かどうかを判定
	useEffect(() => {
		if (typeof window === 'undefined') return

		const mediaQuery = window.matchMedia('(pointer: coarse)')
		const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
			setIsMobile(event.matches)
		}

		// 初期判定
		handleChange(mediaQuery)

		// 監視（対応ブラウザのみ）
		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleChange)
			return () => mediaQuery.removeEventListener('change', handleChange)
		} else if (typeof mediaQuery.addListener === 'function') {
			mediaQuery.addListener(handleChange)
			return () => mediaQuery.removeListener(handleChange)
		}
	}, [])

	// PC ではポインタに追従させる（スマホの場合は無効）
	useEffect(() => {
		if (isMobile) return

		const handlePointerMove = (event: PointerEvent) => {
			const x = (event.clientX / window.innerWidth) * 100
			const y = (event.clientY / window.innerHeight) * 100

			setPosition({ x, y })
			setIsRandom(false)
			setTarget(null) // 新しいカーソル位置を起点にしたいので一度リセット
			setLastPointerAt(Date.now())
		}

		window.addEventListener('pointermove', handlePointerMove)

		return () => {
			window.removeEventListener('pointermove', handlePointerMove)
		}
	}, [isMobile])

	// カーソルイベントから 10 秒経過したらランダム移動モードに切り替え
	useEffect(() => {
		// スマホは常にランダムモード
		if (isMobile) {
			setIsRandom(true)
			// アイドル状態に入るので次のゴールはランダムに決める
			setTarget(null)
			return
		}

		// まだ一度もポインタが動いていない場合は何もしない
		if (lastPointerAt === null) return

		const timeoutId = window.setTimeout(() => {
			setIsRandom(true)
		}, 10000)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [isMobile, lastPointerAt])

	// ランダム移動モードの挙動（スマホ + PC のアイドル時）
	useEffect(() => {
		if (!isRandom) return

		const intervalId = window.setInterval(() => {
			setPosition((prev) => {
				// ゴールが未設定なら現在位置を起点に新しいゴールを設定
				let nextTarget = target
				if (!nextTarget) {
					nextTarget = {
						x: Math.random() * 100,
						y: Math.random() * 100,
					}
					setTarget(nextTarget)
				}

				const dx = nextTarget.x - prev.x
				const dy = nextTarget.y - prev.y
				const distance = Math.sqrt(dx * dx + dy * dy)

				// ゴールに十分近づいたら、新しいゴールを設定
				const threshold = 1 // 1% 以内まで来たら到達とみなす
				if (distance < threshold) {
					setTarget(null)
					return prev
				}

				// 現在位置からゴール方向へ少しずつ移動
				const stepRatio = 0.01 // 距離の 2% だけ進む（かなりゆっくり）
				const stepX = (dx / distance) * distance * stepRatio
				const stepY = (dy / distance) * distance * stepRatio

				const nextX = Math.min(100, Math.max(0, prev.x + stepX))
				const nextY = Math.min(100, Math.max(0, prev.y + stepY))

				return { x: nextX, y: nextY }
			})
		}, 50) // 50ms ごとに少しずつゴールに向けて移動

		return () => {
			window.clearInterval(intervalId)
		}
	}, [isRandom, target])

	// 1分間に x 回「呼吸」するように、グラデーションの強さを変化させる
	useEffect(() => {
		const bpm = breathsPerMinute ?? 60 // デフォルト60回/分
		const frequencyHz = bpm / 60 // 1秒間あたりの回数

		let frameId: number
		const start = performance.now()

		const animate = (time: number) => {
			const elapsedSec = (time - start) / 1000
			// 周波数 frequencyHz: sin(2π f t) を 0〜1 に正規化
			const value = (Math.sin(2 * Math.PI * frequencyHz * elapsedSec) + 1) / 2
			setIntensity(value)
			frameId = requestAnimationFrame(animate)
		}

		frameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(frameId)
		}
	}, [breathsPerMinute])

	return (
		<div className="relative min-h-screen overflow-hidden bg-gray-300 text-slate-50 dark:bg-slate-950">
			<div
				className="pointer-events-none fixed inset-0 opacity-70 transition-[background-position] duration-300 ease-out"
				style={{
					backgroundImage: `
            radial-gradient(circle at ${position.x}% ${position.y}%, rgba(56, 189, 248, ${0.35 + 0.25 * intensity}), transparent 55%),
            radial-gradient(circle at 0% 0%, rgba(94, 234, 212, ${0.15 + 0.15 * intensity}), transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(129, 140, 248, ${0.15 + 0.15 * intensity}), transparent 60%)
          `,
				}}
			/>
			<div className="absolute inset-0 z-10 overflow-y-auto">{children}</div>
		</div>
	)
}

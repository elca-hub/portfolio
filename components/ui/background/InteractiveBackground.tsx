'use client'

import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

type InteractiveBackgroundProps = {
  children: React.ReactNode
  // 1分間あたりの「呼吸」回数（デフォルト: 60回）
  breathsPerMinute?: number
}

export function InteractiveBackground({
  children,
  breathsPerMinute,
}: InteractiveBackgroundProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [intensity, setIntensity] = useState(0.5)
  const [isMobile, setIsMobile] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null)
  const [lastPointerAt, setLastPointerAt] = useState<number | null>(null)

  // framer-motionのmotion valueを使って滑らかなアニメーションを実現
  const x = useMotionValue(50)
  const y = useMotionValue(50)

  // springアニメーションでゆっくりとした動きを実現
  const springConfig = { stiffness: 0.05, damping: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

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

  // springXとspringYの値を監視してpositionを更新（ランダム移動時のみ）
  useEffect(() => {
    if (!isRandom) return

    const unsubscribeX = springX.on('change', (latest) => {
      setPosition((prev) => ({ ...prev, x: latest }))
    })
    const unsubscribeY = springY.on('change', (latest) => {
      setPosition((prev) => ({ ...prev, y: latest }))
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [isRandom, springX, springY])

  // PC ではポインタに追従させる（スマホの場合は無効）
  useEffect(() => {
    if (isMobile) return

    const handlePointerMove = (event: PointerEvent) => {
      const newX = (event.clientX / window.innerWidth) * 100
      const newY = (event.clientY / window.innerHeight) * 100

      // カーソル追従時は直接positionを更新（スプリングアニメーションなし）
      setPosition({ x: newX, y: newY })
      // motion valueも同期
      x.set(newX)
      y.set(newY)
      setIsRandom(false)
      setTarget(null) // 新しいカーソル位置を起点にしたいので一度リセット
      setLastPointerAt(Date.now())
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [isMobile, x, y])

  // カーソルイベントから 10 秒経過したらランダム移動モードに切り替え
  useEffect(() => {
    // スマホは常にランダムモード
    if (isMobile) {
      setIsRandom(true)
      // アイドル状態に入るので次のゴールはランダムに決める
      setTarget(null)
      // 初期位置を設定（スマホの場合は中央から開始）
      x.set(50)
      y.set(50)
      setPosition({ x: 50, y: 50 })
      return
    }

    // まだ一度もポインタが動いていない場合は何もしない
    if (lastPointerAt === null) return

    const timeoutId = window.setTimeout(() => {
      // ランダム移動モードに入る前に、現在位置（最後のマウス位置）をmotion valueに同期
      setPosition((currentPos) => {
        x.set(currentPos.x)
        y.set(currentPos.y)
        return currentPos
      })
      setIsRandom(true)
      setTarget(null) // 現在位置を起点に新しいゴールを設定
    }, 10000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isMobile, lastPointerAt, x, y])

  // ランダム移動モードの挙動（スマホ + PC のアイドル時）
  // framer-motionを使ってゴールに向かって滑らかに移動
  useEffect(() => {
    if (!isRandom) return

    // ゴールが未設定なら現在位置（最後のマウス位置）を起点に新しいゴールを設定
    if (!target) {
      // 現在位置を起点として、ランダムなゴールを設定
      const newTarget = {
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      setTarget(newTarget)
      // motion valueを更新（framer-motionが自動的にアニメーション）
      // 現在位置から新しいゴールへ滑らかに移動
      x.set(newTarget.x)
      y.set(newTarget.y)
      return
    }

    // 現在位置とゴールの距離を計算
    const dx = target.x - position.x
    const dy = target.y - position.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // ゴールに十分近づいたら、現在位置を起点に新しいゴールを設定
    const threshold = 1 // 1% 以内まで来たら到達とみなす
    if (distance < threshold) {
      // 現在位置を起点として、次のランダムなゴールを設定
      const newTarget = {
        x: Math.random() * 100,
        y: Math.random() * 100,
      }
      setTarget(newTarget)
      // motion valueを更新（framer-motionが自動的にアニメーション）
      x.set(newTarget.x)
      y.set(newTarget.y)
    }
  }, [isRandom, target, position, x, y])

  // 1分間に x 回「呼吸」するように、グラデーションの強さを変化させる
  useEffect(() => {
    const bpm = breathsPerMinute ?? 60 // デフォルト60回/分
    const frequencyHz = bpm / 60 // 1秒間あたりの回数

    let frameId: number
    const start = performance.now()

    const animate = (time: number) => {
      const elapsedSec = (time - start) / 1000
      // 周波数 frequencyHz: sin(2π f t) を 0〜1 に正規化
      const value =
        (Math.sin(2 * Math.PI * frequencyHz * elapsedSec) + 1) / 2
      setIntensity(value)
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [breathsPerMinute])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
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
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  )
}



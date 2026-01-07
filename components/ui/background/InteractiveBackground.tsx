'use client'

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

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100

      setPosition({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

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



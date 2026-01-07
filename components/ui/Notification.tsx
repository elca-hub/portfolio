'use client'

import { AnimatePresence, motion } from 'framer-motion'

interface NotificationProps {
  isVisible: boolean
  message: string
  type?: 'success' | 'default'
}

export default function Notification({ isVisible, message, type = 'default' }: NotificationProps) {
  const getClassName = () => {
    const commonClasses = "absolute bottom-full mb-4 px-6 py-3 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg"
    if (type === 'success') {
      return `${commonClasses} bg-green-500/20 border-green-400/30`
    }
    return commonClasses
  }

  const getTextClassName = () => {
    const commonClasses = "text-white text-lg font-medium"
    if (type === 'success') {
      return `${commonClasses} text-green-100`
    }
    return commonClasses
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={getClassName()}
        >
          <p className={getTextClassName()}>{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


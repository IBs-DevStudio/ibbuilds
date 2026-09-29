'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const greetings = [
  'Hello', 'नमस्ते', 'Bonjour', 'ನಮಸ್ಕಾರ',
  'Hola', 'こんにちは', 'Ciao', '안녕하세요', 'Hello',
]

export default function HelloIntro() {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (i < greetings.length - 1) {
      const t = setTimeout(() => setI(i + 1), 450)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [i])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="text-5xl font-semibold text-white md:text-7xl"
            >
              {greetings[i]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
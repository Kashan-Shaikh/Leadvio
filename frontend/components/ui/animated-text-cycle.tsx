"use client"

import { useEffect, useState } from "react"

interface AnimatedTextCycleProps {
  words: string[]
  className?: string
  interval?: number
}

export function AnimatedTextCycle({ words, className = "", interval = 3000 }: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, 300)
    }, interval)

    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span
      className={`transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } inline-block ${className}`}
    >
      {words[currentIndex]}
    </span>
  )
}

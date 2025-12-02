"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextHeroProps {
  words: string[]
  className?: string
}

export function AnimatedTextHero({ words, className = "" }: AnimatedTextHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === words.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2500)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, words])

  return (
    <div className={`relative flex w-full justify-center overflow-hidden ${className}`}>
      &nbsp;
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="absolute font-semibold"
          initial={{ opacity: 0, y: "-100" }}
          transition={{ type: "spring", stiffness: 50 }}
          animate={
            titleNumber === index
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {
                  y: titleNumber > index ? -150 : 150,
                  opacity: 0,
                }
          }
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

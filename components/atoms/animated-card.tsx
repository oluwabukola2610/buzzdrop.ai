"use client"

import type { FC, ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

const AnimatedCard: FC<AnimatedCardProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "relative rounded-xl p-6 bg-secondary/50 backdrop-blur-sm border border-gray-800 gradient-border",
        className,
      )}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard

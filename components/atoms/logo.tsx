"use client"

import type { FC } from "react"
import { Zap } from "lucide-react"
import { motion } from "framer-motion"

interface LogoProps {
  className?: string
}

const Logo: FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: 0.1,
        }}
        className="relative"
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-50"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="font-space-grotesk font-bold text-xl"
      >
        <span className="gradient-text">BuzzDrop</span>
        <span className="text-white">.ai</span>
      </motion.div>
    </div>
  )
}

export default Logo

"use client"

import type { FC, ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
}

const AnimatedButton: FC<AnimatedButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
      <Button
        variant={variant}
        size={size}
        className={cn(
          "relative overflow-hidden",
          variant === "default" &&
            "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
          className,
        )}
        onClick={onClick}
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.span>
      </Button>
      {variant === "default" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md blur-md opacity-50"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      )}
    </motion.div>
  )
}

export default AnimatedButton

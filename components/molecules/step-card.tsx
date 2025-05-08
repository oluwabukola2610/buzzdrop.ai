"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StepCardProps {
  step: number
  title: string
  description: string
  icon: LucideIcon
  delay?: number
}

const StepCard: FC<StepCardProps> = ({ step, title, description, icon: Icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col md:flex-row gap-6 items-start"
    >
      <div className="flex-shrink-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.5,
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative"
        >
          <span className="absolute -top-2 -right-2 bg-background border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {step}
          </span>
          <Icon className="h-8 w-8 text-white" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-50"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}

export default StepCard

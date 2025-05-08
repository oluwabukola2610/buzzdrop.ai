"use client"

import type { FC, ReactNode } from "react"
import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string | ReactNode
  centered?: boolean
  className?: string
}

const SectionHeading: FC<SectionHeadingProps> = ({ title, subtitle, centered = false, className = "" }) => {
  return (
    <div className={`space-y-4 mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold gradient-text"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-300"
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  )
}

export default SectionHeading

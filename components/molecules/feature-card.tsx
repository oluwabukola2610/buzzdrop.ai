"use client"

import type { FC } from "react"
import type { LucideIcon } from "lucide-react"
import AnimatedCard from "@/components/atoms/animated-card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay}>
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </AnimatedCard>
  )
}

export default FeatureCard

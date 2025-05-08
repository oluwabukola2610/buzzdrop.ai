"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import AnimatedButton from "@/components/atoms/animated-button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  delay?: number
}

const PricingCard: FC<PricingCardProps> = ({ title, price, description, features, popular = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl p-6 h-full flex flex-col ${
        popular
          ? "bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 border-purple-500"
          : "bg-secondary/50 backdrop-blur-sm border-gray-800"
      } border relative`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full">
          Most Popular
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-gray-400">/month</span>}
      </div>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <AnimatedButton variant={popular ? "default" : "outline"} className="w-full">
        {popular ? "Get Started" : "Try Free"}
      </AnimatedButton>
    </motion.div>
  )
}

export default PricingCard

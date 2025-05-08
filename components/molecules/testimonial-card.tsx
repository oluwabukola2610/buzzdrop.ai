"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  rating: number
  avatarUrl: string
  delay?: number
}

const TestimonialCard: FC<TestimonialCardProps> = ({ name, role, content, rating, avatarUrl, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl p-6 bg-secondary/50 backdrop-blur-sm border border-gray-800 h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
        ))}
      </div>
      <p className="text-gray-300 mb-6 flex-grow">{content}</p>
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={avatarUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard

"use client"

import type { FC } from "react"
import SectionHeading from "@/components/atoms/section-heading"
import TestimonialCard from "@/components/molecules/testimonial-card"

const Testimonials: FC = () => {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Content Creator",
      content:
        "BuzzDrop.ai has completely transformed my content workflow. I save hours every week on caption writing and hashtag research!",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jamie Chen",
      role: "Social Media Manager",
      content:
        "The AI-generated captions are surprisingly good and on-brand. It's like having a personal copywriter for all my social posts.",
      rating: 5,
      avatarUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Taylor Morgan",
      role: "Lifestyle Influencer",
      content:
        "I was skeptical at first, but BuzzDrop.ai has become an essential part of my content strategy. The platform optimization feature is a game-changer.",
      rating: 4,
      avatarUrl: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="What Creators Are Saying"
          subtitle="Join thousands of content creators who trust BuzzDrop.ai"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              avatarUrl={testimonial.avatarUrl}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

"use client"

import type { FC } from "react"
import { Upload, Sparkles, Send } from "lucide-react"
import SectionHeading from "@/components/atoms/section-heading"
import StepCard from "@/components/molecules/step-card"

const HowItWorks: FC = () => {
  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Content",
      description: "Simply upload your images or videos to BuzzDrop.ai's intuitive platform.",
    },
    {
      step: 2,
      icon: Sparkles,
      title: "AI Analysis & Generation",
      description: "Our AI analyzes your content and generates platform-specific captions and hashtags.",
    },
    {
      step: 3,
      icon: Send,
      title: "Schedule & Post",
      description: "Review, edit if needed, and schedule your posts for optimal engagement times.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="How BuzzDrop.ai Works"
          subtitle="Three simple steps to transform your content strategy"
          centered
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 mt-12">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step.step}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

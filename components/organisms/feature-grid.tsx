"use client"

import type { FC } from "react"
import { Sparkles, Zap, BarChart3, Calendar } from "lucide-react"
import SectionHeading from "@/components/atoms/section-heading"
import FeatureCard from "@/components/molecules/feature-card"

const FeatureGrid: FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Captions",
      description: "Generate engaging captions tailored to your content and audience with our advanced AI technology.",
    },
    {
      icon: Zap,
      title: "Instant Hashtags",
      description: "Get relevant, trending hashtags that maximize your content's reach and engagement.",
    },
    {
      icon: BarChart3,
      title: "Platform Optimization",
      description: "Automatically optimize your content for Instagram, TikTok, and X to maximize performance.",
    },
    {
      icon: Calendar,
      title: "Scheduling Queue",
      description: "Plan and schedule your content calendar for consistent posting and better audience engagement.",
    },
  ]

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Features That Set Us Apart"
          subtitle="Everything you need to streamline your content creation workflow"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid

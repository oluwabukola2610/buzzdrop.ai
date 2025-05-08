"use client"

import type { FC } from "react"
import SectionHeading from "@/components/atoms/section-heading"
import PricingCard from "@/components/molecules/pricing-card"

const PricingPlans: FC = () => {
  const plans = [
    {
      title: "Starter",
      price: "Free",
      description: "Perfect for trying out BuzzDrop.ai",
      features: [
        "5 AI-generated captions per month",
        "Basic hashtag suggestions",
        "Single platform optimization",
        "Community support",
      ],
      popular: false,
    },
    {
      title: "Creator",
      price: "$19",
      description: "Ideal for active content creators",
      features: [
        "50 AI-generated captions per month",
        "Advanced hashtag research",
        "Multi-platform optimization",
        "Content scheduling",
        "Priority support",
      ],
      popular: true,
    },
    {
      title: "Pro",
      price: "$49",
      description: "For professional creators and brands",
      features: [
        "Unlimited AI-generated captions",
        "Premium hashtag research",
        "Advanced analytics",
        "Team collaboration",
        "API access",
        "Dedicated support",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Simple, Transparent Pricing" subtitle="Choose the plan that fits your needs" centered />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingPlans

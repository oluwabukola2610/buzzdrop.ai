"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import SectionHeading from "@/components/atoms/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FaqSection: FC = () => {
  const faqs = [
    {
      question: "How does BuzzDrop.ai generate captions?",
      answer:
        "BuzzDrop.ai uses advanced AI models trained on millions of successful social media posts to generate captions that are engaging, relevant, and tailored to your specific content and audience.",
    },
    {
      question: "Can I edit the AI-generated captions?",
      answer:
        "While our AI generates high-quality captions, you have full control to edit, refine, or completely rewrite them to match your unique voice and style.",
    },
    {
      question: "Which social media platforms are supported?",
      answer:
        "Currently, BuzzDrop.ai optimizes content for Instagram, TikTok, and X (formerly Twitter). We're constantly working to add support for more platforms based on user feedback.",
    },
    {
      question: "How accurate are the hashtag suggestions?",
      answer:
        "Our hashtag suggestions are based on real-time trend analysis and engagement metrics, ensuring you get relevant and effective hashtags that maximize your content's reach and discoverability.",
    },
    {
      question: "Is there a limit to how many posts I can schedule?",
      answer:
        "The number of posts you can schedule depends on your subscription plan. Free users can schedule up to 5 posts, while paid plans offer increased or unlimited scheduling capabilities.",
    },
  ]

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about BuzzDrop.ai"
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-800 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export default FaqSection

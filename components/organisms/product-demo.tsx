"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import SectionHeading from "@/components/atoms/section-heading"

const ProductDemo: FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="See BuzzDrop.ai in Action"
          subtitle="Watch how our platform transforms your content workflow"
          centered
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto mt-12 rounded-xl overflow-hidden gradient-border"
        >
          <div className="aspect-w-16 aspect-h-9 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 rounded-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt="BuzzDrop.ai Product Demo"
                    fill
                    className="object-cover rounded-xl"
                  />

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" fill="white" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-30"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ProductDemo

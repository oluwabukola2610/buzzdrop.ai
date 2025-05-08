"use client"

import { useState, type FC } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import AnimatedButton from "@/components/atoms/animated-button"
import { Input } from "@/components/ui/input"

const EmailCapture: FC = () => {
  const [email, setEmail] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-xl overflow-hidden gradient-border"
        >
          <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Content?</h2>
            <p className="text-xl text-gray-300 mb-8">Join the waitlist and be the first to experience BuzzDrop.ai</p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={()=>setEmail(email)}
                value={email}
                name="email"
                className="bg-background/50 backdrop-blur-sm border-gray-700 h-12"
              />
              <AnimatedButton className="h-12">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Join Waitlist</span>
                </div>
              </AnimatedButton>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              By joining, you agree to our Terms of Service and Privacy Policy
            </p>
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

export default EmailCapture

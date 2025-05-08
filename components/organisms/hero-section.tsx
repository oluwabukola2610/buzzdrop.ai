"use client";

import type { FC } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, ArrowRight } from "lucide-react";
import AnimatedButton from "@/components/atoms/animated-button";
import { useMobile } from "@/hooks/use-mobile";
import FileUpload from "../molecules/FileUpload";

const HeroSection: FC = () => {
  const isMobile = useMobile();

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Transform Your <span className="gradient-text">Content</span> with
              AI-Powered Captions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              BuzzDrop.ai helps creators go from raw content to AI-generated
              captions and hashtags to schedule-ready posts for Instagram,
              TikTok, and X.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AnimatedButton className="px-8 py-6 text-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Get Started</span>
                </div>
              </AnimatedButton>

              <AnimatedButton variant="outline" className="px-8 py-6 text-lg">
                <div className="flex items-center gap-2">
                  <a href="#how-it-works">See How It Works</a>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </AnimatedButton>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <FileUpload />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

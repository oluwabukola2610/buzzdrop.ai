"use client"

import type { FC } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu } from "lucide-react"
import Logo from "@/components/atoms/logo"
import AnimatedButton from "@/components/atoms/animated-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  // { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
]

const Navbar: FC = () => {
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.8)"])
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(8px)"])

  const isMobile = useMobile()

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Logo />

        {!isMobile && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
        )}

        {!isMobile ? (
          <AnimatedButton >Get Started</AnimatedButton>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-8">
                <Logo className="mb-4" />
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href}  className="text-lg font-medium py-2 border-b border-gray-800">
                    {link.name}
                  </a>
                ))}
                <AnimatedButton className="mt-4">Get Early Access</AnimatedButton>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar

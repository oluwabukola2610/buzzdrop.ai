"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Github } from "lucide-react"
import Logo from "@/components/atoms/logo"

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
        { name: "Roadmap", href: "#" },
      ],
    },
    // {
    //   title: "Company",
    //   links: [
    //     { name: "About", href: "#" },
    //     { name: "Blog", href: "#" },
    //     { name: "Careers", href: "#" },
    //     { name: "Contact", href: "#" },
    //   ],
    // },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
  ]

  return (
    <footer className="py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-400 mb-6 max-w-md">
              BuzzDrop.ai is the ultimate content-first AI tool built for solo creators and Gen Z brands to streamline
              their social media workflow.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} BuzzDrop.ai. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">Designed with ❤️ for creators everywhere</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

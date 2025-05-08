import Navbar from "@/components/organisms/navbar"
import HeroSection from "@/components/organisms/hero-section"
import FeatureGrid from "@/components/organisms/feature-grid"
import HowItWorks from "@/components/organisms/how-it-works"
import ProductDemo from "@/components/organisms/product-demo"
import Testimonials from "@/components/organisms/testimonials"
import PricingPlans from "@/components/organisms/pricing-plans"
import FaqSection from "@/components/organisms/faq-section"
import EmailCapture from "@/components/organisms/email-capture"
import Footer from "@/components/organisms/footer"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="noise-bg">
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />

        <Navbar />
        <HeroSection />
        <FeatureGrid />
        <HowItWorks />
        <ProductDemo />
        <Testimonials />
        {/* <PricingPlans /> */}
        <FaqSection />
        <EmailCapture />
        <Footer />
      </div>
    </main>
  )
}

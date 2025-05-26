import Navbar from "@/components/organisms/navbar";
import HeroSection from "@/components/organisms/hero-section";
import FeatureGrid from "@/components/organisms/feature-grid";
import HowItWorks from "@/components/organisms/how-it-works";
import Testimonials from "@/components/organisms/testimonials";
import FaqSection from "@/components/organisms/faq-section";
import Footer from "@/components/organisms/footer";
import ProductDemo from "@/components/organisms/product-demo";

export default function Home() {
  return (
    <main className="relative overflow-hidden p-4">
      <div className="noise-bg">
        <div className="glow glow-1" />
        <div className="glow glow-2" />
        <div className="glow glow-3" />
        <Navbar />
        <HeroSection />
        <FeatureGrid />
        <ProductDemo />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <Footer />
      </div>
    </main>
  );
}

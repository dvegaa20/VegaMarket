import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import FeaturedTemplates from "@/components/sections/FeaturedTemplates";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Cta from "@/components/sections/Cta";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
      <Header />
      <Hero />
      <FeaturedTemplates />
      <Features />
      <Showcase />
      <Stats />
      <Testimonials />
      <Pricing />
      <Cta />
      <Contact />
      <Footer />
    </main>
  );
}

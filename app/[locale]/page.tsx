import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Clients from "@/components/sections/Clients";
import Cta from "@/components/sections/Cta";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
      <Hero />
      <Clients />
      <Features />
      <Showcase />
      <Stats />
      <Testimonials />
      <Pricing />
      <Cta />
      <Contact />
    </main>
  );
}

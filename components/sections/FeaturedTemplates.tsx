"use client";

import Carousel from "./Carousel";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { templates } from "@/lib/data";
import Link from "next/link";

export default function FeaturedTemplates() {
  const featuredTemplates = templates.filter((template) => template.featured);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="features"
      className="w-full py-20 md:py-28 lg:py-36 bg-muted/30 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-0 w-[30%] h-[30%] rounded-full bg-violet-500/5 blur-[100px]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
            <span>Templates</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Featured Templates
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-[700px] text-muted-foreground text-lg"
          >
            Handpicked designs that stand out for their exceptional quality and
            attention to detail.
          </motion.p>
        </motion.div>
      </div>

      <Carousel templates={featuredTemplates} />

      <div className="flex justify-center mt-12">
        <Link href="/templates">
          <Button size="lg" className="group">
            Explore All Templates
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

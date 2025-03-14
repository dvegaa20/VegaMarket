"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      quote: t("items.0.quote"),
      author: t("items.0.author"),
      role: "CEO, TechStart Inc.",
      avatar: "/profile1.svg",
      company: "/company1.svg",
    },
    {
      quote: t("items.1.quote"),
      author: t("items.1.author"),
      role: "COO, Global Solutions",
      avatar: "/profile2.svg",
      company: "/company2.svg",
    },
    {
      quote: t("items.2.quote"),
      author: t("items.2.author"),
      role: "Marketing Director, Retail Giant",
      avatar: "/profile3.svg",
      company: "/company3.svg",
    },
    {
      quote: t("items.3.quote"),
      author: t("items.3.author"),
      role: "CTO, Innovation Labs",
      avatar: "/profile4.svg",
      company: "/company4.svg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useMobile();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="w-full py-20 md:py-28 lg:py-36 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[30%] h-[30%] rounded-full bg-violet-500/5 blur-[100px]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
            <span>{t("testimonials")}</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>

          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative mt-10 max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div className="relative h-[400px] md:h-[300px]">
              <AnimatePresence mode="wait">
                {testimonials.map(
                  (testimonial, index) =>
                    index === activeIndex && (
                      <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="h-full bg-background/50 backdrop-blur-sm border border-primary/10 shadow-lg p-8 md:p-10">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <Quote className="h-12 w-12 text-primary/20 mb-6" />
                              <p className="text-center text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                                "{testimonial.quote}"
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                                  <Image
                                    src={
                                      testimonial.avatar || "/placeholder.svg"
                                    }
                                    alt={testimonial.author}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold">
                                    {testimonial.author}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {testimonial.role}
                                  </p>
                                </div>
                              </div>
                              <Image
                                src={testimonial.company || "/placeholder.svg"}
                                alt="Company logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto opacity-80"
                              />
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-10 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:text-primary hidden md:flex"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous testimonial</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:text-primary hidden md:flex"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next testimonial</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

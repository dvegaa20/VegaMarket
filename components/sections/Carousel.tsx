"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FeaturedTemplate({ templates }: FeaturedTemplateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + templates.length) % templates.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle autoplay
  useEffect(() => {
    if (autoplay && !isHovered) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, isHovered, templates.length]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden rounded-xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0,
                scale: currentIndex === index ? 1 : 1.1,
                zIndex: currentIndex === index ? 10 : 0,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-16">
                  <Badge className="w-fit mb-4">{template.category}</Badge>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {template.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {template.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(template.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {template.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({template.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/templates/${template.id}`}>
                      <Button className="w-full sm:w-auto">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                    </Link>
                    <Link href={`/preview/${template.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Eye className="mr-2 h-4 w-4" />
                        Live Preview
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative hidden md:block">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={
                        template.thumbnail ||
                        "/placeholder.svg?height=600&width=800"
                      }
                      alt={template.title}
                      width={800}
                      height={600}
                      className="object-cover rounded-r-xl h-full w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-all duration-200"
        aria-label="Previous template"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background transition-all duration-200"
        aria-label="Next template"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 py-6 flex items-center gap-2">
        {templates.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

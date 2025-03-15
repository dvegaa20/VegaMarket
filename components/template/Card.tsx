"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl hover:shadow-primary/5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={template.thumbnail}
          alt={template.title}
          width={800}
          height={450}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay with actions on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(20px)",
            opacity: isHovered ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <a href={template.demoUrl} target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary" className="rounded-full">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </a>
          <Link href={`/templates/${template.id}`}>
            <Button size="sm" className="rounded-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </Link>
        </div>

        {/* Like button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 ${
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Category badge */}
        <Badge className="absolute top-3 left-3 z-10">
          {template.category}
        </Badge>

        {/* New or Featured badge */}
        {template.isNew && (
          <Badge
            variant="destructive"
            className="absolute bottom-3 left-3 z-10"
          >
            New
          </Badge>
        )}
        {template.featured && !template.isNew && (
          <Badge variant="secondary" className="absolute bottom-3 left-3 z-10">
            Featured
          </Badge>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {template.title}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
            <span className="text-sm">{template.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 h-10">
          {template.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-lg">${template.price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">
            {template.sales}+ sales
          </p>
        </div>
      </div>
    </motion.div>
  );
}

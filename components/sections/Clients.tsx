"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Clients() {
  const t = useTranslations("clients");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const clients = [
    "/company1.svg",
    "/company2.svg",
    "/company3.svg",
    "/company4.svg",
    "/company5.svg",
    "/company6.svg",
    "/company7.svg",
    "/company8.svg",
    "/company9.svg",
    "/company10.svg",
    "/company11.svg",
    "/company12.svg",
    "/company13.svg",
    "/company14.svg",
    "/company15.svg",
    "/company16.svg",
    "/company17.svg",
    "/company18.svg",
  ];

  return (
    <section
      ref={containerRef}
      className="w-full py-12 md:py-16 overflow-hidden border-t border-b border-border/40 bg-muted/30 backdrop-blur-sm"
    >
      <div className="container px-4 md:px-6 mb-8">
        <h2 className="text-center text-lg font-medium text-muted-foreground">
          {t("title")}
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div className="flex space-x-12 py-4" style={{ x: x1 }}>
          {clients.map((client, index) => (
            <div
              key={`client-1-${index}`}
              className="flex-shrink-0 h-12 w-36 flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={client || "/placeholder.svg"}
                alt={`Client ${index + 1}`}
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden mt-4">
        <motion.div className="flex space-x-12 py-4" style={{ x: x2 }}>
          {[...clients].reverse().map((client, index) => (
            <div
              key={`client-2-${index}`}
              className="flex-shrink-0 h-12 w-36 flex items-center justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={client}
                alt={`Client ${index + 9}`}
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

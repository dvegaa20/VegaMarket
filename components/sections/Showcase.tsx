"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle, BarChart3, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Showcase() {
  const t = useTranslations("showcase");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  const benefits = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4")];

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="w-full py-20 md:py-28 lg:py-36 bg-muted/30 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-60"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
              <span>{t("showcase")}</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("subtitle")}
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <Button className="rounded-full group">
              {t("learnMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 relative"
            style={{ scale: imageScale, opacity: imageOpacity }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-xl blur-xl opacity-50 -z-10"></div>
            <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
              <Image
                src="/hero.png"
                width={600}
                height={600}
                alt="Platform Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-violet-500/10 pointer-events-none"></div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -right-6 bg-background rounded-lg p-4 shadow-lg border border-border/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("imageDesc1")}</p>
                  <p className="text-2xl font-bold text-primary">+27%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-lg border border-border/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("imageDesc2")}</p>
                  <p className="text-2xl font-bold text-primary">98%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

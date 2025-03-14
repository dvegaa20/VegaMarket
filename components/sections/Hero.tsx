"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px]"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 relative">
          <motion.div
            className="space-y-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              <span>{t("introducing")} Quantum 2.0</span>
            </motion.div>

            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("title")}{" "}
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Quantum
              </span>{" "}
              {t("title2")}
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("subtitle")}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:pl-9 pl-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-lg shadow-primary/20 group"
            >
              {t("primaryCta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 hover:text-primary"
              onClick={() => setVideoOpen(true)}
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              {t("secondaryCta")}
            </Button>
          </motion.div>

          <motion.div
            className="relative w-full max-w-5xl mt-16 rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/10 aspect-video"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-violet-500/20 z-10 pointer-events-none"></div>
            <img
              src="/hero.png"
              alt="Quantum Dashboard"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 text-primary shadow-lg"
                onClick={() => setVideoOpen(true)}
              >
                <Play className="h-6 w-6 fill-current" />
                <span className="sr-only">Play Demo Video</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogTitle />
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/b8sP7AS0CAY?si=3QG2V749rc3Rk2Wj"
              title="Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

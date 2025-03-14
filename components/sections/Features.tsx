"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  BarChart3,
  Layers,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Users,
  LineChart,
  Settings,
  Lightbulb,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("features");
  const categories = [
    { id: "core", label: t("tab1") },
    { id: "analytics", label: t("tab2") },
    { id: "automation", label: t("tab3") },
    { id: "integration", label: t("tab4") },
  ];

  const features = {
    core: [
      {
        icon: <Zap className="h-10 w-10 text-primary" />,
        title: t("sec1feat1Title"),
        description: t("sec1feat1Desc"),
      },
      {
        icon: <Shield className="h-10 w-10 text-primary" />,
        title: t("sec1feat2Title"),
        description: t("sec1feat2Desc"),
      },
      {
        icon: <Layers className="h-10 w-10 text-primary" />,
        title: t("sec1feat3Title"),
        description: t("sec1feat3Desc"),
      },
    ],
    analytics: [
      {
        icon: <BarChart3 className="h-10 w-10 text-primary" />,
        title: t("sec2feat1Title"),
        description: t("sec2feat1Desc"),
      },
      {
        icon: <LineChart className="h-10 w-10 text-primary" />,
        title: t("sec2feat2Title"),
        description: t("sec2feat2Desc"),
      },
      {
        icon: <Lightbulb className="h-10 w-10 text-primary" />,
        title: t("sec2feat3Title"),
        description: t("sec2feat3Desc"),
      },
    ],
    automation: [
      {
        icon: <Workflow className="h-10 w-10 text-primary" />,
        title: t("sec3feat1Title"),
        description: t("sec3feat1Desc"),
      },
      {
        icon: <Settings className="h-10 w-10 text-primary" />,
        title: t("sec3feat2Title"),
        description: t("sec3feat2Desc"),
      },
      {
        icon: <Sparkles className="h-10 w-10 text-primary" />,
        title: t("sec3feat3Title"),
        description: t("sec3feat3Desc"),
      },
    ],
    integration: [
      {
        icon: <Globe className="h-10 w-10 text-primary" />,
        title: t("sec4feat1Title"),
        description: t("sec4feat1Desc"),
      },
      {
        icon: <Smartphone className="h-10 w-10 text-primary" />,
        title: t("sec4feat2Title"),
        description: t("sec4feat2Desc"),
      },
      {
        icon: <Users className="h-10 w-10 text-primary" />,
        title: t("sec4feat3Title"),
        description: t("sec4feat3Desc"),
      },
    ],
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section
      id="features"
      className="w-full py-20 md:py-28 lg:py-36 overflow-hidden relative"
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
            <span>{t("features")}</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-[700px] text-muted-foreground text-lg"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <Tabs defaultValue="core" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-muted/50 backdrop-blur-sm p-1 rounded-full">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(features).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {items.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Pricing() {
  const t = useTranslations("pricing");
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: t("plans.0.description"),
      monthlyPrice: "$29",
      annualPrice: "$290",
      features: [
        t("plans.0.feature1"),
        t("plans.0.feature2"),
        t("plans.0.feature3"),
        t("plans.0.feature4"),
        t("plans.0.feature5"),
      ],
      cta: t("plans.0.cta"),
      popular: false,
    },
    {
      name: "Professional",
      description: t("plans.1.description"),
      monthlyPrice: "$79",
      annualPrice: "$790",
      features: [
        t("plans.1.feature1"),
        t("plans.1.feature2"),
        t("plans.1.feature3"),
        t("plans.1.feature4"),
        t("plans.1.feature5"),
        t("plans.1.feature6"),
        t("plans.1.feature7"),
      ],
      cta: t("plans.1.cta"),
      popular: true,
    },
    {
      name: "Enterprise",
      description: t("plans.2.description"),
      monthlyPrice: "$199",
      annualPrice: "$1,990",
      features: [
        t("plans.2.feature1"),
        t("plans.2.feature2"),
        t("plans.2.feature3"),
        t("plans.2.feature4"),
        t("plans.2.feature5"),
        t("plans.2.feature6"),
        t("plans.2.feature7"),
        t("plans.2.feature8"),
        t("plans.2.feature9"),
      ],
      cta: t("plans.2.cta"),
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-20 md:py-28 lg:py-36 bg-muted/30 overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-60"></div>
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
            <span>{t("pricing")}</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>

          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            {t("subtitle")}
          </p>

          <div className="flex items-center space-x-4 mt-6">
            <span
              className={`text-sm ${
                !isAnnual
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {t("monthly")}
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              id="billing-toggle"
              className="data-[state=checked]:bg-primary"
            />
            <div className="flex items-center">
              <Label
                htmlFor="billing-toggle"
                className={`text-sm ${
                  isAnnual
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {t("annual")}
              </Label>
              <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                {t("save")} 20%
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full border transition-all hover:shadow-lg ${
                  plan.popular
                    ? "border-primary shadow-lg relative before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-b before:from-primary/20 before:to-violet-500/20 before:blur-xl"
                    : "hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-gradient-to-r from-primary to-violet-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {t("popularLabel")}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {isAnnual ? "/year" : "/month"}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full rounded-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
                        : "bg-muted-foreground/10 text-foreground hover:bg-muted-foreground/20"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

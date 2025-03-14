"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ArrowRight,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <footer className="w-full bg-muted/30 border-t overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[60%] rounded-full bg-violet-500/5 blur-[100px]"></div>
      </div>

      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 xl:gap-16">
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div variants={fadeInUp}>
              <Link href="/" className="inline-block">
                <div className="relative flex items-center">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                      Q
                    </span>
                  </div>
                  <span className="ml-2 text-xl font-bold">Quantum</span>
                </div>
              </Link>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-md"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex space-x-5">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2">
            <motion.div
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
            >
              <motion.h3
                variants={fadeInUp}
                className="text-sm font-medium uppercase tracking-wider"
              >
                {t("company")}
              </motion.h3>
              <motion.ul variants={fadeInUp} className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("team")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("careers")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("contact")}
                  </Link>
                </li>
              </motion.ul>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0 },
                animate: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <motion.h3
                variants={fadeInUp}
                className="text-sm font-medium uppercase tracking-wider"
              >
                {t("subscribe")}
              </motion.h3>
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t("subscribeDesc")}
                </p>
                <div className="flex max-w-sm items-center space-x-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t("labelPlaceholder")}
                      className="pl-10 pr-20 py-6 rounded-full border-muted-foreground/20"
                    />
                    <Button
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-16 border-t pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Quantum. {t("rights")}
            </p>
            <div className="flex space-x-6 text-xs">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t("privacy")}
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t("terms")}
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t("cookies")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

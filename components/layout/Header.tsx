"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "#home", label: t("home") },
    { href: "#features", label: t("features") },
    { href: "#showcase", label: t("showcase") },
    { href: "#testimonials", label: t("testimonials") },
    { href: "#pricing", label: t("pricing") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 z-50">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/50 to-violet-500/50 blur opacity-70"></div>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Q
              </span>
            </div>
            <span className="ml-2 text-xl font-bold">Quantum</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-foreground/80"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l">
            <ModeToggle />
            <LanguageToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
              >
                {t("button")}
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden z-50">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="fixed inset-0 top-0 z-40 bg-background/95 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container flex flex-col h-screen pt-24 pb-8">
              <nav className="flex flex-col space-y-6 p-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary border-b border-border pb-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                  className="pt-4"
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </nav>
              <div className="mt-auto p-6 text-center text-sm text-muted-foreground">
                <p>
                  © {new Date().getFullYear()} Quantum. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

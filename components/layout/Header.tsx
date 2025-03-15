"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";

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

  const dropdownNavItems = [
    { href: "/#home", label: t("home") },
    { href: "/#features", label: t("features") },
    { href: "/#showcase", label: t("showcase") },
    { href: "/#testimonials", label: t("testimonials") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/#contact", label: t("contact") },
  ];

  const pagesItems = [
    { href: "/templates", label: "Templates" },
    { href: "/categories", label: "Categories" },
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
                <Image
                  src="/logo.svg"
                  alt="VTemp Logo"
                  width={20}
                  height={20}
                />
              </span>
            </div>
            <span className="ml-2 text-xl font-bold">VTemplates</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Dropdown Menu for Main Navigation Items */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium rounded-full hover:text-primary"
                >
                  {t("home")} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {dropdownNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href
                          ? "text-primary"
                          : "text-foreground/80"
                      )}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Templates Link (Kept Separate) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            {pagesItems.map((item) => (
              <Link
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-foreground/80"
                )}
                passHref
                key={item.href}
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
            ))}
          </motion.div>

          <div className="flex items-center gap-2 ml-4 pl-4 border-l">
            <ModeToggle />
            <LanguageToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="pt-2"
            >
              <SignedOut>
                <SignInButton mode="modal" forceRedirectUrl="/templates">
                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
                  >
                    {t("button")}
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
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
                {/* Dropdown Items in Mobile View */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-border pb-4"
                >
                  <div className="text-lg font-medium mb-2">Menu</div>
                  <div className="pl-2 space-y-3">
                    {dropdownNavItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="text-base transition-colors hover:text-primary block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Templates Link in Mobile View (Kept Separate) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: dropdownNavItems.length * 0.05,
                  }}
                >
                  {pagesItems.map((item) => (
                    <Link
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary border-b border-border pb-2 block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (dropdownNavItems.length + 1) * 0.05,
                  }}
                  className="pt-4"
                >
                  <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl="/templates">
                      <Button
                        size="sm"
                        className="rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
                      >
                        {t("button")}
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
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

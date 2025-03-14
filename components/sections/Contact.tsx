"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, you would send the form data to your API
      console.log("Form submitted:", formData);

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2 rounded-full bg-primary"></span>
            <span>{t("contact")}</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>

          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">{t("formTitle")}</h3>
              <p className="text-muted-foreground">{t("formSubtitle")}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("visit")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    123 Innovation Avenue, Suite 100
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("email")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    info@quantum.com
                    <br />
                    support@quantum.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{t("call")}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    +1 (555) 123-4567
                    <br />
                    Mon-Fri from 9am to 6pm EST
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] rounded-xl overflow-hidden border border-primary/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0952890486577!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1625687563!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-primary/20 bg-background/50 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle>{t("sendMessageTitle")}</CardTitle>
                <CardDescription>{t("sendMessageSubtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-4 py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-full bg-primary/10 p-3">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {t("successTitle")}
                    </h3>
                    <p className="text-center text-muted-foreground">
                      {t("successMessage")}
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 rounded-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20"
                    >
                      {t("sendAnother")}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">{t("nameLabel")}</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t("namePlaceholder")}
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-md border-primary/20 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">{t("emailLabel")}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-md border-primary/20 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">{t("subjectLabel")}</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={t("subjectPlaceholder")}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="rounded-md border-primary/20 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">{t("messageLabel")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t("messagePlaceholder")}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[120px] rounded-md border-primary/20 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    {error && (
                      <div className="rounded-md bg-destructive/10 p-3 text-destructive">
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full mt-2 bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 text-white shadow-md shadow-primary/20 group"
                    >
                      {isSubmitting ? t("submitting") : t("submit")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

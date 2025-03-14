import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Layers, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Services() {
  const t = await getTranslations("services");
  const services = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t("items.0.title"),
      description: t("items.0.description"),
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: t("items.1.title"),
      description: t("items.1.description"),
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: t("items.2.title"),
      description: t("items.2.description"),
    },
  ];

  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              {t("title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-muted">
              <CardHeader>
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

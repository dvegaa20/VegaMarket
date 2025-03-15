import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function generateMetadata({ params }: TemplatePageProps) {
  const template = templates.find((t) => t.id === params.id);

  if (!template) {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }

  return {
    title: `${template.title} | Premium Website Template`,
    description: template.description,
    openGraph: {
      images: [template.thumbnail || "/placeholder.svg"],
      title: `${template.title} | Premium Website Template`,
      description: template.description,
      type: "website",
    },
  };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const template = templates.find((t) => t.id === params.id);

  if (!template) {
    notFound();
  }

  // Get related templates (same category)
  const relatedTemplates = templates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="grid gap-8 py-24 md:grid-cols-2 lg:gap-12">
        {/* Template Preview */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
            <Image
              src={template.thumbnail}
              alt={template.title}
              width={800}
              height={450}
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {template.images.map((image, i) => (
              <div
                key={i}
                className="relative aspect-[16/9] overflow-hidden rounded-lg border cursor-pointer hover:border-primary transition-colors"
              >
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={image}
                      alt={`${template.title} preview ${i + 1}`}
                      width={250}
                      height={150}
                      className="cursor-pointer rounded-lg transition-transform hover:scale-105"
                    />
                  </DialogTrigger>
                  <DialogTitle />
                  <DialogContent className="p-0 max-w-2xl">
                    <Image
                      src={image}
                      alt={`${template.title} preview ${i + 1}`}
                      width={800}
                      height={600}
                      className="rounded-lg w-full h-auto"
                      priority={false}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>

        {/* Template Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="px-3 py-1">{template.category}</Badge>
              {template.isNew && (
                <Badge variant="destructive" className="px-3 py-1">
                  New
                </Badge>
              )}
              {template.featured && !template.isNew && (
                <Badge variant="secondary" className="px-3 py-1">
                  Featured
                </Badge>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold">{template.title}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(template.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {template.rating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({template.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-muted-foreground">{template.description}</p>

          <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4 border border-border/50">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">
                  ${template.price.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  ${(template.price * 1.2).toFixed(2)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sales</p>
              <p className="text-xl font-semibold">{template.sales}+</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full text-base py-6 h-auto font-medium rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
            <a
              href={template.demoUrl}
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base py-6 h-auto font-medium rounded-full border-primary/20 text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                Live Preview
              </Button>
            </a>
            <Button
              size="lg"
              variant="ghost"
              className="w-12 h-12 rounded-full flex-shrink-0 p-0"
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>

          <div className="space-y-3 rounded-lg border p-4">
            <h3 className="font-semibold">Template Includes:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>Responsive design for all devices</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>Built with Next.js and Tailwind CSS</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>SEO optimized</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>6 months of support</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>Lifetime updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

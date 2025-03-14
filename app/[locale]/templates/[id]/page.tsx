import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { templates } from "@/lib/data";

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
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Template Preview */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border">
            <Image
              src={
                template.thumbnail || "/placeholder.svg?height=450&width=800"
              }
              alt={template.title}
              width={800}
              height={450}
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="relative aspect-[16/9] overflow-hidden rounded-lg border cursor-pointer hover:border-primary transition-colors"
              >
                <Image
                  src={`/placeholder.svg?height=150&width=250&text=Preview ${
                    i + 1
                  }`}
                  alt={`${template.title} preview ${i + 1}`}
                  width={250}
                  height={150}
                  className="object-cover"
                />
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
            <Link href={`/preview/${template.id}`} className="w-full">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-base py-6 h-auto font-medium rounded-full border-primary/20 text-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Eye className="mr-2 h-5 w-5" />
                Live Preview
              </Button>
            </Link>
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

      {/* Template Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="features" className="text-base py-3">
              Features
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-base py-3">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base py-3">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="space-y-6">
            <h3 className="text-2xl font-semibold">Key Features</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6 hover:border-primary/20 hover:bg-muted/30 transition-colors">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium mb-2">Responsive Design</h4>
                <p className="text-muted-foreground">
                  Looks great on all devices, from mobile phones to desktop
                  computers. Every element is carefully designed to provide the
                  best experience regardless of screen size.
                </p>
              </div>
              <div className="rounded-lg border p-6 hover:border-primary/20 hover:bg-muted/30 transition-colors">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium mb-2">
                  Modern Technology Stack
                </h4>
                <p className="text-muted-foreground">
                  Built with Next.js and Tailwind CSS for optimal performance
                  and flexibility. Leverages the latest web technologies for a
                  fast, smooth user experience.
                </p>
              </div>
              <div className="rounded-lg border p-6 hover:border-primary/20 hover:bg-muted/30 transition-colors">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium mb-2">SEO Optimized</h4>
                <p className="text-muted-foreground">
                  Structured with best practices for search engine visibility.
                  Includes semantic HTML, proper meta tags, and optimized
                  loading performance to improve your search rankings.
                </p>
              </div>
              <div className="rounded-lg border p-6 hover:border-primary/20 hover:bg-muted/30 transition-colors">
                <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h4 className="text-xl font-medium mb-2">Easy Customization</h4>
                <p className="text-muted-foreground">
                  Well-organized code structure makes it easy to customize to
                  your needs. Change colors, fonts, and layouts with minimal
                  effort to match your brand identity.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="space-y-6">
            <h3 className="text-2xl font-semibold">Technical Specifications</h3>
            <div className="space-y-4 rounded-lg border p-6">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Framework</p>
                <p>Next.js</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">CSS Framework</p>
                <p>Tailwind CSS</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Responsive</p>
                <p>Yes (Mobile, Tablet, Desktop)</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Browser Compatibility</p>
                <p>Chrome, Firefox, Safari, Edge</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Documentation</p>
                <p>Comprehensive (Included)</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Support</p>
                <p>6 months included</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <p className="font-medium">Updates</p>
                <p>Lifetime</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p className="font-medium">License</p>
                <p>Single use</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=JD"
                      alt="John Doe"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      March 15, 2023
                    </p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  This template is exactly what I needed for my business
                  website. It was easy to customize and looks very professional.
                  The code is clean and well-organized. I highly recommend it!
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=JS"
                      alt="Jane Smith"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">
                      February 28, 2023
                    </p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[1, 2, 3, 4].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                  {[1].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-muted stroke-muted-foreground"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  Great template with excellent design. The only reason I'm
                  giving 4 stars instead of 5 is that I had to make some
                  adjustments to get it working exactly how I wanted. Still, I
                  would recommend it.
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=48&width=48&text=RJ"
                      alt="Robert Johnson"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Robert Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      January 10, 2023
                    </p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  Absolutely love this template! The design is modern and clean,
                  and it was incredibly easy to set up. The documentation is
                  thorough and helpful. I'll definitely be purchasing more
                  templates from this marketplace.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Templates */}
      <div className="mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Related Templates</h2>
          <Link
            href={`/categories/${template.category
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedTemplates.map((relatedTemplate) => (
            <Link
              key={relatedTemplate.id}
              href={`/templates/${relatedTemplate.id}`}
            >
              <div className="group relative overflow-hidden rounded-xl border bg-background transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={
                      relatedTemplate.thumbnail ||
                      "/placeholder.svg?height=450&width=800"
                    }
                    alt={relatedTemplate.title}
                    width={800}
                    height={450}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 z-10">
                    {relatedTemplate.category}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
                    {relatedTemplate.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-bold">
                      ${relatedTemplate.price.toFixed(2)}
                    </p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span className="text-sm">{relatedTemplate.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

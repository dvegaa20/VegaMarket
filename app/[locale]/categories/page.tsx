import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/lib/data";

export const metadata = {
  title: "Categories | Template Marketplace",
  description:
    "Browse templates by category to find the perfect match for your project.",
};

export default function CategoriesPage() {
  // Get unique categories and count templates in each
  const categories = [
    ...new Set(templates.map((template) => template.category)),
  ];
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = templates.filter((t) => t.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center text-center mb-12">
        <Badge variant="outline" className="mb-4 px-3.5 py-1.5">
          Find Your Perfect Template
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">
          Browse by Category
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Explore our collection of premium templates organized by category to
          find the perfect match for your project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const categoryTemplates = templates.filter(
            (t) => t.category === category
          );
          const slug = category.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={category}
              href={`/categories/${slug}`}
              className="group relative overflow-hidden rounded-xl border bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex h-[250px] flex-col justify-between rounded-md p-8">
                <div className="space-y-2">
                  <h3 className="font-bold tracking-tight text-2xl group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                  <p className="text-muted-foreground">
                    {categoryCounts[category]} templates
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-4">
                    {categoryTemplates.slice(0, 3).map((template, i) => (
                      <div
                        key={i}
                        className="h-14 w-14 rounded-full border-2 border-background overflow-hidden shadow-md transition-transform duration-300 group-hover:translate-y-[-5px]"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <Image
                          src={
                            template.thumbnail ||
                            `/placeholder.svg?height=56&width=56&text=${
                              template.title.charAt(0) || "/placeholder.svg"
                            }`
                          }
                          alt={template.title}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                    <ChevronRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

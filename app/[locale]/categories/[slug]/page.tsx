import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TemplateGrid from "@/components/template/Grid";
import { templates } from "@/lib/data";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: CategoryPageProps) {
  // Convert slug to category name (e.g., "e-commerce" to "E-Commerce")
  const categoryName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Check if category exists
  const categoryExists = templates.some(
    (t) => t.category.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!categoryExists) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${categoryName} Templates | Template Marketplace`,
    description: `Browse our collection of premium ${categoryName} templates for your next project.`,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Convert slug to category name (e.g., "e-commerce" to "E-Commerce")
  const categoryName = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter templates by category
  const categoryTemplates = templates.filter(
    (template) =>
      template.category.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  // If no templates found for this category, return 404
  if (categoryTemplates.length === 0) {
    notFound();
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                All Categories
              </Button>
            </Link>
            <Badge>{categoryTemplates.length} templates</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {categoryName} Templates
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of premium {categoryName.toLowerCase()}{" "}
            templates for your next project.
          </p>
        </div>
      </div>

      <TemplateGrid templates={categoryTemplates} />
    </div>
  );
}

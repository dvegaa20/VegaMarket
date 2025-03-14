import { templates } from "@/lib/data";
import TemplateFilters from "@/components/template/Filters";
import TemplateGrid from "@/components/template/Grid";

export const metadata = {
  title: "Browse Templates | Template Marketplace",
  description:
    "Browse our collection of premium website templates for your next project.",
};

export default function TemplatesPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            All Templates
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of premium website templates.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <TemplateFilters />
        <TemplateGrid templates={templates} />
      </div>
    </div>
  );
}

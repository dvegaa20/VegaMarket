import TemplateCard from "@/components/template/Card";

export default function TemplateGrid({ templates }: TemplateGridProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {templates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-medium">No templates found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </div>
  );
}

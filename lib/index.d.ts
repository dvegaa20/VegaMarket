interface TemplatePageProps {
  params: {
    id: string;
  };
}

declare interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  sales: number;
  thumbnail: string;
  demoUrl?: string;
  featured: boolean;
  isNew: boolean;
}

interface TemplateCardProps {
  template: Template;
}

interface TemplateGridProps {
  templates: Template[];
}

interface FeaturedTemplateProps {
  templates: Template[];
}

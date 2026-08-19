import { CATEGORIES } from '@/data/categories';
import CategoryClient from './CategoryClient';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  return <CategoryClient slug={resolvedParams.slug} />;
}

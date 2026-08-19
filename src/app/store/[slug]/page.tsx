import { STORES } from '@/data/stores';
import StoreClient from './StoreClient';

export function generateStaticParams() {
  return STORES.map((store) => ({
    slug: store.slug,
  }));
}

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: StorePageProps) {
  const resolvedParams = await params;
  return <StoreClient slug={resolvedParams.slug} />;
}

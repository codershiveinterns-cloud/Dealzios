import { BLOG_POSTS } from '@/data/blog';
import BlogArticleClient from './BlogArticleClient';

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const resolvedParams = await params;
  return <BlogArticleClient slug={resolvedParams.slug} />;
}

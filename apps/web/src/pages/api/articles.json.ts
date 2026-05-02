import type { APIRoute } from 'astro';
import { ARTICLES } from '../../content';

export const GET: APIRoute = async () => {
  const articles = ARTICLES.map(a => ({
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    category: a.category,
    tags: a.tags,
    date: a.date,
    readTime: a.readTime,
  }));

  return new Response(JSON.stringify(articles), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

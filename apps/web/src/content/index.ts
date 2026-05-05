import type { Article } from '../lib/types'
import { article as whySupaproxy } from './why-supaproxy'
import { article as whyNpmPackages } from './why-npm-packages'
import { article as guardrailsVision } from './guardrails-vision'
import { article as guardrailMiddleware } from './guardrail-middleware'
import { article as openSourceSustainability } from './open-source-sustainability'
import { article as reversiblePrivacy } from './reversible-privacy'
import { article as entityProxy } from './entity-proxy'
import { article as semanticPreservation } from './semantic-preservation'

/**
 * All articles, newest first.
 * To add a new article:
 * 1. Create a file in this directory
 * 2. Export { article: Article }
 * 3. Import and add to this array
 */
export const ARTICLES: Article[] = [
  semanticPreservation,
  entityProxy,
  reversiblePrivacy,
  guardrailMiddleware,
  openSourceSustainability,
  guardrailsVision,
  whyNpmPackages,
  whySupaproxy,
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'All') return ARTICLES
  return ARTICLES.filter(a => a.category === category)
}

export function getArticlesByTag(tag: string): Article[] {
  return ARTICLES.filter(a => a.tags.includes(tag))
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const a of ARTICLES) for (const t of a.tags) tags.add(t)
  return Array.from(tags).sort()
}

export const ARTICLES_PER_PAGE = 6

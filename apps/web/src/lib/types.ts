export interface Author {
  name: string
  role?: string
}

export interface Article {
  slug: string
  title: string
  subtitle: string
  author: Author
  category: Category
  tags: string[]
  date: string
  readTime: string
  coverColor: string
  featured?: boolean
  blocks: ContentBlock[]
}

export type Category = 'Architecture' | 'Philosophy' | 'Products' | 'Engineering' | 'Vision'

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; code: string; title?: string }
  | { type: 'mermaid'; diagram: string; caption?: string }
  | { type: 'callout'; variant: 'insight' | 'principle' | 'warning'; title: string; text: string }
  | { type: 'comparison'; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: 'image'; src: string; alt: string; caption?: string }

export const CATEGORIES: Category[] = ['Architecture', 'Philosophy', 'Products', 'Engineering', 'Vision']

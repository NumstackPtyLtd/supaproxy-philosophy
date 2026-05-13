import { ArrowLeft } from 'lucide-react'
import { Header } from '@supaproxy/ui'
import type { Article } from '../lib/types'
import { BlockRenderer } from './BlockRenderer'

const headerBrand = (
  <a href="/" className="flex items-center gap-2">
    <span className="text-[16px] font-bold tracking-tight" style={{ fontFamily: "'Costaline', serif", color: 'var(--text-heading)' }}>SupaProxy</span>
    <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent-text)', border: '1px solid var(--color-accent-border)' }}>Philosophy</span>
  </a>
)

export default function ArticleReader({ article }: { article: Article }) {
  if (article.featured) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <Header brand={headerBrand} />
        <div style={{ background: 'var(--bg-surface)' }}>
          <div className="max-w-[960px] mx-auto px-6 pt-24 pb-14">
            <a href="/" className="flex items-center gap-1.5 text-[13px] mb-8 transition-opacity hover:opacity-70" style={{ color: 'var(--body)' }}>
              <ArrowLeft size={14} /> All articles
            </a>
            <Meta article={article} />
            <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5 max-w-[700px]" style={{ color: 'var(--text-heading)' }}>
              {article.title}
            </h1>
            <p className="text-[18px] leading-relaxed max-w-[600px] mb-6" style={{ color: 'var(--body)' }}>
              {article.subtitle}
            </p>
            <AuthorLine author={article.author} />
          </div>
        </div>
        <main style={{ background: 'var(--bg)' }}>
          <div className="max-w-[760px] mx-auto px-6 py-16">
            <BlockRenderer blocks={article.blocks} />
            <Tags tags={article.tags} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Header brand={headerBrand} />
      <main className="pt-14">
        <div className="max-w-[700px] mx-auto px-6 pt-10 pb-20">
          <a href="/" className="flex items-center gap-1.5 text-[13px] mb-8 transition-opacity hover:opacity-70" style={{ color: 'var(--body)' }}>
            <ArrowLeft size={14} /> All articles
          </a>
          <div className="mb-10">
            <Meta article={article} />
            <h1 className="text-[32px] md:text-[40px] font-bold leading-tight mb-4" style={{ color: 'var(--text-heading)' }}>
              {article.title}
            </h1>
            <p className="text-[18px] leading-relaxed mb-6" style={{ color: 'var(--body)' }}>
              {article.subtitle}
            </p>
            <AuthorLine author={article.author} />
          </div>
          <div className="mb-10" style={{ borderTop: '1px solid var(--border-color)' }} />
          <BlockRenderer blocks={article.blocks} />
          <Tags tags={article.tags} />
        </div>
      </main>
    </div>
  )
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{article.category}</span>
      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.readTime}</span>
    </div>
  )
}

function AuthorLine({ author }: { author: Article['author'] }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: 'var(--bg-surface)', color: 'var(--text-heading)' }}>
        {author.name[0]}
      </div>
      <div>
        <span className="text-[13px] font-medium" style={{ color: 'var(--text-heading)' }}>{author.name}</span>
        {author.role && <span className="text-[12px] ml-1.5" style={{ color: 'var(--text-muted)' }}>{author.role}</span>}
      </div>
    </div>
  )
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-14 pt-6 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
      {tags.map(tag => (
        <span key={tag} className="text-[12px] px-3 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

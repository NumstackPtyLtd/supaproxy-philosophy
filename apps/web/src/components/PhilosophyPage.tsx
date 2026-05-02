import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Header, NavLink } from '@supaproxy/ui'
import { ARTICLES, getArticlesByCategory, ARTICLES_PER_PAGE } from '../content'
import { CATEGORIES, type Article, type Category } from '../lib/types'
import { ArticleCard } from './ArticleCard'
import { BlockRenderer } from './BlockRenderer'

export default function PhilosophyPage() {
  const [category, setCategory] = useState<string>('All')
  const [page, setPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (typeof window === 'undefined') return null
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('article')
    return slug ? ARTICLES.find(a => a.slug === slug) || null : null
  })

  const selectArticle = (article: Article | null) => {
    setSelectedArticle(article)
    if (article) {
      window.history.pushState({}, '', `?article=${article.slug}`)
    } else {
      window.history.pushState({}, '', '/')
    }
  }

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => selectArticle(null)} />
  }

  const filtered = getArticlesByCategory(category)
  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE)
  const visible = filtered.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE)

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Header
        brand={
          <a href="/" className="flex items-center gap-1.5">
            <span className="text-[18px] font-bold" style={{ fontFamily: "'Costaline', serif", color: 'var(--text-heading)' }}>SupaProxy</span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>by Numstack</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium ml-1" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>Philosophy</span>
          </a>
        }
        nav={
          <>
            <NavLink href="https://supaproxy.cloud">Cloud</NavLink>
            <NavLink href="https://docs.supaproxy.cloud">Docs</NavLink>
          </>
        }
      />

      <main className="pt-14">
        {/* Hero */}
        <div className="max-w-[860px] mx-auto px-6 pt-16 pb-10 text-center">
          <h1 className="text-[36px] md:text-[48px] font-bold leading-tight mb-4" style={{ color: 'var(--text-heading)' }}>
            The Philosophy
          </h1>
          <p className="text-[17px] max-w-[520px] mx-auto" style={{ color: 'var(--body)' }}>
            Design decisions, architecture thinking, and the principles behind SupaProxy.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto px-6 pb-20">
          {/* Category pills */}
          <div className="flex gap-2 mb-10 justify-center flex-wrap">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                className="px-4 py-2 rounded-full text-[13px] font-medium cursor-pointer transition-all"
                style={{
                  background: category === cat ? 'var(--text-heading)' : 'var(--bg-card)',
                  color: category === cat ? 'var(--bg)' : 'var(--body)',
                  border: `1px solid ${category === cat ? 'var(--text-heading)' : 'var(--border-color)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(article => (
              <ArticleCard key={article.slug} article={article} onClick={() => selectArticle(article)} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-[14px] py-16" style={{ color: 'var(--text-muted)' }}>No articles in this category yet.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-9 h-9 rounded-lg text-[13px] font-medium cursor-pointer transition-colors"
                  style={{
                    background: page === p ? 'var(--text-heading)' : 'var(--bg-card)',
                    color: page === p ? 'var(--bg)' : 'var(--body)',
                    border: `1px solid ${page === p ? 'var(--text-heading)' : 'var(--border-color)'}`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-[960px] mx-auto px-6 py-8 text-center text-[11px]" style={{ color: 'var(--text-muted)' }}>
          &copy; {new Date().getFullYear()} Numstack Pty Ltd
        </div>
      </footer>
    </div>
  )
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Header
        brand={
          <a href="/" className="flex items-center gap-1.5">
            <span className="text-[18px] font-bold" style={{ fontFamily: "'Costaline', serif", color: 'var(--text-heading)' }}>SupaProxy</span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>by Numstack</span>
          </a>
        }
      />

      <main className="pt-14">
        <div className="max-w-[700px] mx-auto px-6 pt-10 pb-20">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] mb-8 cursor-pointer transition-opacity hover:opacity-70" style={{ color: 'var(--body)' }}>
            <ArrowLeft size={14} /> All articles
          </button>

          {/* Article header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--body)' }}>
                {article.category}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
              <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.readTime}</span>
            </div>

            <h1 className="text-[32px] md:text-[40px] font-bold leading-tight mb-4" style={{ color: 'var(--text-heading)' }}>
              {article.title}
            </h1>

            <p className="text-[18px] leading-relaxed" style={{ color: 'var(--body)' }}>
              {article.subtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="mb-10" style={{ borderTop: '1px solid var(--border-color)' }} />

          {/* Content */}
          <BlockRenderer blocks={article.blocks} />

          {/* Tags */}
          <div className="mt-14 pt-6 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-color)' }}>
            {article.tags.map(tag => (
              <span key={tag} className="text-[12px] px-3 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

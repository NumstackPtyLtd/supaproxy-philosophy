import { useState } from 'react'
import { Header, NavLink } from '@supaproxy/ui'
import { ARTICLES, getArticlesByCategory, ARTICLES_PER_PAGE } from '../content'
import { CATEGORIES, type Article } from '../lib/types'
import { ArticleCard } from './ArticleCard'
import { formatDate } from '../lib/formatters'

export default function PhilosophyPage() {
  const [category, setCategory] = useState<string>('All')
  const [page, setPage] = useState(1)

  const filtered = getArticlesByCategory(category)
  const featured = category === 'All' ? filtered.find(a => a.featured) : undefined
  const nonFeatured = featured ? filtered.filter(a => a !== featured) : filtered
  const totalPages = Math.ceil(nonFeatured.length / ARTICLES_PER_PAGE)
  const visible = nonFeatured.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE)

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Header
        brand={
          <a href="/" className="flex items-center gap-2">
            <span className="text-[16px] font-bold tracking-tight" style={{ fontFamily: "'Costaline', serif", color: 'var(--text-heading)' }}>SupaProxy</span>
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent-text)', border: '1px solid var(--color-accent-border)' }}>Philosophy</span>
          </a>
        }
        nav={
          <>
            <NavLink href="https://supaproxy.cloud">Platform</NavLink>
            <NavLink href="https://docs.supaproxy.cloud">Docs</NavLink>
          </>
        }
      />

      <main className="pt-14">
        <div className="max-w-[720px] mx-auto px-6 pt-12 pb-8 text-center">
          <h1 className="text-[24px] md:text-[32px] font-bold leading-[1.3] mb-2 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            The Philosophy
          </h1>
          <p className="text-[13px] max-w-[400px] mx-auto" style={{ color: 'var(--text-muted)' }}>
            Design decisions, architecture thinking, and the principles behind SupaProxy.
          </p>
        </div>

        <div className="max-w-[960px] mx-auto px-6 pb-16">
          {/* Category pills */}
          <div className="flex gap-1.5 mb-8 justify-center flex-wrap">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1) }}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium cursor-pointer transition-all"
                style={{
                  background: category === cat ? 'var(--color-accent)' : 'var(--bg-card)',
                  color: category === cat ? '#fff' : 'var(--body)',
                  border: `1px solid ${category === cat ? 'var(--color-accent)' : 'var(--border-color)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured article (separate from pagination) */}
          {featured && page === 1 && (
            <a
              href={`/${featured.slug}`}
              className="block w-full rounded-xl mb-6 text-left card-hover p-6"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent-text)' }}>Featured</span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{featured.category}</span>
                <span className="text-[10px] ml-auto" style={{ color: 'var(--text-muted)' }}>{formatDate(featured.date)}</span>
              </div>
              <h2 className="text-[18px] md:text-[22px] font-bold leading-[1.3] mb-2 max-w-[500px]" style={{ color: 'var(--text-heading)', fontFamily: "'Costaline', serif" }}>
                {featured.title}
              </h2>
              <p className="text-[13px] leading-relaxed max-w-[440px]" style={{ color: 'var(--body)' }}>
                {featured.subtitle}
              </p>
            </a>
          )}

          {/* Article grid (excludes featured) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {visible.length === 0 && !featured && (
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
                    background: page === p ? 'var(--color-accent)' : 'var(--bg-card)',
                    color: page === p ? '#fff' : 'var(--body)',
                    border: `1px solid ${page === p ? 'var(--color-accent)' : 'var(--border-color)'}`,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-[960px] mx-auto px-6 py-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Numstack Pty Ltd. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="https://supaproxy.cloud" className="text-[10px] tracking-wide transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>Platform</a>
            <a href="https://docs.supaproxy.cloud" className="text-[10px] tracking-wide transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>Docs</a>
            <a href="https://github.com/NumstackPtyLtd" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

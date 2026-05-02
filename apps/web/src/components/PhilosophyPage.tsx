import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Header, NavLink } from '@supaproxy/ui'
import { ARTICLES, getArticlesByCategory, ARTICLES_PER_PAGE } from '../content'
import { CATEGORIES, type Article, type Category } from '../lib/types'
import { ArticleCard } from './ArticleCard'
import { BlockRenderer } from './BlockRenderer'

export default function PhilosophyPage() {
  const [category, setCategory] = useState<string>('All')
  const [page, setPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const selectArticle = (article: Article | null) => {
    setSelectedArticle(article)
    if (article) {
      window.history.pushState({}, '', `?article=${article.slug}`)
    } else {
      window.history.pushState({}, '', '/')
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('article')
    if (slug) {
      const found = ARTICLES.find(a => a.slug === slug)
      if (found) setSelectedArticle(found)
    }

    function onPopState() {
      const p = new URLSearchParams(window.location.search)
      const s = p.get('article')
      setSelectedArticle(s ? ARTICLES.find(a => a.slug === s) || null : null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

          {/* Featured article */}
          {category === 'All' && page === 1 && (() => {
            const feat = visible.find(a => a.featured)
            if (!feat) return null
            return (
              <button
                onClick={() => selectArticle(feat)}
                className="w-full rounded-2xl mb-8 text-left cursor-pointer card-hover p-8 md:p-10"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: feat.coverColor }} />
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Featured</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{feat.category}</span>
                  <span className="text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>{feat.readTime}</span>
                </div>
                <h2 className="text-[24px] md:text-[30px] font-bold leading-tight mb-3 max-w-[600px]" style={{ color: 'var(--text-heading)', fontFamily: "'Costaline', serif" }}>
                  {feat.title}
                </h2>
                <p className="text-[15px] leading-relaxed max-w-[500px]" style={{ color: 'var(--body)' }}>
                  {feat.subtitle}
                </p>
              </button>
            )
          })()}

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.filter(a => !(category === 'All' && page === 1 && a.featured)).map(article => (
              <ArticleCard key={article.slug} article={article} onClick={() => selectArticle(article)} />
            ))}
          </div>

          {visible.filter(a => !(category === 'All' && page === 1 && a.featured)).length === 0 && !visible.find(a => a.featured) && (
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
  const headerBrand = (
    <a href="/" className="flex items-center gap-1.5">
      <span className="text-[18px] font-bold" style={{ fontFamily: "'Costaline', serif", color: 'var(--text-heading)' }}>SupaProxy</span>
      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>by Numstack</span>
    </a>
  )

  if (article.featured) {
    return <FeaturedArticleView article={article} onBack={onBack} brand={headerBrand} />
  }

  return (
    <div style={{ background: 'var(--bg)' }} className="min-h-screen">
      <Header brand={headerBrand} />
      <main className="pt-14">
        <div className="max-w-[700px] mx-auto px-6 pt-10 pb-20">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] mb-8 cursor-pointer transition-opacity hover:opacity-70" style={{ color: 'var(--body)' }}>
            <ArrowLeft size={14} /> All articles
          </button>
          <ArticleHeader article={article} />
          <div className="mb-10" style={{ borderTop: '1px solid var(--border-color)' }} />
          <BlockRenderer blocks={article.blocks} />
          <ArticleTags tags={article.tags} />
        </div>
      </main>
    </div>
  )
}

function FeaturedArticleView({ article, onBack, brand }: { article: Article; onBack: () => void; brand: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header brand={brand} />

      {/* Wide hero */}
      <div style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-[960px] mx-auto px-6 pt-24 pb-14">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] mb-8 cursor-pointer transition-opacity hover:opacity-70" style={{ color: 'var(--body)' }}>
            <ArrowLeft size={14} /> All articles
          </button>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full" style={{ background: article.coverColor }} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{article.category}</span>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.date}</span>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{article.readTime}</span>
          </div>
          <h1 className="text-[36px] md:text-[48px] font-bold leading-[1.1] mb-5 max-w-[700px]" style={{ color: 'var(--text-heading)' }}>
            {article.title}
          </h1>
          <p className="text-[18px] leading-relaxed max-w-[600px] mb-6" style={{ color: 'var(--body)' }}>
            {article.subtitle}
          </p>
          <AuthorLine author={article.author} />
        </div>
      </div>

      {/* Wide content area */}
      <main style={{ background: 'var(--bg)' }}>
        <div className="max-w-[760px] mx-auto px-6 py-16">
          <BlockRenderer blocks={article.blocks} />
          <ArticleTags tags={article.tags} />
        </div>
      </main>
    </div>
  )
}

function ArticleHeader({ article }: { article: Article }) {
  return (
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
      <p className="text-[18px] leading-relaxed mb-6" style={{ color: 'var(--body)' }}>
        {article.subtitle}
      </p>
      <AuthorLine author={article.author} />
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

function ArticleTags({ tags }: { tags: string[] }) {
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

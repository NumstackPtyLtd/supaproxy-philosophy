import type { Article } from '../lib/types'

interface ArticleCardProps {
  article: Article
  onClick: () => void
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl card-hover w-full cursor-pointer p-6 flex flex-col"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--body)' }}>
          {article.category}
        </span>
        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{article.readTime}</span>
      </div>

      {/* Title */}
      <h3
        className="text-[20px] font-bold leading-tight mb-2"
        style={{ color: 'var(--text-heading)', fontFamily: "'Costaline', serif" }}
      >
        {article.title}
      </h3>

      {/* Subtitle */}
      <p className="text-[14px] leading-relaxed mb-5 flex-1" style={{ color: 'var(--body)' }}>
        {article.subtitle}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

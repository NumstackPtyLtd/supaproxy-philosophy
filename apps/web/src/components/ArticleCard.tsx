import type { Article } from '../lib/types'
import { formatDate } from '../lib/formatters'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={`/${article.slug}`}
      className="rounded-xl card-hover w-full p-5 flex flex-col"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--body)' }}>
          {article.category}
        </span>
        <span className="text-[10px] ml-auto" style={{ color: 'var(--text-muted)' }}>{formatDate(article.date)}</span>
      </div>

      <h3
        className="text-[15px] font-bold leading-tight mb-1.5"
        style={{ color: 'var(--text-heading)', fontFamily: "'Costaline', serif" }}
      >
        {article.title}
      </h3>

      <p className="text-[12px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--body)' }}>
        {article.subtitle}
      </p>

      <div className="flex flex-wrap gap-1">
        {article.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

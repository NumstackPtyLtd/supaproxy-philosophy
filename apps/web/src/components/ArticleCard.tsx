import type { Article } from '../lib/types'
import { formatDate } from '../lib/formatters'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={`/${article.slug}`}
      className="rounded-2xl card-hover w-full p-6 flex flex-col"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--body)' }}>
          {article.category}
        </span>
        <span className="text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>{formatDate(article.date)}</span>
      </div>

      <h3
        className="text-[20px] font-bold leading-tight mb-2"
        style={{ color: 'var(--text-heading)', fontFamily: "'Costaline', serif" }}
      >
        {article.title}
      </h3>

      <p className="text-[14px] leading-relaxed mb-5 flex-1" style={{ color: 'var(--body)' }}>
        {article.subtitle}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {article.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

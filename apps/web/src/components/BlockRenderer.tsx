import type { ContentBlock } from '../lib/types'
import { Lightbulb, BookOpen, AlertTriangle } from 'lucide-react'

interface BlockRendererProps {
  blocks: ContentBlock[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  )
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--body)' }}>{block.text}</p>

    case 'heading':
      return <h2 className="text-[22px] font-bold mt-10 mb-4" style={{ color: 'var(--text-heading)' }}>{block.text}</h2>

    case 'quote':
      return (
        <blockquote className="pl-5 py-1 my-6" style={{ borderLeft: '3px solid var(--border-light)' }}>
          <p className="text-[16px] italic leading-relaxed" style={{ color: 'var(--body)' }}>{block.text}</p>
          {block.author && <cite className="block text-[13px] mt-2 not-italic" style={{ color: 'var(--text-muted)' }}>{block.author}</cite>}
        </blockquote>
      )

    case 'list':
      return (
        <ul className="space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] leading-relaxed list-disc" style={{ color: 'var(--body)' }}>{item}</li>
          ))}
        </ul>
      )

    case 'code':
      return (
        <div className="rounded-xl overflow-hidden my-6" style={{ border: '1px solid var(--border-color)' }}>
          {block.title && (
            <div className="px-4 py-2.5 text-[11px] font-mono" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              {block.title}
            </div>
          )}
          <pre className="p-5 text-[13px] font-mono leading-relaxed overflow-x-auto" style={{ background: 'var(--bg-card)', color: 'var(--body)' }}>
            {block.code}
          </pre>
        </div>
      )

    case 'mermaid':
      return (
        <div className="my-6 rounded-xl p-6 text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
          <pre className="text-[12px] font-mono whitespace-pre-wrap" style={{ color: 'var(--body)' }}>{block.diagram}</pre>
          {block.caption && <p className="text-[12px] mt-3" style={{ color: 'var(--text-muted)' }}>{block.caption}</p>}
        </div>
      )

    case 'callout': {
      const icons = { insight: Lightbulb, principle: BookOpen, warning: AlertTriangle }
      const colors = {
        insight: { bg: 'rgba(59, 130, 246, 0.06)', border: 'rgba(59, 130, 246, 0.12)', text: '#2563EB' },
        principle: { bg: 'rgba(16, 185, 129, 0.06)', border: 'rgba(16, 185, 129, 0.12)', text: '#059669' },
        warning: { bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.12)', text: '#D97706' },
      }
      const Icon = icons[block.variant]
      const color = colors[block.variant]

      return (
        <div className="rounded-xl p-5 my-6" style={{ background: color.bg, border: `1px solid ${color.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={16} style={{ color: color.text }} />
            <span className="text-[13px] font-semibold" style={{ color: color.text }}>{block.title}</span>
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: 'var(--body)' }}>{block.text}</p>
        </div>
      )
    }

    case 'comparison':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <h4 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>{block.left.title}</h4>
            <ul className="space-y-2">
              {block.left.items.map((item, i) => (
                <li key={i} className="text-[13px] leading-relaxed flex items-start gap-2" style={{ color: 'var(--body)' }}>
                  <span className="text-[10px] mt-1.5" style={{ color: 'var(--text-muted)' }}>&#9679;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h4 className="text-[14px] font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>{block.right.title}</h4>
            <ul className="space-y-2">
              {block.right.items.map((item, i) => (
                <li key={i} className="text-[13px] leading-relaxed flex items-start gap-2" style={{ color: 'var(--body)' }}>
                  <span className="text-[10px] mt-1.5" style={{ color: 'var(--color-accent-text)' }}>&#9679;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )

    default:
      return null
  }
}

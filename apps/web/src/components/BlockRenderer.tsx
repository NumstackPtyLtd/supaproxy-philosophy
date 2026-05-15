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
      return <p className="text-[14px] leading-[1.8]" style={{ color: 'var(--body)' }} dangerouslySetInnerHTML={{ __html: renderInlineLinks(block.text) }} />

    case 'heading':
      return <h2 className="text-[18px] font-bold leading-[1.3] mt-8 mb-3" style={{ color: 'var(--text-heading)' }}>{block.text}</h2>

    case 'quote':
      return (
        <blockquote className="pl-5 py-1 my-5" style={{ borderLeft: '3px solid var(--border-light)' }}>
          <p className="text-[14px] italic leading-relaxed" style={{ color: 'var(--body)' }}>{block.text}</p>
          {block.author && <cite className="block text-[13px] mt-2 not-italic" style={{ color: 'var(--text-muted)' }}>{block.author}</cite>}
        </blockquote>
      )

    case 'list':
      return (
        <ul className="space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="text-[13px] leading-relaxed list-disc" style={{ color: 'var(--body)' }}>{item}</li>
          ))}
        </ul>
      )

    case 'code':
      return <CodeBlock code={block.code} title={block.title} language={block.language} />

    case 'mermaid':
      return <MermaidBlock diagram={block.diagram} caption={block.caption} />

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
            <span className="text-[13px] font-semibold" style={{ color: color.text }} dangerouslySetInnerHTML={{ __html: renderInlineLinks(block.title) }} />
          </div>
          <p className="text-[14px] leading-relaxed" style={{ color: 'var(--body)' }} dangerouslySetInnerHTML={{ __html: renderInlineLinks(block.text) }} />
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

function MermaidBlock({ diagram, caption }: { diagram: string; caption?: string }) {
  // Parse the mermaid syntax into a simple flow display
  const steps = diagram
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.includes('-->'))
    .flatMap(l => {
      const parts = l.split('-->')
      return parts.map(p => p.replace(/.*\[/, '').replace(/\].*/, '').replace(/.*\{/, '').replace(/\}.*/, '').replace(/\|.*\|/, '').trim())
    })
    .filter((v, i, a) => v && a.indexOf(v) === i)

  return (
    <div className="my-6 rounded-xl p-6 overflow-x-auto" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>&rarr;</span>}
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-heading)' }}>
              {step}
            </span>
          </div>
        ))}
      </div>
      {caption && <p className="text-[12px] mt-4 text-center" style={{ color: 'var(--text-muted)' }}>{caption}</p>}
    </div>
  )
}

function CodeBlock({ code, title, language }: { code: string; title?: string; language: string }) {
  const keywords = ['interface', 'readonly', 'string', 'Promise', 'export', 'import', 'from', 'const', 'let', 'async', 'await', 'function', 'return', 'type', 'class', 'extends', 'implements', 'new']
  const types = ['GuardrailPlugin', 'ScreeningResult', 'GuardrailContext', 'PatternRule']

  function highlight(src: string): string {
    if (language !== 'typescript' && language !== 'ts') return escapeHtml(src)

    return src.split('\n').map(line => {
      // Comments
      if (line.trimStart().startsWith('//')) {
        return `<span style="color:var(--text-muted)">${escapeHtml(line)}</span>`
      }

      let result = escapeHtml(line)

      // Strings
      result = result.replace(/&#39;([^&#]*?)&#39;/g, '<span style="color:#059669">\'$1\'</span>')
      result = result.replace(/&quot;([^&]*?)&quot;/g, '<span style="color:#059669">"$1"</span>')

      // Keywords
      for (const kw of keywords) {
        result = result.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:#7C3AED">${kw}</span>`)
      }

      // Types
      for (const t of types) {
        result = result.replace(new RegExp(`\\b${t}\\b`, 'g'), `<span style="color:#2563EB">${t}</span>`)
      }

      return result
    }).join('\n')
  }

  return (
    <div className="rounded-xl overflow-hidden my-6" style={{ border: '1px solid var(--border-color)' }}>
      {title && (
        <div className="px-4 py-2.5 text-[11px] font-mono" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          {title}
        </div>
      )}
      <pre
        className="p-5 text-[13px] font-mono leading-relaxed overflow-x-auto"
        style={{ background: 'var(--bg-card)', color: 'var(--body)' }}
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  )
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

function renderInlineLinks(text: string): string {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;text-decoration-style:dotted;text-underline-offset:3px;color:inherit">$1</a>'
  )
}

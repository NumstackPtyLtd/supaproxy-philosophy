import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'why-supaproxy',
  title: 'Why we built SupaProxy',
  subtitle: 'Every company will have AI agents. Most will lose control of what those agents do.',
  category: 'Philosophy',
  tags: ['vision', 'ai-operations', 'governance', 'open-source'],
  date: '2026-04-15',
  readTime: '3 min',
  coverColor: '#0f172a',
  blocks: [
    { type: 'paragraph', text: 'AI agents are becoming the interface between employees and data. They query databases, call APIs, draft documents, and make decisions. The question isn\'t whether your company will use them. It\'s whether you\'ll have any visibility into what they do.' },

    { type: 'heading', text: 'The problem with direct access' },
    { type: 'paragraph', text: 'Today, most companies connect their AI tools directly to model providers. Employee asks Claude a question, Claude responds. No logging, no guardrails, no cost tracking. The company has zero visibility into what data leaves its infrastructure.' },

    { type: 'callout', variant: 'warning', title: 'The risk', text: 'An employee asks an AI to "draft a proposal for the Falcon acquisition" and sends the company\'s most sensitive strategic information to a third-party model provider. No audit trail. No way to know it happened.' },

    { type: 'heading', text: 'The proxy pattern' },
    { type: 'paragraph', text: 'A proxy sits between your people and the AI models. Every query passes through it. This gives you a single point to log, screen, route, and enforce policy. The same architecture that web proxies use for HTTP traffic, applied to AI conversations.' },

    { type: 'heading', text: 'What the proxy controls' },
    { type: 'list', items: [
      'Which models each team can use (route to Claude for engineering, GPT for marketing)',
      'What data can leave (guardrails screen for PII, credentials, IP before forwarding)',
      'How much it costs (per-user, per-team, per-model budgets)',
      'What happened (every query logged with full context for compliance)',
      'Who can access what (tool-level permissions via MCP connections)',
    ]},

    { type: 'heading', text: 'Why open source' },
    { type: 'paragraph', text: 'The proxy is the wrong thing to make proprietary. If you\'re asking companies to route all their AI traffic through a single point, that point needs to be auditable. Open source means you can verify what the proxy does with your data. You can self-host it. You can fork it.' },
    { type: 'paragraph', text: 'The commercial layer (SupaProxy Cloud) adds multi-tenancy, managed hosting, marketplace, and compliance exports. The guardrails are the product, not the proxy itself.' },

    { type: 'callout', variant: 'principle', title: 'Our position', text: 'The proxy is infrastructure. Open it. The guardrails, the marketplace, the compliance evidence, the managed service... that\'s the product. That\'s where the value is.' },
  ],
}

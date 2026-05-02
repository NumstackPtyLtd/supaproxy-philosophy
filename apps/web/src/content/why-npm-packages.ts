import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'why-npm-packages',
  title: 'Why every extension is an npm package',
  subtitle: 'In a world of AI-generated code, small packages beat big monoliths.',
  category: 'Philosophy',
  tags: ['npm', 'plugins', 'open-source', 'architecture'],
  date: '2026-05-01',
  readTime: '4 min',
  coverColor: '#7C3AED',
  blocks: [
    { type: 'paragraph', text: 'When we started building SupaProxy, we had a choice: put everything in the server, or break it into packages. We chose packages. Not because it was easier (it wasn\'t), but because of what\'s coming.' },

    { type: 'heading', text: 'The AI coding problem' },
    { type: 'paragraph', text: 'AI agents write code now. They\'re good at small, focused changes. They\'re terrible at navigating large codebases. A 50,000-line server with tightly coupled modules is a minefield for an AI contributor. A 200-line npm package with a clear interface is a playground.' },
    { type: 'callout', variant: 'principle', title: 'Design principle', text: 'Every extension should be a change an AI agent can make in a single session without breaking anything else.' },

    { type: 'heading', text: 'What we broke out' },
    { type: 'list', items: [
      '@supaproxy/consumers — Slack, API, WhatsApp plugins. Adding a new consumer is one package.',
      '@supaproxy/connections — HTTP, STDIO, authenticated MCP connections. Adding a new transport is one package.',
      '@supaproxy/providers — Anthropic, OpenAI, and any future model. Adding a provider is one package.',
      '@supaproxy/guardrails — Pattern matching, LLM screening. Adding a guardrail is one package.',
      '@supaproxy/ui — Shared React components. Every product looks the same.',
    ]},

    { type: 'heading', text: 'The interface is the contract' },
    { type: 'paragraph', text: 'Each package implements a plugin interface. The server doesn\'t care what\'s inside. It calls screen(), it calls createMessage(), it calls start(). The implementation can change without touching the server.' },
    { type: 'code', language: 'typescript', title: 'GuardrailPlugin interface', code: `interface GuardrailPlugin {
  readonly id: string
  readonly name: string
  readonly stage: 'pre-llm' | 'post-llm'

  screen(query: string, context: GuardrailContext): Promise<ScreeningResult>
}` },
    { type: 'paragraph', text: 'Zero infrastructure dependencies. No logging library, no HTTP client, no database driver. The server provides all of that. The package is pure logic.' },

    { type: 'heading', text: 'What this enables' },
    { type: 'comparison', left: { title: 'Monolith approach', items: ['Fork the server to add a guardrail', 'Merge conflicts with every update', 'AI agents struggle with the codebase', 'One deployment for everything'] }, right: { title: 'Package approach', items: ['npm install @supaproxy/guardrails', 'Independent versioning', 'AI agents handle it in one session', 'Deploy the package, not the server'] } },

    { type: 'callout', variant: 'insight', title: 'The marketplace connection', text: 'This is why the marketplace exists. When every extension is a package with a manifest, installing a guardrail from a third party is the same as installing one from us. The architecture enables the marketplace, not the other way around.' },
  ],
}

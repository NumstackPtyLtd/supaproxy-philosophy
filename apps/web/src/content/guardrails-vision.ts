import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'guardrails-vision',
  title: 'Guardrails are not a feature. They are the product.',
  subtitle: 'Every organisation has different compliance needs. The proxy is where you enforce them.',
  category: 'Vision',
  tags: ['guardrails', 'compliance', 'marketplace', 'pipeline'],
  date: '2026-05-02',
  readTime: '5 min',
  coverColor: '#10B981',
  blocks: [
    { type: 'paragraph', text: 'A proxy that just forwards queries to an LLM is a router. A proxy that screens, filters, and enforces policy before forwarding is a guardrail. That\'s the difference between infrastructure and product.' },

    { type: 'heading', text: 'The pipeline' },
    { type: 'paragraph', text: 'Every query flows through a pipeline. Guardrails are stages in that pipeline. They run before the LLM (input screening) and after the LLM (output validation).' },
    { type: 'mermaid', diagram: `graph LR
    A[User query] --> B[Pattern Guard]
    B --> C[LLM Guard]
    C --> D[Marketplace plugins]
    D --> E{Pass / Redact / Block}
    E -->|Pass/Redact| F[Forward to LLM]
    E -->|Block| G[Return explanation]`, caption: 'Pre-LLM guardrail chain' },

    { type: 'heading', text: 'Why different companies need different guardrails' },
    { type: 'paragraph', text: 'A bank needs to catch account numbers and trading positions. A law firm needs to catch client names and case details. A healthcare company needs to catch patient IDs and diagnoses. A startup needs to catch API keys and nothing else.' },
    { type: 'callout', variant: 'principle', title: 'Design principle', text: 'The platform provides the pipeline. The guardrails are pluggable. What you screen for is your decision, not ours.' },

    { type: 'heading', text: 'Built-in, but not locked in' },
    { type: 'list', items: [
      'PatternGuardrail ships with common rules (PII, credentials). It works out of the box.',
      'LlmGuardrail calls any OpenAI-compatible endpoint. Point it at your private model.',
      'Marketplace guardrails come from third parties. Install one, it joins the chain.',
      'Custom rules can be added per workspace via YAML configuration.',
    ]},

    { type: 'heading', text: 'The event system' },
    { type: 'paragraph', text: 'Every screening decision emits events. Other products subscribe to these events and react.' },
    { type: 'comparison', left: { title: 'Events emitted', items: ['guardrail.triggered', 'guardrail.blocked', 'guardrail.redacted'] }, right: { title: 'Who listens', items: ['Sherlock (fraud detection)', 'Abide (compliance logging)', 'Audit (decision trail)'] } },
    { type: 'paragraph', text: 'A blocked query isn\'t just a blocked query. It\'s a fraud signal. It\'s a compliance event. It\'s an audit record. The guardrail does one thing. The ecosystem makes it meaningful.' },

    { type: 'heading', text: 'The marketplace opportunity' },
    { type: 'paragraph', text: 'If every guardrail is a package with a manifest, then anyone can build and sell guardrails. A fintech compliance consultancy builds a guardrail that catches trading jargon and regulatory terms. A healthcare company builds one that catches HIPAA-sensitive data. They publish it to the marketplace. Other companies in the same sector install it.' },
    { type: 'callout', variant: 'insight', title: 'The flywheel', text: 'More guardrails in the marketplace means more reasons to use SupaProxy. More SupaProxy users means more demand for guardrails. The platform becomes more valuable the more people build on it.' },
  ],
}

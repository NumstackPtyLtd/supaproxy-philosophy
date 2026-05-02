import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'guardrails-not-features',
  title: 'Guardrails are not features',
  subtitle: 'Every industry has different compliance needs. A platform that hardcodes its guardrails serves none of them well.',
  category: 'Vision',
  tags: ['guardrails', 'compliance', 'extensibility', 'pipeline'],
  date: '2026-05-02',
  readTime: '5 min',
  coverColor: '#10B981',
  blocks: [
    { type: 'paragraph', text: 'A proxy that forwards queries to an LLM is a router. A proxy that screens, filters, and enforces policy before forwarding is a guardrail. The difference between infrastructure and product is what happens at the interception point.' },

    { type: 'heading', text: 'The pipeline concept' },
    { type: 'paragraph', text: 'Consider a query as water flowing through a pipe. Guardrails are filters in that pipe. Some check the water before it reaches the treatment plant. Others check it after treatment, before it reaches the tap. The pipeline runs in sequence. Each filter receives the output of the previous one.' },
    { type: 'mermaid', diagram: `graph LR
    A[User query] --> B[Pattern filter]
    B --> C[AI classifier]
    C --> D[Custom filters]
    D --> E{Decision}
    E -->|Clean| F[Forward to LLM]
    E -->|Sensitive| G[Redact and forward]
    E -->|Dangerous| H[Block with explanation]`, caption: 'A guardrail pipeline with multiple stages' },

    { type: 'heading', text: 'Why one size does not fit all' },
    { type: 'paragraph', text: 'A bank needs to catch account numbers and trading positions. A law firm needs to catch client names and case details. A healthcare company needs to catch patient IDs and diagnoses. A startup needs to catch API keys and nothing else.' },
    { type: 'paragraph', text: 'Hardcoding guardrails into a platform means choosing whose compliance needs you serve. Making them pluggable means serving all of them. The platform provides the pipeline. What flows through it should be a configuration decision, not an engineering one.' },

    { type: 'heading', text: 'Composability' },
    { type: 'paragraph', text: 'A fast pattern matcher runs first, catching obvious patterns with zero external calls. An AI classifier runs second, catching nuanced sensitive content that regex cannot see. Industry-specific filters run third, catching domain terminology that only specialists would recognise.' },
    { type: 'paragraph', text: 'The first block stops the chain. Redactions accumulate through the pipeline. The system is as strict as the most conservative filter, and as permissive as the chain allows. This composability means organisations can layer defences without building them from scratch.' },

    { type: 'callout', variant: 'principle', title: 'A design principle', text: 'The platform provides the pipeline. What flows through it is a configuration decision, not an engineering one.' },

    { type: 'heading', text: 'When guardrails generate events' },
    { type: 'paragraph', text: 'A blocked query is not just a blocked query. It is a signal. Was the user trying to exfiltrate data? Was it an innocent mistake? Is there a pattern of blocked queries from the same user, or from the same team during the same week?' },
    { type: 'paragraph', text: 'When guardrails emit events, other systems can listen. Fraud detection notices repeated blocks. Compliance logging captures every screening decision. Audit trails record the evidence that policy was enforced. The guardrail does one thing. The ecosystem around it makes that one thing meaningful.' },

    { type: 'heading', text: 'Worth exploring further' },
    { type: 'paragraph', text: 'There are several open threads here that deserve more thought. Should guardrail authors be able to monetise their work? A fintech compliance team that builds a guardrail for trading terminology could sell it to other financial services companies. That creates a marketplace dynamic where domain experts, not platform engineers, drive the most valuable extensions.' },
    { type: 'paragraph', text: 'There is also the question of failure modes. Should a failed guardrail block everything, which is safe but disruptive, or pass everything, which is permissive but risky? And can guardrails learn over time? A filter that keeps blocking false positives could adapt its sensitivity, but that introduces a new kind of risk. These are the tradeoffs that make guardrail design genuinely hard, and genuinely interesting.' },

    { type: 'callout', variant: 'insight', title: 'The deeper pattern', text: 'Guardrails are the first example of pluggable intelligence at the interception point. The same pattern applies to output validation, cost controls, fraud detection, and policy enforcement. The proxy is the platform. The plugins are the product.' },
  ],
}

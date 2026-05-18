import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'why-teams-should-care',
  title: 'Why teams should care about AI governance',
  subtitle: 'The faster a team adopts AI, the wider the vulnerability gap can get. That tension keeps us up at night.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Philosophy',
  tags: ['governance', 'ai-operations', 'security', 'leadership'],
  date: '2026-04-15',
  readTime: '5 min',
  coverColor: '#0f172a',
  blocks: [
    { type: 'paragraph', text: 'There is a pattern we keep thinking about. The faster a team embraces AI, the more surface area it exposes. Speed and vulnerability scale together. What concerns us is the other side of that speed, the widening gap between what AI can access and what is actually governed.' },

    { type: 'heading', text: 'The pressure to ship' },
    { type: 'paragraph', text: 'The risk we see is that AI adoption can outpace the plan for keeping customers safe. Not because teams are careless. It is because the pressure to innovate with AI often comes from the top down. Management reads about competitors using AI to cut costs, boards ask why the company is falling behind, and the directive trickles down to engineering and product teams who are expected to integrate AI into everything.' },
    { type: 'paragraph', text: 'The people pushing hardest for AI adoption are often those furthest from the implementation. They see the productivity gains. They do not see the employee who just sent a client\'s financial details to a third-party model because the AI assistant had no guardrails. They do not see the API key that was pasted into a prompt. They do not see the internal project codename that is now part of a training dataset somewhere.' },

    { type: 'callout', variant: 'warning', title: 'The uncomfortable truth', text: 'More often than not, the urgency to adopt AI is driven by those who prioritise speed over security. Not because they do not care about security, but because they do not yet understand what AI-specific security looks like.' },

    { type: 'heading', text: 'AI security is not traditional security' },
    { type: 'paragraph', text: 'Traditional application security has well-understood patterns. Input validation. Authentication. Authorization. Encryption at rest and in transit. Teams know these problems and have tools for them.' },
    { type: 'paragraph', text: 'AI introduces a new category of risk that most security frameworks do not cover. The risk is not that someone breaks into your system. It is that your own employees, using tools you gave them, send sensitive data to external model providers as part of their normal workflow. The attack surface is not a vulnerability. It is a feature working as intended, without boundaries.' },

    { type: 'heading', text: 'What governance actually means' },
    { type: 'paragraph', text: 'AI governance is not about slowing down adoption. It is about making adoption sustainable. A team that deploys AI with guardrails can move faster over time because they do not have to stop and deal with data incidents, regulatory inquiries, or the reputational fallout of a preventable breach.' },
    { type: 'list', items: [
      'Visibility means knowing what questions your teams are asking AI, and what data is leaving your infrastructure.',
      'Screening means catching sensitive content before it reaches a model provider, not after.',
      'Cost attribution means understanding which teams and use cases are driving spend, so you can optimise instead of guessing.',
      'Compliance evidence means being able to prove to a regulator that your data handling policies were enforced, not just written.',
    ]},

    { type: 'heading', text: 'The governance layer' },
    { type: 'paragraph', text: 'Web proxies have existed for decades. They sit between clients and servers, providing visibility, caching, security, and routing. The same pattern applied to AI traffic creates a governance layer. One place to log, screen, route, and enforce policy.' },
    { type: 'paragraph', text: 'The proxy does not own the models. It does not own the data. It sits between them and provides the oversight that neither can provide alone. Every query passes through it. Every response passes back through it. The organisation gets to decide what is acceptable and what is not, rather than hoping employees make the right call every time.' },

    { type: 'heading', text: 'Who owns this problem?' },
    { type: 'paragraph', text: 'The difficult part is that AI governance does not fit neatly into any existing team\'s responsibility. Security teams understand risk but may not understand AI workflows. Engineering teams understand the tools but may not understand compliance requirements. Legal teams understand the regulatory landscape but may not understand what data flows through an AI query.' },
    { type: 'paragraph', text: 'The companies that get this right will be the ones that recognise AI governance as a cross-functional concern, not a checkbox for any single team. It requires security thinking, engineering capability, and regulatory awareness working together. The tooling needs to be accessible to all three, not locked behind any one discipline.' },

    { type: 'callout', variant: 'principle', title: 'The real question', text: 'The question is not whether your company should adopt AI. It is whether your company is prepared to govern what AI does with your data once you do.' },
  ],
}

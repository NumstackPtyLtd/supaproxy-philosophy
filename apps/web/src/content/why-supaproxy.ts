import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'why-a-proxy',
  title: 'What if AI had a governance layer?',
  subtitle: 'Every company will route AI traffic. The question is whether they will see what flows through.',
  category: 'Philosophy',
  tags: ['governance', 'ai-operations', 'proxy-pattern', 'visibility'],
  date: '2026-04-15',
  readTime: '3 min',
  coverColor: '#0f172a',
  blocks: [
    { type: 'paragraph', text: 'AI agents are becoming the primary interface between employees and organisational data. They query databases, call APIs, draft documents. The speed is intoxicating. The visibility is zero.' },

    { type: 'heading', text: 'The invisible highway' },
    { type: 'paragraph', text: 'Most AI traffic today flows directly from the employee to the model provider. No logging. No screening. No cost tracking. The organisation has no visibility into what data leaves its infrastructure, what questions are being asked, or what answers are being given.' },
    { type: 'paragraph', text: 'This is not a theoretical risk. It is a structural blind spot.' },

    { type: 'callout', variant: 'insight', title: 'The question', text: 'What if every AI query passed through a single, observable layer? Not to slow things down, but to see them. To understand them. To govern them.' },

    { type: 'heading', text: 'The proxy pattern' },
    { type: 'paragraph', text: 'Web proxies have existed for decades. They sit between clients and servers, providing visibility, caching, security, and routing. The same pattern applied to AI traffic creates a governance layer. One place to log, screen, route, and enforce policy.' },
    { type: 'paragraph', text: 'The proxy does not own the models. It does not own the data. It sits between them and provides the oversight that neither can provide alone.' },

    { type: 'heading', text: 'What becomes possible' },
    { type: 'list', items: [
      'Visibility into what questions employees ask AI, across every team.',
      'Screening for sensitive data before it reaches a third-party model.',
      'Cost attribution to the team, user, and use case that generated it.',
      'Routing decisions that match the right model to the right purpose.',
      'Compliance evidence that data handling policies were enforced.',
    ]},

    { type: 'heading', text: 'Where the value lives' },
    { type: 'paragraph', text: 'Should the governance layer be proprietary or open source? If you are asking organisations to route all AI traffic through a single point, does that point need to be auditable? There is a strong argument that the proxy itself is infrastructure and should be transparent. The value lives in what you layer on top of it. The guardrails, the compliance evidence, the industry-specific extensions that make the proxy useful for a particular sector.' },
    { type: 'paragraph', text: 'This is a separation of concerns question at the business model level, not just the code level. Infrastructure wants to be open. Intelligence wants to be differentiated. Getting the boundary right between the two is the interesting design problem.' },

    { type: 'callout', variant: 'principle', title: 'A principle worth exploring', text: 'Infrastructure should be open. The intelligence layered on top of it is where differentiation lives.' },
  ],
}

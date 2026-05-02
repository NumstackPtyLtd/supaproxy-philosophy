import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'guardrails-as-middleware',
  title: 'Guardrails as middleware, not classifiers',
  subtitle: 'A guardrail that can only pass, redact, or block is a bouncer. A guardrail that can modify, replace, and enrich is middleware. The distinction changes everything about how you design the pipeline.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['guardrails', 'middleware', 'pipeline', 'architecture', 'performance'],
  date: '2026-05-02',
  readTime: '7 min',
  coverColor: '#6366F1',
  blocks: [
    { type: 'paragraph', text: 'HTTP middleware does not just accept or reject requests. It rewrites headers, injects context, transforms bodies, and decides whether to continue or short-circuit. Nobody would build a web framework where middleware can only return "allow" or "deny". Yet most guardrail systems offer exactly that vocabulary. Pass, redact, block. Three verbs for an infinite problem space.' },

    { type: 'heading', text: 'The classifier trap' },
    { type: 'paragraph', text: 'Classification is seductive because it feels complete. A query arrives, the system labels it sensitive or safe, and the pipeline acts on the label. But real compliance needs do not fit into binary buckets. A healthcare system might need to replace a patient name with a pseudonym while preserving the clinical context around it. A legal team might need to inject a disclaimer into the response, not block the query that triggered it. A fintech compliance filter might need to enrich the audit log with regulatory codes before allowing the query to proceed.' },
    { type: 'paragraph', text: 'Pass, redact, and block are outcomes. Middleware thinks in transformations. The query that enters a filter is not necessarily the query that leaves it. The response that a model generates is not necessarily the response the user receives. Each filter in the chain can reshape, annotate, or redirect. That is the difference between a classifier and middleware.' },

    { type: 'heading', text: 'Domain owners maintain domain guardrails' },
    { type: 'paragraph', text: 'A platform engineer understands request routing, connection pooling, and retry logic. A healthcare compliance officer understands HIPAA, minimum necessary standards, and de-identification rules. These are different people with different expertise, and neither should be forced into the other\'s domain.' },
    { type: 'paragraph', text: 'When guardrails are middleware, the authoring surface changes. A compliance officer does not need to understand the proxy internals. They need a contract. They receive a query context, they return a transformed query context. The separation of concerns mirrors Domain-Driven Design bounded contexts. The platform owns the pipeline mechanics. Domain experts own the transformation logic. Each group maintains what they understand best.' },
    { type: 'paragraph', text: 'This separation also distributes accountability. When a guardrail fails, the question of who owns the fix has a clear answer. The team that understands the domain maintains the filter that encodes domain knowledge. Platform engineers do not become bottlenecks for compliance changes across twenty different industries.' },

    { type: 'callout', variant: 'principle', title: 'Separation of authority', text: 'The platform owns the pipeline. Domain experts own the filters. Neither group should need permission from the other to do their job effectively.' },

    { type: 'heading', text: 'The complexity spectrum' },
    { type: 'paragraph', text: 'Not all guardrails are equal in complexity, latency cost, or timing requirements. A useful mental model places them on a spectrum.' },
    { type: 'list', items: [
      'Pattern matching filters catch credit card numbers and API keys in microseconds. They are stateless, deterministic, and cheap.',
      'AI classification filters detect nuanced sensitive content that regex cannot express. They add tens of milliseconds and require model inference.',
      'Product-level filters enforce business rules mid-conversation. A consent check that fires after the third exchange, or a usage cap that triggers based on cumulative token spend across a session.',
      'Late filters operate after delivery. They edit or delete a message retroactively when new information surfaces. A compliance scan that runs asynchronously and redacts content minutes after it was sent.',
    ] },
    { type: 'paragraph', text: 'Each category sits at a different point in the pipeline and operates under different latency constraints. The middleware model accommodates all of them because it does not prescribe when a filter runs or how long it takes. It only prescribes the interface.' },

    { type: 'heading', text: 'Performance and the caching question' },
    { type: 'paragraph', text: 'Every filter in the chain adds latency. A pipeline with five filters, each adding 20 milliseconds, means 100 milliseconds before the query even reaches the model. For interactive use cases, that budget matters. For batch processing, it might not. The pipeline needs to be aware of its own cost.' },
    { type: 'paragraph', text: 'Semantic caching offers one path forward. If a guardrail decided to allow a query yesterday, and today a semantically similar query arrives, can the system skip the expensive filter and reuse the previous decision? The answer depends entirely on what "similar" means in context. Two queries that look identical to an embedding model might have completely different compliance implications if the user, the time of day, or the preceding conversation differs.' },
    { type: 'paragraph', text: 'There is also the question of cache invalidation. Compliance rules change. A query that was permissible last month might violate new regulations today. Caching guardrail decisions introduces a staleness risk that does not exist with stateless evaluation. Should the community define best practices here, or is this inherently too context-dependent for general guidance? Perhaps the answer is that caching belongs in the filter itself, not in the pipeline. Each filter author knows whether their logic is cacheable, what the cache key should be, and how long a cached decision remains valid. The pipeline should not assume.' },

    { type: 'callout', variant: 'insight', title: 'Cache ownership', text: 'A pipeline that caches guardrail decisions globally will get it wrong. Only the filter author knows whether their logic is deterministic enough to cache, and under what conditions a cached decision expires.' },

    { type: 'heading', text: 'The mental model' },
    { type: 'paragraph', text: 'Express middleware transformed how developers think about HTTP request handling. Before middleware, frameworks offered monolithic request handlers. After middleware, developers composed small, focused functions into pipelines. Each function did one thing. The framework handled ordering, error propagation, and short-circuiting.' },
    { type: 'paragraph', text: 'Guardrail middleware applies the same pattern to a different domain. Instead of HTTP requests flowing through a stack of functions, AI queries flow through a stack of filters. Instead of headers and bodies, the context carries prompts, conversation history, and metadata. Instead of next() passing control downstream, a guardrail filter yields to the next filter or terminates the chain.' },
    { type: 'paragraph', text: 'The analogy is not perfect. HTTP middleware operates on a single request-response cycle. Guardrail middleware might need to consider an entire conversation, a user\'s history, or an organisation\'s cumulative risk posture. But the core insight transfers. Small composable units, a clear interface contract, and a framework that handles the plumbing. That pattern has proven itself across decades of software architecture. There is no reason it should not apply here.' },

    { type: 'heading', text: 'Open threads' },
    { type: 'paragraph', text: 'If guardrails are middleware, what does the interface contract look like? A filter that only receives the current query cannot enforce session-level policies. A filter that receives the full conversation history pays a token cost for context it might not need. The contract needs to be rich enough for complex filters and lean enough for simple ones. Perhaps the answer is a layered context object where filters declare what they need and the pipeline provides only that.' },
    { type: 'paragraph', text: 'There is also the question of observability. In HTTP middleware, tracing headers propagate through the stack and each middleware can emit spans. Guardrail middleware needs equivalent instrumentation. Which filter transformed the query, how long it took, what decision it made, and why. Without that observability, debugging a misbehaving pipeline becomes guesswork. And unlike HTTP middleware, guardrail decisions have compliance implications. The audit trail is not optional. It is the product.' },
  ],
}

import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'memory-and-trust',
  title: 'Your AI product has amnesia. Here is how to fix it.',
  subtitle: 'Most AI products forget everything between sessions. The ones that remember will win. But memory without trust is dangerous. Here is an architecture for AI products that remember responsibly.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['retrieval', 'embeddings', 'trust', 'governance', 'rag', 'knowledge-management', 'vector-search'],
  date: '2026-05-08',
  readTime: '12 min',
  coverColor: '#1c1916',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The amnesia problem' },
    { type: 'paragraph', text: 'Every AI product starts the same way. User sends input, AI processes it, AI responds. Next interaction, the AI has no memory of the last one. It is a goldfish with a PhD.' },
    { type: 'paragraph', text: 'This works for simple tools. Ask ChatGPT to write a regex, get a regex, move on. But for products that operate inside an organisation, in a team with history, conventions, decisions, politics, amnesia is a fatal flaw.' },
    { type: 'paragraph', text: 'Consider a code reviewer that flags a pattern as a violation. A developer responds: "This is intentional, the TL approved it last month." The reviewer has no way to verify this. Next week, a different developer hits the same pattern. The reviewer flags it again. The team stops trusting it. The product dies.' },
    { type: 'callout', variant: 'principle', title: 'The memory principle', text: 'AI products that operate inside organisations need persistent, searchable, trust-scored memory. Not just a database. A retrieval layer that finds what is relevant by meaning, not by keywords.' },

    { type: 'heading', text: 'Two layers, two problems' },
    { type: 'paragraph', text: 'When you start building memory into an AI product, you quickly discover there are two distinct problems that look like one.' },
    { type: 'paragraph', text: 'The first is retrieval. Given a new situation, what past knowledge is relevant? This is the classic RAG (Retrieval-Augmented Generation) problem. Embed your knowledge, store vectors, search by similarity. Plenty of tutorials cover this.' },
    { type: 'paragraph', text: 'The second is trust. Of the knowledge you retrieved, how much of it should you act on? Who said it? When? Did anyone disagree? Is it still valid? This is the problem nobody talks about, and it is the one that determines whether your product is useful or dangerous.' },
    { type: 'comparison', left: { title: 'Retrieval layer (memory)', items: ['Store knowledge with embeddings', 'Search by semantic similarity', 'Extract entities and relationships', 'Track what was used and when', 'Merge results from multiple paths'] }, right: { title: 'Trust layer (governance)', items: ['Verify who said what and when', 'Require approvals before acting', 'Track dissenting opinions', 'Score confidence by source and authority', 'Audit every decision end to end'] } },

    { type: 'heading', text: 'The retrieval layer' },
    { type: 'paragraph', text: 'The retrieval layer is your product\'s memory. It answers the question: "What do we know that is relevant to this situation?"' },
    { type: 'paragraph', text: 'A naive implementation stores text and searches by keywords. This breaks immediately in practice because people describe the same concept in different words. "Date field naming convention" and "fix the timestamp column" are the same topic but share zero keywords.' },
    { type: 'paragraph', text: 'Vector embeddings solve this. You convert text into a numerical representation that captures meaning, not just words. Two pieces of text about the same concept end up close together in vector space, even if they use completely different language.' },

    { type: 'callout', variant: 'insight', title: 'Three retrieval paths', text: 'The strongest retrieval combines three approaches in parallel: (1) vector similarity for semantic matches, (2) entity graph lookups for relational queries ("what do we know about X?"), and (3) direct tag and source filters. Merge and deduplicate the results.' },

    { type: 'paragraph', text: 'But vector search alone is not enough. You also need an entity graph: a structured map of relationships between things. "GiftCardPayment is exempted from RefundablePayment, decided by the TL on May 7th." This is not a fuzzy similarity match. It is a hard fact that the system needs to know.' },
    { type: 'paragraph', text: 'The retrieval layer stores both: embeddings for fuzzy semantic search, and an entity graph for precise relational queries. At retrieval time, both run in parallel. The results are merged, deduplicated, and ranked by relevance.' },

    { type: 'code', language: 'typescript', title: 'Retrieval at query time', code: `// Three paths run in parallel
const [vectorResults, entityResults, tagResults] = await Promise.all([
  vectorStore.search(namespace, queryEmbedding, { limit: 15 }),
  entityGraph.about(extractedEntities),
  knowledgeRepo.findByTags(namespace, relevantTags),
])

// Merge, deduplicate, rank by score
const context = mergeAndRank([vectorResults, entityResults, tagResults])` },

    { type: 'heading', text: 'The trust layer' },
    { type: 'paragraph', text: 'Here is where most AI products stop. They retrieve context, inject it into the prompt, and let the AI figure it out. This works until it does not.' },
    { type: 'paragraph', text: 'The problem is that not all knowledge is equal. A rule documented in an architecture decision record, reviewed by three senior engineers, is fundamentally different from something someone said in a Slack DM six months ago. But if both are stored as text with embeddings, the retrieval layer treats them the same.' },

    { type: 'callout', variant: 'warning', title: 'The trust gap', text: 'Without a trust layer, your AI product will confidently act on unverified information. An intern\'s Slack message carries the same weight as the CTO\'s architecture decision. This is how AI products lose credibility.' },

    { type: 'paragraph', text: 'The trust layer sits between retrieval and action. It evaluates every piece of retrieved knowledge against a set of governance rules before the AI acts on it.' },

    { type: 'heading', text: 'Source credibility' },
    { type: 'paragraph', text: 'Not all sources are equal. The trust layer assigns a credibility tier to each source of knowledge.' },
    { type: 'list', items: [
      'Formal (1.0): wiki entries, architecture decision records, signed-off policies. Already verified by definition.',
      'Semi-formal (0.7): PR review comments, merged code comments, documented meeting notes. Probably accurate, but could be outdated.',
      'Informal (0.4): Slack public channels, Teams threads, email threads. Context-dependent, might be casual or joking.',
      'Unverified (0.2): Slack DMs, verbal agreements, patterns inferred from code. Needs explicit verification before acting on.',
    ] },
    { type: 'paragraph', text: 'Source credibility is configurable. Every organisation has different norms. For some, a Slack message from the CTO is gospel. For others, nothing counts until it is in the wiki. The trust layer does not impose a model. It provides the framework and lets the consumer configure it.' },

    { type: 'heading', text: 'Authority and approval' },
    { type: 'paragraph', text: 'Who said it matters as much as what was said. The trust layer maps people to authority levels and uses those levels to determine how much weight a statement carries.' },
    { type: 'paragraph', text: 'An intern saying "we should use snake_case" has different weight than the lead architect saying the same thing. Both are stored. Both are retrievable. But the trust layer scores them differently and may require additional verification for the lower-authority statement before acting on it.' },
    { type: 'paragraph', text: 'Approval rules are configurable per organisation. Some teams need two senior engineers to confirm a new convention. Others need only a team lead. Security-tagged decisions might need the security team explicitly. The trust layer provides the rule engine. The consumer provides the rules.' },

    { type: 'heading', text: 'Dissent is data' },
    { type: 'paragraph', text: 'Here is something most systems get catastrophically wrong: they discard disagreement.' },
    { type: 'paragraph', text: 'Someone approves a decision. Someone else raises a concern. The decision is stored as "approved". The concern disappears. Six months later, the concern turns out to be valid, but nobody remembers it was raised.' },

    { type: 'callout', variant: 'principle', title: 'The dissent principle', text: 'Dissenting opinions are never discarded. They are stored alongside the approval, visible when the knowledge is retrieved, and periodically resurfaced for resolution. A system that silences disagreement is not trustworthy.' },

    { type: 'paragraph', text: 'When dissent exists, the trust layer caps the confidence score. The knowledge is still usable, but the system is honest about the fact that not everyone agreed. When the AI retrieves this knowledge, it can say: "This was approved by the TL, but Alice raised a concern about Q3 compatibility. That concern is still unresolved."' },
    { type: 'paragraph', text: 'This is not just good engineering. It is how trust works in real teams. People trust systems that are transparent about uncertainty.' },

    { type: 'heading', text: 'The confidence spectrum' },
    { type: 'paragraph', text: 'The trust layer produces a confidence score for every piece of knowledge. This score determines what the AI does with it.' },
    { type: 'list', items: [
      'Above 0.9: act on it silently. High confidence, multiple confirmations, recent, formal source.',
      '0.7 to 0.9: flag it with context. "This looks like a violation of X. Here is why I think so."',
      '0.5 to 0.7: ask the person involved. "This might conflict with X. Is this intentional?"',
      '0.3 to 0.5: escalate. "I am not sure about this. Let me check with the right person."',
      'Below 0.3: stay quiet. Not enough signal to say anything useful.',
    ] },
    { type: 'paragraph', text: 'This spectrum is the difference between an AI that annoys people and one that feels like a thoughtful colleague. A confident system that is wrong destroys trust faster than a cautious system that asks.' },

    { type: 'heading', text: 'Four types of questions' },
    { type: 'paragraph', text: 'When the confidence is in the "ask" range, the type of question matters. Not all questions are the same, and each type enriches the knowledge base differently.' },
    { type: 'list', items: [
      'Clarification: "Just so I understand, is this intentional?" Fills in missing context. The answer teaches intent.',
      'Confirmation: "This would change the schema that three services depend on. Are you sure?" Guards against high-impact mistakes. The answer teaches risk tolerance.',
      'Escalation: "This seems above my paygrade. Let me check with the person who owns this policy." Routes decisions to the right authority. The answer teaches org structure.',
      'Learning: "I have noticed this pattern three times this week. Is this a new convention?" Detects emerging standards. The answer teaches new rules.',
    ] },
    { type: 'paragraph', text: 'Every answer, regardless of type, feeds back into the knowledge base. Clarifications become exceptions. Confirmations become precedents. Escalations establish authority chains. Learning questions become new rules. The system gets smarter with every interaction.' },

    { type: 'heading', text: 'The audit trail' },
    { type: 'paragraph', text: 'Enterprise customers ask one question before any other: "Can I trace how a decision was made?"' },
    { type: 'paragraph', text: 'With a trust layer, the answer is yes. Every piece of knowledge has a complete provenance trail: who initiated it, who was asked to verify, who approved, who dissented, when, and why. This is not a nice-to-have. For regulated industries, it is a legal requirement.' },
    { type: 'paragraph', text: 'The audit trail also serves a practical purpose. When a rule causes friction ("why is the system blocking my PR?"), the developer can trace it back to the source: "This rule was added by Sarah on March 3rd, approved by the TL, based on the incident report from February." Transparency breeds trust.' },

    { type: 'heading', text: 'Putting it together' },
    { type: 'paragraph', text: 'The architecture is two layers that compose but do not require each other:' },
    { type: 'list', items: [
      'The retrieval layer (memory): store, embed, search, extract entities, track usage. Pure data, no opinions.',
      'The trust layer (governance): verify sources, require approvals, score confidence, log dissent, audit everything. Pure judgement, pluggable retrieval.',
    ] },
    { type: 'paragraph', text: 'A product can use just the retrieval layer for basic semantic search. Add the trust layer when you need governance. Use both together for the full experience. Neither depends on the other at the code level.' },

    { type: 'callout', variant: 'insight', title: 'The composability principle', text: 'Build the memory and the judgement as separate tools. Products that only need search get search. Products that need governance get governance. Products that need both get a system that is greater than the sum of its parts.' },

    { type: 'heading', text: 'Why this matters now' },
    { type: 'paragraph', text: 'Every AI product is about to hit the same wall. The ones that are pure wrappers around LLMs will lose to the ones that accumulate organisational knowledge. The ones that accumulate knowledge recklessly will lose to the ones that govern it properly.' },
    { type: 'paragraph', text: 'The products that win will be the ones that remember what their users taught them, verify it before acting on it, and are transparent about what they know and how they know it.' },
    { type: 'paragraph', text: 'Memory without trust is a liability. Trust without memory is amnesia. Build both.' },

    { type: 'quote', text: 'The moat is not the model. The moat is what the model knows about your organisation, and whether you can trust it.', author: 'Numstack' },
  ],
}

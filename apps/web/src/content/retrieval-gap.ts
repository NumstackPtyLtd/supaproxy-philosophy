import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'retrieval-gap',
  title: 'The retrieval gap: why most vector search fails at context',
  subtitle: 'Similarity is not relevance. Most retrieval systems treat vector search as a single step. In practice, you need three layers: structural filtering, semantic search, and feedback tracking. Skip any one and the results feel close but not quite right.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Engineering',
  tags: ['vector-db', 'embeddings', 'retrieval', 'rag', 'semantic-search', 'viper'],
  date: '2026-05-05',
  readTime: '7 min',
  coverColor: '#0a1628',
  featured: false,
  blocks: [
    { type: 'paragraph', text: 'Most teams adopting vector databases hit the same wall. They embed their documents, run a similarity search, and get results that are technically similar but contextually wrong.' },
    { type: 'paragraph', text: 'The problem is not the database. It is the assumption that similarity equals relevance.' },

    { type: 'heading', text: 'The bag-of-words trap' },
    { type: 'paragraph', text: 'The fastest way to get a vector search running is to hash words into dimensions. TF-IDF, BM25, bag-of-words projections. They are fast, they need no external API calls, and they work surprisingly well for exact keyword overlap.' },
    { type: 'paragraph', text: 'Search "date field naming" and you will find a document titled "Date Field Naming Convention". Job done.' },
    { type: 'paragraph', text: 'But search "why does the checkout total look wrong?" and you will get nothing, even though your knowledge base has an entry called "Rounding policy for currency calculations" that explains exactly this.' },
    { type: 'paragraph', text: 'The gap is semantic. Bag-of-words sees tokens. It does not see meaning.' },

    { type: 'callout', variant: 'principle', title: 'The core problem', text: 'Keyword matching finds what you said. Semantic search finds what you meant. Most retrieval systems use only one or the other, when they need both.' },

    { type: 'heading', text: 'Real embeddings close the gap, but open another' },
    { type: 'paragraph', text: 'Modern embedding models encode meaning, not just words. "Checkout total looks wrong" and "currency rounding policy" end up near each other in vector space because the model understands they are related concepts.' },
    { type: 'paragraph', text: 'This is a genuine improvement. But it introduces a different problem: embedding models are generalists. They encode general semantic similarity, not domain-specific relevance.' },
    { type: 'paragraph', text: 'Consider two documents in an engineering knowledge base:' },
    { type: 'list', items: [
      '"All date columns must use _date suffix" (coding standard)',
      '"Release dates for Q3 are finalised" (project update)',
    ] },
    { type: 'paragraph', text: 'A general embedding model sees "date" in both and places them near each other. But in the context of a code review that changes a database column, only the first is relevant.' },
    { type: 'paragraph', text: 'The embedding model does not know what you are trying to do with the results.' },

    { type: 'heading', text: 'Context is not a property of the document' },
    { type: 'paragraph', text: 'This is the core insight most vector search implementations miss. Relevance is not an intrinsic property of the document being searched. It is a relationship between the document, the query, and the intent behind the query.' },
    { type: 'paragraph', text: 'A document about "error handling patterns" is highly relevant when reviewing a new API endpoint. It is irrelevant when reviewing a CSS change. The document has not changed. The context has.' },
    { type: 'paragraph', text: 'This means a single vector index, no matter how good the embeddings, will always return some noise. The embedding captures what the document means. It does not capture when the document matters.' },

    { type: 'callout', variant: 'insight', title: 'The proxy parallel', text: 'This mirrors a problem we solved in the SupaProxy Cloud pipeline. When proxying data through AI models, the meaning of a field depends on its context, not its content. A phone number starting with +27 tells the model the customer is in South Africa. Strip the context (the country code), and the model draws wrong conclusions about jurisdiction, risk, and routing. In retrieval, the same principle applies: strip the context (project, file paths, intent), and the search returns plausible but wrong results.' },

    { type: 'heading', text: 'Three layers of retrieval' },
    { type: 'paragraph', text: 'Effective knowledge retrieval needs three layers, not one:' },

    { type: 'heading', text: 'Layer 1: Structural filtering' },
    { type: 'paragraph', text: 'Before any vector search happens, narrow the candidate set using metadata. Which project is this for? Which file paths are affected? What category of knowledge is relevant? This is cheap, exact, and eliminates 80% of noise.' },
    { type: 'paragraph', text: 'A coding standard for the payment service should not appear in a review of the documentation site. Filter by project first. Search second.' },
    { type: 'paragraph', text: 'In SupaProxy Cloud, the equivalent is entity resolution. Before the proxy transforms any data, it resolves which entity the request belongs to. A request about customer #4521 gets that customer\'s privacy rules, not a generic policy. The structural context narrows the transformation space before any AI processing begins.' },

    { type: 'heading', text: 'Layer 2: Semantic search' },
    { type: 'paragraph', text: 'Within the filtered set, use real embeddings to find conceptually related documents. This is where the vector database earns its keep. But it is searching a smaller, pre-filtered corpus, so precision goes up dramatically.' },
    { type: 'paragraph', text: 'The choice of embedding model matters here. General-purpose models (like those from Voyage AI or OpenAI) work well for broad text. Domain-specific fine-tuning helps if your corpus is specialised (legal, medical, financial). But the biggest improvement comes from layer 1 reducing the search space, not from the model itself.' },

    { type: 'heading', text: 'Layer 3: Feedback tracking' },
    { type: 'paragraph', text: 'The results from layer 2 are candidates, not answers. Re-rank them based on contextual signals: how recently was this document used? How often has it been relevant in similar situations? Does it match the specific files being changed?' },
    { type: 'paragraph', text: 'Most implementations skip this layer entirely, and it is the one that makes retrieval feel intelligent over time.' },

    { type: 'callout', variant: 'insight', title: 'Learning from usage', text: 'In SupaProxy Cloud, the proxy pipeline learns from each request. If a transformation rule is applied but the downstream model ignores the result, that is a signal the rule is too aggressive or incorrectly scoped. The same feedback loop applies to retrieval: if a retrieved document is consistently ignored by the consumer, it should rank lower in future queries. No embedding model can learn this. Only usage tracking can.' },

    { type: 'heading', text: 'The feedback loop matters more than the model' },
    { type: 'paragraph', text: 'There is a temptation to chase better embedding models. Larger dimensions, newer architectures, fine-tuned on your domain. These help, but the returns diminish quickly.' },
    { type: 'paragraph', text: 'What actually moves the needle is tracking whether retrieved documents were useful.' },
    { type: 'paragraph', text: 'If a document is retrieved during a review and the reviewer acts on it, that is a positive signal. If it is retrieved and ignored, that is a negative signal. Over time, this feedback loop creates a relevance model that is specific to your team, your codebase, and your patterns.' },
    { type: 'paragraph', text: 'No embedding model, no matter how advanced, can learn that your team always ignores the "commit message format" guideline but takes the "error handling" guideline seriously. That is learned behaviour, and it only comes from tracking outcomes.' },

    { type: 'comparison', left: { title: 'What embedding models know', items: [
      'Semantic similarity between texts',
      'Conceptual relationships',
      'Language patterns and synonyms',
      'General domain knowledge',
    ] }, right: { title: 'What only feedback tracking knows', items: [
      'Which documents your team actually uses',
      'Which rules are enforced vs ignored',
      'Which categories matter for which file paths',
      'How relevance changes over time as standards evolve',
    ] } },

    { type: 'heading', text: 'The practical takeaway' },
    { type: 'paragraph', text: 'If you are building a retrieval system for any knowledge-intensive workflow:' },
    { type: 'list', items: [
      'Do not skip structural filtering. Metadata is your cheapest, most reliable filter.',
      'Use real embeddings, not keyword hashing. The semantic gap is real and large.',
      'Track what gets used. A retrieval system without feedback is guessing.',
      'Accept that retrieval is probabilistic. Return more candidates than you need and let the consumer (human or AI) decide what is relevant.',
    ] },
    { type: 'paragraph', text: 'The goal is not perfect retrieval. It is retrieval good enough that the consumer trusts the system to surface what matters, and the system gets better every time it is used.' },

    { type: 'callout', variant: 'principle', title: 'The SupaProxy principle', text: 'Context flows through every layer of the stack. In the proxy pipeline, it determines how data is transformed. In retrieval, it determines what knowledge is surfaced. In both cases, the system that preserves and acts on context outperforms the system that treats every request as independent.' },
  ],
}

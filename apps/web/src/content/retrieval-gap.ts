import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'retrieval-gap',
  title: 'What we got wrong about vector search in Viper',
  subtitle: 'We built an AI code reviewer with a knowledge base backed by LanceDB. The vector search worked on demos but fell apart in practice. Here is what we learned about the gap between similarity and relevance.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Engineering',
  tags: ['vector-db', 'embeddings', 'retrieval', 'rag', 'semantic-search', 'viper'],
  date: '2026-05-05',
  readTime: '7 min',
  coverColor: '#0a1628',
  featured: false,
  blocks: [
    { type: 'heading', text: 'What is Viper' },
    { type: 'paragraph', text: 'Viper is an internal tool we built at Numstack that reviews pull requests using AI. It started as a webhook listener that pipes diffs to Claude and posts findings as PR comments. Simple enough.' },
    { type: 'paragraph', text: 'But we wanted it to be smarter than a generic reviewer. We wanted it to know our team\'s conventions, our architecture decisions, our business rules. So we built a "Wiki" inside Viper, a knowledge base where teams document their standards. When a PR comes in, Viper queries the Wiki for relevant entries and injects them into the review prompt. The idea is that the AI reviews your code against your rules, not generic best practices.' },
    { type: 'paragraph', text: 'It is still an internal tool. We are not sure yet if it is a product. But the retrieval problem we hit is universal enough to write about.' },

    { type: 'heading', text: 'The first version: bag-of-words' },
    { type: 'paragraph', text: 'We backed the Wiki with LanceDB, an embedded vector database. For the initial version, we did not want to add another API dependency, so we wrote a bag-of-words hasher that projects text into a 384-dimension vector. No external calls. Fast. Ships in the binary.' },
    { type: 'paragraph', text: 'It worked exactly as well as you would expect.' },
    { type: 'paragraph', text: 'Search "date field naming" and the entry titled "Date Field Naming Convention" comes back. Search "why does the checkout total look wrong" and nothing comes back, even though we have an entry called "Rounding policy for currency calculations" that explains exactly that.' },
    { type: 'paragraph', text: 'Bag-of-words finds what you said. It does not find what you meant. We knew this going in, but we underestimated how much it mattered. In a demo, you search for the exact title and it works. In a real review, the PR title is "Fix checkout total rounding" and the Wiki entry talks about "currency precision policy". Zero keyword overlap. Zero results.' },

    { type: 'heading', text: 'The second version: real embeddings' },
    { type: 'paragraph', text: 'We switched to Voyage AI embeddings (voyage-3-lite). Anthropic\'s recommended embedding partner, since we are a Claude-first platform and Anthropic does not offer their own embeddings API.' },
    { type: 'paragraph', text: 'The semantic gap closed immediately. "Fix checkout total rounding" now finds "Currency precision policy" because the embedding model understands they are related concepts. This was a genuine step forward.' },
    { type: 'paragraph', text: 'But it introduced a different problem we did not anticipate.' },

    { type: 'heading', text: 'The noise problem' },
    { type: 'paragraph', text: 'Viper is multi-project. An organisation might have a payment service, a shipping service, and a documentation site. Each has its own Wiki entries. When a PR comes in for the documentation site, the semantic search returns entries like "All API endpoints must validate input" because the embedding model sees "API" and "endpoint" in the diff and thinks they are related.' },
    { type: 'paragraph', text: 'They are semantically related. They are contextually irrelevant. A CSS change to the docs site does not need API validation rules.' },
    { type: 'paragraph', text: 'The embedding model does not know what project is being reviewed. It does not know which file paths changed. It just sees text similarity. And text similarity is not the same as contextual relevance.' },

    { type: 'callout', variant: 'insight', title: 'The parallel with SupaProxy', text: 'We hit a version of this problem in SupaProxy Cloud. When the proxy transforms data before sending it to an AI model, the meaning of a field depends on its context, not its content. A phone number starting with +27 tells the model the customer is in South Africa. If the proxy strips that context, the model draws wrong conclusions. Same principle: strip the context from a retrieval query (which project, which files), and you get plausible but wrong results.' },

    { type: 'heading', text: 'What we changed: three layers' },
    { type: 'paragraph', text: 'We ended up with a three-layer retrieval pipeline. Not because we designed it that way upfront, but because each layer was a response to a specific failure mode.' },

    { type: 'heading', text: 'Layer 1: Filter by project first' },
    { type: 'paragraph', text: 'Before any vector search runs, we narrow the candidate set. Which project is this PR for? Wiki entries are now tagged with a project (or marked as org-wide). When reviewing the payment service, we only search payment service entries plus org-wide entries. The docs site entries never enter the search space.' },
    { type: 'paragraph', text: 'This is not clever. It is just metadata filtering. But it eliminated about 80% of the noise we were seeing. The cheapest layer turned out to be the most impactful.' },

    { type: 'heading', text: 'Layer 2: Semantic search within the filtered set' },
    { type: 'paragraph', text: 'Within the filtered corpus, the Voyage AI embeddings do their job well. The search space is smaller and more focused, so precision goes up. "Fix checkout rounding" finds "Currency precision policy" because they are now being compared within a corpus of payment service rules, not the entire organisation\'s knowledge base.' },
    { type: 'paragraph', text: 'We considered fine-tuning the embedding model on our own data. We decided against it. The biggest improvement came from layer 1 reducing the search space, not from the model itself. Fine-tuning felt like optimising the wrong thing.' },

    { type: 'heading', text: 'Layer 3: Track what gets used' },
    { type: 'paragraph', text: 'This is the layer we built last and wish we had built first. Every time a Wiki entry is matched during a review, we increment a counter. Every time it is retrieved but the reviewer does not act on it, that is a signal (though we do not track this well yet).' },
    { type: 'paragraph', text: 'The data is still thin. We have match counts and timestamps, but not enough history to do real re-ranking. The aspiration is that entries which are consistently useful rank higher over time, and entries that are never matched get flagged as potentially stale.' },
    { type: 'paragraph', text: 'We are not there yet. But the tracking is in place, and even the basic "5 never matched" warning in the Wiki UI has already prompted teams to clean up outdated entries.' },

    { type: 'comparison', left: { title: 'What the embedding model knows', items: [
      'Semantic similarity between texts',
      'Conceptual relationships',
      'Language patterns and synonyms',
    ] }, right: { title: 'What only usage tracking can learn', items: [
      'Which entries your team actually acts on',
      'Which rules are enforced vs ignored',
      'Which categories matter for which file paths',
      'How relevance changes as standards evolve',
    ] } },

    { type: 'heading', text: 'What we still get wrong' },
    { type: 'paragraph', text: 'Honesty check: we are not confident the retrieval is good yet. We have the three layers, but the feedback loop (layer 3) is too basic. We track that an entry was matched but not whether the AI actually used it in its findings. We do not track when a developer dismisses a finding that was driven by a Wiki entry. That signal would be gold for re-ranking, and we do not have it.' },
    { type: 'paragraph', text: 'We also have no way to evaluate retrieval quality systematically. We look at individual reviews and check whether the injected Wiki entries were relevant. That does not scale. We need a proper evaluation pipeline, and we do not have one.' },
    { type: 'paragraph', text: 'The bag-of-words fallback is still there for self-hosted instances that do not want to add a Voyage AI key. It works for exact keyword matches and fails for everything else. We keep it because zero-config matters for an open source tool, but we are not proud of it.' },

    { type: 'heading', text: 'The takeaway' },
    { type: 'paragraph', text: 'If you are building retrieval into a product:' },
    { type: 'list', items: [
      'Do not skip metadata filtering. It is boring and it is your biggest lever.',
      'Real embeddings are worth the API dependency. The semantic gap is not something you can hack around.',
      'Track usage from day one. You will want this data for re-ranking and you will regret not having it earlier.',
      'Be honest about what your retrieval cannot do. We would rather surface ten candidates and let the AI decide than pretend we can return the perfect three.',
    ] },

    { type: 'callout', variant: 'principle', title: 'The SupaProxy principle', text: 'Context flows through every layer. In the SupaProxy proxy pipeline, context determines how data is transformed. In Viper, context determines what knowledge is surfaced. In both cases, the system that preserves context outperforms the one that treats every request as independent. We keep re-learning this.' },
  ],
}

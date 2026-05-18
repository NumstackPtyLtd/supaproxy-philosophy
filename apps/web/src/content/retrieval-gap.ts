import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'retrieval-gap',
  title: 'What our side project is teaching us about vector search',
  subtitle: 'We are building an AI code reviewer with a knowledge base backed by LanceDB. The vector search works for demos but falls apart in practice. Here is what we are learning about the gap between similarity and relevance, and why it matters for SupaProxy Cloud.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Engineering',
  tags: ['vector-db', 'embeddings', 'retrieval', 'rag', 'semantic-search', 'viper'],
  date: '2026-05-05',
  readTime: '7 min',
  coverColor: '#0a1628',
  featured: false,
  blocks: [
    { type: 'heading', text: 'What is Viper' },
    { type: 'paragraph', text: 'Viper is an internal tool we are building at Numstack that reviews pull requests using AI. It started as a webhook listener that pipes diffs to Claude and posts findings as PR comments. Simple enough.' },
    { type: 'paragraph', text: 'But we wanted it to be smarter than a generic reviewer. We wanted it to know our team\'s conventions, our architecture decisions, our business rules. So we are building a "Wiki" inside Viper, a knowledge base where teams document their standards. When a PR comes in, Viper queries the Wiki for relevant entries and injects them into the review prompt. The idea is that the AI reviews your code against your rules, not generic best practices.' },
    { type: 'paragraph', text: 'It is still a side project. We are not sure yet if it is a product. But the retrieval problems we are hitting are teaching us things we will need when we bring knowledge-aware retrieval into SupaProxy Cloud.' },

    { type: 'heading', text: 'The first version was bag-of-words' },
    { type: 'paragraph', text: 'We backed the Wiki with LanceDB, an embedded vector database. For the initial version, we did not want to add another API dependency, so we wrote a bag-of-words hasher that projects text into a 384-dimension vector. No external calls. Fast. Ships in the binary.' },
    { type: 'paragraph', text: 'It worked exactly as well as you would expect.' },
    { type: 'paragraph', text: 'Search "date field naming" and the entry titled "Date Field Naming Convention" comes back. Search "why does the checkout total look wrong" and nothing comes back, even though we have an entry called "Rounding policy for currency calculations" that explains exactly that.' },
    { type: 'paragraph', text: 'Bag-of-words finds what you said. It does not find what you meant. We knew this going in, but we are underestimating how much it matters. In a demo, you search for the exact title and it works. In a real review, the PR title is "Fix checkout total rounding" and the Wiki entry talks about "currency precision policy". Zero keyword overlap. Zero results.' },

    { type: 'heading', text: 'The second version used real embeddings' },
    { type: 'paragraph', text: 'We switched to Voyage AI embeddings (voyage-3-lite). Anthropic\'s recommended embedding partner, since we are a Claude-first platform and Anthropic does not offer their own embeddings API.' },
    { type: 'paragraph', text: 'The semantic gap closed immediately. "Fix checkout total rounding" now finds "Currency precision policy" because the embedding model understands they are related concepts. This was a genuine step forward.' },
    { type: 'paragraph', text: 'But it introduced a different problem we did not anticipate.' },

    { type: 'heading', text: 'The noise problem' },
    { type: 'paragraph', text: 'Viper is multi-project. An organisation might have a payment service, a shipping service, and a documentation site. Each has its own Wiki entries. When a PR comes in for the documentation site, the semantic search returns entries like "All API endpoints must validate input" because the embedding model sees "API" and "endpoint" in the diff and thinks they are related.' },
    { type: 'paragraph', text: 'They are semantically related. They are contextually irrelevant. A CSS change to the docs site does not need API validation rules.' },
    { type: 'paragraph', text: 'The embedding model does not know what project is being reviewed. It does not know which file paths changed. It just sees text similarity. And text similarity is not the same as contextual relevance.' },

    { type: 'callout', variant: 'insight', title: 'The parallel with SupaProxy', text: 'We hit a version of this problem in SupaProxy Cloud. When the proxy transforms data before sending it to an AI model, the meaning of a field depends on its context, not its content. A phone number starting with +27 tells the model the customer is in South Africa. If the proxy strips that context, the model draws wrong conclusions. The same principle applies. Strip the context from a retrieval query (which project, which files), and you get plausible but wrong results.' },

    { type: 'heading', text: 'What we are changing, in three layers' },
    { type: 'paragraph', text: 'We are converging on a three-layer retrieval pipeline. Not because we designed it that way upfront, but because each layer is a response to a specific failure mode we keep hitting.' },

    { type: 'heading', text: 'Layer 1: Filter by project first' },
    { type: 'paragraph', text: 'Before any vector search runs, we narrow the candidate set. Which project is this PR for? Wiki entries are now tagged with a project (or marked as org-wide). When reviewing the payment service, we only search payment service entries plus org-wide entries. The docs site entries never enter the search space.' },
    { type: 'paragraph', text: 'This is not clever. It is just metadata filtering. But it eliminates about 80% of the noise we are seeing. The cheapest layer is turning out to be the most impactful.' },

    { type: 'heading', text: 'Layer 2: Semantic search within the filtered set' },
    { type: 'paragraph', text: 'Within the filtered corpus, the Voyage AI embeddings do their job well. The search space is smaller and more focused, so precision goes up. "Fix checkout rounding" finds "Currency precision policy" because they are now being compared within a corpus of payment service rules, not the entire organisation\'s knowledge base.' },
    { type: 'paragraph', text: 'We have considered fine-tuning the embedding model on our own data. We are holding off. The biggest improvement is coming from layer 1 reducing the search space, not from the model itself. Fine-tuning feels like optimising the wrong thing, at least for now.' },

    { type: 'heading', text: 'Layer 3: Track what gets used' },
    { type: 'paragraph', text: 'This is the layer we are building last and already wish we had started with. Every time a Wiki entry is matched during a review, we increment a counter. Every time it is retrieved but the reviewer does not act on it, that should be a signal, though we are not tracking this well yet.' },
    { type: 'paragraph', text: 'The data is still thin. We have match counts and timestamps, but not enough history to do real re-ranking. The aspiration is that entries which are consistently useful rank higher over time, and entries that are never matched get flagged as potentially stale.' },
    { type: 'paragraph', text: 'We are not there yet. But the tracking is in place, and even a basic "5 never matched" warning in the Wiki UI is already prompting us to clean up outdated entries.' },

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
    { type: 'paragraph', text: 'An honest assessment is that we are not confident the retrieval is good yet. We have the three layers, but the feedback loop (layer 3) is too basic. We track that an entry was matched but not whether the AI actually used it in its findings. We do not track when a developer dismisses a finding that was driven by a Wiki entry. That signal would be gold for re-ranking, and we do not have it.' },
    { type: 'paragraph', text: 'We also have no way to evaluate retrieval quality systematically. We look at individual reviews and check whether the injected Wiki entries were relevant. That does not scale. We need a proper evaluation pipeline, and we do not have one.' },
    { type: 'paragraph', text: 'The bag-of-words fallback is still there for self-hosted instances that do not want to add a Voyage AI key. It works for exact keyword matches and fails for everything else. We keep it because zero-config matters for an open source tool, but we are not proud of it.' },

    { type: 'heading', text: 'Where this is going' },
    { type: 'paragraph', text: 'Viper is a side project, but the retrieval problem is not. SupaProxy Cloud will need the same pattern.' },
    { type: 'paragraph', text: 'When the proxy transforms data before sending it to an AI model, it needs to know which transformation rules apply. Today, that is configured per entity type. But as customers define hundreds of rules across dozens of entity types, we will need to retrieve the right rules dynamically, not just look them up by key. The query will be "this request contains what looks like a South African ID number in a medical context" and the system will need to find the right transformation policy without the caller specifying it explicitly.' },
    { type: 'paragraph', text: 'That is a retrieval problem. Structural filtering (entity type, jurisdiction) narrows the space. Semantic search (what kind of data is this?) finds the right policy. Feedback tracking (did the transformation produce useful results downstream?) re-ranks over time.' },
    { type: 'paragraph', text: 'Three layers. Same pattern. We are learning it in Viper so we do not have to learn it in production.' },

    { type: 'callout', variant: 'principle', title: 'The SupaProxy principle', text: 'Context flows through every layer of the stack. In the proxy pipeline, it determines how data is transformed. In Viper, it determines what knowledge is surfaced. We keep building systems that strip context and then scramble to add it back. The lesson, which we are still learning, is to preserve it from the start.' },
  ],
}

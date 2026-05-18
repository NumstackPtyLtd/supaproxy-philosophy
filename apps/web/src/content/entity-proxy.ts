import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'entity-proxy',
  title: 'Entity detection is a vector problem, not a regex problem',
  subtitle: 'NER extracts structure. Vector search confirms identity. Encryption becomes trivial. The hard part of privacy was never the encryption.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Vision',
  tags: ['privacy', 'vector-db', 'ner', 'entity-detection', 'veil', 'architecture'],
  date: '2026-05-04',
  readTime: '8 min',
  coverColor: '#0f172a',
  featured: false,
  blocks: [
    { type: 'paragraph', text: 'In the previous article on reversible privacy, we described a proxy that encrypts data before it reaches an AI model and decrypts the response before it reaches the user. The encryption itself is straightforward. Format-preserving, deterministic, salt-based. The part we left deliberately open was the hard part. How do you detect the entities that need encrypting?' },

    { type: 'heading', text: 'The detection problem' },
    { type: 'paragraph', text: 'Consider a real input. "My naam is Elvis Magagulr and I want a refund. My policy is Pol-123". Three problems in one sentence. "naam" is Afrikaans for "name", multilingual input. "Magagulr" is a misspelling. "Pol-123" is a domain-specific identifier that no generic system knows about. A regex catches none of this. Standard NER might catch the name if it is spelled correctly, but it will miss the policy number because that is not a universal entity type.' },
    { type: 'paragraph', text: 'The instinct is to use an LLM for entity detection. But that defeats the entire purpose. If you send the raw text to a model for entity extraction, you have already exposed the data you were trying to protect. The detection must happen locally, on-premise, before anything leaves the infrastructure.' },

    { type: 'heading', text: 'Structured extraction, not inline replacement' },
    { type: 'paragraph', text: 'The first insight is to stop thinking about entity detection as a find-and-replace problem in free text. Instead, treat it as a structured extraction problem. The local NER does not try to surgically replace "Elvis Magagulr" inside the original sentence. It extracts the input into a structured representation.' },
    { type: 'code', language: 'json', title: 'NER structured output', code: '{\n  "intent": "refund_request",\n  "entities": {\n    "customer_name": "Elvis Magagulr",\n    "policy_id": "Pol-123"\n  },\n  "original_text": "My naam is Elvis Magagulr and I want a refund. My policy is Pol-123"\n}' },
    { type: 'paragraph', text: 'Now encryption is trivial. You encrypt the values in the entities map, not search-and-replace in messy text. No missed names. No broken sentences. The LLM receives structured data with encrypted values, which it is actually better at reasoning about than raw free text.' },
    { type: 'code', language: 'json', title: 'What the LLM sees', code: '{\n  "intent": "refund_request",\n  "entities": {\n    "customer_name": "Kgosi Molefe",\n    "policy_id": "Pol-847"\n  }\n}' },

    { type: 'callout', variant: 'principle', title: 'The design shift', text: 'Stop trying to find entities in text and replace them. Extract text into structure first, then encrypt the structure. The encryption becomes a map operation over known fields, not a search problem over unknown text.' },

    { type: 'heading', text: 'Vector search as the identity layer' },
    { type: 'paragraph', text: 'The structured extraction gives us candidate entities. But the NER still needs to answer a question. Is "Elvis Magagulr" actually a customer? Is "Pol-123" actually a policy number? This is where vector databases change the architecture fundamentally.' },
    { type: 'paragraph', text: 'The company pre-embeds all known entities into a vector store. Every customer name from the CRM. Every policy number. Every account number. Every product name. Each entity type lives in its own collection. When the NER extracts a candidate like "Elvis Magagulr", the proxy runs a vector search against the customer name collection.' },
    { type: 'paragraph', text: '"Elvis Magagulr" returns "Elvis Magagula" at 0.97 cosine similarity. That is a match. "Pol-123" returns "Pol-123" at 1.0 from the policy number collection. Also a match. "refund" returns nothing above threshold from any entity collection. Not PII, pass through.' },
    { type: 'paragraph', text: 'This is profoundly better than regex or Levenshtein distance. Vector similarity handles misspellings, transliterations, partial names, nicknames, and multilingual variations. "Elvis" and "Elv1s" and "elvis" all cluster near each other in embedding space. A regex would need a rule for each variation. The vector store handles all of them from a single embedding.' },

    { type: 'heading', text: 'The entity store as encryption dictionary' },
    { type: 'paragraph', text: 'Here is the insight that ties it all together. The vector store does not just match entities. It holds the pre-computed encrypted avatars. Each record in the store contains the real entity, its embedding, and its encrypted counterpart.' },
    { type: 'code', language: 'json', title: 'Entity store record', code: '{\n  "real_value": "Elvis Magagula",\n  "embedding": [0.23, -0.41, 0.87, ...],\n  "encrypted_avatar": "Kgosi Molefe",\n  "entity_type": "customer_name",\n  "confidence_threshold": 0.92\n}' },
    { type: 'paragraph', text: 'One vector search gives you three things simultaneously. Whether the candidate is a known entity, what type it is, and what to replace it with. The matching and the encryption happen in a single lookup. There is no separate encryption step. The entity store is the encryption dictionary.' },

    { type: 'heading', text: 'Confidence thresholds and the grey zone' },
    { type: 'paragraph', text: 'Not every match is certain. A 0.97 similarity is clearly a match. A 0.5 is clearly not. But what about 0.8? The system needs a decision framework for the grey zone.' },
    { type: 'list', items: [
      'Above 0.95: automatic match. Encrypt and proceed.',
      '0.85 to 0.95: probable match. Encrypt but log for review.',
      '0.70 to 0.85: uncertain. Flag to the user or block the query.',
      'Below 0.70: not a match. Pass through.',
    ]},
    { type: 'paragraph', text: 'These thresholds are configurable per company and per entity type. A bank might set customer names to 0.90 (strict) and product names to 0.80 (relaxed). A healthcare provider might set patient names to 0.85 but medication names to 0.95 to avoid false positives that break clinical context.' },

    { type: 'heading', text: 'Zero-shot new entity types' },
    { type: 'paragraph', text: 'One of the most powerful properties of this architecture is extensibility. When a company wants to protect a new entity type, say branch names or internal project codes, they do not change any code. They create a new collection in the vector store, embed their branch names with their encrypted avatars, and the system immediately starts detecting and encrypting them.' },
    { type: 'paragraph', text: 'This is configuration, not development. An operations team can add new entity types without touching the proxy code, without retraining a model, without writing regex patterns. They upload a CSV of real values and encrypted replacements, the system embeds them, and protection begins.' },

    { type: 'heading', text: 'Semantic caching on encrypted data' },
    { type: 'paragraph', text: 'The structured, encrypted query can itself be embedded and cached. If a different user asks a similar question about the same encrypted customer, the cache returns the encrypted response directly. The LLM is never called. Since the encryption is deterministic per company (same customer always maps to the same avatar), the cache is both safe and effective.' },
    { type: 'paragraph', text: 'A cache miss costs the full pipeline: NER, vector search, encryption, LLM call, decryption. A cache hit costs one vector search. Over time, as the system handles more queries, the hit rate climbs and the average latency drops below what a raw LLM call would cost. The privacy layer, paradoxically, makes the system faster.' },

    { type: 'comparison', left: { title: 'Regex approach', items: [
      'Requires a pattern for every entity format.',
      'Cannot handle misspellings or variations.',
      'Adding new entity types means writing new code.',
      'No confidence scoring. Match or no match.',
      'Breaks on multilingual input.',
    ]}, right: { title: 'Vector entity store approach', items: [
      'One architecture for all entity types.',
      'Handles misspellings, nicknames, transliterations.',
      'Adding new entities is a CSV upload.',
      'Confidence scores enable nuanced decisions.',
      'Embeddings are language-agnostic.',
    ]}},

    { type: 'heading', text: 'What this means for Veil' },
    { type: 'paragraph', text: 'Veil is not an encryption layer. It is a structured entity proxy with a vector-backed entity store. The encryption part (format-preserving, deterministic, salt-based) is the easy bit. The hard bit is entity detection, and that becomes a vector similarity problem, which has known solutions, battle-tested infrastructure, and predictable performance characteristics.' },
    { type: 'paragraph', text: 'The pipeline works as follows. Local NER extracts candidates into structure. Vector search confirms identity and retrieves encrypted avatars. The structured, encrypted representation goes to the LLM. The LLM response is decrypted using the same entity store. Nothing real leaves the company\'s infrastructure. Nothing real is stored in caches. Nothing real appears in logs.' },

    { type: 'callout', variant: 'insight', title: 'The reframe', text: 'The question was never "how do you encrypt data for AI?". Encryption is solved. The question was "how do you detect what to encrypt without using AI?" The answer is that you do not detect in text. You extract into structure, then confirm with vector search. Detection becomes retrieval. And retrieval is a problem we know how to scale.' },
  ],
}

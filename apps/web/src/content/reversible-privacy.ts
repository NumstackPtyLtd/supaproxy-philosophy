import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'reversible-privacy',
  title: 'What if AI never saw your real data?',
  subtitle: 'Masking destroys context. Encryption preserves it. The difference determines whether enterprises can use AI at all.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Vision',
  tags: ['privacy', 'encryption', 'enterprise', 'pii', 'format-preserving'],
  date: '2026-05-03',
  readTime: '7 min',
  coverColor: '#0f172a',
  blocks: [
    { type: 'paragraph', text: 'The biggest blocker for enterprise AI adoption is not cost, not accuracy, not hallucinations. It is data. Specifically, the fact that using an AI model requires sending your data to it. For companies that handle customer financial records, patient health data, or privileged legal information, this is not a configuration problem. It is a regulatory wall.' },

    { type: 'heading', text: 'The masking trap' },
    { type: 'paragraph', text: 'The instinct is to mask sensitive data before it reaches the model. Replace names with placeholders. Redact account numbers. Strip identifiers. This is what most guardrail systems do today, including simple pattern-based ones.' },
    { type: 'paragraph', text: 'The problem is that masking destroys the very context the AI needs to be useful. "Transfer R45,000 from account 1055001234 to 2099887766 for Elvis Magagula" becomes "Transfer [AMOUNT] from [ACCOUNT] to [ACCOUNT] for [NAME]". The model cannot reason about which account has sufficient funds. It cannot verify the beneficiary. It cannot do the job it was asked to do.' },
    { type: 'paragraph', text: 'Masking trades privacy for utility. That is not a tradeoff most enterprises are willing to accept, so they simply do not adopt AI for sensitive workflows. The data stays safe because the AI never sees it. But the AI also never helps.' },

    { type: 'heading', text: 'Reversible encryption as a proxy layer' },
    { type: 'paragraph', text: 'Consider a different approach. Instead of masking data, encrypt it in a format-preserving way. A real account number becomes a fake but structurally valid account number. A real name becomes a consistent but fictional name. A real ID number becomes a different valid-format ID. The AI receives data that looks and behaves like real data. It can reason about it, compare values, make decisions. But none of it is real.' },
    { type: 'paragraph', text: 'On the way back, the proxy decrypts the response. The user sees real names, real numbers, real context. The model provider saw none of it. No PII left your infrastructure. No regulatory boundary was crossed.' },

    { type: 'callout', variant: 'principle', title: 'The design principle', text: 'Privacy and utility are not opposites. Format-preserving encryption gives the model structurally valid data to reason with while keeping the actual values invisible. The model does its job. The data stays home.' },

    { type: 'heading', text: 'Consistency without identity' },
    { type: 'paragraph', text: 'The encryption needs to be deterministic. If the same customer appears in ten conversations, the model should see the same encrypted avatar each time. This is what makes the approach powerful for ongoing relationships, not just one-off queries.' },
    { type: 'paragraph', text: 'A per-company salt achieves this. Every company sets a secret salt that never leaves their infrastructure. The same real data encrypted with the same salt always produces the same output. Elvis Magagula always becomes the same fictional identity across every conversation, every service, every model interaction. The AI builds context about this "person" over time. It learns their patterns, their preferences, their history. It just never knows who they actually are.' },
    { type: 'paragraph', text: 'This has a second-order effect that matters for machine learning. Companies can train models on their encrypted data safely. The training dataset contains consistent avatars, not random noise. The model learns real behavioural patterns without ever seeing real identities. This is the difference between a model that understands "customers who do X tend to need Y" and a model trained on redacted gibberish that learns nothing.' },

    { type: 'heading', text: 'Where it gets hard' },
    { type: 'paragraph', text: 'Entity detection must be nearly perfect. Miss one account number in a query and you have leaked it to the model provider. The accuracy bar is higher than traditional NER because the consequences of a miss are not a bad user experience. They are a compliance violation.' },
    { type: 'paragraph', text: 'Multi-turn conversations add complexity. The encryption mapping must persist across turns within a session. If the model refers to "the account ending in 7766" in turn three, the proxy needs to know which real account that maps to when decrypting the response. With a deterministic salt this is manageable, but the proxy needs to track entity references across the conversation.' },
    { type: 'paragraph', text: 'Tool results are the other challenge. When an MCP server returns real customer data, the proxy must encrypt it before the model sees it. The encryption boundary is not just the user query. It is every piece of data that flows toward the model, from any source.' },

    { type: 'comparison', left: { title: 'Masking approach', items: ['Destroys data. Model cannot reason about values.', 'Inconsistent. Same entity gets different masks each time.', 'One-way. Cannot reconstruct the original response.', 'Simple to implement. Regex patterns work.', 'Blocks enterprise adoption for sensitive workflows.'] }, right: { title: 'Reversible encryption approach', items: ['Preserves structure. Model reasons about valid-looking data.', 'Consistent. Same entity, same encrypted avatar, every time.', 'Two-way. Response decrypted back to real values.', 'Harder to implement. Needs format-preserving encryption.', 'Enables enterprise adoption without regulatory compromise.'] } },

    { type: 'heading', text: 'The broader question' },
    { type: 'paragraph', text: 'If this approach works, it changes the conversation about AI and privacy fundamentally. The current debate assumes a tradeoff. Either you send your data to the model and accept the risk, or you keep your data private and miss the opportunity. Reversible encryption suggests a third option where the model works with structurally valid data that happens to not be real.' },
    { type: 'paragraph', text: 'There are open questions worth sitting with. Does format-preserving encryption hold up under adversarial analysis? If a model sees enough encrypted data, can it infer the real values? Probably not with proper cryptographic techniques, but the question deserves rigorous treatment. And what about the computational cost? Encrypting every entity in every query and decrypting every entity in every response adds latency. For real-time conversational AI, that budget is tight.' },
    { type: 'paragraph', text: 'The latency concern has an interesting counter though. Because the encrypted avatars are deterministic per company, semantic caching becomes trivial and safe. The cache key is the encrypted query. The cached value is the encrypted response. The first query pays the full encryption plus LLM cost. Every subsequent similar query hits the cache, which is faster than even an unencrypted LLM call. The cache itself contains no real data. Even a full cache dump reveals conversations between fictional people. You would need the company\'s salt to reverse any of it. The encryption layer, paradoxically, could make the system faster over time rather than slower.' },
    { type: 'paragraph', text: 'Perhaps the most interesting question is whether this changes who can build AI products. Today, only companies that can afford the legal and compliance overhead of sending data to model providers ship AI features. If a privacy proxy makes that overhead disappear, smaller companies in regulated industries can start building too. The compliance barrier drops from "hire a legal team" to "configure your encryption salt". That is a meaningful shift in who gets to participate in the AI economy.' },

    { type: 'callout', variant: 'insight', title: 'The unlock', text: 'The enterprises that most need AI are the ones least able to adopt it, because their data is too sensitive to send to a model. A reversible privacy layer does not just protect data. It removes the single biggest obstacle to AI adoption in the industries where AI would have the most impact.' },
  ],
}

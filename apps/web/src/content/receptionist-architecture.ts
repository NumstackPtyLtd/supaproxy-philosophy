import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'receptionist-architecture',
  title: 'Hypothetically, this is how I would build an AI receptionist. What do you think?',
  subtitle: 'Not a chatbot. Not a router. A governed mediator that holds context, enforces policy, and never pretends to know more than it does. Here is the architecture we are building.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['receptionist', 'routing', 'ner', 'vector-search', 'guardrails', 'mcp', 'governance', 'personality', 'session-management'],
  date: '2026-05-15',
  readTime: '14 min',
  coverColor: '#0A2840',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The problem with AI customer service' },
    { type: 'paragraph', text: 'Every company building AI customer service starts with the same idea: put a chatbot on the website, connect it to some APIs, let it answer questions. It works for demos. It falls apart in production.' },
    { type: 'paragraph', text: 'The bot guesses when it should ask. It gives financial advice when it should defer to a licensed advisor. It leaks internal tool names when it hits an error. It forgets what the customer said two messages ago. It cannot tell the difference between "I want a refund" and "I want to check my refund status." And when it gets stuck, it spirals, trying to help in increasingly unhelpful ways.' },
    { type: 'paragraph', text: 'We have been thinking about this problem for months. Not just the chatbot part, but the entire architecture underneath it. What would it take to build an AI receptionist that a regulated financial institution would actually trust?' },
    { type: 'callout', variant: 'principle', title: 'The receptionist principle', text: 'A receptionist is not a specialist. It does not give advice, guess answers, or pretend to know things it does not. It identifies what you need, finds the right person, and makes sure nothing falls through the cracks.' },

    { type: 'heading', text: 'Not a chatbot. A mediator.' },
    { type: 'paragraph', text: 'The first design decision is the most important one: the receptionist is not the agent that answers questions. It is the mediator between the customer and the agents that do.' },
    { type: 'paragraph', text: 'Behind the scenes, there are workspaces. Each workspace has its own tools, knowledge, guardrails, and personality. The claims workspace has access to the claims MCP. The lending workspace has access to credit risk tools. The receptionist does not have access to any of these directly. It knows what each workspace can do, and it routes the customer to the right one.' },
    { type: 'paragraph', text: 'This separation matters because it means the receptionist cannot accidentally give financial advice using the lending tools. It cannot accidentally expose customer data from the claims system. It can only do what a receptionist should do: understand what you need, check who can help, and connect you.' },
    { type: 'comparison', left: { title: 'Traditional chatbot', items: ['Has access to all tools directly', 'Tries to answer everything', 'One personality, one context', 'Guesses when unsure', 'Leaks internal details on error'] }, right: { title: 'Receptionist architecture', items: ['Routes to specialised workspaces', 'Knows what it cannot answer', 'Mediates between specialists', 'Asks or creates a ticket', 'Transforms errors into human messages'] } },

    { type: 'heading', text: 'The intelligence layer' },
    { type: 'paragraph', text: 'When a customer says "I bought a washing machine on Saturday and I want a refund", the receptionist needs to do several things simultaneously.' },
    { type: 'paragraph', text: 'First, entity extraction. NER identifies "washing machine" as a product, "Saturday" as a temporal reference, and "refund" as an intent. But here is where it gets interesting: we do not treat entity detection as a regex problem. We wrote about this in [Entity detection is a vector problem, not a regex problem](/entity-proxy). Entity detection is a vector problem. "Refund" is not just a keyword to match against a list of intents. It is a vector that gets looked up against the organisation\'s knowledge store.' },
    { type: 'paragraph', text: 'That vector lookup returns multiple results, ranked by relevance: the refund policy document, the CPA cooling-off regulations, the Refunds MCP tool catalogue. One entity extraction, multiple policy and tool matches. The receptionist now knows which workspace to route to and which policies apply, before it says a word to the customer.' },
    { type: 'callout', variant: 'insight', title: 'From [What our side project is teaching us about vector search](/retrieval-gap)', text: 'Similarity is not relevance. We use a three-layer retrieval pipeline: filter by workspace scope first, semantic search within the filtered set, then track which policies actually get used over time. The third layer is the learning loop that most RAG implementations miss.' },

    { type: 'heading', text: 'Memory without trust is dangerous' },
    { type: 'paragraph', text: 'The receptionist holds context across the entire conversation. If a customer raises three issues, the receptionist tracks all three: one active, two queued. When the first issue resolves, it moves to the next. This is the memory layer.' },
    { type: 'paragraph', text: 'But memory without trust is dangerous. We covered this extensively in [Your AI product has amnesia. Here is how to fix it](/memory-and-trust). The trust layer is the policy check that happens before every action. Before the receptionist routes to a workspace, it verifies: does this workspace exist? Does the org policy allow this routing? Is the confidence score high enough to route automatically, or should we ask the customer? Every decision gets a confidence score, and low-confidence decisions get turned into questions, not guesses.' },
    { type: 'paragraph', text: 'This is where the guardrails come in. Not as classifiers that pass or block, but as [middleware that transforms](/guardrail-middleware). A guardrail that detects the customer is asking for financial advice does not just block the response. It transforms it into a referral: "I can ask a licensed advisor to get back to you. Would you like that?" A guardrail that detects PII does not just redact it. It checks the org policy: is this PII needed for customer identification? If yes, use it for routing. If no, handle according to platform defaults.' },

    { type: 'heading', text: 'The personality problem' },
    { type: 'paragraph', text: 'Most AI products treat personality as a system prompt. You write a paragraph about tone and hope the model follows it. This breaks in production because the personality competes with every other instruction in the prompt for the model\'s attention.' },
    { type: 'paragraph', text: 'We treat personality as a structured schema: name, tone, constraints, introduction style, language preferences. Each workspace gets an auto-generated personality when created. The #general workspace, where the receptionist lives, gets special treatment because it is the front-facing mediator.' },
    { type: 'paragraph', text: 'The prompt is not the personality. The prompt is composed from multiple sources: personality schema, org-wide policies, workspace scope definition, active guardrails, and knowledge context for the current query. The personality is one input to a composable prompt builder, not the prompt itself.' },
    { type: 'list', items: [
      'Personality is structured data, not freeform text',
      'Each workspace gets an auto-generated default',
      'Orgs can override tone and constraints globally',
      'The prompt is composed, not written',
      'Personality competes with nothing because it has its own section'
    ] },

    { type: 'heading', text: 'Conversation lifecycle' },
    { type: 'paragraph', text: 'A conversation is not a list of messages. It is a state machine with a lifecycle: open, active, wrapping up, closed, analysed.' },
    { type: 'paragraph', text: 'The receptionist manages this lifecycle using system servicing tools: an internal MCP that ships with every organisation. These tools are not exposed to the customer. They are the receptionist\'s own toolkit for managing the conversation.' },
    { type: 'list', items: [
      'close_conversation: end the session, trigger post-close analysis',
      'create_note: internal note attached to the conversation, visible to the org but not the customer',
      'mark_issue_resolved: mark a specific issue in the multi-issue queue as done',
      'queue_next_issue: move to the next queued issue',
      'create_ticket: create a ticket for human follow-up',
      'analyse_conversation: post-close sentiment, resolution, and compliance analysis'
    ] },
    { type: 'paragraph', text: 'The conversation does not end because the model runs out of things to say. It ends because the system tool explicitly closes it. After three turns on an issue without resolution, the receptionist wraps up: "Is there anything else I can help with?" If the customer says no, the receptionist calls close_conversation, which triggers the analysis pipeline. If the customer spirals after a ticket has been logged, the receptionist closes politely: noted and thanks.' },

    { type: 'heading', text: 'What the customer never sees' },
    { type: 'paragraph', text: 'The customer sees one assistant. One conversation. One personality. They do not see the workspace routing, the policy lookups, the guardrail decisions, the confidence scores, or the internal notes. They do not know that "let me check with our finance department" means the receptionist is routing their query to a different agent with different tools and a different context.' },
    { type: 'paragraph', text: 'This is by design. The receptionist never says "I will transfer you" because the customer is not being transferred. They stay in the same conversation. The receptionist says "let me check in with our ops team" because that is what is actually happening: the receptionist is consulting a specialist on the customer\'s behalf.' },
    { type: 'paragraph', text: 'The receptionist never mentions tools, MCPs, APIs, or error messages. If a workspace times out, the customer hears "I am unable to reach our payments team right now, but I have made a note for someone to get back to you." The internal note captures the actual error. The customer gets a human response.' },
    { type: 'callout', variant: 'warning', title: 'The leaking problem', text: 'Most AI products leak their internals under pressure. A customer asks a difficult question, the model panics, and suddenly the response contains tool names, error codes, or API references. The receptionist guardrails are specifically designed to catch and transform these before they reach the customer.' },

    { type: 'heading', text: 'Knowledge infrastructure' },
    { type: 'paragraph', text: 'All of this depends on knowledge being available, searchable, and current. Policies change. Regulations get updated. Team structures shift. The receptionist needs to know about these changes without anyone pushing a code deployment.' },
    { type: 'paragraph', text: 'Knowledge lives in a vector store at the workspace level. Each workspace has its own index. The receptionist has access to a special routing index that contains workspace descriptions, tool catalogues, and org-wide policies.' },
    { type: 'paragraph', text: 'Knowledge enters the system through three channels: inline (manually entered via the dashboard), URL (crawl, chunk, embed), and connectors (Confluence, Google Docs, Notion). Connectors sync periodically and re-embed on change. When your compliance team updates the refund policy on Confluence, the next customer interaction uses the updated policy automatically. No tickets. No deployments. No developer involvement.' },

    { type: 'heading', text: 'The hard parts' },
    { type: 'paragraph', text: 'We are not pretending this is easy. The hard parts are:' },
    { type: 'list', items: [
      'Confidence scoring that is actually useful, not just a number between 0 and 1 that nobody trusts',
      'Turn limits that feel natural, not robotic. Three turns is the limit, but the customer should never feel cut off.',
      'Multi-issue queue management where the receptionist tracks what is resolved and what is pending without losing context',
      'Cross-channel session continuity that is secure. We only allow lookup by ticket number, never by PII.',
      'Guardrail middleware that transforms gracefully. The difference between "I cannot help with that" and "I can ask a licensed advisor to get back to you" is the difference between a dead end and a resolution.'
    ] },
    { type: 'paragraph', text: 'We do not have all the answers yet. But we have the architecture, and we have the philosophy that guides every decision: memory needs trust, guardrails are middleware, entity detection is a vector problem, and the receptionist is a mediator, not a specialist.' },

    { type: 'heading', text: 'What do you think?' },
    { type: 'paragraph', text: 'This is our current thinking. We are building this in the open and we want to hear from teams that are solving similar problems. What are we missing? What would you do differently? What would make you trust an AI receptionist in a regulated environment?' },
    { type: 'paragraph', text: 'If you are building in this space, we would love to talk. The architecture is open source. The conversation is too.' },
  ],
}

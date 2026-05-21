import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'knowledge-is-infrastructure',
  title: 'Knowledge as infrastructure',
  subtitle: 'Most AI platforms treat knowledge as a prompt injection problem. Paste your docs, chunk them, hope the embeddings find something useful. That works for demos. It falls apart the moment you have two teams, three tools, and a compliance requirement.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['knowledge', 'rag', 'vector-search', 'plugins', 'sync', 'infrastructure'],
  date: '2026-05-21',
  readTime: '5 min',
  coverColor: '#1a1a2e',
  featured: false,
  blocks: [
    { type: 'heading', text: 'The copy-paste model' },
    { type: 'paragraph', text: 'The simplest version of an AI knowledge base looks like this. Paste your text into a box, click embed, ask questions. You paste your refund policy, ask "what is the refund window?", and the answer comes back correct. Sold.' },
    { type: 'paragraph', text: 'Now try it with real data. Your Confluence has 4,000 pages across 12 spaces. Your engineering team writes ADRs in GitHub. Your support team keeps runbooks in Notion. Nobody is going to paste 4,000 pages into a text box.' },
    { type: 'paragraph', text: 'The paste-and-embed model assumes knowledge is static, small, and lives in one place. In practice, knowledge is distributed, constantly changing, and owned by different teams with different access rules.' },

    { type: 'heading', text: 'What goes wrong with flat knowledge' },
    { type: 'paragraph', text: 'A single vector index per workspace is the simplest starting point. Every document gets chunked, embedded, and dumped into the same bucket. When a query comes in, the system searches the entire bucket and returns the top chunks by cosine similarity.' },
    { type: 'paragraph', text: 'I think this will break down faster than people expect.' },
    { type: 'paragraph', text: 'An engineering workspace has both API documentation and HR onboarding guides indexed. Someone asks "what is the timeout policy?" and gets back the employee probation period instead of the HTTP request timeout. Both contain the word "policy" and "timeout". The embeddings see similarity. The user sees nonsense.' },
    { type: 'paragraph', text: 'I do not think better embeddings or a bigger context window will fix this. The problem is structural. Knowledge needs boundaries, ownership, and access control before it ever touches a vector database.' },

    { type: 'heading', text: 'A three-layer problem' },
    { type: 'paragraph', text: 'I keep landing on the same three-layer pattern across different parts of SupaProxy, whether it is [guardrail policies](/articles/guardrail-middleware), [workspace routing](/articles/receptionist-architecture), or [composable packages](/articles/composable-architecture). For knowledge, the layers are connect, sync, scope.' },

    { type: 'layers', layers: [
      { title: 'Connect (plugin layer)', items: [
        'One plugin per knowledge source (Confluence, Notion, GitHub). Handles authentication, API quirks, rate limits.',
        'The plugin developer writes this once. Every organisation that installs it gets the same capability.',
      ] },
      { title: 'Sync (organisation layer)', items: [
        'The admin chooses what to sync, which spaces, which folders, how often.',
        'Engineering syncs architecture daily. Legal syncs contracts weekly. HR might exclude their entire space.',
      ] },
      { title: 'Scope (workspace layer)', items: [
        'Each workspace selects which synced sources it needs. Payments gets API docs. Onboarding gets HR guides.',
        'No workspace sees the entire organisation dumped into one index. Focused retrieval, less noise.',
      ] },
    ] },

    { type: 'callout', variant: 'principle', title: 'The separation principle', text: 'Connection is a plugin problem. Sync is an organisation problem. Scope is a workspace problem. I suspect that mixing these layers is where most knowledge base confusion comes from.' },

    { type: 'heading', text: 'Why the plugin developer matters' },
    { type: 'paragraph', text: 'A generic "connect to anything" adapter sounds appealing. Fetch a URL, parse the HTML, chunk the text. It handles the easy cases and butchers the rest.' },
    { type: 'paragraph', text: 'Confluence pages have macros, nested tables, and embedded diagrams. GitHub repos need different chunking strategies than prose. Notion databases have structured fields that lose all meaning when flattened to text.' },
    { type: 'paragraph', text: 'The person who understands Confluence best is the person building the Confluence plugin. They know that labels matter for filtering, that child pages should be chunked together with their parent, and that the storage format XML needs specific handling that generic HTML stripping will destroy.' },
    { type: 'paragraph', text: 'This is why I want the plugin contract to give developers control over the full pipeline. What units are available to sync, how to fetch content, and what options to surface for the admin. The platform handles authentication, scheduling, embedding, and storage. The plugin handles the source-specific intelligence.' },

    { type: 'heading', text: 'Sync is not a one-time import' },
    { type: 'paragraph', text: 'A one-shot import breaks within days. Someone updates a Confluence page, and the AI keeps answering with the old version. The knowledge base is stale before anyone notices.' },
    { type: 'paragraph', text: 'Sync needs to be continuous, configurable, and observable. The admin sets a frequency. The system tracks what changed since the last sync. Content hashes detect updates without re-embedding unchanged chunks.' },
    { type: 'paragraph', text: 'Every knowledge source has different change detection capabilities. Confluence has last-modified timestamps. GitHub has commit history. Some APIs have webhooks. Some have nothing, and you have to re-fetch everything and diff locally. The plugin developer knows which approach works for their source. The platform provides the scheduling and status tracking.' },

    { type: 'heading', text: 'The policy layer' },
    { type: 'paragraph', text: 'Legal documents should not appear in customer support contexts. Salary data should not be retrievable by engineering workspaces. Draft policies should not be treated as authoritative.' },
    { type: 'paragraph', text: 'The org-level sync policy is the first line of defence. The admin defines what is allowed and what is excluded. Workspace-level source selection is the second line, each workspace chooses only what it needs. Less noise means better retrieval.' },
    { type: 'paragraph', text: 'Neither is a substitute for proper access control within the source itself. If a Confluence space has restricted permissions, the sync respects those permissions. The plugin reads what the authenticated account can read. The platform does not escalate access.' },

    { type: 'heading', text: 'Open questions' },
    { type: 'paragraph', text: 'I do not have all of this built yet. The architecture feels clear, but the implementation raises questions I am still working through.' },
    { type: 'paragraph', text: 'How should sync handle token budgets? Embedding 4,000 Confluence pages is not free. Should the system prioritise recently updated content? Should it de-prioritise pages that are never retrieved?' },
    { type: 'paragraph', text: 'How granular should workspace scoping be? Space-level or page-level? A single Confluence space might have 500 pages, and only 20 are relevant to a specific workspace. Plugin-side filtering is more flexible. Platform-side filtering is more consistent.' },
    { type: 'paragraph', text: 'How do you handle conflicting information across sources? If the Confluence page says the refund window is 30 days and the Notion runbook says 14 days, which one wins? That is not a retrieval problem. It is a governance problem.' },
    { type: 'paragraph', text: 'These are the kinds of questions that only surface when you treat knowledge as infrastructure instead of a context window.' },
  ],
}

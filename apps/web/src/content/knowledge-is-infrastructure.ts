import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'knowledge-is-infrastructure',
  title: 'Your knowledge base is not a context window',
  subtitle: 'Most AI platforms treat knowledge as a prompt injection problem. Paste your docs, chunk them, hope the embeddings find something useful. That works for demos. It falls apart the moment you have two teams, three tools, and a compliance requirement. Knowledge is infrastructure, and it needs to be treated like it.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['knowledge', 'rag', 'vector-search', 'plugins', 'sync', 'infrastructure'],
  date: '2026-05-21',
  readTime: '8 min',
  coverColor: '#1a1a2e',
  featured: false,
  blocks: [
    { type: 'heading', text: 'The copy-paste era' },
    { type: 'paragraph', text: 'The first generation of AI knowledge bases worked like this: paste your text into a box, click embed, ask questions. It was magic the first time you saw it. You pasted your refund policy, asked "what is the refund window?", and the answer came back correct. Sold.' },
    { type: 'paragraph', text: 'Then you tried it with real data. Your Confluence has 4,000 pages across 12 spaces. Your engineering team writes ADRs in GitHub. Your support team keeps runbooks in Notion. Your compliance team has policies in SharePoint. Nobody is going to paste 4,000 pages into a text box.' },
    { type: 'paragraph', text: 'The paste-and-embed model assumes knowledge is static, small, and lives in one place. In practice, knowledge is distributed, constantly changing, and owned by different teams with different access rules. The moment you acknowledge that, the architecture changes completely.' },

    { type: 'heading', text: 'What goes wrong with flat knowledge' },
    { type: 'paragraph', text: 'The most common pattern we see is a single vector index per workspace. Every document gets chunked, embedded, and dumped into the same bucket. When a query comes in, the system searches the entire bucket and returns the top five chunks by cosine similarity.' },
    { type: 'paragraph', text: 'This works until it does not.' },
    { type: 'paragraph', text: 'An engineering workspace has both API documentation and HR onboarding guides indexed. Someone asks "what is the timeout policy?" and gets back the employee probation period instead of the HTTP request timeout. Both contain the word "policy" and "timeout". The embeddings see similarity. The user sees nonsense.' },
    { type: 'paragraph', text: 'The fix is not better embeddings. The fix is not a bigger context window. The fix is structural. Knowledge needs boundaries, ownership, and access control before it ever touches a vector database.' },

    { type: 'heading', text: 'Knowledge as a three-layer problem' },
    { type: 'paragraph', text: 'We keep arriving at the same architecture from different directions. Whether it is guardrail policies, workspace routing, or knowledge retrieval, the pattern is three layers: connect, sync, scope.' },

    { type: 'paragraph', text: 'The first layer is connection. Your organisation uses Confluence, or Notion, or GitHub, or all three. Each source has its own authentication model, its own API, its own rate limits. A knowledge source plugin handles this. It knows how to authenticate with the provider, list what is available, and fetch content. The plugin developer writes this once. Every organisation that installs it gets the same capability.' },

    { type: 'paragraph', text: 'The second layer is sync. Not every page in Confluence belongs in your AI\'s context. The organisation decides what to sync: which spaces, which folders, how often. This is an operational decision, not a technical one. The engineering team might sync their architecture space daily. The legal team might sync their contracts space weekly. HR might exclude their entire space from AI access. These are policy decisions that happen at the organisation level.' },

    { type: 'paragraph', text: 'The third layer is scope. Once content is synced, workspaces select which synced sources they need. The payments workspace uses the API documentation and the compliance policies. The onboarding workspace uses the HR guides and the engineering standards. Each workspace gets a focused, relevant knowledge base, not the entire organisation dumped into one index.' },

    { type: 'callout', variant: 'principle', title: 'The separation principle', text: 'Connection is a plugin problem. Sync is an organisation problem. Scope is a workspace problem. Mixing these layers is how you end up with a knowledge base that technically works but practically confuses every query.' },

    { type: 'heading', text: 'Why the plugin developer matters' },
    { type: 'paragraph', text: 'We spent weeks trying to build a generic "connect to anything" adapter. Fetch a URL, parse the HTML, chunk the text. It handles the easy cases and butchers the rest.' },
    { type: 'paragraph', text: 'Confluence pages have macros, nested tables, and embedded diagrams. GitHub repos have code that needs different chunking strategies than prose. Notion databases have structured fields that lose all meaning when flattened to text. Each source has opinions about how its content should be extracted, chunked, and represented.' },
    { type: 'paragraph', text: 'The person who understands Confluence best is the person building the Confluence plugin. They know that a page\'s labels matter for filtering. They know that child pages should be chunked together with their parent for context. They know that the storage format XML needs specific handling that generic HTML stripping will destroy.' },
    { type: 'paragraph', text: 'So the plugin contract gives developers control over the full pipeline: what units are available to sync (spaces, folders, repos), how to fetch content for each unit, and how to tell the platform what options to show the admin. The platform handles authentication, scheduling, embedding, and storage. The plugin handles the source-specific intelligence.' },

    { type: 'comparison', left: { title: 'Generic connector', items: [
      'Fetches raw HTML or text.',
      'One chunking strategy for all content.',
      'No understanding of source structure.',
      'Loses metadata, labels, hierarchy.',
    ] }, right: { title: 'Plugin-driven connector', items: [
      'Fetches via native API with source-specific parsing.',
      'Chunking respects content boundaries (pages, sections).',
      'Preserves source structure and relationships.',
      'Carries metadata for filtering and scoping.',
    ] } },

    { type: 'heading', text: 'Sync is not a one-time import' },
    { type: 'paragraph', text: 'The first version of our knowledge pipeline was a one-shot import. Upload content, embed it, done. The problem appeared within days. Someone updated a Confluence page, and the AI kept answering with the old version. The knowledge base was stale before anyone noticed.' },
    { type: 'paragraph', text: 'Sync needs to be continuous, configurable, and observable. The organisation admin sets a frequency: manual, daily, weekly. The system tracks what changed since the last sync. Content hashes detect updates without re-embedding unchanged chunks. The admin sees when each source was last synced and whether the sync succeeded or failed.' },
    { type: 'paragraph', text: 'This sounds like a solved problem. It is not. Every knowledge source has different change detection capabilities. Confluence has a last-modified timestamp per page. GitHub has commit history. Some APIs have webhooks. Some have nothing, and you have to re-fetch everything and diff locally. The plugin developer knows which approach works for their source. The platform provides the scheduling and status tracking infrastructure.' },

    { type: 'heading', text: 'The policy layer nobody talks about' },
    { type: 'paragraph', text: 'Here is the question that always comes up in enterprise conversations: can we control what the AI has access to?' },
    { type: 'paragraph', text: 'It is not enough to sync everything and hope the vector search returns appropriate results. Legal documents should not appear in customer support contexts. Salary data should not be retrievable by engineering workspaces. Draft policies should not be treated as authoritative.' },
    { type: 'paragraph', text: 'The org-level sync policy is the first line of defence. The admin defines a sync root (what is allowed) and exceptions (what is excluded). This is a coarse filter, like setting a CORS origin. It does not handle every edge case, but it prevents the obvious mistakes.' },
    { type: 'paragraph', text: 'Workspace-level source selection is the second line. Even within what the organisation allows, each workspace chooses what it needs. The payments workspace does not need the marketing playbook, even if the marketing playbook is synced and allowed. Less noise means better retrieval.' },
    { type: 'paragraph', text: 'Neither of these is a substitute for proper access control within the source itself. If a Confluence space has restricted permissions, the sync should respect those permissions. The plugin reads what the authenticated account can read. The platform does not escalate access. This is a principle we are not willing to compromise on.' },

    { type: 'heading', text: 'What we are building towards' },
    { type: 'paragraph', text: 'The knowledge base page in the dashboard is not a settings page. It is an operations centre. The admin sees which sources are connected, how many spaces are synced, how many chunks are indexed, and when the last sync ran. They see gaps: questions that conversations surfaced which the knowledge base could not answer. They see health: which connections are working, which are failing, which are stale.' },
    { type: 'paragraph', text: 'This is the same pattern we applied to guardrails. The guardrail page is not a config form. It is a security room with events, policies, and compliance scores. Knowledge deserves the same treatment. It is not a one-time setup. It is a living system that needs monitoring, maintenance, and governance.' },

    { type: 'callout', variant: 'insight', title: 'The real product question', text: 'We keep finding that the hard problem in AI operations is not the AI. It is the infrastructure around the AI. Authentication, sync, access control, observability. These are boring problems with enormous consequences. An AI that confidently answers from stale data is worse than one that says "I do not know".' },

    { type: 'heading', text: 'Open questions' },
    { type: 'paragraph', text: 'We do not have all of this built yet. The architecture is clear, but the implementation raises questions we are still working through.' },
    { type: 'paragraph', text: 'How should sync handle token budgets? Embedding 4,000 Confluence pages is not free. Should the admin set a cap? Should the system prioritise recently updated content? Should it de-prioritise pages that are never retrieved? We lean towards a combination, but the UX for explaining token economics to a non-technical admin is not obvious.' },
    { type: 'paragraph', text: 'How granular should workspace scoping be? Today we are thinking at the space or folder level. But some organisations will want page-level control. A single Confluence space might have 500 pages, and only 20 are relevant to a specific workspace. Do we push that filtering to the plugin (let the admin browse individual pages) or handle it in the platform (tag-based filtering after sync)? Plugin-side is more flexible. Platform-side is more consistent. We have not decided.' },
    { type: 'paragraph', text: 'How do we handle conflicting information across sources? If the Confluence page says the refund window is 30 days and the Notion runbook says 14 days, which one wins? Today, both chunks get returned and the AI has to figure it out. That is not a retrieval problem. It is a governance problem. We do not have a good answer yet.' },
    { type: 'paragraph', text: 'These are the kinds of questions that only surface when you treat knowledge as infrastructure instead of a context window. A paste box does not have token budgets, scoping policies, or conflict resolution. A knowledge infrastructure does. That is the difference we are building towards.' },
  ],
}

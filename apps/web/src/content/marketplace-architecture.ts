import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'marketplace-architecture',
  title: 'Rethinking our marketplace architecture',
  subtitle: 'Why we want teams to build their own guardrails, how we plan to make that safe, and what it means for the platform.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['marketplace', 'plugins', 'guardrails', 'developer-ecosystem', 'security'],
  date: '2026-05-18',
  readTime: '10 min',
  coverColor: '#222831',
  featured: false,
  blocks: [
    { type: 'heading', text: 'The bottleneck is us' },
    { type: 'paragraph', text: 'Right now, every guardrail in SupaProxy is built by our team. PII filtering, prompt injection detection, cost caps, rate limits. If a customer needs a guardrail we have not built yet, they wait. If they need a guardrail that is specific to their industry, their regulation, their internal policy, they wait longer. Or they fork.' },
    { type: 'paragraph', text: 'This does not scale. We are a small team. The number of compliance rules across industries is effectively infinite. Healthcare has HIPAA. Finance has PCI-DSS and POPIA. Legal has privilege. Every organisation has its own internal policies on top of the regulatory ones. We cannot build all of these ourselves and we should not try.' },
    { type: 'paragraph', text: 'The teams closest to the problem should build the solution. A compliance officer at a bank knows what their PII rules are. A healthcare IT team knows what PHI means in their context. A legal team knows what privilege looks like in their documents. We should give them the tools to encode that knowledge as a guardrail, not ask them to file a feature request and wait.' },

    { type: 'heading', text: 'Why this matters commercially' },
    { type: 'paragraph', text: 'A marketplace changes the economics of the platform in ways that benefit everyone.' },
    { type: 'paragraph', text: 'For us, it means we can move faster with a smaller team. Instead of building every guardrail ourselves, we build the guardrail interface and let the ecosystem fill the gaps. Every third-party guardrail is a feature we did not have to build, test, document, or support.' },
    { type: 'paragraph', text: 'For customers, it means they get guardrails that are purpose-built for their industry on day one, not after our team learns enough about their domain to build something generic. A guardrail built by someone who lives the regulation every day will always be better than one built by a platform team reading the spec for the first time.' },
    { type: 'paragraph', text: 'For developers, it means they can participate in the economy. A compliance consultant who builds a HIPAA guardrail can sell it to every healthcare customer on the platform. A security firm can build and maintain a set of guardrails as a product. The marketplace creates a revenue channel that did not exist before.' },
    { type: 'paragraph', text: 'For investors, it means the platform grows without linear headcount growth. Every new guardrail in the marketplace is platform value that did not cost us engineering time. The surface area of what SupaProxy can govern expands with the ecosystem, not with our team size.' },

    { type: 'heading', text: 'The trust problem' },
    { type: 'paragraph', text: 'The obvious question is security. If anyone can submit a guardrail, how do we stop someone from submitting malicious code that steals data, crashes the server, or quietly logs queries to an external endpoint?' },
    { type: 'paragraph', text: 'We spent time exploring different approaches to this. npm packages, dynamic imports, sandboxed execution. Each one had trade-offs that did not sit right with us. Then we came back to the simplest model that every successful app store already uses.' },
    { type: 'callout', variant: 'principle', title: 'The review principle', text: 'Nothing runs on the platform without review. Nothing changes without a new review. The review step is the security boundary.' },
    { type: 'paragraph', text: 'The developer submits a self-contained bundle. We inspect it. If it passes, we approve it. If it does not, we reject it with feedback. The approved bundle is immutable. If the developer wants to update it, they submit a new version and it goes through review again.' },
    { type: 'paragraph', text: 'This is how Apple, Google, Shopify, and Salesforce do it. The platform controls what runs. The developer builds, the platform gatekeeps. It is not novel. It does not need to be.' },

    { type: 'heading', text: 'What a plugin looks like' },
    { type: 'paragraph', text: 'A guardrail plugin is a JavaScript file that implements one interface. It receives the user query, does whatever analysis it needs to do, and returns one of two actions. Continue (optionally with a modified query) or block.' },
    { type: 'code', language: 'javascript', code: "// A guardrail plugin is one file with one function\nexport default {\n  id: 'hipaa-phi-filter',\n  name: 'HIPAA PHI Filter',\n  stage: 'pre-llm',\n  version: '1.0.0',\n  author: 'HealthGuard Inc.',\n\n  async process(input) {\n    const phi = detectPHI(input.query)\n    if (phi.length === 0) return { action: 'continue' }\n\n    return {\n      action: 'block',\n      reason: `Query contains ${phi.length} PHI detection(s)`,\n      metadata: { detections: phi },\n    }\n  },\n}" },
    { type: 'paragraph', text: 'No dependencies. No build step. No package.json. Just a file that implements the interface. The simpler the contract, the easier it is for non-platform-engineers to build plugins. A compliance officer who can write basic JavaScript can build a guardrail. They do not need to learn our build system, our package manager, or our deployment pipeline.' },

    { type: 'heading', text: 'The developer journey' },
    { type: 'paragraph', text: 'We are designing the developer experience around four steps.' },
    { type: 'comparison', left: { title: 'Developer side', items: ['Register as a developer (accept terms, provide identity).', 'Build the plugin (implement the guardrail interface).', 'Submit for review (upload the bundle).', 'Iterate on feedback until approved.'] }, right: { title: 'Platform side', items: ['Verify developer identity and liability agreement.', 'Run automated static analysis on the submission.', 'Manual review for security, scope, and quality.', 'Publish to marketplace and notify the developer.'] } },
    { type: 'paragraph', text: 'The developer agreement is important. It establishes that the developer is responsible for what their code does. If a plugin leaks data, the developer is liable, not the platform. This is the same model every app store uses. It does not eliminate risk, but it creates accountability.' },

    { type: 'heading', text: 'Why not npm?' },
    { type: 'paragraph', text: 'We considered using npm as the distribution layer. Developers publish to npm, we install from npm. It is familiar and it works for open-source packages.' },
    { type: 'paragraph', text: 'But npm introduces problems that a self-contained bundle avoids. npm packages can have transitive dependencies that we cannot review. They can have post-install scripts that run arbitrary code during installation. A package can change behaviour between versions without the platform knowing. And private packages require npm token management, which adds complexity for every organisation.' },
    { type: 'paragraph', text: 'A self-contained bundle has none of these problems. What we review is what runs. No dependencies to audit. No scripts to intercept. No version mutations. The approved file is immutable. If the developer wants to change something, they submit a new version and it goes through review again.' },
    { type: 'paragraph', text: 'We still want plugins to be discoverable on npm for developers who prefer that workflow. But the marketplace install does not pull from npm. It uses the reviewed, approved, stored bundle. npm is marketing. The marketplace is distribution.' },

    { type: 'heading', text: 'Storage and loading' },
    { type: 'paragraph', text: 'Approved plugins are stored as zip files. In development, that is a local directory. In production, it will be S3 or equivalent object storage.' },
    { type: 'paragraph', text: 'When an organisation installs a plugin, the platform extracts the zip into an org-specific directory and dynamically imports the entry file. The plugin runs in the same process as the guardrail pipeline. There is no network hop, no serialisation overhead, no cold start. It is a function call.' },
    { type: 'paragraph', text: 'Uninstalling removes the extracted files and deregisters the plugin from the guardrail registry. The plugin stops running immediately.' },
    { type: 'paragraph', text: 'We are not sandboxing plugins yet. The review step is the security boundary for now. Sandboxing (V8 isolates, resource limits, network restrictions) is on the roadmap but not in the first version. We want to get the submission, review, and install flow right before adding runtime isolation.' },

    { type: 'heading', text: 'What we are building now' },
    { type: 'paragraph', text: 'The marketplace is in progress. The plugin interface exists. The install and uninstall API exists. The registry pulls from a curated database table that we control. We have one demo plugin published: a PII filter that detects and redacts email addresses, phone numbers, ID numbers, and credit card numbers.' },
    { type: 'paragraph', text: 'What we are building next is the developer side. Registration, terms acceptance, submission form, review workflow. Once developers can submit plugins without going through us manually, the marketplace becomes real.' },
    { type: 'paragraph', text: 'We are sharing the architecture now because we want feedback. If you have built plugin systems before, or if you have opinions on how this should work, we want to hear from you.' },
  ],
}

import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'open-source-and-sustainability',
  title: 'Open source and the sustainability question',
  subtitle: 'The tools that keep AI safe should be community-built. But communities need to eat.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Philosophy',
  tags: ['open-source', 'sustainability', 'community', 'monetisation', 'ai-safety'],
  date: '2026-05-02',
  readTime: '6 min',
  coverColor: '#059669',
  featured: true,
  blocks: [
    { type: 'paragraph', text: 'There is a tension at the heart of building safety-critical AI infrastructure. The tools that govern how AI agents handle sensitive data, enforce compliance, and protect users need to be auditable, transparent, and community-owned. But the people who build those tools need to sustain themselves. These two needs are not naturally aligned.' },

    { type: 'heading', text: 'The open source instinct' },
    { type: 'paragraph', text: 'When the stakes are high, the instinct to open source is correct. Nobody should trust a black box to screen their most sensitive queries. Nobody should rely on a proprietary guardrail they cannot inspect. The code that decides whether a query containing patient data reaches a third-party model should be readable by the people whose patients are affected.' },
    { type: 'paragraph', text: 'This is not a philosophical preference. It is a practical requirement. Compliance officers need to audit the screening logic. Security teams need to verify the redaction patterns. Regulators need to understand the decision chain. Closed source makes all of this harder.' },

    { type: 'heading', text: 'The sustainability problem' },
    { type: 'paragraph', text: 'Open source projects have a well-documented sustainability crisis. Maintainers burn out. Critical infrastructure depends on volunteers. The [xz utils incident](https://en.wikipedia.org/wiki/XZ_Utils_backdoor) showed what happens when important projects are under-resourced and under-watched. In AI safety tooling, the consequences of unmaintained code are not just technical. They are regulatory and reputational.' },
    { type: 'paragraph', text: 'The question is not whether to monetise. It is where to draw the line. A system that is heavy on monetisation slowly drifts from the culture of openness that made it trustworthy in the first place. But a system with no path to sustainability eventually stops being maintained, which is worse.' },

    { type: 'heading', text: 'How other ecosystems found balance' },
    { type: 'paragraph', text: 'Linux is open. Red Hat built a business on support, certification, and enterprise tooling around it. The kernel did not need to monetise itself. The value layer above it did. WordPress is open. Automattic built a business on hosted WordPress, premium themes, and enterprise features. The content management system remained free. The convenience and scale were paid.' },
    { type: 'paragraph', text: 'VS Code is open. The extension marketplace lets individual developers build and distribute tools. Some are free, some are paid. The platform benefits from the ecosystem. The ecosystem benefits from the platform. Neither owns the other.' },
    { type: 'paragraph', text: 'Each of these found a boundary between what is open and what is paid. The boundary is never the infrastructure itself. It is always the intelligence, the convenience, or the scale built on top of it.' },

    { type: 'callout', variant: 'principle', title: 'A recurring pattern', text: 'Infrastructure wants to be open. The expertise, hosting, and curation layered on top of it is where sustainable value lives.' },

    { type: 'heading', text: 'Is AI safety different?' },
    { type: 'paragraph', text: 'AI safety tooling sits in a category that most infrastructure does not. When a web framework has a bug, a page renders wrong. When a guardrail has a bug, patient data reaches a model provider, trading positions leak to a competitor, or an employee inadvertently sends client-privileged information to a third party. The failure mode is not a 500 error. It is a regulatory investigation, a breach notification, a front-page story.' },
    { type: 'paragraph', text: 'This raises the stakes on both sides of the open source question. Higher stakes mean more reason to keep the core open and auditable, because closed-source safety tooling asks users to trust without verifying. But higher stakes also mean the tooling must be actively maintained, tested against evolving regulations, and backed by people who understand the compliance landscape deeply enough to catch the edge cases that pattern matching misses. That expertise is not free to produce.' },
    { type: 'paragraph', text: 'Perhaps the model is one where the core screening logic, the plugin interfaces, the pattern matching, and the pipeline architecture are all open. Practitioners build guardrails for their industries and share them with the community. The community reviews, improves, and trusts them because the code is visible.' },
    { type: 'paragraph', text: 'The managed hosting, the compliance reporting, the sector-specific rule packs maintained by domain experts, and the certification that a particular configuration meets a particular regulation, that is where sustainability comes from. Not from locking down the code. From adding value that requires ongoing human expertise.' },

    { type: 'heading', text: 'Community-built safety' },
    { type: 'paragraph', text: 'There is something worth exploring in the idea that AI safety tooling should be community-built rather than vendor-built. A financial services compliance team knows what data patterns matter in their industry. A healthcare organisation knows what HIPAA-sensitive content looks like in practice. A legal firm knows what client confidentiality means in the context of AI queries.' },
    { type: 'paragraph', text: 'These practitioners have domain knowledge that no platform vendor can replicate. If the architecture makes it easy for them to encode that knowledge as guardrails and share them, the entire ecosystem gets safer. The platform becomes a vehicle for collective intelligence about AI safety, not a proprietary moat.' },
    { type: 'paragraph', text: 'The question then becomes how to reward those practitioners. Recognition and reputation are part of it. But in a world where many of us genuinely wonder how long our current roles will last, there needs to be something more tangible. A healthy ecosystem is one where practitioners build for the community and the community rewards them. What that reward looks like, whether it is direct payment, employment opportunities, consulting credibility, or something else entirely, is still an open question.' },

    { type: 'callout', variant: 'insight', title: 'The balance to find', text: 'Open source first, then contributions that sustain the contributors. Not the other way around. The moment monetisation leads the roadmap instead of following it, the project stops serving the community and starts serving the business model.' },

    { type: 'heading', text: 'What healthy looks like' },
    { type: 'paragraph', text: 'A healthy AI safety ecosystem probably looks like this. The core tools are open, auditable, and community-maintained. The plugin architecture makes it trivial for domain experts to contribute guardrails, screening rules, and compliance patterns. Knowledge about what makes AI systems safe is shared freely, because the alternative, where safety knowledge is proprietary, makes everyone less safe.' },
    { type: 'paragraph', text: 'Sustainability comes from the layer above. Managed hosting for teams that do not want to run infrastructure. Compliance certification for organisations that need proof, not just code. Expert-maintained rule packs for industries where the regulations change faster than volunteer maintainers can keep up. These are valuable because they require ongoing expertise, not because the underlying code is hidden.' },
    { type: 'paragraph', text: 'Getting this balance right is not a one-time decision. It is an ongoing negotiation between openness and sustainability, between community culture and economic reality. The projects that navigate it well will be the ones that build AI platforms we can actually trust. The ones that get it wrong will either burn out or sell out. Neither outcome serves the people whose data flows through these systems.' },
  ],
}

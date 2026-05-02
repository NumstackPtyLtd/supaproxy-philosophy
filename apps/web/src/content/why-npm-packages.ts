import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'small-packages-big-change',
  title: 'Small packages in the age of AI-written code',
  subtitle: 'When AI agents write most of the code, the unit of change matters more than the unit of deployment.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['npm', 'plugins', 'ai-coding', 'modularity', 'ddd'],
  date: '2026-05-01',
  readTime: '5 min',
  coverColor: '#7C3AED',
  blocks: [
    { type: 'paragraph', text: 'AI coding agents are changing how software gets written. They are fast, capable, and improving weekly. But they have a limitation that most teams have not reckoned with. They work best on small, bounded problems.' },

    { type: 'heading', text: 'The monolith problem' },
    { type: 'paragraph', text: 'A 50,000-line codebase with tightly coupled modules is a minefield for an AI contributor. Context windows overflow. Dependencies are unclear. A change in one module breaks three others. The AI agent either makes a mess or gives up.' },
    { type: 'paragraph', text: 'This is not just a developer experience problem. It is a token economics problem. Every line the AI needs to read before making a change is a token spent. Large codebases burn through context windows before the agent even begins its work. The cost of understanding becomes the bottleneck, not the cost of writing.' },
    { type: 'paragraph', text: 'A 200-line package with a clear interface flips this entirely. The AI reads the interface, understands the contract, writes the implementation, and moves on. One session. Minimal context. No collateral damage.' },

    { type: 'heading', text: 'Bounded contexts as packages' },
    { type: 'paragraph', text: 'Domain-Driven Design introduced the concept of bounded contexts. Each context has its own language, its own rules, its own boundaries. The insight was that trying to build one unified model for an entire system leads to a model that serves no part of it well.' },
    { type: 'paragraph', text: 'The same insight applies to package architecture. A guardrail is a bounded context. A model provider is a bounded context. A consumer channel is a bounded context. Each one has a clear interface at its boundary. The implementation behind the interface is nobody else\'s business.' },
    { type: 'paragraph', text: 'When each bounded context is a separate package, you get isolation for free. No shared mutable state. No accidental coupling. No "I changed the guardrail and the billing broke." The package boundary is the context boundary.' },

    { type: 'callout', variant: 'principle', title: 'A design constraint worth adopting', text: 'Every extension should be a change that an AI agent can make in a single session without breaking anything else.' },

    { type: 'heading', text: 'What this looks like in practice' },
    { type: 'paragraph', text: 'Imagine a system where adding a new AI model provider, a new communication channel, or a new security guardrail is a single npm package. The package implements an interface. The system discovers and loads it. No fork required. No merge conflicts. No understanding of the host system\'s internals.' },

    { type: 'comparison', left: { title: 'Monolith approach', items: ['Fork the codebase to add a feature.', 'Merge conflicts with every upstream update.', 'AI agents struggle with the full codebase.', 'One deployment for everything.'] }, right: { title: 'Package approach', items: ['Install a package to add a feature.', 'Independent versioning and releases.', 'AI agents handle one package at a time.', 'Change what you need, leave the rest.'] } },

    { type: 'heading', text: 'The interface as contract' },
    { type: 'paragraph', text: 'The critical design decision is the interface between the host system and the extension. It must be stable, small, and well-defined. If the interface is right, the implementation becomes trivial. Anyone can write a plugin. Any AI agent can write a plugin.' },
    { type: 'code', language: 'typescript', title: 'A plugin interface', code: `interface GuardrailPlugin {
  readonly id: string
  readonly name: string
  readonly stage: 'pre-llm' | 'post-llm'

  screen(query: string, context: GuardrailContext): Promise<ScreeningResult>
}` },
    { type: 'paragraph', text: 'Zero infrastructure dependencies. No logging library, no HTTP client, no database driver. The host provides all of that. The package is pure logic. This matters for token efficiency too. An AI agent working on this package needs to understand five fields and one method. Not a framework. Not a runtime. Just a contract.' },

    { type: 'heading', text: 'Designing for AI contributors' },
    { type: 'paragraph', text: 'If AI agents are going to write most of our extensions, should we design our architectures around their strengths? Small interfaces. Isolated packages. Clear contracts. The modularity that made open source successful may be even more important now, not for human contributors, but for AI ones.' },
    { type: 'paragraph', text: 'There is a related question worth sitting with. Today we measure architecture quality by how easy it is for a human to understand. Readability, naming conventions, documentation. But what if the primary consumer of your extension architecture is not a human but an AI agent with a 200k token context window? Does that change what "good architecture" means? Perhaps it means fewer abstractions, not more. Flatter hierarchies. Interfaces that fit in a single screen. These are worth exploring as AI-assisted development becomes the norm, not the exception.' },

    { type: 'callout', variant: 'insight', title: 'A thought experiment', text: 'What if the measure of a good architecture is not how easy it is for a human to understand, but how easy it is for an AI to safely extend?' },
  ],
}

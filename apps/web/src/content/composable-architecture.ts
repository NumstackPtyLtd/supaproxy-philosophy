import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'composable-architecture',
  title: 'Why we split the server into packages you can swap',
  subtitle: 'Auth, database, queue, vector store. Every layer is now a port interface with a default adapter. Here is why, how, and what it means for the project.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['composability', 'ddd', 'ports-and-adapters', 'dependency-inversion', 'open-source'],
  date: '2026-05-18',
  readTime: '12 min',
  coverColor: '#1C1830',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The monolith problem' },
    { type: 'paragraph', text: 'SupaProxy started as a single server. One repository. One process. MySQL for storage, Redis for queues, LanceDB for vectors, JWT for auth. It worked. But every time someone asked "can I use PostgreSQL?" or "can we plug in our own SSO?", the answer was the same: fork the server and rewrite the internals.' },
    { type: 'paragraph', text: 'That is not composability. That is vendor lock-in wearing an open-source badge.' },
    { type: 'paragraph', text: 'We decided to fix it. Not by adding configuration flags or plugin hooks, but by restructuring the entire codebase around a principle we already believed in but had not fully committed to: dependency inversion.' },

    { type: 'heading', text: 'The principle: depend on abstractions, not implementations' },
    { type: 'paragraph', text: 'Dependency Inversion is the D in SOLID. The idea is simple: high-level modules should not depend on low-level modules. Both should depend on abstractions.' },
    { type: 'paragraph', text: 'In practice, this means the use case that handles a query should not know it is talking to MySQL. It should talk to a WorkspaceRepository interface. Whether that interface is backed by MySQL, PostgreSQL, SQLite, or a mock in tests is decided at composition time, not at coding time.' },
    { type: 'paragraph', text: 'We had this pattern in our codebase from day one. Every repository is an interface. Every external service goes through a port. But we cheated in one critical place: the composition root. Our container.ts file imported every concrete class directly and wired them together. If you wanted to swap MySQL for PostgreSQL, you had to rewrite container.ts. If you wanted different auth, you had to rewrite container.ts. The abstractions existed but the composition was hardcoded.' },
    { type: 'callout', variant: 'principle', title: 'The composition root principle', text: 'The place where you wire abstractions to implementations should be the thinnest possible layer, owned by the host application, not by the library it composes.' },

    { type: 'heading', text: 'What we changed' },
    { type: 'paragraph', text: 'We split the server into focused packages. Each package owns one concern. The host application (your server, our cloud, an embedded integration) composes them at startup.' },
    { type: 'diagram', title: 'Before: one repository, everything hardcoded', content: '┌─────────────────────────────────────┐\n│         supaproxy-server             │\n│                                     │\n│  domain/        ← interfaces        │\n│  application/   ← use cases         │\n│  infrastructure/                    │\n│    ├── mysql/   ← hardcoded         │\n│    ├── redis/   ← hardcoded         │\n│    ├── lancedb/ ← hardcoded         │\n│    ├── auth/    ← hardcoded         │\n│    └── ...                          │\n│  container.ts   ← wires everything  │\n│  index.ts       ← runs the server   │\n└─────────────────────────────────────┘' },
    { type: 'diagram', title: 'After: composable packages', content: '┌──────────────────┐\n│  @supaproxy/core │  ← pure logic, port interfaces, routes\n│  (no infra deps) │\n└───────┬──────────┘\n        │ composed by\n┌───────┴──────────────────────────────────┐\n│            your server (index.ts)         │\n│                                          │\n│  import core    ← domain + use cases     │\n│  import auth    ← JWT + bcrypt           │\n│  import mysql   ← repository adapters    │\n│  import bullmq  ← queue adapter          │\n│  import lancedb ← vector adapter         │\n│  import redis   ← session adapter        │\n│                                          │\n│  createContainer({ ...adapters })        │\n│  createApp(container)                    │\n│  serve(app)                              │\n└──────────────────────────────────────────┘' },

    { type: 'heading', text: 'Auth as the first extraction' },
    { type: 'paragraph', text: 'We started with auth because it is the layer most likely to be swapped. Every deployment has different auth requirements. Self-hosters want JWT with bcrypt. Enterprise wants SAML or LDAP. Our cloud wants OAuth with scoped tokens. A test environment wants no auth at all.' },
    { type: 'paragraph', text: 'The old approach: auth was baked into the server. The container created a BcryptPasswordService, a JwtTokenService, a SignupUseCase, and a LoginUseCase. It created auth routes and auth middleware. All hardcoded. All internal.' },
    { type: 'paragraph', text: 'The new approach: the container accepts auth from outside.' },
    { type: 'code', language: 'typescript', code: "// Before: auth hardcoded in container.ts\nconst passwordService = new BcryptPasswordService()\nconst tokenService = new JwtTokenService(JWT_SECRET)\nconst signupUseCase = new SignupUseCase(orgRepo, passwordService, tokenService)\nconst loginUseCase = new LoginUseCase(orgRepo, passwordService, tokenService)\nconst requireAuth = createRequireAuth(tokenService)\nconst authRoutes = createAuthRoutes({ signupUseCase, loginUseCase, ... })" },
    { type: 'code', language: 'typescript', code: "// After: auth injected from outside\nimport { createAuthRoutes } from '@supaproxy/auth'\n\nconst { routes, requireAuth } = createAuthRoutes({\n  repo: orgRepoAdapter,\n  options: { jwtSecret: JWT_SECRET },\n  generateId,\n})\n\nconst container = createContainer(pool, { authRoutes: routes, requireAuth })" },
    { type: 'paragraph', text: 'Three things happened. First, the container lost its auth dependency. It does not import bcrypt, jsonwebtoken, or any auth use case. Second, the auth package became self-contained. It owns its password hashing, token signing, routes, and middleware. Third, the host application became the composition root. It decides which auth to use.' },
    { type: 'callout', variant: 'insight', title: 'The adapter pattern', text: 'The auth package defines an AuthRepository interface. The host maps its existing org repository to this interface using a thin adapter. No shared types, no package coupling. Just structural compatibility.' },

    { type: 'heading', text: 'Why not just use configuration?' },
    { type: 'paragraph', text: 'The tempting alternative is configuration flags. Set AUTH_PROVIDER=oauth in your environment and the server switches strategy at runtime. Many frameworks work this way.' },
    { type: 'paragraph', text: 'The problem is that configuration flags accumulate. Each one adds a conditional branch. Each branch needs testing. Each combination of flags creates a different runtime behaviour that may never have been tested together. AUTH_PROVIDER=oauth plus DB_DRIVER=postgres plus QUEUE_BACKEND=sqs is a configuration that nobody tested because nobody anticipated that combination.' },
    { type: 'paragraph', text: 'With composition, there are no flags. You import the packages you want. You wire them together. The TypeScript compiler checks that your wiring satisfies the interfaces. If it compiles, the integration is structurally correct. If it does not compile, you get an error before you run anything.' },
    { type: 'comparison', left: { title: 'Configuration flags', items: ['Runtime switching via env vars.', 'Combinatorial explosion of states.', 'Errors at runtime, in production.', 'All implementations bundled.', 'Cannot tree-shake unused code.'] }, right: { title: 'Composition', items: ['Compile-time wiring via imports.', 'One explicit composition per host.', 'Errors at compile time, before deploy.', 'Only imported implementations bundled.', 'Unused adapters never downloaded.'] } },

    { type: 'heading', text: 'The full picture' },
    { type: 'paragraph', text: 'Auth was the first extraction. The same pattern applies to every infrastructure layer.' },
    { type: 'code', language: 'typescript', code: "// The composable server (your index.ts)\nimport { createContainer, createApp } from '@supaproxy/core'\nimport { createAuthRoutes } from '@supaproxy/auth'\nimport { createMysqlInfra } from '@supaproxy/mysql'\nimport { createBullMqQueue } from '@supaproxy/bullmq'\nimport { createLanceDBVectors } from '@supaproxy/lancedb'\nimport { createRedisSession } from '@supaproxy/redis'\n\nconst infra = createMysqlInfra(pool)\nconst queue = createBullMqQueue(redisUrl)\nconst vectors = createLanceDBVectors('./data')\nconst sessions = createRedisSession(redisUrl)\nconst auth = createAuthRoutes({ ... })\n\nconst container = createContainer({\n  ...infra, queue, vectors, sessions,\n  authRoutes: auth.routes,\n  requireAuth: auth.requireAuth,\n})" },
    { type: 'paragraph', text: 'Every line is a choice. Swap MySQL for PostgreSQL by changing one import. Swap LanceDB for Qdrant. Swap BullMQ for SQS. Swap JWT for OAuth. Each swap is one import change and zero code changes inside core.' },

    { type: 'heading', text: 'What this means for the project' },
    { type: 'paragraph', text: 'For self-hosters, it means you stop fighting the framework. You use the database you already run. You use the auth your organisation already has. You install only the packages you need.' },
    { type: 'paragraph', text: 'For contributors, it means you can add a PostgreSQL adapter without understanding the agent loop. You can add an OAuth provider without understanding how queries are executed. Each adapter is a focused package with a focused test suite.' },
    { type: 'paragraph', text: 'For us, it means the cloud overlay becomes thinner. Cloud is just another host application that composes core with OAuth, managed queues, and a billing layer. The same core code runs everywhere. The adapters change.' },

    { type: 'heading', text: 'The cost' },
    { type: 'paragraph', text: 'Composability is not free. The getting-started experience becomes more verbose. Instead of "clone the server and run it", you write a composition root. Instead of one package, you install six. Instead of one README, you read several.' },
    { type: 'paragraph', text: 'We mitigate this with defaults. The @supaproxy/auth package is the default. The @supaproxy/mysql package is the default. If you do not care about swapping, you use the defaults and your composition root is twelve lines of code. The complexity is opt-in.' },
    { type: 'paragraph', text: 'But the cognitive overhead is real. When you read the server entrypoint, you see imports from six packages instead of one. When something goes wrong, the error might be in core, in the auth adapter, or in the repo adapter. The debugging surface is wider.' },
    { type: 'paragraph', text: 'We think this trade-off is worth it. A wider debugging surface is better than a framework you cannot change without forking.' },
    { type: 'callout', variant: 'principle', title: 'The composability trade-off', text: 'Composability trades initial simplicity for long-term flexibility. The first five minutes are harder. The next five years are easier.' },

    { type: 'heading', text: 'Language portability' },
    { type: 'paragraph', text: 'There is a subtler benefit we did not plan for. When core has zero infrastructure dependencies, its port interfaces become language-agnostic contracts. A WorkspaceRepository interface is just a list of methods with typed inputs and outputs. Anyone can implement that interface in Go, Rust, Python, or Java.' },
    { type: 'paragraph', text: 'The domain logic stays in TypeScript for now. But the adapter layer is open. A company that runs Go could write Go adapters for their PostgreSQL database and their SQS queues, then call the TypeScript core via a thin bridge. We are not building that bridge today, but we are not blocking it either.' },
    { type: 'paragraph', text: 'That is what composability gives you. Not just the ability to swap implementations today, but the architectural permission to evolve in directions you have not imagined yet.' },
  ],
}

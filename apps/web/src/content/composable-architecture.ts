import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'composable-architecture',
  title: 'Why we are splitting the server into packages you can swap',
  subtitle: 'Auth, database, queue, vector store. We are turning every layer into a port interface with a default adapter. Here is what we are doing, why, and where we are so far.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Architecture',
  tags: ['composability', 'ddd', 'ports-and-adapters', 'dependency-inversion', 'open-source'],
  date: '2026-05-18',
  readTime: '12 min',
  coverColor: '#1C1830',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The monolith problem' },
    { type: 'paragraph', text: 'SupaProxy is a single server today. One repository. One process. MySQL for storage, Redis for queues, LanceDB for vectors, JWT for auth. It works. But we keep asking ourselves what happens if someone wants to use PostgreSQL instead of MySQL, or plug in their own SSO instead of our JWT auth. The answer is fork the server and rewrite the internals.' },
    { type: 'paragraph', text: 'The platform is public but we have not advertised yet. This is the right time to fix the foundation, before adoption makes it painful to change.' },
    { type: 'paragraph', text: 'So we are restructuring. Not by adding configuration flags or plugin hooks, but by reorganising the codebase around a principle we already believe in but have not fully committed to: dependency inversion.' },

    { type: 'heading', text: 'The principle: depend on abstractions, not implementations' },
    { type: 'paragraph', text: 'Dependency Inversion is the D in SOLID. The idea is simple: high-level modules should not depend on low-level modules. Both should depend on abstractions.' },
    { type: 'paragraph', text: 'In practice, this means the use case that handles a query should not know it is talking to MySQL. It should talk to a WorkspaceRepository interface. Whether that interface is backed by MySQL, PostgreSQL, SQLite, or a mock in tests gets decided at composition time, not at coding time.' },
    { type: 'paragraph', text: 'We have this pattern in our codebase already. Every repository is an interface. Every external service goes through a port. But we cheat in one critical place: the composition root. Our container.ts file imports every concrete class directly and wires them together. If you want to swap MySQL for PostgreSQL, you have to rewrite container.ts. If you want different auth, you have to rewrite container.ts. The abstractions exist but the composition is hardcoded.' },
    { type: 'callout', variant: 'principle', title: 'The composition root principle', text: 'The place where you wire abstractions to implementations should be the thinnest possible layer, owned by the host application, not by the library it composes.' },

    { type: 'heading', text: 'What we are changing' },
    { type: 'paragraph', text: 'We are splitting the server into focused packages. Each package will own one concern. The host application (your server, our cloud, an embedded integration) composes them at startup.' },
    { type: 'diagram', title: 'Today: one repository, everything hardcoded', content: '┌─────────────────────────────────────┐\n│         supaproxy-server             │\n│                                     │\n│  domain/        ← interfaces        │\n│  application/   ← use cases         │\n│  infrastructure/                    │\n│    ├── mysql/   ← hardcoded         │\n│    ├── redis/   ← hardcoded         │\n│    ├── lancedb/ ← hardcoded         │\n│    ├── auth/    ← hardcoded         │\n│    └── ...                          │\n│  container.ts   ← wires everything  │\n│  index.ts       ← runs the server   │\n└─────────────────────────────────────┘' },
    { type: 'diagram', title: 'Where we are heading: composable packages', content: '┌──────────────────┐\n│  @supaproxy/core │  ← pure logic, port interfaces, routes\n│  (no infra deps) │\n└───────┬──────────┘\n        │ composed by\n┌───────┴──────────────────────────────────┐\n│            your server (index.ts)         │\n│                                          │\n│  import core    ← domain + use cases     │\n│  import auth    ← JWT + bcrypt           │\n│  import mysql   ← repository adapters    │\n│  import bullmq  ← queue adapter          │\n│  import lancedb ← vector adapter         │\n│  import redis   ← session adapter        │\n│                                          │\n│  createContainer({ ...adapters })        │\n│  createApp(container)                    │\n│  serve(app)                              │\n└──────────────────────────────────────────┘' },

    { type: 'heading', text: 'Auth: the first extraction' },
    { type: 'paragraph', text: 'We are starting with auth because it is the layer most likely to be swapped. Every deployment has different auth requirements. Self-hosters want JWT with bcrypt. Enterprise wants SAML or LDAP. Our cloud will need OAuth with scoped tokens. A test environment wants no auth at all.' },
    { type: 'paragraph', text: 'Today, auth is baked into the server. The container creates a BcryptPasswordService, a JwtTokenService, a SignupUseCase, and a LoginUseCase. It creates auth routes and auth middleware. All hardcoded. All internal.' },
    { type: 'paragraph', text: 'The change we are making: the container accepts auth from outside.' },
    { type: 'code', language: 'typescript', code: "// Today: auth hardcoded in container.ts\nconst passwordService = new BcryptPasswordService()\nconst tokenService = new JwtTokenService(JWT_SECRET)\nconst signupUseCase = new SignupUseCase(orgRepo, passwordService, tokenService)\nconst loginUseCase = new LoginUseCase(orgRepo, passwordService, tokenService)\nconst requireAuth = createRequireAuth(tokenService)\nconst authRoutes = createAuthRoutes({ signupUseCase, loginUseCase, ... })" },
    { type: 'code', language: 'typescript', code: "// What it becomes: auth injected from outside\nimport { createAuthRoutes } from '@supaproxy/auth'\n\nconst { routes, requireAuth } = createAuthRoutes({\n  repo: orgRepoAdapter,\n  options: { jwtSecret: JWT_SECRET },\n  generateId,\n})\n\nconst container = createContainer(pool, { authRoutes: routes, requireAuth })" },
    { type: 'paragraph', text: 'Three things change. First, the container loses its auth dependency. It will not import bcrypt, jsonwebtoken, or any auth use case. Second, the auth package becomes self-contained. It owns its password hashing, token signing, routes, and middleware. Third, the host application becomes the composition root. It decides which auth to use.' },
    { type: 'paragraph', text: 'We have the auth package built and the container refactored. The PRs are open. This part is close to landing.' },
    { type: 'callout', variant: 'insight', title: 'The adapter pattern', text: 'The auth package defines an AuthRepository interface. The host maps its existing org repository to this interface using a thin adapter. No shared types, no package coupling. Just structural compatibility.' },

    { type: 'heading', text: 'Why not just use configuration?' },
    { type: 'paragraph', text: 'The tempting alternative is configuration flags. Set AUTH_PROVIDER=oauth in your environment and the server switches strategy at runtime. Many frameworks work this way.' },
    { type: 'paragraph', text: 'The problem is that configuration flags accumulate. Each one adds a conditional branch. Each branch needs testing. Each combination of flags creates a different runtime behaviour that may never have been tested together. AUTH_PROVIDER=oauth plus DB_DRIVER=postgres plus QUEUE_BACKEND=sqs is a configuration that nobody tested because nobody anticipated that combination.' },
    { type: 'paragraph', text: 'With composition, there are no flags. You import the packages you want. You wire them together. The TypeScript compiler checks that your wiring satisfies the interfaces. If it compiles, the integration is structurally correct. If it does not compile, you get an error before you run anything.' },
    { type: 'comparison', left: { title: 'Configuration flags', items: ['Runtime switching via env vars.', 'Combinatorial explosion of states.', 'Errors at runtime, in production.', 'All implementations bundled.', 'Cannot tree-shake unused code.'] }, right: { title: 'Composition', items: ['Compile-time wiring via imports.', 'One explicit composition per host.', 'Errors at compile time, before deploy.', 'Only imported implementations bundled.', 'Unused adapters never downloaded.'] } },

    { type: 'heading', text: 'Where we are heading' },
    { type: 'paragraph', text: 'Auth is the first extraction. The same pattern will apply to every infrastructure layer. This is what the full composition will look like when we are done.' },
    { type: 'code', language: 'typescript', code: "// The composable server (your index.ts)\nimport { createContainer, createApp } from '@supaproxy/core'\nimport { createAuthRoutes } from '@supaproxy/auth'\nimport { createMysqlInfra } from '@supaproxy/mysql'\nimport { createBullMqQueue } from '@supaproxy/bullmq'\nimport { createLanceDBVectors } from '@supaproxy/lancedb'\nimport { createRedisSession } from '@supaproxy/redis'\n\nconst infra = createMysqlInfra(pool)\nconst queue = createBullMqQueue(redisUrl)\nconst vectors = createLanceDBVectors('./data')\nconst sessions = createRedisSession(redisUrl)\nconst auth = createAuthRoutes({ ... })\n\nconst container = createContainer({\n  ...infra, queue, vectors, sessions,\n  authRoutes: auth.routes,\n  requireAuth: auth.requireAuth,\n})" },
    { type: 'paragraph', text: 'Every line will be a choice. Swap MySQL for PostgreSQL by changing one import. Swap LanceDB for Qdrant. Swap BullMQ for SQS. Swap JWT for OAuth. Each swap is one import change and zero code changes inside core. We are not there yet, but the auth extraction proves the pattern works.' },

    { type: 'heading', text: 'What this will mean' },
    { type: 'paragraph', text: 'For self-hosters, it will mean you stop fighting the framework. You use the database you already run. You use the auth your organisation already has. You install only the packages you need.' },
    { type: 'paragraph', text: 'For contributors, it will mean you can add a PostgreSQL adapter without understanding the agent loop. You can add an OAuth provider without understanding how queries are executed. Each adapter is a focused package with a focused test suite.' },
    { type: 'paragraph', text: 'For us, it means the cloud overlay becomes thinner. Cloud is just another host application that composes core with its own auth, managed queues, and a billing layer. The same core code runs everywhere. The adapters change.' },

    { type: 'heading', text: 'The cost' },
    { type: 'paragraph', text: 'Composability is not free. The getting-started experience becomes more verbose. Instead of "clone the server and run it", you write a composition root. Instead of one package, you install six. Instead of one README, you read several.' },
    { type: 'paragraph', text: 'We plan to mitigate this with defaults. The @supaproxy/auth package is the default. The @supaproxy/mysql package will be the default. If you do not care about swapping, you use the defaults and your composition root is twelve lines of code. The complexity is opt-in.' },
    { type: 'paragraph', text: 'But the cognitive overhead is real. When you read the server entrypoint, you see imports from six packages instead of one. When something goes wrong, the error might be in core, in the auth adapter, or in the repo adapter. The debugging surface is wider.' },
    { type: 'paragraph', text: 'We think this trade-off is worth making. A wider debugging surface is better than a framework you cannot change without forking. But we are still early in this process and learning as we go.' },
    { type: 'callout', variant: 'principle', title: 'The composability trade-off', text: 'Composability trades initial simplicity for long-term flexibility. The first five minutes are harder. The next five years are easier.' },

    { type: 'heading', text: 'Language portability' },
    { type: 'paragraph', text: 'There is a subtler benefit we are starting to see. When core has zero infrastructure dependencies, its port interfaces become language-agnostic contracts. A WorkspaceRepository interface is just a list of methods with typed inputs and outputs. Anyone could implement that interface in Go, Rust, Python, or Java.' },
    { type: 'paragraph', text: 'The domain logic stays in TypeScript for now. But the adapter layer is open. A company that runs Go could write Go adapters for their PostgreSQL database and their SQS queues, then call the TypeScript core via a thin bridge. We are not building that bridge today, but we are not blocking it either.' },
    { type: 'paragraph', text: 'That is what composability gives you. Not just the ability to swap implementations today, but the architectural permission to evolve in directions you have not imagined yet.' },

    { type: 'heading', text: 'Current status' },
    { type: 'paragraph', text: 'The rename from supaproxy-server to @supaproxy/core is done and deployed. The @supaproxy/auth package is built and the container refactor is in PR. Infrastructure adapter extraction (MySQL, BullMQ, LanceDB, Redis into separate packages) is planned but not started.' },
    { type: 'paragraph', text: 'We are sharing this now, mid-process, because the philosophy site is a design journal, not a product blog. These are the decisions we are making and the trade-offs we are weighing. If you have thoughts on the approach, we would like to hear them.' },
  ],
}

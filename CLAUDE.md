# SupaProxy Philosophy

The Philosophy is a design journal for SupaProxy. It publishes articles that explore architectural ideas, design decisions, and engineering principles behind the platform. Articles are written as TypeScript content modules, not Markdown files. The site lives at philosophy.supaproxy.cloud.

See the [central hub](https://github.com/NumstackPtyLtd/supaproxy) for cross-repo governance, workflow, and conventions.

## Project structure

```
supaproxy-philosophy/
  apps/web/                    Astro 6 + React 19 application
    src/
      content/                 Article modules (TypeScript, export { article })
        index.ts               Article registry
      components/              React components (ArticleCard, ArticleReader, BlockRenderer, PhilosophyPage)
      layouts/                 Astro layouts
      lib/                     Types and formatters
      pages/                   Astro pages
      styles/                  Global styles
    Dockerfile                 Production container
  package.json                 Root workspace config
  pnpm-workspace.yaml          pnpm workspace (apps/*)
```

## Stack

| Layer | Tech |
|---|---|
| Framework | Astro 6 |
| UI | React 19 |
| Design system | @supaproxy/ui |
| Styling | Tailwind CSS 4 |
| Monorepo | pnpm workspace |

## Development

```bash
pnpm install
pnpm dev          # Starts the Astro dev server
pnpm build        # Production build
```

## Adding an article

1. Create a new `.ts` file in `apps/web/src/content/`.
2. Export `{ article: Article }`.
3. Import and add to `apps/web/src/content/index.ts`.

## Article writing rules

- This is a design journal, not a blog. Explore ideas, do not announce products.
- No product announcements. Never say "we built X" or "we launched Y".
- No cloud secrets. Never mention cloud overlay, deployment details, or internal architecture.
- Short sentences. Active voice. No filler.
- Every bullet point ends with a period.
- Open questions as prose paragraphs, not bullet lists.
- Maximum 2 callouts per article.

## Git workflow

All changes go through pull requests. NEVER push directly to main.

### Branch naming

```
feat/short-description
fix/short-description
chore/short-description
docs/short-description
```

### Destructive commands

NEVER run these commands:
- `git push --force`
- `git reset --hard`
- `git clean -f`
- `rm -rf` on project directories

If something needs to be undone, create a revert commit on a branch.

## Code rules

### Type safety

- No `any` types. Define interfaces for all data structures.
- No `as any` casts.

### No hardcoded values

- No env var fallbacks. Use `requireEnv()` with no defaults.
- No hardcoded API URLs, secrets, or magic numbers.

### Writing standards

- British English throughout (colour, organisation, behaviour).
- No em dashes or en dashes. Use commas, full stops, or semicolons.
- No smart quotes. Use straight quotes only.
- Sentence case for headings.

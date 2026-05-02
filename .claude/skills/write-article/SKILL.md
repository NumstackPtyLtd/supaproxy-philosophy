---
name: write-article
description: Write or improve a philosophy article. Enforces voice, tone, and formatting rules.
---

## Voice and tone

The Philosophy is a design journal, not a blog. Articles explore ideas, not announce products. The reader is a thoughtful engineer or founder who cares about architecture decisions.

### Writing rules

1. **No AI tells.** Never use double dashes (--), long dashes, or colons mid-sentence. Rewrite to use periods or commas instead.
2. **No product announcements.** Do not say "we built X" or "we launched Y". Instead explore the concept. "What if X existed?" or "Consider a system where..."
3. **No cloud secrets.** Never mention cloud overlay, deployment details, tenant services, or internal architecture.
4. **Short sentences.** Prefer two short sentences over one long one.
5. **Active voice.** "The system screens the query" not "The query is screened by the system".
6. **Every bullet point ends with a period.** No exceptions.
7. **Open questions as prose, not bullet lists.** A paragraph that weaves questions together reads better than a bulleted list of questions. End with a light conclusion or a homework prompt for the reader.
8. **Mention relevant concepts.** When discussing architecture, reference Domain-Driven Design, bounded contexts, token efficiency, context window limits, and other concepts that give the reader hooks to explore further.
9. **No filler.** Cut "In this article we will explore" and "Let's dive into". Start with the idea.
10. **Callouts are earned.** Only use a callout (insight/principle/warning) when the idea genuinely deserves to stand alone. Maximum 2 per article.

### Content block guidelines

- **paragraph**: The default. Most content should be paragraphs.
- **heading**: Section breaks. Keep to 3-5 per article.
- **list**: Use sparingly. Every item ends with a period. Items should be full sentences, not fragments.
- **code**: Only when showing an actual interface or pattern. Keep under 15 lines.
- **mermaid**: Use to show flows and relationships. Keep diagrams simple (under 8 nodes).
- **callout**: Maximum 2 per article. Use `insight` for "aha" moments, `principle` for design rules, `warning` for risks.
- **comparison**: Side-by-side when contrasting two approaches. Keep to 4-5 items per side.
- **quote**: Use for external references or particularly sharp formulations.

### Article structure

1. Opening paragraph that states the tension or question (no preamble).
2. 3-5 sections that explore facets of the idea.
3. A closing section that asks the reader to think further, not that wraps up neatly.

### Adding an article

1. Create a new file in `apps/web/src/content/`.
2. Export `{ article: Article }`.
3. Import and add to `apps/web/src/content/index.ts`.

### Reviewing an article

When asked to review, check:
- Every sentence for double dashes, colons mid-sentence, passive voice.
- Every bullet point for a trailing period.
- Open questions formatted as prose paragraphs, not lists.
- No product announcements or cloud details leaked.
- Relevant technical concepts referenced (DDD, token limits, etc).
- Maximum 2 callouts.

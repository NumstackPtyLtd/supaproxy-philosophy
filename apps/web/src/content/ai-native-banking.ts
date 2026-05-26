import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'ai-native-banking',
  title: 'AI-native banking',
  subtitle: 'Every software system has three layers. Where humans interact, where rules are enforced, and where work gets done. What happens when AI reshapes all three simultaneously?',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Vision',
  tags: ['ai', 'banking', 'architecture', 'mcp', 'governance', 'infrastructure'],
  date: '2026-05-26',
  readTime: '7 min',
  coverColor: '#1a1a2e',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The three-layer pattern' },
    { type: 'paragraph', text: 'Every piece of software follows the same shape. There is an application layer where humans interact, a business layer where rules are enforced, and an infrastructure layer where work gets done. Take a banking app, a logistics platform, or a hospital records system. These layers are always there, what changes over time is how we build them.' },
    { type: 'paragraph', text: 'I keep thinking about what happens when AI reshapes all three at once. Not in the incremental "add a chatbot" sense, but in the structural sense. What if each layer becomes something fundamentally different from what we have been building for the last thirty years?' },

    { type: 'heading', text: 'The application layer that already exists' },
    { type: 'paragraph', text: 'Two billion people open WhatsApp every day. They already know how to send a message, share a document, or record a voice note. The interaction model is learned, habitual, and universal. It works in Lagos, London, and Lahore without a single line of custom UI code.' },
    { type: 'paragraph', text: 'Think about what a messaging platform already handles. Authentication through phone numbers, notifications through push, file transfer through attachments, group collaboration through group chats, real-time presence through typing indicators and read receipts. If you set out to build all of that from scratch, it would be a serious engineering effort. Connecting to it is an API call.' },
    { type: 'paragraph', text: 'Chatbots tried this years ago and mostly failed. But the failure was never in the application layer. The messaging interface worked fine. What failed was everything behind it. Decision trees that could not handle ambiguity, keyword matchers that fell apart with natural language, FAQ lookups that gave wrong answers with high confidence. The front door was open, but there was nothing useful inside.' },
    { type: 'paragraph', text: 'That is the part that has changed.' },

    { type: 'heading', text: 'The missing middle' },
    { type: 'paragraph', text: 'When people talk about AI in enterprise, they jump straight to capabilities. The model can read documents, write code, analyse data, draft responses. And that is true. But I find myself stuck on a different question. Not what the AI can do, but what it should be allowed to do.' },
    { type: 'paragraph', text: 'Imagine a customer asks to transfer money. The AI parses that intent perfectly. But should it execute the transfer? Under what conditions? With what approval chain? Against which compliance rules? Up to what limit? For which customer tier? These are not AI problems, they are governance problems. And in most organisations, the answers live in policy documents that nobody reads, in code comments that went stale two years ago, in the institutional memory of people who know that "we never do X on Fridays because the batch job runs."' },
    { type: 'paragraph', text: 'I think this is the most undervalued piece of the entire AI stack. Not the model, not the prompt, but the structured and auditable layer that sits between what an AI can do and what it is allowed to do. Guardrails that run as middleware on every interaction rather than as suggestions in a system prompt. Knowledge that is scoped per workspace so a fraud investigation agent and a customer service agent are not looking at the same pool of information. Routing logic that sends a loan enquiry to one workspace and a fraud report to another. Audit trails where every decision, every tool call, and every guardrail that fired is logged and queryable.' },

    { type: 'callout', variant: 'principle', title: 'The governance thesis', text: 'AI capabilities are converging. Every model will be able to read, write, reason, and act. The differentiator is not what the AI can do, but what you allow it to do, under what conditions, and with what oversight. Governance is the product.' },

    { type: 'paragraph', text: 'If that is true, it changes where the complexity lives. The model becomes a commodity. The application layer is borrowed. The governance layer is the thing you actually build. It encodes your domain expertise, your risk tolerance, your regulatory obligations, and your institutional knowledge. It is what makes one organisation different from another, even when they run the same model on the same messaging platform.' },

    { type: 'heading', text: 'Tools all the way down' },
    { type: 'paragraph', text: 'The governance layer decides what is allowed, but something still has to do the actual work. Check a balance, submit a form, query a database, send a notification, file a report.' },
    { type: 'paragraph', text: 'The Model Context Protocol gives AI agents a standard way to discover and call tools. A tool is essentially a function with a name, a description, and typed parameters. The agent reads the description, decides whether to use it, fills in the parameters, and calls it. The tool does the work and returns a result. It could be a database query, an API call to a core banking system, a script that generates a PDF statement, or a webhook that triggers a KYC check.' },
    { type: 'paragraph', text: 'The interesting thing is what disappears. In traditional software, a developer writes the integration code for each workflow. "When the user clicks dispute, call this endpoint, then that endpoint, then render this screen." With MCP tools, the developer writes the individual tools and the AI figures out how to compose them. A single "help me dispute this transaction" might chain five tools together. Fetch transaction details, check dispute eligibility, create a case, notify the merchant, send confirmation. Nobody wrote that specific sequence. The agent composed it from what was available, within the boundaries set by the governance layer.' },
    { type: 'paragraph', text: 'This is where the legacy integration problem gets interesting. Every enterprise I have seen tells the same story. A core system that is twenty or thirty years old, running on SOAP endpoints, batch jobs, mainframe terminals, and FTP drops. The standard response is a multi-year rewrite. But these systems work. The data is there and the processes are proven. What they lack is a modern interface.' },
    { type: 'paragraph', text: 'A SOAP endpoint becomes a tool with typed parameters. A batch file drop becomes a tool that writes to the directory and monitors the output. A mainframe terminal becomes a tool that automates the session. Each legacy system stays exactly as it is. The tool is just a thin adapter, a port, that exposes the capability in a way an AI agent can discover and use.' },

    { type: 'callout', variant: 'insight', title: 'Ports, not rewrites', text: 'Every existing API, webhook, batch process, and database becomes a port. A thin adapter that exposes the capability as a tool. The AI agent composes workflows from available ports, and the governance layer controls which compositions are permitted. The legacy system does not change.' },

    { type: 'heading', text: 'The trust problem' },
    { type: 'paragraph', text: 'Giving an AI agent access to tools is one thing. Trusting what it does with them is another. This is where most conversations about AI in enterprise get hand-wavy. "We will add guardrails." "We will have human oversight." But the execution environment itself needs to be structurally sandboxed. Every tool call should run in an isolated context where side effects are controlled and destructive operations require explicit confirmation. Not because we hope the model behaves, but because the architecture makes misbehaviour impossible at the infrastructure level.' },
    { type: 'paragraph', text: 'There is a whole class of attacks that traditional security does not cover. Prompt injection, where crafted input causes the agent to ignore its instructions. Tool poisoning, where a tool description contains hidden instructions for the model. Data exfiltration, where the agent leaks sensitive information through its responses. Excessive agency, where the agent takes actions beyond its mandate. These are OWASP-level concerns that need infrastructure-level answers. Real-time monitoring of every tool call, probe-based detection of injection patterns, and anomaly detection on agent behaviour. Not as something you bolt on later, but as a foundational capability of the execution layer.' },

    { type: 'heading', text: 'Thinking audaciously' },
    { type: 'paragraph', text: 'Take everything above and push it somewhere specific. A bank.' },
    { type: 'paragraph', text: 'The application layer is WhatsApp, Telegram, or a simple web chat. Customers interact in natural language with no app to download and no interface to learn. They already know how to use it.' },
    { type: 'paragraph', text: 'The business layer is a governance platform. Guardrails encode every regulation, every internal policy, and every risk threshold. Knowledge bases hold product documentation, compliance frameworks, and customer context, all scoped per workspace so the right agent sees the right information. Routing sends loan enquiries to an underwriting workspace, fraud reports to an investigation workspace, and general queries to a service workspace. Every interaction is audited, every tool call is logged, and every decision is traceable.' },
    { type: 'paragraph', text: 'The infrastructure layer is a sandboxed execution environment. MCP tools wrap the core banking system, the payment gateway, the KYC provider, the credit bureau, the document generation service, and the notification system. Each tool is typed, described, and security-tested. When a customer applies for a loan, the agent composes a workflow. Credit check, risk scoring, document generation, notification. Nobody coded that sequence. The agent composed it, the governance layer approved it, and the infrastructure executed it safely.' },

    { type: 'layers', layers: [
      { title: 'Application (messaging platforms)', items: [
        'WhatsApp, Telegram, Slack, or web chat. Already deployed, already understood, already accessible.',
        'Authentication via phone number or existing identity. No new credentials to manage.',
      ] },
      { title: 'Business (governance platform)', items: [
        'Guardrails enforce compliance as middleware. Knowledge is scoped per workspace.',
        'Routing directs queries to specialised workspaces. Audit trails record every decision.',
      ] },
      { title: 'Infrastructure (sandboxed execution)', items: [
        'MCP tools wrap every capability. Legacy APIs become ports.',
        'OWASP-grade probes monitor every tool call. Execution is isolated and auditable.',
      ] },
    ] },

    { type: 'heading', text: 'What I keep wondering' },
    { type: 'paragraph', text: 'How would regulators evaluate a system where workflows are composed dynamically instead of coded statically? Traditional audits assume you can point to a specific line of code that implements a rule. When the agent composes at runtime, the audit trail becomes the proof. Every decision is logged rather than buried in code that nobody reads. That might actually be better, but it is a different model of accountability, and different takes time.' },
    { type: 'paragraph', text: 'What happens with multi-step transactions that need atomicity? A loan disbursement involves debiting one account, crediting another, creating a repayment schedule, and sending a confirmation. If the third step fails, do the first two roll back? Traditional systems handle this with database transactions. An AI composing tools across multiple systems has no shared transaction context. That is a genuinely hard problem, and I do not think anyone has solved it cleanly yet.' },
    { type: 'paragraph', text: 'And then there is the competition question. If the application layer is a shared messaging platform, the governance layer is configurable, and the infrastructure is composable tools, where is the moat? I keep landing on the same answer. It is the quality of the governance rules, the depth of the domain knowledge encoded in guardrails and routing logic, and the trust built through years of clean audit trails. The bank that writes the best guardrails wins. That is a strange thing to think, but I suspect it is true. And ultimately, when governance is that good, the user experience improves and the humans who use these services win.' },
  ],
}

import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'semantic-preservation',
  title: 'The data the model sees must mean something',
  subtitle: 'Format preservation is not enough. If a South African ID becomes random digits, the AI draws wrong conclusions about age, gender, and eligibility. The question is not whether to preserve meaning, but how much.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Philosophy',
  tags: ['privacy', 'encryption', 'format-preserving', 'semantic', 'enterprise', 'veil'],
  date: '2026-05-05',
  readTime: '9 min',
  coverColor: '#0f172a',
  featured: true,
  blocks: [
    { type: 'paragraph', text: 'Reversible privacy solves the structural problem. A name becomes a name. A number stays a number. An email keeps its format. The AI receives data it can parse, and the response maps back to real values on the way out. This is a meaningful step beyond masking, which destroys the data entirely.' },
    { type: 'paragraph', text: 'But structure is not meaning. And the moment you hand structurally valid but semantically wrong data to an AI model, you introduce a class of problems that are subtle, dangerous, and easy to miss.' },

    { type: 'heading', text: 'The ID number problem' },
    { type: 'paragraph', text: 'A South African ID number is not just thirteen digits. It is a compressed biography. The first six digits encode date of birth. The seventh digit encodes gender. The remaining digits encode citizenship status and include a check digit. When an insurance company asks an AI to assess a claim, the model may infer the claimant\'s age from their ID number. It may check whether the policy type matches the age bracket. It may flag a life insurance claim where the ID suggests the holder is twenty-three.' },
    { type: 'paragraph', text: 'If the privacy layer replaces 9201015800087 with 1271642993406, the structure is preserved but the meaning is destroyed. The model now thinks the customer was born in 1912. It thinks they are 114 years old. Every age-based inference, every actuarial calculation, every eligibility check the model performs will be wrong. Not because the model failed, but because we fed it data that lied about something the format promised to encode.' },

    { type: 'callout', variant: 'principle', title: 'The core tension', text: 'Format-preserving encryption promises the AI structurally valid data to reason with. But formats carry meaning. If the meaning is not preserved alongside the structure, the AI reasons correctly about wrong data. That is worse than no data at all, because it looks right.' },

    { type: 'heading', text: 'Cross-entity consistency' },
    { type: 'paragraph', text: 'A customer named Elvis Magagula has an email address elvis.m@gmail.com. If the privacy layer encrypts the name to "Ife Zulu" but the email to "thabiso.qwabe@flux.io", the AI cannot correlate them. It sees two unrelated identifiers that, in real data, would clearly belong to the same person. Any model performing identity resolution, fraud detection, or relationship mapping will draw wrong conclusions.' },
    { type: 'paragraph', text: 'The encrypted avatar for an entity must propagate. If Elvis becomes Ife Zulu, then Elvis\'s email should become ife.zulu@something.com. Elvis\'s greeting in a support transcript should say "Dear Ife". Elvis\'s beneficiary record should list Ife Zulu. The avatar is not just a value substitution. It is a consistent fictional identity that must hold up under cross-reference.' },

    { type: 'heading', text: 'Geographic and jurisdictional leakage' },
    { type: 'paragraph', text: 'A phone number starting with +27 tells the model the customer is in South Africa. If the privacy layer changes it to +95, the model thinks the customer is in Myanmar. For a model performing risk assessment, regulatory compliance checks, or regional service routing, this is not a cosmetic error. It changes the output.' },
    { type: 'paragraph', text: 'The same applies to IBAN country codes, postal codes, currency denominations, and language-specific names. Every format that encodes geography or jurisdiction carries information the model may act on. Changing the country code is not protecting privacy. It is corrupting the analysis.' },

    { type: 'heading', text: 'The preservation spectrum' },
    { type: 'paragraph', text: 'Not all meaning needs to be preserved. The question is: what does the AI need to reason correctly, and what can safely change?' },

    { type: 'comparison', left: { title: 'Must preserve', items: [
      'Structure and format (a name stays a name)',
      'Cross-entity relationships (name ↔ email ↔ phone for same person)',
      'Geographic and jurisdictional indicators (country codes, IBANs)',
      'Demographic encoding where the model infers from it (ID → age bracket, gender)',
      'Relative relationships between values (account A balance > account B balance)',
    ] }, right: { title: 'Can safely change', items: [
      'Exact identity (the specific person)',
      'Exact date of birth (but preserve age bracket)',
      'Exact address (but preserve region or city tier)',
      'Exact account number (but preserve institution prefix if relevant)',
      'Exact monetary values (but preserve order of magnitude)',
    ] } },

    { type: 'heading', text: 'Semantic preservation strategies' },
    { type: 'paragraph', text: 'The approach changes depending on what the format encodes.' },

    { type: 'paragraph', text: 'For ID numbers with embedded demographics, the privacy layer should parse the format, extract the semantic fields (date of birth, gender, citizenship), apply controlled perturbation (shift DOB by a deterministic offset that preserves the age bracket, keep gender unchanged), and recompute any check digits. The result is an ID number that is fake but demographically consistent. The model infers the right age bracket, the right gender, the right citizenship status. It just cannot determine the real person.' },
    { type: 'paragraph', text: 'For cross-entity consistency, the avatar identity must be generated once per real identity and reused everywhere. If the vector store assigns "Ife Zulu" as Elvis\'s avatar, then every field derived from Elvis\'s identity should derive from "Ife Zulu". The email becomes ife.zulu@provider.com. The phone greeting becomes "Dear Ife". This is not just string replacement. It requires an identity graph where the privacy layer understands which fields belong to the same person and encrypts them as a coherent set.' },
    { type: 'paragraph', text: 'For geographic indicators, the answer is almost always: preserve them. Country codes, region codes, and currency codes are not personally identifiable. They are contextual metadata that the model needs. Changing +27 to +27 is not a privacy risk. The model knows the customer is in South Africa either way, from the language, the currency, the service context. The country code is not the secret. The person is.' },

    { type: 'callout', variant: 'insight', title: 'The identity graph', text: 'True format-preserving encryption is not a function from string to string. It is a function from identity to identity. Every field belonging to a real person maps to the corresponding field of a fictional person. The fictional person is internally consistent, demographically plausible, and completely made up.' },

    { type: 'heading', text: 'Domain-specific rules' },
    { type: 'paragraph', text: 'This is where one-size-fits-all breaks down. A bank needs different preservation rules than a hospital. An insurer needs different rules than a law firm. The demographic encoding in an SA ID is irrelevant to a legal AI reviewing contracts. The IBAN country code matters to a compliance engine but not to a customer support chatbot.' },
    { type: 'paragraph', text: 'A healthcare system needs to preserve age brackets because drug dosing depends on them. It needs to preserve gender because treatment protocols differ. But it can change the patient name, the medical record number, and the address. An insurance system needs to preserve age because premiums depend on it, but it also needs to preserve the relationship between the policyholder and the beneficiary (spouse, child, parent) because claim eligibility depends on that relationship, not the specific names.' },
    { type: 'paragraph', text: 'A fraud detection model needs to preserve transaction amounts, timestamps, and geographic patterns because the anomaly is in the pattern, not the identity. Changing the amounts or the timing would make the model useless. But the account holder name, the account number, and the merchant name can all be encrypted.' },

    { type: 'heading', text: 'What this means for the platform' },
    { type: 'paragraph', text: 'A privacy layer that claims to be enterprise-ready cannot ship with a fixed set of format rules. It must be configurable per organization, per domain, per entity type. The platform provides the mechanisms. The organization provides the policy.' },

    { type: 'list', items: [
      'Entity type definitions with semantic field descriptors, e.g. "SA ID: positions 0-5 = DOB, position 6 = gender, positions 7-12 = sequence, position 12 = check digit"',
      'Preservation rules per field, e.g. "preserve age bracket within 5 years", "preserve gender exactly", "recompute check digit"',
      'Cross-entity relationship declarations, e.g. "email.local_part derives from person.avatar_name"',
      'Geographic preservation policies, e.g. "preserve country code", "preserve region but not city"',
      'Magnitude preservation for numeric values, e.g. "preserve order of magnitude", "preserve relative ranking within dataset"',
    ] },

    { type: 'paragraph', text: 'The platform\'s job is to make these rules expressible, composable, and auditable. The organization\'s job is to decide what their AI needs to see versus what must stay hidden. This is not a technical decision. It is a business decision that sits at the intersection of privacy, compliance, and model utility.' },

    { type: 'heading', text: 'The honest position' },
    { type: 'paragraph', text: 'No single encryption scheme will work for every organization, every entity type, every use case. A bank using AI for credit scoring needs different semantic preservation than the same bank using AI for customer support. The scoring model needs demographics. The support model needs conversation context. Same data, same bank, different rules.' },
    { type: 'paragraph', text: 'What we can do is build tools that make the tradeoff explicit rather than invisible. Today, most format-preserving systems either preserve too little meaning (the model gets garbage) or too much (the "encryption" is a thin rename that leaks real patterns). Neither is acceptable for enterprises with real compliance obligations.' },
    { type: 'paragraph', text: 'The right approach is to give organizations a framework where they can define, per entity type, exactly which semantic dimensions to preserve and which to perturb. The framework validates that the rules are internally consistent (you cannot preserve age bracket if you randomize the DOB field entirely). It audits that the rules meet the regulatory requirements the organization claims to satisfy. And it generates encrypted avatars that are both privacy-safe and semantically useful for the specific AI workload they serve.' },

    { type: 'callout', variant: 'warning', title: 'The risk of false confidence', text: 'The most dangerous outcome is an organization that deploys format-preserving encryption, assumes the AI is reasoning correctly, and does not realize the encrypted data broke a semantic assumption the model depends on. The ID looks valid. The model trusts it. The conclusion is wrong. And no one catches it because the output looks plausible. This is why semantic preservation must be an explicit, auditable configuration, not an implicit side effect of the encryption algorithm.' },

    { type: 'heading', text: 'Building for the spectrum' },
    { type: 'paragraph', text: 'The practical path forward is a layered system. At the base layer, structural format preservation: a name becomes a name, a number becomes a number. This is table stakes and should work out of the box. Above that, semantic preservation rules that organizations configure per entity type and per domain. These are the rules that say "preserve the age bracket in SA IDs" or "derive the email from the avatar name." At the top, cross-entity consistency that ensures the fictional identity holds together under cross-reference.' },
    { type: 'paragraph', text: 'Each layer adds complexity and configuration cost. Not every organization needs all three. A customer support chatbot may only need structural preservation. A credit scoring engine needs all three. The platform must support the full spectrum without forcing the full cost on every deployment.' },
    { type: 'paragraph', text: 'What every organisation must do is think carefully about which layer they need. That thinking cannot be automated. It requires understanding what the AI model actually does with the data, which fields it infers from, and which semantic relationships it depends on. The platform can provide the tools, the documentation, and the audit trail. But the decision is theirs.' },

    { type: 'heading', text: 'Encryption as packages' },
    { type: 'paragraph', text: 'The guardrails architecture in Supaproxy solved a similar problem. The platform owns the pipeline. Domain experts own the transformation logic. Guardrail plugins expose a standard interface. The platform runs them. The plugin author decides what they do. The same pattern applies to encryption.' },
    { type: 'paragraph', text: 'An encryption package is a small, self-contained module that knows how to encrypt and decrypt one entity type. It exposes a standard interface: encrypt a value, decrypt a value, declare what entity type it handles, and describe what semantic dimensions it preserves. The platform discovers these packages at runtime, registers them per entity type, and routes values through the right encryptor during the privacy pipeline.' },

    { type: 'code', language: 'typescript', title: 'Encryption plugin interface', code: `interface EncryptionPlugin {
  readonly id: string
  readonly name: string
  readonly entityType: string
  readonly preserves: string[]  // e.g. ['age_bracket', 'gender', 'check_digit']

  encrypt(value: string, salt: string): string
  decrypt(encrypted: string, salt: string): string
  validate?(value: string): boolean
}` },

    { type: 'paragraph', text: 'A bank builds @acme/sa-id-encryptor. It parses the thirteen-digit format, extracts date of birth and gender, shifts the DOB by a deterministic offset that keeps the person in the same five-year age bracket, preserves the gender digit, randomises the sequence, and recomputes the Luhn check digit. The result is a valid SA ID that encodes the right demographics for a person who does not exist.' },
    { type: 'paragraph', text: 'An insurer builds @insurance-co/policy-encryptor. It preserves the product prefix (POL-, LIF-, VEH-) because the AI uses it to determine claim type, randomises the numeric portion, and preserves the branch code if the format includes one. The AI routes the claim correctly. The policy number is fake.' },
    { type: 'paragraph', text: 'A healthcare provider builds @health-co/patient-id-encryptor. It preserves the facility code and the year of admission because those affect treatment protocol lookups. Everything else changes.' },

    { type: 'callout', variant: 'principle', title: 'The plugin contract', text: 'The platform provides the pipeline, the registry, and the default encryptors that handle common formats out of the box. Organisations bring their own packages for entity types where the format carries domain-specific meaning. The interface is the contract. The implementation is theirs.' },

    { type: 'paragraph', text: 'This is the same philosophy behind small npm packages and bounded contexts. Each encryption plugin is one file, one entity type, one set of format rules. It can be built in a single session. It can be tested in isolation. It can be maintained by the compliance team who understands the format, not the platform team who built the pipeline. The person who knows what an SA ID encodes is the person who should write the encryptor for it.' },
    { type: 'paragraph', text: 'The platform ships with sensible defaults: names map to names, numbers preserve digit count, emails keep valid structure, phone numbers keep their format. These cover the common cases without any configuration. But when an organisation needs demographic-aware ID encryption or jurisdiction-preserving account numbers, they install a package that handles it. No platform changes required. No waiting for a feature request. The interface is there. The capability is theirs to build.' },

    { type: 'heading', text: 'Self-hosted and cloud' },
    { type: 'paragraph', text: 'For organisations that self-host, encryption packages are npm modules installed alongside the engine. The code runs on their infrastructure, processes their data, and never leaves their network. Trust is straightforward. They wrote it, they deployed it, they control it.' },
    { type: 'paragraph', text: 'Cloud changes the delivery mechanism but not the interface. An organisation uploads the package through the dashboard or publishes it to a Veil registry. The platform runs it in a sandboxed isolate on their behalf. The encryption still happens before data reaches the AI model. The package code never leaves the Veil cloud. The contract is identical: encrypt(value, salt) returns a string.' },
    { type: 'paragraph', text: 'The difference is trust. A self-hoster trusts their own code because it runs on their own machines. A cloud user is uploading encryption logic to someone else\'s infrastructure. The package sees real data. It has to. That is what it encrypts. So the platform needs guardrails around the package itself.' },

    { type: 'list', items: [
      'Sandboxed execution. V8 isolates or equivalent. No network access, no filesystem, no side channels. The package receives a value and a salt. It returns a string. Nothing else.',
      'Audit logging. Every invocation recorded with metadata (entity type, timing, package version) but never the values themselves. The organisation can verify their package is being called correctly without the platform seeing the data.',
      'Package signing and versioning. Every upload is immutable and signed. Rolling back to a previous version is one click. The organisation knows exactly which code is running.',
      'Source review. The option to inspect the package source before enabling it in production. No obfuscated code. No minified bundles. The compliance team can read what the encryptor does.',
    ] },

    { type: 'paragraph', text: 'This matters because encryption packages sit at the most sensitive point in the entire pipeline. They are the last piece of code that touches real data before it becomes protected. The platform must treat them accordingly, whether they run on the organisation\'s hardware or in a managed cloud.' },
    { type: 'paragraph', text: 'But the interface stays the same. An encryptor built for self-hosted deployment works in the cloud without modification. An encryptor tested locally against sample data behaves identically in production. The delivery changes. The contract does not.' },
  ],
}

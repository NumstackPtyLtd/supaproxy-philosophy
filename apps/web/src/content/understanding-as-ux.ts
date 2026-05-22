import type { Article } from '../lib/types'

export const article: Article = {
  slug: 'understanding-as-ux',
  title: 'Understanding is the highest form of UX',
  subtitle: 'Why we renamed every major navigation concept in our dashboard, and what growing up on the wrong measuring stick taught me about the words we choose.',
  author: { name: 'Elvis Magagula', role: 'OSS Maintainer' },
  category: 'Philosophy',
  tags: ['ux', 'naming', 'accessibility', 'design', 'dashboard'],
  date: '2026-05-22',
  readTime: '5 min',
  coverColor: '#1A1A2E',
  featured: true,
  blocks: [
    { type: 'heading', text: 'The wrong measuring stick' },
    { type: 'paragraph', text: 'I grew up struggling with social cues. Integration was hard. Reading a room was harder. Later, comprehension of written and spoken word became its own quiet battle. Not the kind anyone notices, the kind where you read a paragraph three times and still feel like it was written for someone else.' },
    { type: 'paragraph', text: 'It is almost laughable, then, that I became the same person who tries to flex jargon just to sound like I know more than I actually do. I still catch myself doing it. I still fail at it.' },
    { type: 'paragraph', text: 'I have been told time and time again that I am smart. I have always brushed that off. Every time someone complimented my intellect, Jay-Z took over. "We don\'t believe you, you need more people." The problem was never intelligence. The problem was that the measuring stick was Metric, and I am, well, Eridanian. The scale did not fit. The marks did not line up. I spent years thinking I was behind when I was just measuring wrong.' },

    { type: 'heading', text: 'Look at me. I am the captain now.' },
    { type: 'paragraph', text: 'Fast forward to today. I get to play Adam, the one to whom the authority to name things has been bestowed. I get to pick the tree from which the sticks are broken. I get to decide what words we use, what concepts we surface, and how we talk to the people who use what we build.' },
    { type: 'paragraph', text: 'That is a responsibility I do not take lightly. Because I know what it feels like to stare at a screen and not understand the word someone chose. Not because the concept is hard, but because the label is wrong.' },

    { type: 'heading', text: 'What I noticed this evening' },
    { type: 'paragraph', text: 'I am adding voice calling to SupaProxy. The feature itself is straightforward. In fact, the hardest thing about this feature is naming things, it\'s figuring out where to place it on the navigation and make it accessible. Where does voice go? Under Consumers? Under Connectors? Under Integrations?' },
    { type: 'paragraph', text: 'I built this navigation. I named these things. And I cannot figure out where a phone call belongs. That is when I know the names are wrong.' },
    { type: 'callout', variant: 'insight', title: 'The test', text: 'If the person who built it cannot figure out where something goes, no user ever will.' },

    { type: 'heading', text: 'The language of implementation' },
    { type: 'paragraph', text: 'Our dashboard has three concepts: Providers, Consumers, and Connections. These map directly to the domain model. They are precise. They are correct. They are also completely useless to anyone who does not write the code.' },
    { type: 'paragraph', text: 'A customer does not think "I need to configure a Consumer." They think "I want Slack to work." They do not think "I need to add a Provider." They think "I want to use Claude." The gap between what the system calls things and what users think about is not a minor inconvenience. It is a wall.' },

    { type: 'heading', text: 'The rename' },
    { type: 'paragraph', text: 'I change three words.' },
    { type: 'comparison', left: { title: 'Before', items: ['Providers', 'Consumers', 'Connections'] }, right: { title: 'After', items: ['Models', 'Entry Points', 'Tools'] } },
    { type: 'paragraph', text: 'Models. Because "which model are we using?" is the question people already ask. Entry Points. Because Slack, WhatsApp, a phone number, a voice call are all ways into the system. Tools. Because "add a tool" is something anyone understands. "Create a connection" requires a mental model of the architecture.' },
    { type: 'paragraph', text: 'Now voice has an obvious home. It is an entry point. The question I freeze on this evening answers itself.' },

    { type: 'heading', text: 'Naming is not cosmetic' },
    { type: 'paragraph', text: 'Names are the interface. For most users, the name is the only thing they will ever see of your architecture. They see a sidebar with five words, and those five words are the entire product to them.' },
    { type: 'paragraph', text: 'When those words are implementation jargon, you are asking every user to learn your internal language before they can use your product. You are imposing your measuring stick on someone who measures differently.' },
    { type: 'callout', variant: 'principle', title: 'The naming principle', text: 'Name things for what they mean to the person using them, not for what they mean to the person who built them.' },

    { type: 'heading', text: 'The DDD tension' },
    { type: 'paragraph', text: 'Domain-Driven Design says the ubiquitous language should be shared across the team, the code, and the product. By that standard, having "Consumer" in the code and "Entry Point" in the sidebar is a violation.' },
    { type: 'paragraph', text: 'But ubiquitous language assumes your domain experts and your users share a context. In a developer platform, they often do not. The engineers who build the system and the people configuring it are different people with different vocabularies. DDD has a concept for this, the anti-corruption layer. The UI is exactly that boundary.' },
    { type: 'callout', variant: 'insight', title: 'The translation layer', text: 'I treat UI labels as a translation file, not as the domain model. The domain says Consumer. The interface says Entry Point. The mapping lives in one place and can evolve as I learn which words resonate.' },
    { type: 'paragraph', text: 'If the new names prove stable, if "Entry Point" becomes the word everyone uses in conversations and support tickets, then I migrate the domain to match. The ubiquitous language converges from evidence, not from guessing.' },

    { type: 'heading', text: 'What I wish someone told me' },
    { type: 'paragraph', text: 'A maths teacher who says "calculate the hypotenuse" and a maths teacher who says "find the long side of the triangle" are teaching the same thing. One of them loses half the room on the first word.' },
    { type: 'paragraph', text: 'I was in the half that got lost. Not because I could not do the maths. Because the word was treated as a prerequisite for understanding rather than a byproduct of it.' },
    { type: 'callout', variant: 'principle', title: 'The inversion', text: 'Understanding is not the reward for learning the right words. Understanding is what makes the right words unnecessary.' },

    { type: 'heading', text: 'Three words' },
    { type: 'paragraph', text: 'I change three words in a sidebar. It takes ten minutes. It will probably save an unknowable number of people who would have looked at the screen, felt like it was not for them, and closed the tab.' },
    { type: 'paragraph', text: 'I cannot measure that number. But I know it is not zero, because I have been that person.' },
  ],
}

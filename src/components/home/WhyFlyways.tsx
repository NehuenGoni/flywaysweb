import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    stat: "20 yrs",
    title: "Two decades in the field",
    body: "Not managing from a distance — running it. Every season, every field rotation, perfected over twenty years.",
  },
  {
    stat: "Orvis",
    title: "Orvis Endorsed",
    body: "Held to Orvis's standards for guide quality, sustainable practice and guest experience. Earned, and re-earned, every year.",
  },
  {
    stat: "Beretta",
    title: "Beretta Trident Lodge",
    body: "Certified by Beretta across shooting quality, accommodations and service. Very few operators in Argentina hold both.",
  },
  {
    stat: "Owners",
    title: "Owners present on every trip",
    body: "When you book, you start a conversation with the people who'll be there when you arrive — and remember you when you return.",
  },
];

export function WhyFlyways() {
  return (
    <Section tone="paperDim">
      <Reveal>
        <Eyebrow>Why Flyways</Eyebrow>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-5xl">
          The reputation is real. So is the difference.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
          David Denies and the big operators can match our scale. They can&apos;t
          match this: two recognitions almost no one holds together, and owners who
          are in the field with you, not behind a booking system.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07}>
            <div className="h-full rounded-2xl border border-ink/10 bg-paper p-7">
              <div className="font-display text-3xl text-teal">{p.stat}</div>
              <h3 className="font-display mt-4 text-lg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

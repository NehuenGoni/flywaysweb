import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { owners, teamGroups } from "@/content/team";
import { TeamCard } from "./TeamCard";

export function TeamSection() {
  return (
    <Section tone="paper">
      <Reveal>
        <Eyebrow>Our team</Eyebrow>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
          The people you&apos;ll actually meet
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
          Owners, guides and lodge staff who have been doing this for years —
          most of them, for as long as Flyways has existed.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 sm:max-w-3xl sm:grid-cols-2">
        {owners.map((m, i) => (
          <Reveal key={m.slug} delay={i * 0.1}>
            <TeamCard member={m} featured />
          </Reveal>
        ))}
      </div>

      {teamGroups.map((group) => (
        <div key={group.id} className="mt-20">
          <Reveal>
            <h3 className="font-display border-b border-ink/10 pb-4 text-xl sm:text-2xl">
              {group.title}
            </h3>
          </Reveal>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
            {group.members.map((m, i) => (
              <Reveal key={m.slug} as="li" delay={(i % 4) * 0.07}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </Section>
  );
}

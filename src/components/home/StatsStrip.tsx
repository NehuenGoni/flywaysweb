import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { experiences } from "@/content/index";

// TODO(client): the document leaves the province count "a confirmar".
const stats = [
  { value: "20", label: "Years" },
  { value: String(experiences.length), label: "Experiences" },
  { value: "4", label: "Provinces" }, // TODO(client): confirm province count
  // TODO(client): placeholder figure — swap for the real count of guests
  // hosted once the client confirms one, so it stays a credible number
  // rather than an arbitrary one.
  { counter: 1850, suffix: "+", label: "Happy Clients" },
] as const;

export function StatsStrip() {
  return (
    <div className="relative bg-ink">
      <Container className="py-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl text-paper sm:text-4xl">
                  {"counter" in s ? (
                    <Counter target={s.counter} suffix={s.suffix} />
                  ) : (
                    s.value
                  )}
                </dd>
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-paper/55">
                  {s.label}
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
      {/* Softens the ink→paper handoff into Endorsements below, instead of
          a knife-edge color cut. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

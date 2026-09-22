import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export type EndorsementMark = { name: string; src: string };

const defaultEndorsements: EndorsementMark[] = [
  { name: "Orvis Endorsed", src: "/logos/orvis.png" },
  { name: "Beretta Trident", src: "/logos/beretta.png" },
  { name: "Trip Advisor", src: "/logos/tripadvisor.png" },
  { name: "SCI", src: "/logos/sci.png" },
];

// Orvis ships as a solid-color square badge rather than a wide wordmark on
// transparent ground, so it needs its own cap or it reads oversized next to
// the others in the row.
function Mark({ name, src }: { name: string; src: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={160}
      height={48}
      className="h-14 w-auto max-w-[170px] object-contain opacity-70 transition duration-300 hover:opacity-100"
    />
  );
}

// Repeated enough times that one set alone spans wider than any viewport —
// otherwise the strip visibly empties out before the loop point. The
// animation then only has to travel 1/REPEAT of the track to loop seamlessly.
const REPEAT = 8;

export function Endorsements({ marks = defaultEndorsements }: { marks?: EndorsementMark[] }) {
  const track = Array.from({ length: REPEAT }, () => marks).flat();

  return (
    <div className="border-b border-ink/10 bg-paper">
      <Container className="py-10">
        <Reveal>
          <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <ul
              className="animate-marquee flex w-max items-center gap-16"
              style={{ "--marquee-end": `${-100 / REPEAT}%` } as React.CSSProperties}
            >
              {track.map((item, i) => (
                <li key={`${item.name}-${i}`} className="shrink-0">
                  <Mark {...item} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

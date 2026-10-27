import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/content/team";

const SIZES = {
  owner: "(min-width:640px) 40vw, 100vw",
  member: "(min-width:1024px) 22vw, (min-width:768px) 30vw, 46vw",
};

export function TeamCard({ member, featured = false }: { member: TeamMember; featured?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper-dim">
        <Image
          src={member.src}
          alt={`${member.name}, ${member.role}`}
          width={member.width}
          height={member.height}
          sizes={featured ? SIZES.owner : SIZES.member}
          placeholder="blur"
          blurDataURL={member.blurDataURL}
          className="aspect-[4/5] h-auto w-full object-cover"
        />
      </div>
      <figcaption className={cn(featured ? "mt-5" : "mt-3")}>
        <p className={cn("font-display", featured ? "text-2xl" : "text-base leading-snug")}>
          {member.name}
        </p>
        <p
          className={cn(
            featured
              ? "mt-1 font-display text-xs uppercase tracking-[0.28em] text-olive"
              : "mt-0.5 text-sm leading-snug text-ink/65",
          )}
        >
          {member.role}
        </p>
      </figcaption>
    </figure>
  );
}

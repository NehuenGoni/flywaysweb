import Link from "next/link";
import { ContactLinks } from "@/components/layout/ContactLinks";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { experiences } from "@/content/experiences";
import { lodges } from "@/content/lodges";
import { mainNav, siteConfig } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const doveLodges = lodges.filter((l) => l.category === "Dove hunting");

  return (
    <footer className="bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="offwhite" height={48} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
              Premium dove hunting in Córdoba, Argentina. Twenty years,
              owner-run — Orvis Endorsed &amp; Beretta Trident certified.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-sky">
              ★★★★★ Trusted on Google Reviews
            </p>
          </div>

          <FooterColumn title="Experiences">
            {experiences.map((e) => (
              <FooterLink key={e.slug} href={`/experiences/${e.slug}`}>
                {e.navLabel}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="The Lodges">
            {doveLodges.map((l) => (
              <FooterLink key={l.slug} href={`/lodges/${l.slug}`}>
                {l.name}
              </FooterLink>
            ))}
            <FooterLink href="/lodges">All lodges</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            {mainNav
              .filter((i) => i.href !== "/experiences" && i.href !== "/lodges")
              .map((i) => (
                <FooterLink key={i.href} href={i.href}>
                  {i.label}
                </FooterLink>
              ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-14 grid gap-6 border-t border-paper/15 pt-8 text-sm text-paper/70 md:grid-cols-2">
          <ContactLinks />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-paper/45">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-xs uppercase tracking-[0.22em] text-paper/50">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-paper/75 transition-colors hover:text-paper">
        {children}
      </Link>
    </li>
  );
}

"use client";

import { siteConfig } from "@/data/site";
import { trackContactClick } from "@/lib/analytics";

// Enlaces de contacto directo del footer. Client Component para poder
// instrumentar el evento contact_click en cada canal.
export function ContactLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <a
        href={siteConfig.contact.emailHref}
        className="hover:text-paper"
        onClick={() => trackContactClick({ method: "email" })}
      >
        {siteConfig.contact.email}
      </a>
      <a
        href={siteConfig.contact.phoneHref}
        className="hover:text-paper"
        onClick={() => trackContactClick({ method: "phone" })}
      >
        {siteConfig.contact.phone}
      </a>
      <a
        href={siteConfig.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-paper"
        onClick={() => trackContactClick({ method: "whatsapp" })}
      >
        WhatsApp {siteConfig.contact.whatsapp}
      </a>
    </div>
  );
}

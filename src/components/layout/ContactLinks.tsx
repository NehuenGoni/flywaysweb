import { siteConfig } from "@/data/site";
import { ContactChannelLink } from "@/components/ui/ContactChannelLink";

// Enlaces de contacto directo del footer. La instrumentación (click_email /
// click_phone / click_whatsapp) vive en ContactChannelLink, que también se
// reutiliza en /contact — ver src/components/ui/ContactChannelLink.tsx.
export function ContactLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <ContactChannelLink
        method="email"
        href={siteConfig.contact.emailHref}
        className="hover:text-paper"
      >
        {siteConfig.contact.email}
      </ContactChannelLink>
      <ContactChannelLink
        method="phone"
        href={siteConfig.contact.phoneHref}
        className="hover:text-paper"
      >
        {siteConfig.contact.phone}
      </ContactChannelLink>
      <ContactChannelLink
        method="whatsapp"
        href={siteConfig.contact.whatsappHref}
        external
        className="hover:text-paper"
      >
        WhatsApp {siteConfig.contact.whatsapp}
      </ContactChannelLink>
    </div>
  );
}

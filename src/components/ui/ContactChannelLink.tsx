"use client";

import { usePathname } from "next/navigation";
import {
  pageTypeFromPathname,
  trackContactClick,
  type BusinessUnit,
} from "@/lib/analytics";

/**
 * A direct-contact link (mailto: / tel: / WhatsApp) that emits the matching
 * click_email / click_phone / click_whatsapp event on click, with the right
 * page_type picked up from the current route. Shared by the footer and any
 * other place a contact channel is surfaced — see src/lib/analytics.ts.
 */
export function ContactChannelLink({
  method,
  href,
  external,
  businessUnit,
  experience,
  className,
  children,
}: {
  method: "email" | "phone" | "whatsapp";
  href: string;
  external?: boolean;
  businessUnit?: BusinessUnit;
  experience?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
      onClick={() =>
        trackContactClick({
          method,
          context: {
            pageType: pageTypeFromPathname(pathname),
            businessUnit,
            experience,
          },
        })
      }
    >
      {children}
    </a>
  );
}

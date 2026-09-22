"use client";

import { usePathname } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useScheduleCall } from "@/components/contact/ScheduleCallContext";
import {
  pageTypeFromPathname,
  trackCtaClick,
  type BusinessUnit,
} from "@/lib/analytics";

type ButtonLinkProps = React.ComponentProps<typeof ButtonLink>;

/**
 * The site's single conversion CTA, rendered consistently as
 * "Schedule a Call →" everywhere. Opens the site-wide Schedule a Call modal
 * (see ScheduleCallContext/ScheduleCallModal) rather than linking out —
 * centralizes both the copy and the click_cta tracking so every call site
 * emits the same cta_name and picks up the right page_type automatically.
 * See src/lib/analytics.ts.
 */
export function ScheduleCallButton({
  placement,
  businessUnit,
  experience,
  variant = "primary",
  size = "md",
  className,
}: {
  /** Where on the page this instance lives — becomes the `placement` param. */
  placement: "header" | "mobile-nav" | "page";
  businessUnit?: BusinessUnit;
  experience?: string;
  variant?: ButtonLinkProps["variant"];
  size?: ButtonLinkProps["size"];
  className?: string;
}) {
  const pathname = usePathname();
  const { openModal } = useScheduleCall();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        trackCtaClick({
          placement,
          context: {
            pageType: pageTypeFromPathname(pathname),
            businessUnit,
            experience,
          },
        });
        openModal({ businessUnit, experience });
      }}
    >
      Schedule a Call →
    </Button>
  );
}

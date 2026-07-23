import { sendGTMEvent } from "@next/third-parties/google";
import type { LodgeCategory } from "@/content/types";
import type { ExperienceIconName } from "@/components/brand/icons";

// Contrato de eventos que empujamos al dataLayer de GTM. Los nombres y
// parámetros siguen la guía de nomenclatura entregada por el equipo de
// marketing (verbo al inicio, snake_case, valores en inglés). La agencia
// arma los triggers/tags de GA4 (y Meta/Ads) en la UI de GTM a partir de
// estos nombres. Ver web/docs/analytics-events.md.
//
// Empujar al dataLayer es inofensivo aunque GTM no haya cargado (sin GTM_ID):
// sendGTMEvent inicializa window.dataLayer y acumula el push sin lanzar errores.

/** El sitio no tiene i18n (solo inglés); queda como constante hasta que exista ES. */
export type Language = "EN";

/** Unidad de negocio del catálogo de marketing. */
export type BusinessUnit = "Hunting" | "Fishing";

/** Tipo de página, según la guía de marketing. Deriva de la ruta actual. */
export type PageType =
  | "Home"
  | "Experience"
  | "Lodge"
  | "Contact"
  | "About"
  | "Plan Your Trip"
  /** Estado de éxito inline del lead form — no hay ruta /thank-you dedicada. */
  | "Thank You";

/** Contexto común que viaja en (casi) todos los eventos. */
export interface AnalyticsContext {
  pageType: PageType;
  businessUnit?: BusinessUnit;
  experience?: string;
}

/** Deriva `page_type` de la ruta actual. Cubre todas las rutas reales del sitio. */
export function pageTypeFromPathname(pathname: string): PageType {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/experiences")) return "Experience";
  if (pathname.startsWith("/lodges")) return "Lodge";
  if (pathname.startsWith("/why-flyways")) return "About";
  if (pathname.startsWith("/plan-your-trip")) return "Plan Your Trip";
  return "Contact";
}

/** Categoría de lodge (Hunting salvo Fly fishing) → business_unit de marketing. */
export function businessUnitForLodgeCategory(category: LodgeCategory): BusinessUnit {
  return category === "Fly fishing" ? "Fishing" : "Hunting";
}

/**
 * Las experiencias no tienen `category` propia (Big Game no tiene lodges
 * asociados para inferirla); se deriva del ícono, que ya distingue pesca del
 * resto.
 */
export function businessUnitForExperienceIcon(icon: ExperienceIconName): BusinessUnit {
  return icon === "fish" ? "Fishing" : "Hunting";
}

function contextParams(context: AnalyticsContext) {
  return {
    page_type: context.pageType,
    language: "EN" as const,
    ...(context.businessUnit && { business_unit: context.businessUnit }),
    ...(context.experience && { experience: context.experience }),
  };
}

/** Envío exitoso del formulario de lead. Conversión principal. */
export function trackLead({
  formName = "Main Contact Form",
  variant,
  source,
  newsletterOptIn,
  businessUnit,
  experience,
}: {
  formName?: string;
  variant: "compact" | "full";
  /** Ruta desde la que se envió el formulario (uso interno, no de la guía). */
  source: string;
  /** Si tildó el checkbox de newsletter al enviar. */
  newsletterOptIn?: boolean;
  businessUnit?: BusinessUnit;
  experience?: string;
}) {
  sendGTMEvent({
    event: "generate_lead",
    form_name: formName,
    variant,
    source,
    newsletter_opt_in: Boolean(newsletterOptIn),
    ...contextParams({ pageType: "Thank You", businessUnit, experience }),
  });
}

const ctaNameByMethod = {
  email: "Email Us",
  phone: "Call Us",
  whatsapp: "WhatsApp",
} as const;

/** Clic en un canal de contacto directo (mailto / tel / WhatsApp). */
export function trackContactClick({
  method,
  context,
}: {
  method: "email" | "phone" | "whatsapp";
  context: AnalyticsContext;
}) {
  sendGTMEvent({
    event: `click_${method}`,
    cta_name: ctaNameByMethod[method],
    ...contextParams(context),
  });
}

/** Clic en el CTA "Schedule a Call" (Calendly). */
export function trackCtaClick({
  placement,
  context,
}: {
  placement: "header" | "mobile-nav" | "page";
  context: AnalyticsContext;
}) {
  sendGTMEvent({
    event: "click_cta",
    cta_name: "Schedule a Call",
    placement,
    ...contextParams(context),
  });
}

/**
 * Clic en un ítem de submenú del navbar (Experiences / The Lodges).
 * Propuesta propia (no está en la guía de marketing) — pendiente de validar,
 * igual que `click_cta`. Ver web/docs/analytics-events.md.
 */
export function trackNavClick({
  item,
  group,
  placement,
  businessUnit,
  experience,
  context,
}: {
  /** navLabel de la experiencia o nombre del lodge clickeado. */
  item: string;
  group: "Experiences" | "The Lodges";
  placement: "header" | "mobile-nav";
  businessUnit?: BusinessUnit;
  experience?: string;
  context: AnalyticsContext;
}) {
  sendGTMEvent({
    event: "click_nav",
    nav_item: item,
    nav_group: group,
    placement,
    ...contextParams({ ...context, businessUnit, experience }),
  });
}

/** Visualización de una página de experiencia individual. */
export function trackViewExperience({
  experience,
  businessUnit,
}: {
  experience: string;
  businessUnit: BusinessUnit;
}) {
  sendGTMEvent({
    event: "view_experience",
    ...contextParams({ pageType: "Experience", businessUnit, experience }),
  });
}

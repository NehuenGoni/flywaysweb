import { sendGTMEvent } from "@next/third-parties/google";

// Contrato de eventos que empujamos al dataLayer de GTM. La agencia arma los
// triggers/tags de GA4 (y Meta/Ads) en la UI de GTM a partir de estos nombres.
// Ver web/docs/analytics-events.md.
//
// Empujar al dataLayer es inofensivo aunque GTM no haya cargado (sin GTM_ID):
// sendGTMEvent inicializa window.dataLayer y acumula el push sin lanzar errores.

/** Envío exitoso del formulario de lead. Conversión principal. */
export function trackLead({ source }: { source: string }) {
  sendGTMEvent({ event: "generate_lead", source });
}

/** Clic en el CTA "Book a call" (Calendly). */
export function trackBookCallClick({
  location,
}: {
  location: "header" | "mobile-nav";
}) {
  sendGTMEvent({ event: "book_call_click", location });
}

/** Clic en un canal de contacto directo del footer. */
export function trackContactClick({
  method,
}: {
  method: "email" | "phone" | "whatsapp";
}) {
  sendGTMEvent({ event: "contact_click", method });
}

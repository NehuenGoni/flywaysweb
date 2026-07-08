# Analítica — contrato de eventos del dataLayer

Este sitio (Next.js 16, App Router) carga un **contenedor de Google Tag Manager**
y empuja eventos de conversión al `window.dataLayer`. **GA4, Meta Pixel y Google
Ads se configuran dentro de GTM**, no en el código: la agencia crea el tag de GA4
y lo dispara con triggers basados en los eventos de abajo. Sumar Meta/Ads no
requiere ningún deploy.

## Puesta en marcha

1. Definir la variable de entorno `NEXT_PUBLIC_GTM_ID` con el ID del contenedor
   (formato `GTM-XXXXXXX`) en el entorno de hosting (y en `.env.local` para
   desarrollo). Mientras esté vacía, el sitio **no carga GTM**.
2. En GTM: crear el tag **GA4 Configuration** con el Measurement ID (`G-XXXXXXX`)
   y dispararlo en *All Pages*. Activar Enhanced Measurement en la propiedad GA4
   (cubre `page_view`, incluidas las navegaciones client-side de Next).
3. Crear un trigger **Custom Event** por cada evento de la tabla y un tag GA4
   Event que lo reenvíe con sus parámetros.

## Eventos empujados por el sitio

| Evento (`event`)  | Cuándo dispara                                             | Parámetros                                    |
| ----------------- | --------------------------------------------------------- | --------------------------------------------- |
| `generate_lead`   | Envío exitoso del formulario de lead (conversión principal)| `source`: ruta desde donde se envió (ej. `/contact`) |
| `book_call_click` | Clic en el CTA "Book a call" (Calendly)                   | `location`: `header` \| `mobile-nav`          |
| `contact_click`   | Clic en un canal de contacto directo del footer           | `method`: `email` \| `phone` \| `whatsapp`    |

`page_view` **no** se empuja manualmente: lo aporta el Enhanced Measurement de
GA4. No crear un tag de pageview manual para evitar duplicados.

### Dónde vive cada evento en el código
- Definiciones: `src/lib/analytics.ts`
- `generate_lead` → `src/components/contact/LeadForm.tsx`
- `book_call_click` → `src/components/layout/Header.tsx`
- `contact_click` → `src/components/layout/ContactLinks.tsx`

## Pendiente (próxima fase): consentimiento

Todavía **no hay banner de cookies ni Google Consent Mode**. Para tráfico EU/GDPR
la fase siguiente es agregar **Consent Mode v2**: un script `beforeInteractive`
que setee `consent 'default'` en `denied` antes de GTM, más un banner que lo
actualice a `granted` al aceptar. Coordinar con la implementación de GTM.

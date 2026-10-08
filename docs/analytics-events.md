# Analítica — contrato de eventos del dataLayer

Este sitio (Next.js 16, App Router) carga un **contenedor de Google Tag Manager**
y empuja eventos de conversión al `window.dataLayer`. **GA4, Meta Pixel y Google
Ads se configuran dentro de GTM**, no en el código: la agencia crea el tag de GA4
y lo dispara con triggers basados en los eventos de abajo. Sumar Meta/Ads no
requiere ningún deploy.

Los nombres de eventos, parámetros y valores siguen la **guía de nomenclatura
entregada por el equipo de marketing** (verbo al inicio, snake_case en inglés,
valores legibles capitalizados). El objetivo es que la agencia arme los
triggers de GA4 sin tener que traducir nada.

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

| Evento (`event`)  | Cuándo dispara                                              | Parámetros                                                              |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `generate_lead`    | Envío exitoso de cualquiera de los tres formularios (conversión principal) | `form_name`: `Main Contact Form` \| `Join the FlyWays Community` · `variant`: `compact` \| `full` \| `newsletter` · `newsletter_opt_in`: `true`/`false` · `page_type`: `Thank You` · `language`: `EN` · `business_unit`, `experience` (si aplica) |
| `click_email`      | Clic en un enlace `mailto:`                                  | `cta_name`: `Email Us` · `page_type` · `language` · `business_unit`, `experience` (si aplica) |
| `click_phone`      | Clic en un enlace `tel:`                                     | `cta_name`: `Call Us` · `page_type` · `language` · `business_unit`, `experience` (si aplica) |
| `click_whatsapp`   | Clic en el enlace de WhatsApp                                | `cta_name`: `WhatsApp` · `page_type` · `language` · `business_unit`, `experience` (si aplica) |
| `click_cta`        | Clic en el CTA "Schedule a Call" — **ahora abre el modal del formulario en vez de salir a Calendly** | `cta_name`: `Schedule a Call` · `placement`: `header` \| `mobile-nav` \| `page` · `page_type` · `language` · `business_unit`, `experience` (si aplica) |
| `view_experience`  | Carga de una página de experiencia individual                | `experience` · `business_unit` · `page_type`: `Experience` · `language`: `EN` |
| `click_nav`        | Clic en un ítem del submenú del navbar (ahora 3 niveles: Experiences → experiencia → lodges) | `nav_item` · `nav_group`: `Experiences` (clic en una experiencia) o el `navLabel` de la experiencia padre (ej. `Dove Hunting`, clic en uno de sus lodges) · `placement`: `header` \| `mobile-nav` · `page_type` · `language` · `business_unit`, `experience` (si aplica) |

`page_view` **no** se empuja manualmente: lo aporta el Enhanced Measurement de
GA4. No crear un tag de pageview manual para evitar duplicados.

### Valores permitidos por parámetro

| Parámetro       | Valores                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------ |
| `business_unit`  | `Hunting` (Dove Hunting, Mixed Bag, Big Game, **Beyond the Hunt** — ver nota abajo) · `Fishing` (Fly Fishing) |
| `experience`     | `Dove Hunting` · `Mixed Bag` · `Fly Fishing` · `Big Game` · `Beyond the Hunt` (= `navLabel` de cada experiencia) |
| `page_type`      | `Home` · `Experience` · `Lodge` · `Contact` · `About` (`/why-flyways`) · `Plan Your Trip` · `Thank You` |
| `language`       | `EN` (constante — el sitio no tiene i18n, ver "Pendiente" abajo)                            |
| `form_name`      | `Main Contact Form` (Schedule a Call, variantes compact/full) · `Join the FlyWays Community` (pop-up de newsletter) |
| `newsletter_opt_in` | `true` \| `false` — boolean, checkbox pre-tildado por defecto en compact/full; siempre `true` en el form de newsletter |
| `cta_name`       | `Schedule a Call` · `Email Us` · `Call Us` · `WhatsApp`                                    |
| `nav_group`      | `Experiences` (clic en experiencia) · `navLabel` de la experiencia padre (clic en uno de sus lodges anidados, ej. `Dove Hunting`) |
| `nav_item`       | `navLabel` de cada experiencia · nombre del lodge (ej. `Estancia Los Chañares`)                      |

**Nota sobre `Beyond the Hunt`**: no es caza ni pesca — se decidió tratarla
como `business_unit: "Hunting"` para no fragmentar los eventos de GA4 en una
tercera unidad de negocio no contemplada en la guía original de marketing.
**Confirmar con marketing** antes de que la agencia arme triggers sobre esto.

`page_type` se deriva automáticamente de la ruta actual
(`pageTypeFromPathname` en `src/lib/analytics.ts`); no hace falta pasarlo a
mano salvo en `generate_lead` y `view_experience`, que usan un valor fijo.

### Dónde vive cada evento en el código

- Definiciones y helpers de contexto: `src/lib/analytics.ts`
- `generate_lead` → `src/components/contact/LeadForm.tsx`
- `click_email` / `click_phone` / `click_whatsapp` → `src/components/ui/ContactChannelLink.tsx` (usado por el footer, `/contact` y `LeadSection`)
- `click_cta` → `src/components/ui/ScheduleCallButton.tsx` (usado por el header, hero, `CtaBand`, `LeadSection`, `RatesTable` y las páginas de experiencia/lodge/contact)
- `view_experience` → `src/components/experience/ViewExperienceTracker.tsx`, montado en `src/app/experiences/[slug]/page.tsx`
- `click_nav` → `src/components/layout/Header.tsx` (`NavMenuChild` en desktop, `MobileNavGroup` en mobile), helper en `src/lib/analytics.ts`

## Pendiente / a confirmar con marketing

- **`download_document`**: no implementado. El sitio no tiene ningún PDF hoy
  (las tarifas se muestran inline en `RatesTable`). Cuando exista un
  documento descargable (Rates, Plan Your Trip, etc.), agregar el evento con
  `file_name` como parámetro, más un `click_cta` con
  `cta_name: "Download Rates"` en el botón que dispara la descarga.
- **`language: ES`**: el sitio es solo en inglés (sin i18n). Si se agrega una
  versión en español, `pageTypeFromPathname`/`language` deben pasar a
  derivarse de la ruta/locale en lugar de la constante `"EN"`.
- **`rates_request_form`**: no existe un formulario de tarifas separado; hay
  un único formulario (`main_contact_form`, identificador interno: `Main
  Contact Form`).
- **`click_cta`**: la guía de marketing no definió explícitamente un evento
  para el clic en "Schedule a Call"; se implementó como propuesta propia
  (verbo + snake_case, consistente con el resto). Falta que marketing lo
  valide o indique un nombre distinto.
- **`click_nav`**: igual que `click_cta`, es una propuesta propia (no está en
  la guía de marketing) para trackear clics en los submenús del navbar
  (Experiences / The Lodges). Falta que marketing lo valide o indique un
  nombre distinto.

## Pendiente (próxima fase): consentimiento

Todavía **no hay banner de cookies ni Google Consent Mode**. Para tráfico EU/GDPR
la fase siguiente es agregar **Consent Mode v2**: un script `beforeInteractive`
que setee `consent 'default'` en `denied` antes de GTM, más un banner que lo
actualice a `granted` al aceptar. Coordinar con la implementación de GTM.

# Migración SEO: flyways.com → Next.js unificado

Contexto para quien revise `redirects-map.json` y `next.config.ts` antes del deploy.

## Punto de partida real

El sitio nuevo **ya está construido** con una IA por experiencias, no por lodges (ver
`src/content/experiences.ts` / `src/content/lodges.ts`). Rutas existentes:

- `/`, `/experiences`, `/experiences/[slug]` (`dove-hunting-cordoba`, `mixed-bag`, `fly-fishing-patagonia`, `big-game`)
- `/lodges`, `/lodges/[slug]` (`los-chanares`, `posta-del-norte`, `la-caridad`, `tecka`, `el-dorado`)
- `/why-flyways`, `/plan-your-trip`, `/contact`

No hay páginas standalone de rates, photos, videos, reviews, articles/blog, newsletter o calendar — ese
contenido vive embebido como secciones de otras páginas, o no fue migrado. Los mapeos para esas URLs
en `redirects-map.json` son la mejor aproximación temática disponible, no un 1:1 de contenido.

## Decisiones ya tomadas con el cliente

- **Lodges de big game sin página propia** (Los Araucanos): 301 temporal
  a `/experiences/big-game`. Revisar cuando exista esa página — hoy pierde especificidad de ranking.
  Mountain Lodge ya tiene página propia. Estancia Rincón de Luna se dio de baja (el cliente dejó de
  operar la propiedad) y su página se eliminó; su redirect ahora apunta también a `/experiences/big-game`.
- **Contenido sin destino directo** (photos/videos/reviews/articles/blog/newsletter/calendar): 301 a la
  página temática más cercana en vez de un fallback genérico a home, para conservar la mayor relevancia
  posible ante Google.

## 308 vs. 301

Next.js `redirects()` no emite 301/302 clásicos: `permanent: true` → 308, `permanent: false` → 307.
Google trata el 308 como equivalente a un 301 permanente (transfiere señales de indexación y link
equity). El campo `"status": 301` en el JSON es documental para el equipo de analytics, no literal.

## Prerrequisitos operativos antes del deploy

1. **`landings.flyways.com` debe apuntar al mismo deployment** que `www.flyways.com` (agregar el
   dominio en el hosting). Los redirects con `domain: "landings.flyways.com"` usan `has: [{type: "host"}]`
   y sólo disparan si el request llega con ese Host — si el subdominio no está enrutado a esta app, esas
   reglas nunca se ejecutan y esas URLs devolverían lo que sirva la infraestructura vieja (o 404).
2. **PDF de tarifas de Posta del Norte**: el redirect de `/wp-content/uploads/2022/12/Posta-del-Norte-Prices-2023.pdf`
   apunta a `/docs/posta-del-norte-prices-2023.pdf`. Ese archivo todavía no existe en `public/docs/` —
   subirlo antes del deploy o el redirect termina en un 404.
3. **GTM**: ya se maneja vía `NEXT_PUBLIC_GTM_ID` en `layout.tsx` — no hace falta hardcodear el ID viejo
   del sitio en WordPress. Confirmar que la agencia entregue el ID real (ver memoria de arquitectura de
   analítica del proyecto).
4. **Canonical / OG / Twitter tags**: ya se generan automáticamente vía `metadata` de Next
   (`metadataBase` en `layout.tsx` + `metadata` por página) — no requieren trabajo adicional para esta
   migración.

## Fuera de alcance de esta migración (ya trackeado como TODO en el código, no tocado acá)

- Hero de video: `Hero.tsx` tiene un gradiente de fallback a la espera del video real (no hay Vimeo ID
  `1194569530` implementado todavía).
- Links a TripAdvisor: no hay implementación actual en `Recognition.tsx` ni en las páginas de lodge.

Estos dos son trabajo de contenido/frontend independiente de los redirects, no bloquean el deploy de la
migración SEO.

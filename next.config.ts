import type { NextConfig } from "next";
import type { Redirect } from "next/dist/lib/load-custom-routes";
import redirectsMap from "./docs/seo-migration/redirects-map.json";

/**
 * Migración WordPress + landings.flyways.com -> Next.js unificado.
 * Fuente única de verdad: docs/seo-migration/redirects-map.json (revisado
 * por el equipo de analytics antes del deploy). No dupliques reglas acá:
 * agregá/editá entradas en el JSON y esta función las traduce.
 *
 * `permanent: true` emite 308 (no un 301 literal: Next.js no soporta 301/302
 * clásicos vía redirects()). Google trata 308 como equivalente a un 301
 * permanente para efectos de indexación y transferencia de link equity.
 */
function generateRedirects(): Redirect[] {
  // El orden del array se preserva: las reglas exactas del JSON van antes
  // que los wildcards (`pattern: true`), así que un catch-all nunca gana
  // sobre una regla específica más arriba en la lista.
  return redirectsMap.redirects.map(({ old_url, new_url, domain }) => {
    const redirect: Redirect = {
      source: old_url,
      destination: new_url,
      permanent: true,
    };

    // Las entradas del subdominio viejo sólo deben aplicar cuando el request
    // llega con ese Host — requiere que landings.flyways.com esté agregado
    // como dominio en el hosting apuntando a este mismo deployment.
    if (domain === "landings.flyways.com") {
      redirect.has = [{ type: "host", value: "landings.flyways.com" }];
    }

    return redirect;
  });
}

const nextConfig: NextConfig = {
  images: {
    // Fotos de experiencias/lodges y del equipo alojadas en Vercel Blob (store flyways-media).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pm7wtjb3rusbf6oi.public.blob.vercel-storage.com",
        pathname: "/experiences/**",
      },
      {
        protocol: "https",
        hostname: "pm7wtjb3rusbf6oi.public.blob.vercel-storage.com",
        pathname: "/team/**",
      },
    ],
  },
  async redirects() {
    return generateRedirects();
  },
};

export default nextConfig;

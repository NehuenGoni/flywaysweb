/**
 * Countries for the "full" lead form's Country select. `code` is the
 * ISO 3166-1 alpha-2 code, kept around for a future mapping to Odoo's
 * res.country ids (see the TODO in src/lib/odoo.ts).
 */
export type Country = { code: string; name: string };

export const countries: Country[] = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "GB", name: "United Kingdom" },
  { code: "IE", name: "Ireland" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "PT", name: "Portugal" },
  { code: "IT", name: "Italy" },
  { code: "DE", name: "Germany" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "BR", name: "Brazil" },
  { code: "CL", name: "Chile" },
  { code: "UY", name: "Uruguay" },
  { code: "OTHER", name: "Other" },
];

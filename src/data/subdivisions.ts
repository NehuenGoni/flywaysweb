/**
 * State/province options for the lead form's dependent Country → State
 * dropdown, for the markets where the data has commercial value (most
 * FlyWays traffic is US-based). A full ISO 3166-2 dataset is ~5,000 rows
 * for a form that's mostly used by four countries — everyone else (and
 * "Other") gets a free-text State/Province input instead.
 */
export type Subdivision = { code: string; name: string };

export const subdivisionsByCountry: Record<string, Subdivision[]> = {
  US: [
    { code: "AL", name: "Alabama" }, { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" }, { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" }, { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" }, { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" }, { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" }, { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" }, { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" }, { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" }, { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" }, { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" }, { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" }, { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" }, { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" }, { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" }, { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" }, { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" }, { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" }, { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" }, { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" }, { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" }, { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" }, { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" }, { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" }, { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" }, { code: "WY", name: "Wyoming" },
    { code: "DC", name: "District of Columbia" },
  ],
  CA: [
    { code: "AB", name: "Alberta" }, { code: "BC", name: "British Columbia" },
    { code: "MB", name: "Manitoba" }, { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" }, { code: "NS", name: "Nova Scotia" },
    { code: "ON", name: "Ontario" }, { code: "PE", name: "Prince Edward Island" },
    { code: "QC", name: "Quebec" }, { code: "SK", name: "Saskatchewan" },
    { code: "NT", name: "Northwest Territories" }, { code: "NU", name: "Nunavut" },
    { code: "YT", name: "Yukon" },
  ],
  MX: [
    { code: "AGU", name: "Aguascalientes" }, { code: "BCN", name: "Baja California" },
    { code: "BCS", name: "Baja California Sur" }, { code: "CAM", name: "Campeche" },
    { code: "CHP", name: "Chiapas" }, { code: "CHH", name: "Chihuahua" },
    { code: "CMX", name: "Ciudad de México" }, { code: "COA", name: "Coahuila" },
    { code: "COL", name: "Colima" }, { code: "DUR", name: "Durango" },
    { code: "GUA", name: "Guanajuato" }, { code: "GRO", name: "Guerrero" },
    { code: "HID", name: "Hidalgo" }, { code: "JAL", name: "Jalisco" },
    { code: "MEX", name: "México" }, { code: "MIC", name: "Michoacán" },
    { code: "MOR", name: "Morelos" }, { code: "NAY", name: "Nayarit" },
    { code: "NLE", name: "Nuevo León" }, { code: "OAX", name: "Oaxaca" },
    { code: "PUE", name: "Puebla" }, { code: "QUE", name: "Querétaro" },
    { code: "ROO", name: "Quintana Roo" }, { code: "SLP", name: "San Luis Potosí" },
    { code: "SIN", name: "Sinaloa" }, { code: "SON", name: "Sonora" },
    { code: "TAB", name: "Tabasco" }, { code: "TAM", name: "Tamaulipas" },
    { code: "TLA", name: "Tlaxcala" }, { code: "VER", name: "Veracruz" },
    { code: "YUC", name: "Yucatán" }, { code: "ZAC", name: "Zacatecas" },
  ],
  AR: [
    { code: "C", name: "Ciudad Autónoma de Buenos Aires" }, { code: "B", name: "Buenos Aires" },
    { code: "K", name: "Catamarca" }, { code: "H", name: "Chaco" },
    { code: "U", name: "Chubut" }, { code: "X", name: "Córdoba" },
    { code: "W", name: "Corrientes" }, { code: "E", name: "Entre Ríos" },
    { code: "P", name: "Formosa" }, { code: "Y", name: "Jujuy" },
    { code: "L", name: "La Pampa" }, { code: "F", name: "La Rioja" },
    { code: "M", name: "Mendoza" }, { code: "N", name: "Misiones" },
    { code: "Q", name: "Neuquén" }, { code: "R", name: "Río Negro" },
    { code: "A", name: "Salta" }, { code: "J", name: "San Juan" },
    { code: "D", name: "San Luis" }, { code: "Z", name: "Santa Cruz" },
    { code: "S", name: "Santa Fe" }, { code: "G", name: "Santiago del Estero" },
    { code: "V", name: "Tierra del Fuego" }, { code: "T", name: "Tucumán" },
  ],
};

/** Whether a given country code has a curated subdivision list. */
export function hasSubdivisions(countryCode: string): boolean {
  return countryCode in subdivisionsByCountry;
}

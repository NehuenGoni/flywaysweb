import type { Lodge } from "./types";

/**
 * Lodges are the destination once a client has chosen their experience.
 * Los Chañares and Posta del Norte use the client's final copy and rates.
 * Fly-fishing lodges carry placeholder copy pending final content.
 */
export const lodges: Lodge[] = [
  {
    slug: "los-chanares",
    status: "complete",
    name: "Los Chañares",
    category: "Dove hunting",
    experienceSlug: "dove-hunting-cordoba",
    location: "Northern Córdoba",
    capacity: "9 bedrooms · Up to 10 hunters",
    heroSubhead:
      "Where the world's best dove hunting meets the kind of hospitality you don't expect to find this far from home.",
    cardSummary:
      "The flagship. Nine rooms in the rolling hills of northern Córdoba — the reference point for premium dove hunting in Argentina for over twenty years.",
    intro: [
      "There are lodges that are nice, and there are lodges that change how you think about what a hunting trip should be. Los Chañares has been the second kind for over twenty years. Set among the rolling hills of northern Córdoba, it was built knowing that clients who travel this far for shooting expect the same standard on every other front.",
      "Nine bedrooms, each with its own private bathroom. A kitchen that takes the Argentine asado seriously — and does considerably more with it. A bar stocked with the country's best wines, a pool, a jacuzzi, and fire pits where the day's shooting gets properly reconstructed after dark. One hour and twenty minutes from Córdoba's international airport.",
      "For the hunter, it's the perfect base. For the person who came along, it's a destination on its own terms.",
    ],
    shooting: {
      eyebrow: "The field",
      heading: "The shooting",
      body: [
        "Los Chañares sits in the western corridor of northern Córdoba — rolling terrain that creates the kind of natural funnels where doves move in ways that make every session different. Sunflower fields in summer. Wheat fields and roost hunting through the regular season. Ponds and corn placements managed on the property to hold birds year-round, including an underground irrigation system installed in 2014 that guarantees food source continuity even in drought years.",
        "Morning and afternoon sessions. Varied shots — low and slow for those finding their range, high crossers for those who want to be tested. Both happen in the same day, sometimes in the same field.",
      ],
    },
    amenities: [
      "9 bedrooms",
      "Private bathrooms",
      "Double occupancy standard",
      "Pool & jacuzzi",
      "Bar & lounge",
      "Fire pits",
      "Laundry service",
      "Free WiFi",
      "Airport transfers included",
    ],
    amenitiesNote: [
      "Argentine asados at lunch. Dinners that match the occasion. Cuban cigars. The wines are local and they are not an afterthought.",
      "The staff here understands that the best service is the kind you don't have to ask for.",
    ],
    recognition: { orvis: true, beretta: true },
    rates: {
      seasonLabel: "Season 2026–27",
      rows: [
        { label: "Regular Season (Apr 1 – Oct 31)", value: "$760 per person / per day", emphasis: true },
        { label: "Summer Season (Jan 1 – Mar 31)", value: "$890 per person / per day", emphasis: true },
        { label: "Son or Daughter under 25", value: "$500 per day" },
        { label: "Non-Hunter", value: "$445 per day" },
        { label: "Private Room Supplement", value: "+$100 per night" },
        { label: "Full Lodge (up to 10 guests)", value: "Consult for group rates" },
      ],
      included: [
        "5-star accommodations",
        "All meals and beverages",
        "Argentine wines, beer and spirits",
        "Airport transfers",
        "Ground transportation to fields",
        "Professional guides and field assistants",
        "WiFi",
        "Laundry service",
      ],
      notIncluded: [
        "Shells (~$22.75 / box of 25)",
        "Hunting license (~$75 / day)",
        "Gun entry permit ($120 / gun) or rental ($85 / day)",
        "Gratuities",
      ],
      payment: [
        "50% deposit to confirm dates (non-refundable)",
        "Balance due 60 days prior",
        "Trip insurance available upon request",
        "Credit card surcharge: 3.95%",
      ],
    },
  },
  {
    slug: "posta-del-norte",
    status: "complete",
    name: "Posta del Norte",
    category: "Dove hunting",
    experienceSlug: "dove-hunting-cordoba",
    location: "Northern Córdoba · On Route 9",
    capacity: "7 bedrooms · Books privately for groups of 7+",
    heroSubhead:
      "The lodge for groups who want the best dove hunting in the world without sharing it with anyone else.",
    cardSummary:
      "Purpose-built for privacy in 1995. Reserve the entire property for groups of seven or more — between the two largest dove grounds in northern Córdoba.",
    intro: [
      "Some clients want a lodge. Others want the lodge — the whole property, reserved, with no one else's itinerary to work around. Posta del Norte was purpose-built in 1995 for exactly that, and for over a decade has been the answer for groups who want privacy as much as they want birds.",
      "Seven bedrooms, each with a fireplace and private bathroom — six along a shared hallway, plus a newer suite with two separate rooms and an ensuite bath. A Gaucho bar with a structure dating back to the late 1800s. A heated jacuzzi and a stone-fireplace pool house added in 2022. One hour and twenty minutes from Córdoba's international airport, set directly on Route 9 for fast, easy access to the fields.",
      "Reserve it as a group of seven or more and the entire lodge is yours. For the hunters, it's a private base in the heart of the best dove country in the world. For anyone who came along just to unwind, it's a place built for exactly that — fire, wine, and the kind of quiet that comes from having the whole place to yourselves.",
    ],
    shooting: {
      eyebrow: "The field",
      heading: "The shooting",
      body: [
        "Posta del Norte sits in a position no other Flyways lodge has: directly between the two largest dove hunting grounds in northern Córdoba, with access to 160,000 acres. From November through May, the western hills and surrounding farms hold the birds. From June through October, harvest season concentrates them on the large estancias nearby. Either way, Posta's scouts are choosing from the best fields in the province on any given day — low and slow for an easy rhythm, or high and demanding for those who want the harder shot.",
        "Year-round shooting, non-stop action, and a location that makes the drive to the field part of the convenience, not the compromise.",
      ],
    },
    amenities: [
      "7 bedrooms, fireplace & private bathroom in each",
      "Books privately for groups of 7+",
      "Heated jacuzzi & pool house",
      "Historic Gaucho bar",
      "Laundry service",
      "Free WiFi",
      "Airport transfers included",
    ],
    amenitiesNote: [
      "The kitchen, fully renovated in 2014, is run by a chef trained at Los Chañares — the same standard, in a more private setting. Fine Argentine wines, Cuban cigars, and a house staff whose attention scales with a smaller group: nothing here is rushed, and nothing is shared with strangers.",
    ],
    recognition: { orvis: true, beretta: true },
    rates: {
      seasonLabel: "Season 2026–27",
      occupancyNote: "8 double rooms · books privately for groups of 7 or more",
      rows: [
        { label: "Regular Season (Apr 1 – Dec 31)", value: "$760 per person / per day", emphasis: true },
        { label: "Summer Season (Jan 1 – Mar 31)", value: "$890 per person / per day", emphasis: true },
        { label: "Son or Daughter under 25", value: "$500 per day" },
        { label: "Non-Hunter", value: "$445 per day" },
        { label: "Private Room Surcharge", value: "+$100 per night" },
        { label: "Full Lodge (minimum 7 guests)", value: "Consult for group rates" },
      ],
      included: [
        "5-star accommodations, double occupancy",
        "All meals and beverages",
        "Argentine wines, beer and spirits",
        "Airport and field transportation",
        "Professional guides",
        "Dedicated host, 24/7 from the moment of booking",
        "WiFi",
        "Laundry service",
      ],
      notIncluded: [
        "Shells (~$22.75 / box of 25)",
        "Hunting license (~$75 / day)",
        "Gun entry permit ($120 / gun) or rental ($85 / day)",
        "Gratuities",
      ],
      payment: [
        "50% deposit to confirm dates (non-refundable)",
        "Balance due 60 days prior",
        "Trip insurance available upon request",
        "US check surcharge 3.5%",
        "Credit card surcharge 3.95%",
      ],
    },
  },
  ...flyFishingPlaceholder("la-caridad", "La Caridad Lodge"),
  ...flyFishingPlaceholder("tecka", "Tecka Lodge"),
  ...flyFishingPlaceholder("el-dorado", "El Dorado Lodge"),
];

function flyFishingPlaceholder(slug: string, name: string): [Lodge] {
  return [
    {
      slug,
      status: "placeholder",
      name,
      category: "Fly fishing",
      experienceSlug: "fly-fishing-patagonia",
      location: "Patagonia, Argentina",
      capacity: "Details coming soon",
      heroSubhead: "Wild trout water in the far south of Argentina.",
      cardSummary:
        "A Patagonia fly-fishing lodge. Final details and photography coming soon — book a call to plan your trip.",
      intro: [
        `${name} is part of the FlyWays fly-fishing program in Argentine Patagonia. This page is being finalized with the team; detailed copy and photography are on the way.`,
        "To plan a trip here now, book a call and we'll match you to the right water and dates.",
      ],
      shooting: {
        eyebrow: "On the water",
        heading: "The fishing",
        body: [
          "Full detail for this lodge — waters, season and accommodations — is in development. Reach out and we'll walk you through it.",
        ],
      },
      amenities: ["Details coming soon"],
      recognition: { orvis: false, beretta: false },
    },
  ];
}

export const lodgeSlugs = lodges.map((l) => l.slug);

export function getLodge(slug: string): Lodge | undefined {
  return lodges.find((l) => l.slug === slug);
}

export function getLodges(slugs: string[]): Lodge[] {
  return slugs
    .map((s) => lodges.find((l) => l.slug === s))
    .filter((l): l is Lodge => Boolean(l));
}

export function lodgesByCategory() {
  const order: Lodge["category"][] = ["Dove hunting", "Fly fishing", "Big game"];
  return order
    .map((category) => ({
      category,
      items: lodges.filter((l) => l.category === category),
    }))
    .filter((g) => g.items.length > 0);
}

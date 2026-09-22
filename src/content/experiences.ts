import type { Experience } from "./types";
import { programs } from "./programs";
import { discoverCordoba, patagoniaActivities, tulipExperience, sideTrips } from "./activities";

/**
 * Experiences are the entry point of the site and the core of SEO. Each
 * experience owns its `offering` — which lodges, programs or activities it
 * surfaces, and in what order (see ExperienceOffering in ./types).
 */
export const experiences: Experience[] = [
  {
    slug: "dove-hunting-cordoba",
    status: "complete",
    navLabel: "Dove Hunting",
    title: "Córdoba Dove Hunting",
    metaTitle: "Córdoba Dove Hunting in Argentina | FlyWays",
    metaDescription:
      "Non-stop eared dove hunting in Córdoba, Argentina. Twenty years of owner-run operation, Orvis Endorsed and Beretta certified, year-round shooting across two premium lodges.",
    icon: "dove",
    heroHeadline: "Córdoba Dove Hunting",
    heroSubhead: "The shot that started it all. Still the best place on earth to take it.",
    cardSummary:
      "Endless eared doves over the hills of north-central Córdoba — the high-volume shooting that defines Argentina.",
    priceFrom: "From $760 / day",
    intro: [
      "The eared dove of Argentina is a different animal than anything you've shot at home. Faster, more unpredictable, arriving in waves that don't stop — it's the kind of shooting that resets your expectations of what a hunting day can be. And Córdoba, in the rolling hills of north-central Argentina, is where the world comes to experience it.",
      "Flyways has been operating in these fields for over two decades. Not managing from a distance — running it. Every season, every field rotation, every detail of how a day unfolds. That's the difference between a company that sells a hunt and one that has spent twenty years perfecting it.",
      "This is also, it turns out, a remarkable place to simply be. The landscape, the food, the unhurried pace of an Argentine afternoon by the pool — it works on hunters and non-hunters alike. Bring your partner. The lodge takes care of everything.",
    ],
    offering: {
      kind: "lodges",
      lodgeSlugs: ["los-chanares", "posta-del-norte"],
    },
  },
  {
    slug: "mixed-bag",
    status: "complete",
    navLabel: "Mixed Bag",
    title: "Argentina Mixed Bag",
    metaTitle: "Argentina Mixed Bag Hunting | FlyWays",
    metaDescription:
      "Combine duck, pigeon, perdiz and dove on a single Argentina wingshooting trip with FlyWays — twenty years of owner-run operation, Orvis Endorsed and Beretta certified.",
    icon: "feather",
    heroHeadline: "Argentina Mixed Bag",
    heroSubhead: "More than one quarry. One unforgettable week in the field.",
    cardSummary:
      "Duck, pigeon, perdiz and dove across two Buenos Aires estancias — the most varied wingshooting Argentina has to offer.",
    intro: [
      "A mixed bag trip is for the hunter who wants range — different birds, different fields, different ways of shooting, all inside one Argentine week. Doves and pigeon over decoys, decoying ducks at dawn, perdiz behind pointing dogs.",
    ],
    offering: {
      kind: "lodges",
      lodgeSlugs: ["estancia-del-monte", "estancia-santa-rita"],
    },
  },
  {
    slug: "big-game",
    status: "complete",
    navLabel: "Big Game",
    title: "Argentina Big Game",
    metaTitle: "Argentina Big Game Hunting | FlyWays",
    metaDescription:
      "Free-range and estate big game hunting in Argentina with FlyWays — red stag, water buffalo and more, organized to the same standard as our renowned wingshooting.",
    icon: "deer",
    heroHeadline: "Argentina Big Game",
    heroSubhead: "Red stag, buffalo, and the wild country of Argentina.",
    cardSummary:
      "Red stag, water buffalo and more across Córdoba's mountains and valleys — organized to the FlyWays standard.",
    intro: [
      "Argentina offers some of the most accessible world-class big game in the Southern Hemisphere — red stag during the roar, water buffalo, blackbuck and boar — across free-range and estate settings in the Córdoba hills.",
    ],
    // TODO(client): the document also lists "La Pampa, Patagonia" under Big
    // Game with a note about needing photos, but no property name or copy.
    // Not modeled as a Lodge yet — confirm whether this is a third lodge or
    // a region to fold into the copy above before adding it.
    offering: {
      kind: "lodges",
      lodgeSlugs: ["mountain-lodge"],
    },
  },
  {
    slug: "fly-fishing-patagonia",
    status: "complete",
    navLabel: "Fly Fishing",
    title: "Patagonia Fly Fishing",
    metaTitle: "Patagonia Fly Fishing in Argentina | FlyWays",
    metaDescription:
      "Fly fishing for wild trout in Argentine Patagonia with FlyWays — two guided programs across rivers, lakes and spring creeks, and the same standard of service that defines our hunting operation.",
    icon: "fish",
    heroHeadline: "Patagonia Fly Fishing",
    heroSubhead: "Wild trout, clear water, and the far south of Argentina.",
    cardSummary:
      "Two guided programs across Argentine Patagonia's rivers, lakes and spring creeks — wild trout and unspoiled water.",
    intro: [
      "Argentine Patagonia is one of the great trout destinations on earth: freestone rivers, glacial lakes and spring creeks set against the Andes, with wild fish and very few anglers. It's the aspirational counterpart to our wingshooting — a different landscape, the same standard of service.",
    ],
    offering: {
      kind: "programs",
      intro:
        "Two ways to fish Patagonia with FlyWays: a lodge-based program moving between Los Alerces National Park and Trevelín, or a mobile, glamping-style journey following the water.",
      programs,
      zones: {
        heading: "Where We Fish",
        zones: [
          {
            name: "Northern Area — Cholila and Los Alerces National Park",
            waters: [
              { name: "Río Carrileufú", methods: ["Float"], note: "2 sections" },
              { name: "Río Rivadavia", methods: ["Float"] },
              { name: "Lago Verde", methods: ["Float"] },
              { name: "Río Arrayanes", methods: ["Float"] },
              { name: "Lago Futalaufquen", methods: ["Motorboat"] },
              { name: "Lago Krugger", methods: ["Motorboat"] },
              { name: "Río Frey", methods: ["Float"] },
            ],
          },
          {
            name: "Central Area — Trevelín-Corcovado",
            waters: [
              { name: "Amutuy Quimei Lake", methods: ["Motorboat"] },
              { name: "Frey River", methods: ["Motorboat"] },
              { name: "Río Grande", methods: ["Float"], note: "3 sections" },
              { name: "Nant y Fall Stream", methods: ["Wade"] },
              { name: "Laguna Larga", methods: ["Float"] },
              { name: "Río Corcovado", methods: ["Float", "Wade"], note: "2 sections" },
              { name: "Lago Engaño", methods: ["Float"] },
            ],
          },
          {
            name: "Río Pico - Río Senguer Area",
            waters: [
              { name: "Río Pico", methods: ["Float", "Wade"], note: "2 sections" },
              { name: "Río Pampas", methods: ["Wade"] },
              { name: "Río Nilson", methods: ["Wade"] },
              { name: "Spring Creeks", methods: ["Wade"] },
              { name: "Lagos 1, 2, 3", methods: ["Float"] },
              { name: "Río Senguer", methods: ["Wade", "Float"], note: "2 sections" },
              { name: "Lago Fontana", methods: ["Float"] },
            ],
          },
        ],
      },
      highlights: {
        heading: "Truck and Camp Highlights",
        groups: [
          {
            name: "Adventure & Fishing",
            items: [
              "Water-side camping locations",
              "Different waters fished daily",
              "Floating and wading fishing options",
              "Fishing and camping on private property",
              "Daily access to remote waters and diverse fishing styles in pristine settings",
            ],
          },
          {
            name: "Comfortable Camp Life",
            items: [
              "Double and single-roomed tents",
              "Raised cot beds with mattress and blankets",
              "Private outdoor bathroom",
              "Hot water outdoor shower",
              "Restful nights and fresh mornings, with all the essentials of comfort",
            ],
          },
          {
            name: "Mobility & Autonomy",
            items: [
              "4x4 Mercedes Benz expedition camper",
              "Back-up 4x4 truck transportation",
              "Rooftop solar panels for clean energy",
              "Battery inverter with 220V AC power supply",
              "Full independence, off-road capability, and sustainable energy anywhere",
            ],
          },
          {
            name: "Gastronomy & Hospitality",
            items: [
              "Fully equipped kitchen and bathroom trailer",
              "Patagonian-style asados",
              "Draft beer, spirits, and wine",
              "Highly professional team",
              "Attention to detail",
            ],
          },
        ],
      },
    },
  },
  {
    slug: "beyond-the-hunt",
    status: "complete",
    navLabel: "Beyond the Hunt",
    title: "Beyond the Hunt",
    metaTitle: "Beyond the Hunt in Argentina | FlyWays",
    metaDescription:
      "Golf, polo, wine, horseback riding and side trips beyond the field — how FlyWays rounds out a hunting or fishing trip to Argentina.",
    icon: "feather",
    heroHeadline: "Beyond the Hunt",
    heroSubhead: "Argentina has as much to offer off the field as on it.",
    cardSummary:
      "Golf, polo, wine, horseback riding and side trips — everything FlyWays can build around your hunting or fishing trip.",
    intro: [
      "Discover the wonderful diversity of northern Córdoba and the charming city of Córdoba in Argentina, where nature and culture come together to offer you unforgettable experiences! In the north of Córdoba, immerse yourself in a natural paradise full of contrasts. The cultural wealth of northern Córdoba is reflected in its picturesque towns and its historical heritage. The city of Córdoba will surprise you with its unique combination of history, art and vibrant urban life, known for its colonial architecture and buildings such as the Jesuit Block, declared a World Heritage Site by UNESCO.",
    ],
    offering: {
      kind: "activities",
      groups: [discoverCordoba, patagoniaActivities],
      features: [tulipExperience],
      sideTrips,
    },
  },
];

export const experienceSlugs = experiences.map((e) => e.slug);

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

import type { Experience } from "./types";

/**
 * Experiences are the entry point of the site and the core of SEO.
 * `dove-hunting-cordoba` uses the client's final copy. The other three
 * carry structurally complete, honest placeholder copy (status: "placeholder")
 * pending the client's final text and assets.
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
    field: {
      eyebrow: "The experience in the field",
      heading: "What a day looks like",
      body: [
        "You'll hunt twice a day — morning and afternoon sessions, each in a different field. Your guide positions you, the birds come, and the rest is up to you. Beginners find their rhythm fast. Experienced shooters find shots here that they won't find anywhere else: high crossers at 45 to 50 yards that demand real skill and reward it.",
        "The fields around our lodges are managed year-round — food plots, pond placement, habitat work that keeps birds in the area season after season. When conditions anywhere else in the province slow down, Flyways fields don't.",
      ],
    },
    seasons: {
      heading: "When to come",
      intro:
        "Córdoba dove hunting runs all year. The two seasons hunt differently, and both are exceptional.",
      rows: [
        {
          name: "Summer Season",
          window: "January – March",
          description:
            "Sunflower fields in full bloom, high bird activity, warmer afternoons. The visual is extraordinary.",
        },
        {
          name: "Regular Season",
          window: "April – December",
          description:
            "Roost hunting across the vast eastern farmlands. Cooler, consistent, and what most of our returning clients call their favorite.",
        },
      ],
      note: "Weather note: rain almost never affects shooting. On average, fewer than 10 days per year see any field impact — and most rain falls at night.",
    },
    whyFlyways: {
      eyebrow: "Credentials",
      heading: "Why Flyways",
      body: [
        "Orvis Endorsed. Beretta Lodge certified. Two recognitions that aren't given — they're earned through consistent standards in the field, at the table, and in every interaction with guests. Very few operators in Argentina hold both.",
        "When you book with Flyways, you're not filling out a form into a system. You're starting a conversation with people who will be there when you arrive — and who'll remember you when you come back.",
      ],
    },
    lodgeSlugs: ["los-chanares", "posta-del-norte"],
  },
  {
    slug: "mixed-bag",
    status: "placeholder",
    navLabel: "Mixed Bag",
    title: "Argentina Mixed Bag",
    metaTitle: "Argentina Mixed Bag Hunting | FlyWays",
    metaDescription:
      "Combine doves, ducks, pigeon and perdiz on a single Argentina wingshooting trip with FlyWays — twenty years of owner-run operation, Orvis Endorsed and Beretta certified.",
    icon: "feather",
    heroHeadline: "Argentina Mixed Bag",
    heroSubhead: "More than one quarry. One unforgettable week in the field.",
    cardSummary:
      "Doves, ducks, pigeon and perdiz in a single trip — the most varied wingshooting Argentina has to offer.",
    intro: [
      "A mixed bag trip is for the hunter who wants range — different birds, different fields, different ways of shooting, all inside one Argentine week. Doves in the morning, decoying ducks at dawn, pigeon over decoys, perdiz behind pointing dogs.",
      "This page is being finalized with the FlyWays team. The structure and offering are in place; the detailed copy and photography are on the way. In the meantime, the fastest way to plan a mixed bag week is to book a call with us.",
    ],
    field: {
      eyebrow: "The experience in the field",
      heading: "What a mixed bag week looks like",
      body: [
        "Each day is built around the birds that are flying best, scouted in advance and matched to the season. Your itinerary is shaped with you before you arrive, balancing volume dove shooting with the slower, more deliberate pursuit of ducks and perdiz.",
        "Full day-by-day detail is in development. Reach out and we'll walk you through a sample itinerary for your dates.",
      ],
    },
    lodgeSlugs: ["los-chanares", "posta-del-norte"],
  },
  {
    slug: "fly-fishing-patagonia",
    status: "placeholder",
    navLabel: "Fly Fishing",
    title: "Patagonia Fly Fishing",
    metaTitle: "Patagonia Fly Fishing in Argentina | FlyWays",
    metaDescription:
      "Fly fishing for wild trout in Argentine Patagonia with FlyWays — rivers, lakes and spring creeks, guided by the same standard of service that defines our hunting operation.",
    icon: "fish",
    heroHeadline: "Patagonia Fly Fishing",
    heroSubhead: "Wild trout, clear water, and the far south of Argentina.",
    cardSummary:
      "Rivers, lakes and spring creeks across Argentine Patagonia — wild trout and unspoiled water.",
    intro: [
      "Argentine Patagonia is one of the great trout destinations on earth: freestone rivers, glacial lakes and spring creeks set against the Andes, with wild fish and very few anglers. It's the aspirational counterpart to our wingshooting — a different landscape, the same standard of service.",
      "This page is being developed with the FlyWays team. The lodges and waters are being finalized; detailed copy and photography are on the way. To plan a Patagonia trip now, book a call with us.",
    ],
    field: {
      eyebrow: "On the water",
      heading: "What the fishing looks like",
      body: [
        "Days are built around the water that's fishing best for your dates and ability — wade or float, dries or streamers, with experienced local guides who know each beat.",
        "Full detail by lodge and river is in development. Reach out and we'll match you to the right water and week.",
      ],
    },
    lodgeSlugs: ["la-caridad", "tecka", "el-dorado"],
  },
  {
    slug: "big-game",
    status: "placeholder",
    navLabel: "Big Game",
    title: "Argentina Big Game",
    metaTitle: "Argentina Big Game Hunting | FlyWays",
    metaDescription:
      "Free-range and estate big game hunting in Argentina with FlyWays — red stag, water buffalo and more, organized to the same standard as our renowned wingshooting.",
    icon: "deer",
    heroHeadline: "Argentina Big Game",
    heroSubhead: "Red stag, buffalo, and the wild country of Argentina.",
    cardSummary:
      "Red stag, water buffalo and more across Argentina's wild country — organized to the FlyWays standard.",
    intro: [
      "Argentina offers some of the most accessible world-class big game in the Southern Hemisphere — red stag during the roar, water buffalo, blackbuck and boar — across free-range and estate settings.",
      "This page is being developed with the FlyWays team. Species, areas and seasons are being finalized; detailed copy and photography are on the way. To plan a big game hunt now, book a call with us.",
    ],
    field: {
      eyebrow: "In the field",
      heading: "What a big game hunt looks like",
      body: [
        "Hunts are organized around the species and season you're after, with experienced guides and accommodations chosen to match the area.",
        "Full detail by species and area is in development. Reach out and we'll build the right hunt for your dates.",
      ],
    },
    lodgeSlugs: [],
  },
];

export const experienceSlugs = experiences.map((e) => e.slug);

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

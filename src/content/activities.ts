import type { Activity, ActivityGroup, DestinationList, ProseSection } from "./types";

/** "Discover Córdoba" — 7 activities, fused from the old site's "Other Activities". */
export const discoverCordoba: ActivityGroup = {
  heading: "Discover Córdoba",
  intro:
    "Beyond the field, northern Córdoba and its capital city round out the trip with golf, polo, horseback riding and centuries of history — from colonial estancias to the Jesuit Block, a UNESCO World Heritage Site.",
  items: [
    {
      slug: "golf",
      status: "complete",
      name: "Golf",
      region: "Córdoba",
      body: [
        "Just minutes away from our lodges near the suburban city of Jesús María and the rolling hills of Ascochinga, we have 2 of the finest golf courses in the Argentinean countryside. Estancia La Paz and Ascochinga Golf Club; both courses feature 18 holes, Par 72. As you navigate these golf courses, you'll enjoy a journey through centennial parks surrounded by old trees and rivers flowing through.",
      ],
    },
    {
      slug: "polo",
      status: "complete",
      name: "Polo",
      region: "Córdoba",
      body: [
        "Equestrian pursuits have deep roots in the vibrant history of Córdoba's polo scene, carrying on the rich traditions for generations. Whether you're a seasoned enthusiast or a casual observer, immersing yourself in an afternoon of polo in Córdoba promises a distinctive and engaging experience.",
      ],
    },
    {
      slug: "horseback-riding-cordoba",
      status: "complete",
      name: "Horseback Riding",
      region: "Córdoba",
      body: [
        "On horseback, explore a sprawling urban development, Estancia la Paz, once a summer estate of Argentina's two-time President, Julio A. Roca. The ride unveils history and beauty, with a park designed by Charles Thays in 1900. Or ride in the wonderful hills of wild Córdoba scenery.",
      ],
    },
    {
      slug: "jesuit-estancias",
      status: "complete",
      name: "Jesuit Estancias",
      region: "Córdoba",
      body: [
        "1618, the Jesús María Estate, now the National Jesuit Museum, is one of the must-visit sites in this northern Córdoba enclave. In addition witness the extensive history of the Jesuit settlements in this part of Argentina in several sites with churches and other monuments.",
      ],
    },
    {
      slug: "bodega-terra-camiare",
      status: "complete",
      name: "Bodega Terra Camiare",
      region: "Córdoba",
      body: [
        "At Bodega Terra Camiare, revel in the freedom to unwind, surrounded by the enchanting landscapes of Córdoba, Argentina. Indulge in leisure, accompanied by the exquisite flavors of local wines harmoniously paired with artisanal cheeses and freshly baked bread.",
      ],
    },
    {
      slug: "banos-de-azur",
      status: "complete",
      name: "Baños de Azur",
      region: "Córdoba",
      body: [
        "A journey of different sensations in the basement of a historical building. Rooms of water at different temperatures and states, such as the Caldarium to clean and detoxify the body, the rain room that invites introspection, and the fountain with ice flakes to exfoliate the skin.",
      ],
    },
    {
      slug: "city-tours",
      status: "complete",
      name: "City Tours",
      region: "Córdoba",
      body: [
        "Explore the enchanting city of Córdoba on a captivating city tour that seamlessly blends history, modernity, and natural beauty. Begin at the UNESCO-listed Córdoba Cathedral and the Jesuit Block. Wander through Güemes, a bohemian neighborhood adorned with vibrant street art and boutique shops.",
      ],
    },
  ],
};

/** Standalone long-form feature: the Tulip Experience (from the Patagonia site). */
export const tulipExperience: ProseSection = {
  eyebrow: "October only",
  heading: "FlyWays Tulip Experience in Patagonia",
  body: [
    "Every October, for only one month, Patagonia puts on a show like no other: the tulip fields burst into color, the air feels alive, and the landscapes are nothing short of breathtaking. We've designed the ultimate way to live this magical season: a once-in-a-lifetime journey that blends adventure, indulgence, and FlyWays hospitality at its best.",
    "From the moment you arrive in Esquel, everything is taken care of. You'll settle into our lodge with a welcome dinner and drinks, and let the games begin: trekking and fishing in pristine waters, a full day of horseback riding across endless landscapes, and a sunset picnic overlooking the blooming tulip fields. Add to that a private winery tour to taste Patagonia's finest wines, and you have a magical experience that simply can't be missed. This isn't just a trip, it's Patagonia at its finest. A journey designed for explorers who want to see life in full bloom.",
  ],
};

/**
 * Horseback Riding (Patagonia) — the client's document explicitly notes this
 * section has no descriptive copy or image today. Kept as a placeholder
 * activity so ActivityGrid can filter it out until content arrives.
 */
export const horsebackRidingPatagonia: Activity = {
  slug: "horseback-riding-patagonia",
  status: "placeholder",
  name: "Horseback Riding",
  region: "Patagonia",
  body: [],
};

export const patagoniaActivities: ActivityGroup = {
  heading: "Patagonia",
  items: [horsebackRidingPatagonia],
};

export const sideTrips: DestinationList = {
  heading: "Side trips",
  intro:
    "We can also organize side trips surrounding your hunting or fishing trip, within Argentina and beyond.",
  destinations: [
    "Buenos Aires City",
    "Mendoza Wine Country",
    "Bariloche",
    "San Martín de los Andes",
    "Ushuaia",
    "Iguazú Falls",
  ],
};

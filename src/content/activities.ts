import type { Activity, ActivityGroup, DestinationList, ProseSection } from "./types";

/** "Experiences" — the Córdoba activities FlyWays can arrange (client copy, section 8). */
export const cordobaExperiences: ActivityGroup = {
  heading: "Experiences",
  items: [
    {
      slug: "horseback-riding",
      status: "complete",
      name: "Horseback Riding",
      region: "Córdoba",
      body: [
        "Ride through Córdoba’s rolling hills and scenic countryside on horseback, just as the gauchos have done for centuries. It’s the perfect way to connect with Argentina’s rural traditions while enjoying breathtaking landscapes.",
      ],
    },
    {
      slug: "polo-lessons",
      status: "complete",
      name: "Polo Lessons",
      region: "Córdoba",
      body: [
        "Argentina is the world capital of polo, and here you can try the sport for yourself. With guidance from skilled horsemen, you’ll learn the basics of this thrilling game and experience the elegance and energy of polo first-hand.",
      ],
    },
    {
      slug: "golf-day",
      status: "complete",
      name: "Golf Day",
      region: "Córdoba",
      body: [
        "Enjoy a relaxing day on the greens, playing a round of golf surrounded by beautiful landscapes and fresh air. It’s a great way to unwind, enjoy a slower pace, and take in the scenery while spending time outdoors.",
      ],
    },
    {
      slug: "tango-folklore-show",
      status: "complete",
      name: "Tango & Folklore Show at the Lodge",
      region: "Córdoba",
      body: [
        "Spend an unforgettable evening at the lodge immersed in Argentina’s cultural heartbeat. Watch the passion of tango, enjoy the rhythm of folklore music, and let the spirit of Argentina surround you with music, dance, and tradition.",
      ],
    },
    {
      slug: "spa-day",
      status: "complete",
      name: "Spa Day",
      region: "Córdoba",
      body: [
        "After a day of adventure, treat yourself to complete relaxation. In Córdoba, you’ll even have the chance to enjoy the caldariums at Azur Real Hotel Boutique, a hidden gem in the city. These Roman-inspired thermal baths combine steam, aromas, and soothing waters for a deeply restorative experience. From massages to wellness treatments, a spa day here is the perfect escape to recharge and indulge in pure comfort.",
      ],
    },
    {
      slug: "cooking-class",
      status: "complete",
      name: "Cooking Class",
      region: "Córdoba",
      body: [
        "Step into the kitchen and discover the secrets of Argentine cuisine. Learn how to prepare traditional dishes like empanadas and asado with the guidance of local chefs, then enjoy the flavors you’ve created.",
      ],
    },
    {
      slug: "atv-adventure",
      status: "complete",
      name: "ATV Adventure",
      region: "Córdoba",
      body: [
        "For those seeking more adrenaline, head out on an ATV ride through rugged trails and open countryside. It’s an exhilarating way to explore the landscape and adds a dose of adventure to your stay.",
      ],
    },
    {
      slug: "wine-tour-tasting",
      status: "complete",
      name: "Wine Tour & Tasting at the Lodge",
      region: "Córdoba",
      body: [
        "Argentina is famous for its wines, and Córdoba is no exception. Sample a curated selection of local varietals, paired with regional flavors, and learn about the rich winemaking traditions that define Argentina.",
      ],
    },
    {
      slug: "city-tour",
      status: "complete",
      name: "City Tour in Córdoba or Jesús María",
      region: "Córdoba",
      body: [
        "Explore the cultural treasures of the region with a guided city tour. In Córdoba, stroll through its lively plazas, admire colonial architecture, and visit the UNESCO World Heritage Jesuit Block. Or head to Jesús María, a charming town known for its historic Jesuit Estancia and winemaking traditions. Both options offer an authentic glimpse into Argentine history and everyday life.",
      ],
    },
    {
      slug: "festival-de-doma",
      status: "complete",
      name: "Festival de Doma & Folklore Experience",
      region: "Córdoba",
      availability: "January",
      body: [
        "Every January, Jesús María hosts one of Argentina’s most iconic cultural events — the Festival Nacional de Doma y Folklore. Watch skilled gauchos in traditional rodeo competitions, enjoy live folklore music and dance, and savor authentic Argentine food. It’s an unforgettable immersion into Córdoba’s traditions and the proud spirit of the pampas.",
      ],
    },
  ],
};

/** "Discover Córdoba" — 7 activities (client copy, section 8.1). */
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

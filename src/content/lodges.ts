import { RATE_EXTRAS, PAYMENT_TERMS, type Lodge } from "./types";
import { withLodgeMedia } from "./media";

/**
 * Lodges are the destination once a client has chosen their experience.
 * Which experience each lodge belongs to is decided in experiences.ts
 * (Experience.offering.lodgeSlugs), not here — see src/content/index.ts.
 */
const lodgeData: Lodge[] = [
  // ── Dove Hunting ────────────────────────────────────────────────────
  {
    slug: "los-chanares",
    status: "complete",
    name: "Estancia Los Chañares",
    location: "Northern Córdoba",
    species: ["Dove"],
    capacity: "9 bedrooms · Up to 10 hunters",
    heroSubhead: "5 Star accommodations with unbeatable dove hunting",
    cardSummary:
      "The flagship. Nine rooms in the rolling hills of northern Córdoba — the reference point for premium dove hunting in Argentina for over twenty years.",
    intro: [
      "Since its founding in 2000, Estancia Los Chañares has stood as the place to shoot doves in the world. It was the first international venue to affiliate with Beretta — a distinction earned, not given. In 2015, Orvis endorsed the lodge, a name that opens doors across the world of wingshooting. And on Trip Advisor, where reputations are made by hunters themselves, Estancia Los Chañares has stayed among the very best, year after year.",
    ],
    sections: [
      {
        heading: "The Lodging",
        body: [
          "For twenty years, Estancia Los Chañares has been the place to hunt doves in Córdoba, Argentina. Set among rolling hills in the province's northwest, just sixty miles from the Córdoba airport, the nine-bedroom lodge was built for hunters who expect world-class shooting to come with world-class comfort. Spacious rooms open onto a thousand-acre property of sweeping Argentine landscape, framed by an outdoor pool and Jacuzzi built for unwinding after the hunt. Arrival and departure days bring a proper field lunch at the lodge itself, and after dark, the fire pits by the pool and behind the lodge become the place where the day's stories get told. Since taking over in 2005, FlyWays has never stopped refining every detail, so every trip meets the same standard as the last.",
        ],
        bullets: [
          "Prime position in northern Córdoba with best access to hunting grounds",
          "Nine spacious rooms",
          "Asado and Argentina's finest wines",
          "Pool and Jacuzzi area",
          "Field lunches and delicious Argentinean style asados",
          "Fire pits to relax at dusk",
        ],
      },
      {
        heading: "The Shooting",
        body: [
          "Estancia Los Chañares is located west of northern Córdoba, among rolling hills. Around the lodge, sunflower fields bloom in summer and wheat in winter — with ponds and corn placed carefully in the surrounding fields to keep the birds close. Throughout the seasons, we also hunt the vast eastern farmlands, where millions of doves feed and roost year-round. Our hunts offer real range: low and slow birds for beginners, and 45-to-50-yard driven and crossing shots for the more avid wingshooters.",
        ],
      },
      {
        heading: "The Service",
        body: [
          "Our staff attends to every detail, anticipating what each guest needs before they have to ask. Meals are simple and mouth-watering — Argentine asado lunches, Italian night dinners, dove nugget hors d'oeuvres — served with that same care. All this, paired with a fine Argentine wine and the finest Cuban cigar, makes our hospitality one of the best available.",
        ],
      },
    ],
    whenToCome: {
      heading: "When to Come?",
      columns: [
        { id: "summer", name: "Summer Season", window: "Jan 1 – Mar 31", summary: "Sunflower Season" },
        // TODO(client): the client's document is inconsistent — the Rates
        // table says "Apr 1 – Oct 31" for Regular Season, the When to Come
        // table says "Apr 1 – Dec 31". Assumed Dec 31 (matches Posta del
        // Norte and doesn't leave Nov/Dec without a season on a lodge sold
        // as year-round). Confirm with the client before launch.
        { id: "regular", name: "Regular Season", window: "Apr 1 – Dec 31", summary: "Corn and soy bean harvesting season" },
      ],
      rows: [
        { label: "Average High Temp (°F)", values: ["85", "83"] },
        { label: "Average Low Temp (°F)", values: ["63", "59"] },
        { label: "Rainfall (inches)", values: ["4.3", "3.9"] },
        { label: "Types of Shooting", values: ["Sunflower fields and farmland", "Farmland and roosting areas"] },
        { label: "Daily Price", values: ["$890 / day", "$760 / day"] },
        { label: "Description", values: ["Sunflower Season", "Corn and soy bean harvesting season"] },
      ],
    },
    rates: {
      kind: "published",
      seasonLabel: "Season 2026–27",
      rows: [
        { label: "Summer Season", value: "$890 per day", emphasis: true, seasonId: "summer" },
        { label: "Regular Season", value: "$760 per day", emphasis: true, seasonId: "regular" },
        { label: "Son/Daughter under 25", value: "$500 per day" },
        { label: "Non-Hunter", value: "$445 per day" },
        { label: "Private Room Surcharge", value: "+$100 per night" },
        { label: "Number of Double Rooms", value: "9" },
        { label: "Clients to Book Lodge Privately", value: "10" },
      ],
      extras: RATE_EXTRAS,
      payment: PAYMENT_TERMS,
    },
  },
  {
    slug: "posta-del-norte",
    status: "complete",
    name: "Posta del Norte",
    location: "Northern Córdoba · On Route 9",
    species: ["Dove"],
    capacity: "8 bedrooms · Books privately for groups of 7+",
    heroSubhead: "Private Lodge for Small Groups",
    cardSummary:
      "Purpose-built for privacy in 1995. Reserve the entire property for groups of seven or more — between the two largest dove grounds in northern Córdoba.",
    intro: [
      "In a Córdoba market full of options, Posta del Norte stands apart as the choice for those who value privacy above all. With a group of seven or more, the entire lodge becomes yours — no other guests, no shared spaces, just your party and the hunt.",
    ],
    sections: [
      {
        heading: "The Lodging",
        body: [
          "Posta del Norte joined the FlyWays Collection in 2010, just sixty-five miles from Córdoba Airport. Its greatest advantage is privacy: groups of seven or more can reserve the entire lodge at a fixed private-lodge rate.",
          "Eight rooms, each with a fireplace and private bathroom, carry the property's understated comfort throughout — six along the main hallway, a seventh on the mezzanine, and an eighth set apart in its own annex with two bedrooms and a shared common area.",
          "At its heart sits the Gaucho Bar, built around a structure dating back to the late 1800s — the kind of detail no new lodge can replicate. A heated Jacuzzi and a 2022 pool house, anchored by a striking stone fireplace, round out the property's quieter pleasures.",
          "Strategically set directly along Route 9, Posta del Norte offers quick, easy access to some of the finest hunting fields in northern Córdoba.",
        ],
        bullets: [
          "Prime access to Córdoba's best hunting fields",
          "8 rooms, each with a fireplace and private bathroom",
          "Full privacy for groups of 7 or more",
          "Purpose-built as a hunting lodge",
          "The historic Gaucho Bar",
          "Heated Jacuzzi and pool house",
        ],
      },
      {
        heading: "The Shooting",
        body: [
          "Posta was built in 1995, in a strategic position exactly between the two largest dove hunting grounds in the north of Córdoba, with access to 160,000 acres, offering high volume shooting all year round. From November to May, Posta has access to the western hills and surrounding farms. During June to October, doves are found mostly on large Córdoba estancias close to the lodge.",
        ],
      },
      {
        heading: "The Service",
        body: [
          "Guest services at Posta are first rate, given the smaller group sizes and private setting. Attention to detail is keen!",
          "The kitchen was completely renovated in 2014. The food is prepared by our team of chefs that rotate around the 2 lodges and have been trained by our more experienced executive chef with 15+ years of experience tending to our international clientele. All of our menus are accompanied with the finest Argentine wines, as well as our field lunches and asados.",
        ],
      },
    ],
    rates: {
      kind: "onRequest",
      seasonLabel: "Season 2026–27",
      body: [
        "Our rates vary according to travel dates, group size, lodge selection, and the activities included in your program. Contact our team for a personalized itinerary and quote.",
        "Packages include accommodations, all meals and beverages, professional guides, chef service, daily laundry, Wi-Fi, round-trip transfers from Córdoba Airport, and 24/7 assistance from your FlyWays travel specialist.",
        "Additional costs may include shotgun shells, gun rental, hunting permits, field transportation, and discretionary gratuities. Prices should be reviewed regularly before publishing, since ammunition and permit costs may change.",
      ],
      extras: RATE_EXTRAS,
      payment: PAYMENT_TERMS,
    },
  },

  // ── Mixed Bag ───────────────────────────────────────────────────────
  {
    slug: "estancia-del-monte",
    status: "complete",
    name: "Estancia del Monte",
    location: "Buenos Aires",
    species: ["Duck", "Pigeon", "Perdiz", "Dove"],
    heroSubhead: "The perfect destination in Buenos Aires province for a diverse hunting experience",
    cardSummary:
      "The latest addition to the FlyWays collection — duck, pigeon, perdiz and dove sixty miles from Buenos Aires, with big game nearby.",
    intro: [
      "Estancia del Monte is the latest addition to Argentina's FlyWays lodge collection. It's the perfect destination in Buenos Aires province for a diverse hunting experience, featuring duck, pigeon, perdiz, and dove. Additionally, nearby, you can even find big game like black buck and Russian boar. What's more, it's conveniently located just 60 miles from Ezeiza International Airport in Buenos Aires, making it easily accessible with direct flights from Dallas, Houston, Atlanta, or Miami. This ensures you can start your hunt on the same day you arrive, making it an ideal location for your hunting adventure.",
    ],
    sections: [
      {
        heading: "The Lodging",
        body: [
          "With eight beautifully appointed bedrooms, Estancia del Monte offers world-class gunning just sixty miles south of Buenos Aires. Set in the Salado River Basin near the historic town of San Miguel del Monte, the estancia pairs unmatched serenity with the kind of shooting that draws hunters back year after year. Come, experience the essence of Argentina in every moment.",
        ],
      },
      {
        heading: "The Shooting",
        body: [
          "Our hunting package encompasses four prime species: duck, perdiz and pigeon, promising thrilling pursuits and unforgettable moments. We've also added big game hunts to your hunting repertoire, including black buck and Russian boar, just a few miles from our estate.",
          "Estancia del Monte is surrounded by a 2,000-acre working cattle ranch and farm. As you explore our hunting grounds, you'll encounter abundant game birds and the beauty of the Argentine countryside.",
        ],
      },
      {
        heading: "The Service",
        body: [
          "Arriving at Buenos Aires' International Airport isn't just a landing; it's the start of a journey marked by seamless service and genuine warmth. From the instant your feet touch the ground, our English-speaking guides — chosen for their expertise and affability — are there to greet you and take care of every detail, from baggage to transfer, before you've even had time to look around.",
        ],
      },
    ],
  },
  {
    slug: "estancia-santa-rita",
    status: "complete",
    name: "Estancia Santa Rita",
    location: "Buenos Aires",
    species: ["Duck", "Perdiz"],
    heroSubhead: "A hidden gem for waterfowl",
    cardSummary:
      "An elegant English-style mansion amid ponds and marshes — exceptional decoyed duck hunting from May through mid-August.",
    intro: [
      "From May 1st to August 15th, Estancia Santa Rita welcomes guests to its pristine location, surrounded by expansive ponds and marshes in a region that has led Argentina's grain production for the last decade. A hidden gem for waterfowl. Operated by FlyWays, expert partners, Estancia Santa Rita offers luxurious accommodations and gourmet dining amidst the serene Argentine countryside. This exquisite Argentine estate provides the ideal backdrop for exceptional decoyed duck hunting experiences.",
    ],
    sections: [
      {
        heading: "The Lodging",
        body: [
          "All visitors are accommodated within Estancia Santa Rita's main residence, an elegant English-style mansion spanning 18,000 square feet across three levels. It features three living rooms (two with large TVs, one with a bar), a dining room, a playroom with a pool table, a second bar, a well-equipped kitchen, a cozy movie room known as the \"micro-cinema,\" an outdoor 6x6 jacuzzi, and Wi-Fi. Six generously sized bedrooms offer ample space for comfort and privacy, with an extra room available for larger groups, bringing the total to seven. Throughout, the lodge carries a sophisticated English-Argentine ambiance, with tasteful decor and high-quality furnishings.",
        ],
      },
      {
        heading: "The Shooting",
        body: [
          "Estancia Santa Rita sits in the fertile lowland Pampas of Buenos Aires province, home to a thriving duck population. Hunts take place in the area's abundant potholes and lagoons, where a unique habitat and extensive grain production create ideal feeding and resting grounds for waterfowl. The blinds are close to the lodge — a maximum 50-minute drive — allowing for longer hunts and more reasonable wake-up times.",
        ],
      },
      {
        heading: "The Service",
        body: [
          "Arriving at Buenos Aires' International Airport is the start of a journey marked by excellent service and genuine warmth. Our friendly English-speaking guides greet you on arrival, delivering the seamless hospitality that makes the experience extraordinary.",
          "Santa Rita offers top-tier international cuisine, from American-style breakfasts to local and international lunches and dinners, paired with fine Argentine wines. Fresh game and the renowned Argentine asado are regulars on the menu.",
        ],
      },
    ],
  },

  // ── Big Game ────────────────────────────────────────────────────────
  {
    slug: "mountain-lodge",
    status: "complete",
    name: "Mountain Lodge",
    location: "Córdoba",
    species: ["Buffalo", "Red Stag", "Russian Boar"],
    capacity: "6 bedrooms",
    heroSubhead: "The best-kept secret for big game hunting near Córdoba City",
    cardSummary:
      "Stone-and-wood mountain lodge in the Córdoba hills, an hour and fifteen minutes from the airport, with terrain rising from 1,500 to 5,000 feet.",
    intro: [
      "Hidden deep in an enchanted valley in the heart of the Córdoba hills, Mountain Lodge is the best-kept secret for big game hunting near Córdoba City — just an hour and fifteen minutes from the international airport. Six spacious rooms and a cozy living and dining area open onto sweeping views of the surrounding hills, where buffalo and red stag sometimes graze in plain sight. Built from local stone and wood, the lodge echoes the rustic charm of a Spanish mountain cabin, reimagined with the comfort of a modern hunting retreat.",
      "The hunting grounds rise from 1,500 to 5,000 feet, unfolding from thick lower forests to open valleys and peaks with no cover, where game can be spotted from two or three miles away. It's a landscape built for the chase — shots range from 30 yards with a bow to 300 with a rifle, with stags shadowed by alert cows quick to sound the alarm at anything suspicious.",
    ],
    sections: [
      {
        heading: "The Lodging",
        body: [
          "Córdoba Mountain Lodge has six spacious rooms and a dining-living room offering beautiful views of the slopes around the property, from where grazing deer and buffalo can sometimes be seen.",
          "The lodge is built with a combination of local elements based on stone and wood, replicating the appeal of a mountain cabin, but with the comfort of a modern hunting lodge. The hunting grounds' elevation ranges from 1,500 to 5,000 feet, making for a challenging and fascinating chase — from thick forests in the lower areas to open valleys and peaks with no cover, where game can be seen from two or three miles away.",
        ],
      },
      {
        heading: "The Hunting",
        body: [
          "Hunting starts with first light after an abundant early breakfast, when all the game is on the move, and continues until noon when they bed down. We stop for lunch, followed by a mandatory \"siesta\" before the game starts moving again. We resume the chase until sundown, then head back to the lodge for drinks and gourmet hors d'oeuvres with your host, guide, and fellow hunters — sharing the day's experiences while planning the following morning. Although spotting and stalking is what we do most of the time, we also provide blinds strategically set up for bow hunters. Trails go up the mountains, where we drive up on our 4-wheel drive pickups to hunt downhill in most cases. Horses are also available to access the more remote locations on the ranch.",
        ],
      },
      {
        heading: "The Service",
        body: [
          "Our professional and well-trained guides, together with our hospitable staff, make every moment one you'll cherish for years to come. Whether hunting with bow or rifle — both with a very high success rate — and bringing home great trophies, every hunt becomes an unforgettable experience.",
          "A testament to this: over 60% of our clients book again, season after season.",
        ],
      },
    ],
  },
];

export const lodges: Lodge[] = lodgeData.map(withLodgeMedia);

export const lodgeSlugs = lodges.map((l) => l.slug);

export function getLodge(slug: string): Lodge | undefined {
  return lodges.find((l) => l.slug === slug);
}

export function getLodges(slugs: string[]): Lodge[] {
  return slugs
    .map((s) => lodges.find((l) => l.slug === s))
    .filter((l): l is Lodge => Boolean(l));
}

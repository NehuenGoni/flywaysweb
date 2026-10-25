import type { Program } from "./types";
import { withProgramMedia } from "./media";

/**
 * Fly-fishing programs, rendered inline on /experiences/fly-fishing-patagonia
 * (anchors, e.g. #echoes-of-patagonia). The client's document gives no
 * metadata, hero or photography per program, so these don't get their own
 * route yet — the slug is kept so a dedicated page can be opened later
 * without migrating data.
 */
const programData: Program[] = [
  {
    slug: "echoes-of-patagonia",
    status: "complete",
    name: "Echoes of Patagonia",
    durationLabel: "8 days / 7 nights",
    location: "Los Alerces National Park & Welsh Heritage Trevelin Town",
    cardSummary:
      "Lodge-based fly fishing across Los Alerces National Park and the Welsh heritage town of Trevelín.",
    intro: [
      "Echoes of Patagonia is our lodge-based fly-fishing program, moving between the waters of Los Alerces National Park and the Welsh heritage town of Trevelín over eight days.",
    ],
    itinerary: [
      {
        label: "Day 1 & 2",
        body: [
          "Day 1: Arrive at Esquel Airport. 45 minutes to the lodge in Los Alerces National Park.",
          "Day 2: Breakfast at the lodge, then drive the trucks and rafts 30 minutes to the mouth of the Rivadavia River. Set up the rafts and begin our fishing day. To end our day, the Rivadavia River flows into Lago Verde, where we will row back to the lodge for dinner and a good night's rest.",
        ],
      },
      {
        label: "Days 3–5",
        body: [
          "Day 3: Start your day with breakfast at the lodge, then head out in the rafts to fish the flooded banks of Lago Verde.",
          "Day 4: After breakfast, we'll jump into the rafts and fish the Arrayanes River. We'll end the day by breaking down the rafts and driving back to the lodge for happy hour and dinner.",
          "Day 5: We'll have breakfast at the lodge and pack our things. Afterward, we'll take a short drive to Trevelín, where we'll set up the rafts at the headwaters of the Río Grande. After that, we'll take a short drive to the lodge, where they will be waiting for our arrival with a 4-course dinner.",
        ],
      },
      {
        label: "Days 6–8",
        body: [
          "Day 6 & 7: Enjoy breakfast at the lodge, then spend the day fishing the various sections of the Río Grande.",
          "Day 8: After breakfast, we'll load into the rafts in front of the lodge and enjoy a few hours of fishing on the Río Grande. Around 12:30, we'll return to the lodge for lunch. Then, we'll drive you to Esquel Airport, where you'll catch your flight back home.",
        ],
      },
    ],
  },
  {
    slug: "nomad-fishing-experience",
    status: "complete",
    name: "Nomad Fishing Experience",
    durationLabel: "8 days / 7 nights",
    cardSummary:
      "A mobile, glamping-style journey through Patagonia's rivers, supported by riverside camps and select lodges.",
    intro: [
      "Built around a mobile, glamping-style journey and supported by the warmth and comfort of select lodges, this program offers the perfect blend of exploration and relaxation. With a fully equipped expedition truck, riverside camps, and the region's top local guides, you'll wake up steps from the water ready to seize the day. No long transfers. Just uninterrupted Patagonian magic. A journey unlike any other, but it still feels like FlyWays essence from beginning to end.",
    ],
    itinerary: [
      {
        label: "Day 1",
        body: [
          "Upon arrival at Esquel Airport, you'll be greeted and transferred on a scenic three-hour drive to Río Pico, where a perfectly prepared riverside camp awaits you. From the moment you step out of the vehicle, our staff will be at your service, anticipating every need. Once you've settled in, the evening begins with an unforgettable Argentinian asado dinner by the fire.",
        ],
      },
      {
        label: "Days 2–5",
        body: [
          "Day 2 to Day 4: Over the next three days, you will fish many of the waters accessible from the camp. Most are just minutes away from your tent, including Río Pico, Río Nilson, Río Pampas, and some of the best spring creeks in the area.",
          "Day 5: Let's go nomad! After an early breakfast, we will move to great lakes with spectacular Patagonia scenery going after Trophy Brook Trout. This adventurous nomadic day will come to an end at one of our lodges located alongside the Río Grande where our team will be waiting for cocktail hour, appetizers and dinner.",
        ],
      },
      {
        label: "Days 6–8",
        body: [
          "Day 6 & 7: Enjoy the comfort of our Río Grande Lodge while fishing its waters in 2 of its 3 sections. Lunch will be conveniently served by the river bank.",
          "Day 8: After breakfast, we'll jump into the rafts in front of the lodge and enjoy your last hours of fishing on the river. At 12:30, we'll return to the lodge for lunch, then drive you to Esquel Airport.",
        ],
      },
    ],
  },
];

export const programs: Program[] = programData.map(withProgramMedia);

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
};

/**
 * TODO(client): replace these with REAL Google reviews before launch.
 * These are representative placeholders for layout only — do not publish
 * as-is. Pull verbatim quotes (and stars) from the FlyWays Google Business
 * profile once the Miami → Córdoba profile migration is done.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Twenty years of bird hunting all over the world, and Córdoba with FlyWays is the trip I keep coming back to. The shooting is unreal — but it's the people that make it.",
    author: "Placeholder — Returning guest",
    detail: "Texas, USA",
  },
  {
    quote:
      "The lodge, the food, the wine, the guides — every detail handled. My wife came along as a non-hunter and had just as good a week as I did.",
    author: "Placeholder — First-time guest",
    detail: "Georgia, USA",
  },
  {
    quote:
      "You can tell the owners are actually there. Nothing felt outsourced. Booked next year before we left.",
    author: "Placeholder — Group of six",
    detail: "Florida, USA",
  },
];

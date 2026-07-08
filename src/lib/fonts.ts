import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

// Body / UI typeface — variable font from Google, self-hosted by next/font.
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Display typeface — Trajan Pro, self-hosted from the client's brand kit.
// Trajan is caps-only; reserve it for headlines, eyebrows and section titles.
// NOTE: Trajan Pro is a licensed Adobe font — confirm web embedding rights.
// Free fallback in the same spirit: Cinzel (next/font/google).
export const trajan = localFont({
  variable: "--font-trajan",
  display: "swap",
  src: [
    { path: "../fonts/TrajanPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/TrajanPro-Bold.otf", weight: "700", style: "normal" },
  ],
});

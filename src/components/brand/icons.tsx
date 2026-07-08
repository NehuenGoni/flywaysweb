import type { SVGProps } from "react";

/**
 * Minimal line-art glyphs echoing the brand's animal motifs
 * (fish, bird, feather, antlers). Used as experience markers.
 */

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function FishIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 12s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" />
      <path d="M18 10l3.5 2-3.5 2" />
      <circle cx="7" cy="11" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BirdIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 14C7 6 11.5 6 12 13C12.5 6 17 6 22 14" />
      <path d="M12 13v4" />
    </svg>
  );
}

export function FeatherIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M17 5c2 5-1 11-6 13-2 .8-4 1-6 1 0-2 .3-4 1-6 2-5 7-8 11-9z" />
      <path d="M17 5 6 19" />
      <path d="M14 9l-3.5 .6M14.5 12l-4 .8" />
    </svg>
  );
}

export function AntlersIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21v-3" />
      <path d="M12 18C10 14 9 13 8 9" />
      <path d="M9.6 12 7 10M10.6 14.2 8 13.3" />
      <path d="M12 18C14 14 15 13 16 9" />
      <path d="M14.4 12 17 10M13.4 14.2 16 13.3" />
    </svg>
  );
}

export const experienceIcons = {
  dove: BirdIcon,
  bird: BirdIcon,
  feather: FeatherIcon,
  fish: FishIcon,
  deer: AntlersIcon,
} as const;

export type ExperienceIconName = keyof typeof experienceIcons;

import { Square } from "lucide-react";

// type: "bullets",            // 'bullets' | 'fraction' | 'progressbar' | 'custom'
export const PaginationBulletsType = {
  Bullets: "bullets",
  Fraction: "fraction",
  Progressbar: "progressbar",
} as const;

export type PaginationBulletsType =
  (typeof PaginationBulletsType)[keyof typeof PaginationBulletsType];

export type SwipperPaginationOptions = {
  bulletsType?: PaginationBulletsType;
  dynamicBullets?: boolean;
  clickable?: boolean;
};
export const NavigationShape = {
  circle: "circle",
  Square: "Square",
  rounded: "rounded",
} as const;

export type NavigationShape =
  (typeof NavigationShape)[keyof typeof NavigationShape];

export type SwiperNavigationOptions = {
  backgroundColor?: string; // determines the color of the navigation buttons background
  backgroundHoverColor?: string; // determines background Color on hover
  size?: string; // background Size
  shape?: NavigationShape; // shape of bachground
  iconColor?: string; // Color of the arrow
  iconSize?: string; // size of the arrow
  iconOffsetX?: string; // moves the next icon to the right and the prev icon to the left to better postion the arrow inside the container
};

export type AutoplayOptions = {
  delay?: number;
  disableOnInteraction?: boolean;
  pauseOnMouseEnter?: boolean;
  reverseDirection?: boolean;
  stopOnLastSlide?: boolean;
  waitForTransition?: boolean;
};

export type SwiperAutoplayOptions = {
  enabled?: boolean;
  options?: AutoplayOptions;
};

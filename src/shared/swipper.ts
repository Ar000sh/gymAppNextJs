      // type: "bullets",            // 'bullets' | 'fraction' | 'progressbar' | 'custom'
export const PaginationBulletsType = {
    Bullets: "bullets",
    Fraction: "fraction",
    Progressbar: "progressbar",
} as const;
      
export type PaginationBulletsType = typeof PaginationBulletsType[keyof typeof PaginationBulletsType];

export type SwipperPaginationOptions = {
    bulletsType?: PaginationBulletsType;
    dynamicBullets?: boolean;
    clickable?: boolean;
}
"use client";
// Import Swiper React components
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import type {
  NavigationOptions,
  PaginationOptions,
  ScrollbarOptions,
  AutoplayOptions as SwiperAutoplayOptionsType,
} from "swiper/types";

import "./styles.css";
// Import Swiper styles
// Import Swiper styles

import "swiper/swiper-bundle.css";
import {
  NavigationShape,
  type SwiperNavigationOptions,
  type SwipperPaginationOptions,
} from "@/shared/swipper";

function useMeasuredWidth<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial sync measure
    setWidth(Math.round(el.getBoundingClientRect().width));

    // Observe future changes
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(Math.round(entry.contentRect.width));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width } as const;
}

// Carousel.tsx (inside your component file)
function buildNavigationCSSVars(
  opts?: SwiperNavigationOptions,
): React.CSSProperties {
  const bg = opts?.backgroundColor ?? "transparent";
  const bgHover = opts?.backgroundHoverColor ?? "";
  const box = opts?.size ?? "";
  const icon = opts?.iconColor ?? "";
  const iconSz = opts?.iconSize ?? "";
  const iconOffsetX = opts?.iconOffsetX ?? "0px";

  const radius =
    opts?.shape === NavigationShape.circle
      ? "50%"
      : opts?.shape === NavigationShape.rounded
        ? "25%"
        : opts?.shape === NavigationShape.Square
          ? "none"
          : "";

  return {
    ["--nav-bg" as string]: bg,
    ["--nav-bg-hover" as string]: bgHover,
    ["--nav-size" as string]: box,
    ["--nav-radius" as string]: radius,
    ["--nav-icon-color" as string]: icon,
    ["--nav-icon-size" as string]: iconSz,
    ["--nav-icon-offset-x" as string]: iconOffsetX,
  };
}
const extractNavigationOptions = (
  opts?: SwiperNavigationOptions,
): NavigationOptions => {
  // Styling if like size and so on and actuall Navgation Options can be returned

  return {
    enabled: true,
    // default look
    //type: (opts?.bulletsType ?? "bullets") as PaginationOptions["type"],
    //clickable: opts?.clickable ?? true,
    //dynamicBullets: opts?.dynamicBullets ?? false,
    // You can add 'el' or render functions here later if needed
  };
};

const extractPaginationOptions = (
  opts?: SwipperPaginationOptions,
): PaginationOptions => {
  return {
    // default look
    type: (opts?.bulletsType ?? "bullets") as PaginationOptions["type"],
    clickable: opts?.clickable ?? true,
    dynamicBullets: opts?.dynamicBullets ?? false,
    // You can add 'el' or render functions here later if needed
  };
};

function computeSlidesPerView(
  width: number,
  spaceBetween: number,
  itemMinWidth: number,
) {
  const innerWidth = Math.max(0, width);
  if (innerWidth === 0) return 1;

  // When multiple slides are visible, there are (n-1) gaps of spaceBetween.
  // We can approximate by adding the gap into the effective card width.
  const effectiveCard = itemMinWidth + spaceBetween;
  const raw = innerWidth / effectiveCard;

  // Ensure at least one slide is visible; allow fractional for preview.
  const slideWidth = Math.max(1, raw);
  //console.log("slideWidth: ", slideWidth)
  return Math.floor(slideWidth);
}
type Props = {
  elements: React.ReactElement[];
  spaceBetween: number;
  containerStyles: string;
  maxWidth: number;
  enableNavigation?: boolean;
  enablePagination?: boolean;
  paginationOptions?: SwipperPaginationOptions;
  navigationOptions?: SwiperNavigationOptions;
  enableScrollbar?: boolean;
  loop?: boolean;
  autoplay?: boolean | SwiperAutoplayOptionsType;
};
const Carousel = ({
  elements,
  spaceBetween = 50,
  containerStyles = "",
  maxWidth = 450,
  enableNavigation,
  enablePagination,
  enableScrollbar,
  paginationOptions,
  loop,
  navigationOptions,
  autoplay,
}: Props) => {
  const { ref: containerRef, width: measuredWidth } =
    useMeasuredWidth<HTMLDivElement>();

  const pagination: PaginationOptions | boolean = enablePagination
    ? paginationOptions
      ? extractPaginationOptions(paginationOptions)
      : { clickable: true }
    : false;

  const navigation: NavigationOptions | boolean = enablePagination
    ? navigationOptions
      ? extractNavigationOptions(navigationOptions)
      : { enabled: true }
    : false;

  const scrollbar: ScrollbarOptions | boolean = enableScrollbar
    ? { draggable: true }
    : false;

  const autoplayConfig: SwiperAutoplayOptionsType | boolean =
    typeof autoplay === "boolean"
      ? autoplay
        ? { delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }
        : false
      : autoplay || false;

  const slidesPerView = computeSlidesPerView(
    measuredWidth,
    spaceBetween,
    maxWidth,
  );

  const navStyleVars = buildNavigationCSSVars(navigationOptions);
  //console.log("slidesPerView: ", slidesPerView)
  return (
    <div className={containerStyles} ref={containerRef}>
      {measuredWidth > 0 && (
        <Swiper
          className="mySwiper"
          style={navStyleVars}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          navigation={enableNavigation ? enableNavigation : false}
          pagination={pagination}
          scrollbar={scrollbar}
          loop={loop}
          autoplay={autoplayConfig}
        >
          {elements.map((el, i) => (
            <SwiperSlide
              className="!flex h-full !items-center !justify-center"
              key={el.key ?? i}
            >
              {el}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;

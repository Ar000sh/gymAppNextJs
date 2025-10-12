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
import type { Swiper as SwiperInstance } from "swiper";

import "./styles.css";
// Import Swiper styles
// Import Swiper styles

import "swiper/swiper-bundle.css";
import {
  NavigationShape,
  type SwiperNavigationOptions,
  type SwipperPaginationOptions,
} from "@/shared/swipper";
import NavButton from "./customNavButton";

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
  const visiblty = opts?.showOnHover ? "none" : "flex";
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
    ["--nav-visibility" as string]: visiblty,
  };
}

function initExternalNavigation(
  sw: SwiperInstance,
  prevEl: HTMLElement,
  nextEl: HTMLElement,
): void {
  if (!sw.navigation) return;
  const current = sw.params.navigation;
  const base: NavigationOptions =
    typeof current === "boolean" ? {} : (current ?? {});
  sw.params.navigation = { ...base, enabled: true, prevEl, nextEl };
  sw.navigation.destroy();
  sw.navigation.init();
  sw.navigation.update();
}

const extractNavigationOptions = (
  opts?: SwiperNavigationOptions,
  nextRef?: React.RefObject<HTMLButtonElement | null>,
  prevRef?: React.RefObject<HTMLButtonElement | null>,
): NavigationOptions => {
  const wantsExternal = !!opts?.position && opts.position !== "default"; // only if explicitly set
  const haveEls = !!nextRef?.current && !!prevRef?.current;

  if (wantsExternal && haveEls) {
    return {
      enabled: true,
      prevEl: prevRef!.current!,
      nextEl: nextRef!.current!,
    };
  }

  // Fallback to built-in buttons
  return { enabled: true };
};

function getPositionPlacement(position: string): "top" | "bottom" | "default" {
  if (position === "default") return "default";
  const dash = position.indexOf("-");
  if (dash < 0) return "default";
  const prefix = position.substring(0, dash);
  return prefix === "top" ? "top" : prefix === "bottom" ? "bottom" : "default";
}

function getPositionAlign(position: string): "left" | "center" | "right" {
  if (!position || position === "default") return "left";
  const parts = position.split("-");
  const align = parts[1] ?? "left";
  return (["left", "center", "right"].includes(align) ? align : "left") as
    | "left"
    | "center"
    | "right";
}

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

function numberOfSlidesToBeAdded(
  numberOfSlidPerView: number,
  slidesNumber: number,
) {
  const num = Math.ceil(numberOfSlidPerView);
  if (numberOfSlidPerView <= slidesNumber) return 0;

  console.log(
    "numberOfSlidPerView: ",
    numberOfSlidPerView,
    " slidesNumber: ",
    slidesNumber,
  );

  return num - slidesNumber;
}
function computeSlidesPerView(
  width: number,
  spaceBetween: number,
  itemMinWidth: number,
  allowPartail: boolean,
) {
  const innerWidth = Math.max(0, width);
  if (innerWidth === 0) return 1;

  // When multiple slides are visible, there are (n-1) gaps of spaceBetween.
  // We can approximate by adding the gap into the effective card width.
  const effectiveCard = itemMinWidth + spaceBetween;
  const raw = innerWidth / effectiveCard;

  console.log("raw: ", raw);

  // Ensure at least one slide is visible; allow fractional for preview.
  const slideWidth = Math.max(1, raw);
  console.log("slideWidth: ", slideWidth);
  return allowPartail ? slideWidth : Math.floor(slideWidth);
}
type Props = {
  elements: React.ReactElement[];
  placeHolderElement?: React.ReactElement;
  spaceBetween: number;
  containerStyles: string;
  swiperSlidStyles?: string;
  maxWidth: number;
  enableNavigation?: boolean;
  enablePagination?: boolean;
  paginationOptions?: SwipperPaginationOptions;
  navigationOptions?: SwiperNavigationOptions;
  enableScrollbar?: boolean;
  loop?: boolean;
  autoplay?: boolean | SwiperAutoplayOptionsType;
  allowPartailSlides?: boolean;
};
const Carousel = ({
  elements,
  placeHolderElement,
  spaceBetween = 50,
  containerStyles = "",
  swiperSlidStyles,
  maxWidth = 450,
  enableNavigation,
  enablePagination,
  enableScrollbar,
  paginationOptions,
  loop,
  navigationOptions,
  autoplay,
  allowPartailSlides,
}: Props) => {
  const { ref: containerRef, width: measuredWidth } =
    useMeasuredWidth<HTMLDivElement>();
  const nextRef = React.useRef<HTMLButtonElement | null>(null);
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const swiperRef = React.useRef<SwiperInstance | null>(null);

  const position = navigationOptions?.position ?? "default";
  const useExternalNav = enableNavigation && position !== "default";
  const placement = getPositionPlacement(position);
  const align = getPositionAlign(position);
  const barJustify =
    align === "right"
      ? "justify-end"
      : align === "center"
        ? "justify-center"
        : "justify-start";
  const pagination: PaginationOptions | boolean = enablePagination
    ? paginationOptions
      ? extractPaginationOptions(paginationOptions)
      : { clickable: true }
    : false;

  const navigation: NavigationOptions | boolean = enableNavigation
    ? navigationOptions
      ? extractNavigationOptions(navigationOptions, nextRef, prevRef)
      : { enabled: true }
    : false;

  const scrollbar: ScrollbarOptions | boolean = enableScrollbar
    ? { draggable: true }
    : false;

  const autoplayConfig: SwiperAutoplayOptionsType | boolean =
    typeof autoplay === "boolean"
      ? autoplay
        ? {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }
        : false
      : autoplay || false;

  const slidesPerView = computeSlidesPerView(
    measuredWidth,
    spaceBetween,
    maxWidth,
    allowPartailSlides ?? false,
  );

  console.log("slidesPerView: ", slidesPerView);
  if (allowPartailSlides && placeHolderElement) {
    const toBeAdded = numberOfSlidesToBeAdded(slidesPerView, elements.length);
    if (toBeAdded > 0) {
      for (let i = 0; i < toBeAdded; i++) {
        elements.push(placeHolderElement);
      }
    }
    console.log("toBeAdded: ", toBeAdded);
  }

  const navStyleVars = buildNavigationCSSVars(navigationOptions);

  const onSwiper = (sw: SwiperInstance) => {
    swiperRef.current = sw;
    if (useExternalNav && prevRef.current && nextRef.current) {
      initExternalNavigation(sw, prevRef.current, nextRef.current);
    }
  };

  console.log("loop: ", loop);

  const barClassBase = `flex items-center`;
  //console.log("slidesPerView: ", slidesPerView)
  return (
    <div className={containerStyles} ref={containerRef}>
      {useExternalNav && placement === "top" && (
        <div className={`${barClassBase} mb-2 ${barJustify}`}>
          <div className="flex items-center gap-2">
            <NavButton
              navigationOptions={navigationOptions ?? {}}
              kind="prev"
              btnRef={prevRef}
            />
            <NavButton
              navigationOptions={navigationOptions ?? {}}
              kind="next"
              btnRef={nextRef}
            />
          </div>
        </div>
      )}
      {measuredWidth > 0 && (
        <Swiper
          className="mySwiper"
          style={navStyleVars}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={spaceBetween}
          slidesOffsetBefore={0}
          slidesPerView={slidesPerView}
          navigation={navigation}
          pagination={pagination}
          scrollbar={scrollbar}
          loop={loop}
          autoplay={autoplayConfig}
          onSwiper={onSwiper}
        >
          {elements.map((el, i) => (
            <SwiperSlide
              key={i}
              className={`flex items-center ${swiperSlidStyles ? swiperSlidStyles : ""}`}
            >
              {el}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {useExternalNav && placement === "bottom" && (
        <div className={`${barClassBase} mt-2 ${barJustify}`}>
          <div className="flex items-center gap-2">
            <NavButton
              navigationOptions={navigationOptions ?? {}}
              kind="prev"
              btnRef={prevRef}
            />
            <NavButton
              navigationOptions={navigationOptions ?? {}}
              kind="next"
              btnRef={nextRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;

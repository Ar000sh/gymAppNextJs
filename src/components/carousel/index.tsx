"use client";
// Import Swiper React components
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import type { PaginationOptions,  ScrollbarOptions } from "swiper/types";  


// Import Swiper styles
// Import Swiper styles
import 'swiper/swiper-bundle.css';
import type { SwipperPaginationOptions } from '@/shared/swipper';

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

const extractPaginationOptions = (
  opts?: SwipperPaginationOptions
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
itemMinWidth: number
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
  enableScrollbar?: boolean;
  loop?: boolean;
};
const Carousel = ({elements, spaceBetween=50, containerStyles = "", maxWidth=450, enableNavigation, enablePagination, enableScrollbar, paginationOptions, loop}: Props) => {
  const { ref: containerRef, width: measuredWidth } = useMeasuredWidth<HTMLDivElement>();

  const pagination: PaginationOptions | boolean = enablePagination
  ? (paginationOptions
      ? extractPaginationOptions(paginationOptions)
      : { clickable: true })
  : false;

  const scrollbar:  ScrollbarOptions | boolean = enableScrollbar 
  ? { draggable: true } : false;

const slidesPerView = computeSlidesPerView(measuredWidth, spaceBetween, maxWidth);
//console.log("slidesPerView: ", slidesPerView)
  return (
    <div className={containerStyles} ref={containerRef}>
      {measuredWidth > 0 && (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={enableNavigation ? enableNavigation : false}
        pagination={pagination}
        scrollbar={scrollbar}
        loop={loop}
      >
          {elements.map((el, i) => (
            <SwiperSlide className='!flex !items-center !justify-center h-full' key={el.key ?? i}>{el}</SwiperSlide>
          ))}
       
      </Swiper>
    )}
    </div>
    
  )
};

export default Carousel;

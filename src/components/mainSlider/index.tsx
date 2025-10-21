import { Course } from "@/types/course";
import Image from "next/image";
import DoupleSlid from "./doupleSlid";
import eventPlaceholder from "/assets/eventPlaceholder.png";

import { NavigationShape } from "@/shared/swipper";
import Carousel from "../carousel";

type Props = {
  courses: Course[];
};

function chunk<T>(arr: T[], size = 2): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function Placeholder() {
  return (
    <div className="flex h-fit w-fit flex-col gap-1 !px-0.5 py-0.5">
      <div className="relative h-[200px] w-[150px] transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
        <Image
          src={"/eventPlaceholder_gray_border.png"}
          alt={"image"}
          fill
          sizes="150px"
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="relative h-[200px] w-[150px] transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
        <Image
          src={"/eventPlaceholder_gray_border.png"}
          alt={"image"}
          fill
          sizes="150px"
          className="object-cover"
          priority={false}
        />
      </div>
    </div>
  );
}
/** one tile (handles missing course or missing image) */
function Tile({ course }: { course?: Course }) {
  const hasImg = !!course?.image_url;
  return (
    <div className="relative h-[200px] w-[150px] transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
      {hasImg ? (
        <Image
          src={course!.image_url!}
          alt={course?.title ?? "image"}
          fill
          sizes="150px"
          className="object-cover"
          priority={false}
        />
      ) : (
        <Image
          src={"/eventPlaceholder_gray_border.png"}
          alt={"image"}
          fill
          sizes="150px"
          className="object-cover"
          priority={false}
        />
      )}
    </div>
  );
}

// Breite 150 Länge 200
const MainSlider = ({ courses }: Props) => {
  const swipperArray = chunk(courses, 2).map((pair, idx) => {
    const [c1, c2] = pair; // c2 may be undefined if odd length
    return (
      <div key={idx} className="flex h-fit w-fit flex-col gap-1 !px-0.5 py-0.5">
        <Tile course={c1} />
        <Tile course={c2} />
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-2 shadow-2xl md:flex-row">
      <div className="mx-auto flex h-fit w-fit flex-col items-center gap-2 px-0.5 py-0.5 pt-3 sm:mx-auto sm:w-full sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:pt-3 md:mx-0 md:w-fit md:flex-col md:items-stretch md:justify-start md:gap-1 md:pt-0.5">
        <div className="relative h-[200px] w-[315px] transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
          <Image
            src={"/eventPlaceholder_gray_border.png"}
            alt={"image"}
            fill
            sizes="150px"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="relative h-[200px] w-[315px] transform-gpu transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
          <Image
            src={"/eventPlaceholder_gray_border.png"}
            alt={"image"}
            fill
            sizes="150px"
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <Carousel
          elements={swipperArray}
          placeHolderElement={<Placeholder />}
          spaceBetween={2}
          maxWidth={150}
          containerStyles=""
          enablePagination
          enableNavigation
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          allowPartailSlides
          navigationOptions={{
            size: "44px",
            iconSize: "22px",
            iconColor: "white",
            backgroundColor: "black",
            backgroundHoverColor: "#897f33",
            shape: NavigationShape.circle,
            iconOffsetX: "2px",
            showOnHover: true,
          }}
        />
      </div>
    </div>
  );
};

export default MainSlider;

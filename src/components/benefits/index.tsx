"use client";
import HText from "@/shared/HText";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import coursesData from "@/mock/courses.json";
import AbstractWaves from "../../../public/assets/AbstractWaves.png";
import ContentSparkles from "../../../public/assets/Sparkles.png";
import Carousel from "../carousel";
import NormalButton from "../buttons/normalButton";
import { NavigationPosition, NavigationShape } from "@/shared/swipper";
import type { Course } from "@/types/course";
import React from "react";
import DoupleSlid from "../mainSlider/doupleSlid";
import MainSlider from "../mainSlider";
import useMediaQuery from "@/hooks/useMediaQuery";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const CourseCardMini: React.FC<{ course: Course; onClick: () => void }> = ({
  course,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex h-[406px] cursor-pointer flex-col justify-between rounded-md border-2 border-gray-100 bg-white px-5 py-6 text-center transition hover:scale-103 hover:shadow-lg"
    >
      {/*      <motion.div
        variants={childVariant}
        whileHover={{ scale: 1.03 }}
        onClick={onClick}
        className="flex min-h-[406px] cursor-pointer flex-col justify-between rounded-md border-2 border-gray-100 bg-white px-5 py-6 text-center transition hover:shadow-lg"
      >*/}
      <div>
        <div className="mb-4 flex justify-center">
          <div className="h-48 w-full overflow-hidden rounded-lg">
            <img
              src={course.image_url}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex-grow">
          <h4 className="text-lg leading-tight font-bold">{course.title}</h4>
          <p className="my-3 line-clamp-3 text-sm text-gray-600">
            {course.description}
          </p>
        </div>
      </div>

      <p className="text-primary-500 mt-4 font-semibold">Learn More →</p>
      {/* </motion.div> */}
    </div>
  );
};

const Benefits = () => {
  const router = useRouter();
  const isAboveSmallScreens = useMediaQuery("(min-width: 768px)");

  const handleClick = (id: string) => {
    router.push(`landing/courses/${id}`);
  };

  // ✅ Baue ein stabiles Array für Swiper mit Kurskarten
  const swipperArray = coursesData.map((course) => (
    <div key={course.id} className="px-2">
      <CourseCardMini
        course={course as Course}
        onClick={() => handleClick(course.id)}
      />
    </div>
  ));

  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div>
        {/* HEADER */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>OUR FEATURED COURSES.</HText>
          <p className="my-5 text-sm text-gray-700">
            Explore our range of fitness and wellness programs — from strength
            and mobility to high-intensity conditioning. Click on any course to
            learn more and get started.
          </p>
        </motion.div>
        {/* COURSE GRID */}
        {isAboveSmallScreens ? (
          <motion.div
            className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            {coursesData.map((course) => (
              <CourseCardMini
                key={course.id}
                course={course as Course}
                onClick={() => handleClick(course.id)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {coursesData.map((course) => (
              <CourseCardMini
                key={course.id}
                course={course as Course}
                onClick={() => handleClick(course.id)}
              />
            ))}
          </div>
        )}

        {/* FIRST SLIDER (MIT NAVIGATION UND PAGINATION, WIE ORIGINAL) */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h1 className="pt-10 text-3xl font-semibold">Featured in Motion</h1>
        </motion.div>
        {/* <h1 className="pt-10 text-3xl font-semibold">Featured in Motion</h1> */}
        <motion.div
          className="pt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Carousel
            elements={swipperArray}
            spaceBetween={5}
            maxWidth={400}
            containerStyles=""
            swiperSlidStyles="py-2"
            enablePagination={true}
            loop={true}
            enableNavigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
        </motion.div>

        {/* SECOND SLIDER (RUNDE BUTTONS UNTEN IN DER MITTE, DEIN ALTER "NEW SLIDER") */}
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h1 className="pt-10 text-3xl font-semibold">New Slider</h1>
        </motion.div>
        {/* <h1 className="pt-10 text-3xl font-semibold">New Slider</h1> */}
        <motion.div
          className="pt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <Carousel
            elements={swipperArray}
            spaceBetween={5}
            maxWidth={400}
            containerStyles=""
            loop={true}
            enableNavigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigationOptions={{
              size: "44px",
              iconSize: "22px",
              iconColor: "white",
              backgroundColor: "black",
              backgroundHoverColor: "#897f33",
              shape: NavigationShape.rounded,
              iconOffsetX: "2px",
              showOnHover: true,
              position: NavigationPosition.BottomCenter,
            }}
          />
        </motion.div>

        {/* GRAPHICS UND TEXT */}
        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          {/* GRAPHIC */}
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src="/assets/BenefitsPageGraphic.png"
          />

          {/* DESCRIPTION */}
          <div>
            <div className="relative">
              <div
                className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-[var(--abstractwaves)]"
                style={
                  {
                    "--abstractwaves": `url(${AbstractWaves})`,
                  } as React.CSSProperties
                }
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                    MILLIONS OF MEMBERS GETTING{" "}
                    <span className="text-primary-500">FIT</span>
                  </HText>
                </motion.div>
              </div>
            </div>

            {/* TEXT */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="my-5 text-gray-700">
                Our diverse range of courses is designed to help you achieve
                your fitness goals with expert guidance and modern facilities.
              </p>
              <p className="mb-5 text-gray-700">
                Whether you are starting your journey or looking to enhance your
                performance, there is something here for everyone.
              </p>
            </motion.div>

            {/* BUTTON */}
            <div className="relative mt-16">
              <div
                className="before:absolute before:right-40 before:-bottom-20 before:z-[-1] before:content-[var(--content-sparkles)]"
                style={
                  {
                    "--content-sparkles": `url(${ContentSparkles})`,
                  } as React.CSSProperties
                }
              >
                <NormalButton onClick={() => router.push("/courses")}>
                  View All Courses
                </NormalButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;

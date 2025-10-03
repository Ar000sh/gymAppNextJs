"use client";
import {  type ClassType } from "@/shared/types";

import { motion } from "framer-motion";
import HText from "@/shared/HText";
import Class from "./Class";
import Carousel from "../carousel";
import type { JSX } from "react/jsx-runtime";

const classes: Array<ClassType> = [
  {
    name: "Weight Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image1.png",
  },
  {
    name: "Yoga Classes",
    image: "/assets/image2.png",
  },
  {
    name: "Ab Core Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image3.png",
  },
  {
    name: "Adventure Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image4.png",
  },
  {
    name: "Fitness Classes",
    image: "/assets/image5.png",
  },
  {
    name: "Training Classes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/image6.png",
  },
];






const OurClasses = () => {

  const populateSwiperArray = (array: any[]) : React.ReactElement[] => {
    const swipperArray: JSX.Element[] = [];
    array.map((item, index) => (
      swipperArray.push(
        <Class
        key={`${item.name}-${index}`}
        name={item.name}
        description={item.description}
        image={item.image}
      />
      )
      ));
      return swipperArray;
  };

  const swipperArray = populateSwiperArray(classes);

  console.log("swipperArray: ", swipperArray)
  return (
    <section id="ourclasses" className="w-full bg-primary-100 py-40">
      <motion.div
      >
        <motion.div
          className="mx-auto w-5/6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className="md:w-3/5">
            <HText>OUR CLASSES</HText>
            <p className="py-5">
              Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
              tellus quam porttitor. Mauris velit euismod elementum arcu neque
              facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
              enim mattis odio in risus nunc.
            </p>
          </div>
        </motion.div>
        
        <div className="">
          <Carousel elements={swipperArray} spaceBetween={10} maxWidth={400} containerStyles="px-7"   />
        </div>
      </motion.div>
    </section>
  );
};

export default OurClasses;

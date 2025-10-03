"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import EvolveText from "../../../public/assets/EvolveText.png";

//import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import NormalButton from "../buttons/normalButton";

// we passed the setSelectedPage so that we can navigate to the correct site we clicking on the buttons Join Now and learn more
// Other possiblity globle state maybe ????? 


const Home = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  return (
    // md is the mediaquery for medium devices and by doing md:h-full we are saying that we want to do a heigth 100% when device is medium
    <section id="home" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      {/* IMAGE AND MAIN HEADER */}
      {/* So what we are doing is making sure that the buttons and text and the img are next to each other on md devices by using the flex and then on 
      smaller devices they would be under eachother */}
      <motion.div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"
      >
        {/* MAIN HEADER */}
        {/* what the basis does is its used to split the flex so we have flex and then we can use width to define how much space each one takes
        basis is a more optimized width for flex boxes  */}
        <div className="z-10 mt-32 md:basis-3/5">
          {/* HEADINGS */}
          <motion.div
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="relative">
              <div 
              className="before:absolute before:-top-20 before:-left-20 before:z-[-1]  md:before:content-[var(--evolve)]"
              style={{ "--evolve": `url(${EvolveText})` } as React.CSSProperties}>
                <img alt="home-page-text" src="/assets/HomePageText.png" />
              </div>
            </div>

            <p className="mt-8 text-sm">
              Unrivaled Gym. Unparalleled Training Fitness Classes. World Class
              Studios to get the Body Shapes That you Dream of.. Get Your Dream
              Body Now.
            </p>
          </motion.div>

          {/* ACTIONS */}
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <NormalButton onClick={() => console.log("Join Now")}>
              Join Now
            </NormalButton>
            {/*<AnchorLink
              className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
              href={`#${SelectedPage.ContactUs}`}
            >
              <p>Learn More</p>
            </AnchorLink> */}
            <p>Learn More</p>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div
          className="flex basis-3/5 justify-center md:z-10
              md:ml-40 md:mt-16 md:justify-items-end"
        >
          <img alt="home-pageGraphic" src="/assets/HomePageGraphic.png" />
        </div>
      </motion.div>

      {/* SPONSORS */}
      {isAboveMediumScreens && (
        <div className="h-[150px] w-full bg-primary-100 py-10">
          <div className="mx-auto w-5/6">
            <div className="flex w-3/5 items-center justify-between gap-8">
              <img alt="redbull-sponsor" src={"/assets/SponsorRedBull.png"} />
              <img alt="forbes-sponsor" src={"/assets/SponsorForbes.png"} />
              <img alt="fortune-sponsor" src={"/assets/SponsorFortune.png"} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;

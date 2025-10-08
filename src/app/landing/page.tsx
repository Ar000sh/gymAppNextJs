import Benefits from "@/components/benefits";
import ContactUs from "@/components/contactUs";
import Home from "@/components/home";
import OurClasses from "@/components/ourClasses";

const LandingPage = () => {
  return (
    <>
      <div className="app bg-gray-20">
        {/* <Navbar /> */}
        <Home />
        <Benefits />
        <OurClasses />
        <ContactUs />
      </div>
    </>
  );
};

export default LandingPage;

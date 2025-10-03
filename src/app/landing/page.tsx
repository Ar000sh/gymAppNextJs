

import Benefits from "@/components/benefits";
import ContactUs from "@/components/contactUs";
import Home from "@/components/home";
import OurClasses from "@/components/ourClasses";

const LandingPage = () => {
 /* useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);*/
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

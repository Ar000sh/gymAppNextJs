"use client";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Logo from "@/assets/Logo.png";
import Link from "./Link";
import { SelectedPage } from "@/shared/types";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useAuth } from "@/contexts/AuthContext";
import NormalButton from "../buttons/normalButton";

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  isAboveMediumScreens: boolean;
  setSelectedPage: (value: SelectedPage) => void;
};

const LandingPageNavBar = ({ selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const isLandingPage = isTopOfPage && selectedPage && setSelectedPage;
  const flexBetween = "flex items-center justify-between";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";


  const panelRef = useRef<HTMLDivElement>(null);
  const { ready, user, openAuth, signOut } = useAuth();
  console.log("ready: ", ready, " user: ", user);
  console.log("Is the landingPage: ", isLandingPage)


  useEffect(() => {
    if (!setIsMenuToggled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuToggled(false);
    };

    // pointerdown = works for mouse + touch + pen
    const onPointerDown = (e: PointerEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsMenuToggled(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);


  const test = (test: SelectedPage) => {
    console.log("test: ", test);
    setSelectedPage(test);
  };
  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            <img alt="logo" src="/assets/Logo.png" />

            {/* RIGHT SIDE */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                 {/* <Link
                    page="Home"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="Benefits"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="Our Classes"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page="Contact Us"
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  /> */}
                </div>
                <div className={`${flexBetween} gap-8`}>
                  {!ready ? (
                    <span className="text-sm text-gray-500">…</span>
                  ) : user ? (
                    <>
                      <span className="text-sm text-gray-700">
                        Hi, {user.email}
                      </span>
                      <button
                        onClick={() => signOut()}
                        className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openAuth("signin")}
                        className="text-sm"
                      >
                        Sign In
                      </button>
                      <NormalButton onClick={() => openAuth("signup")}>
                        Become a Member
                      </NormalButton>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <button
                className="bg-secondary-500 rounded-full p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          ref={panelRef}
          className="bg-primary-100 fixed right-0 bottom-0 z-40 h-full w-[300px] drop-shadow-xl"
        >
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            {ready && user && (
              <span className="text-sm text-gray-700">Hi, {user.email}</span>
            )}
            {/*<Link
              page="Home"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Benefits"
              selectedPage={selectedPage}
              setSelectedPage={test}
            />
            <Link
              page="Our Classes"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page="Contact Us"
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            /> */}
            {!ready ? (
              <span className="text-sm text-gray-500">…</span>
            ) : user ? (
              <>
                <button
                  onClick={() => signOut()}
                  className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuth("signin")}
                  className="text-left text-sm"
                >
                  Sign In
                </button>
                <NormalButton onClick={() => openAuth("signup")}>
                  Become a Member
                </NormalButton>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavBar;

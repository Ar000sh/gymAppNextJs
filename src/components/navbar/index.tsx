"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const isAboveMediumScreens: boolean = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const { ready, user, signOut } = useAuth();

  // Optional: change navbar bg after scrolling
  useEffect(() => {
    const onScroll = () => setIsTopOfPage(window.scrollY === 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on Escape or outside click
  useEffect(() => {
    if (!isMenuToggled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuToggled(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      const el = panelRef.current;
      if (el && !el.contains(e.target as Node)) setIsMenuToggled(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuToggled]);

  // Placeholder auth state & handlers (no real logic yet)
  //const user = null;
  const onSignIn = () => console.log("Sign In clicked");
  const onSignUp = () => console.log("Become a Member clicked");
  const onLogout = () => console.log("Logout clicked");

  const flexBetween = "flex items-center justify-between";
  const navbarBackground = isTopOfPage ? "" : "bg-primary-100 drop-shadow";

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} bg-gray-50 fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT: Logo (ensure file exists at /public/assets/Logo.png) */}
            <Link href={{ pathname: "/landing" }}>
              <div className="cursor-default">
                <Image
                  src="/assets/Logo.png"
                  alt="logo"
                  width={120}
                  height={32}
                  priority
                />
              </div>
            </Link>
            {/* RIGHT */}
            {isAboveMediumScreens ? (
              // Desktop
              <div className={`${flexBetween} w-full`}>
                <div className="flex items-center gap-8 text-sm">
                  <Link
                    className="hover:text-primary-500"
                    href={{ pathname: "/landing/payments" }}
                  >
                    Payments
                  </Link>
                  <Link
                    className="hover:text-primary-500"
                    href={{ pathname: "/landing/courses" }}
                  >
                    Courses
                  </Link>
                  <span className="hover:text-primary-500">Benefits</span>
                  <span className="hover:text-primary-500">Contact Us</span>
                </div>

                <div className="flex items-center gap-8">
                  {!user ? (
                    <>
                      <Link
                        href={{ pathname: "/auth/login" }}
                        className="hover:text-primary-500 text-sm"
                      >
                        Sign In
                      </Link>
                      <Link
                        className="bg-gray-600 rounded-md px-10 py-2 text-white"
                        href={{ pathname: "/auth/signup" }}
                      >
                        Become a Member
                      </Link>
                    </>
                  ) : (
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
                  )}
                </div>
              </div>
            ) : (
              // Mobile burger
              <button
                className="bg-secondary-500 rounded-full p-2"
                onClick={() => setIsMenuToggled((v) => !v)}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div
          ref={panelRef}
          className="bg-primary-100 fixed right-0 bottom-0 z-40 h-full w-[300px] drop-shadow-xl"
          aria-modal="true"
          role="dialog"
        >
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button
              onClick={() => setIsMenuToggled(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-10 text-sm">
            {user && (
              <span className="text-sm text-gray-700">Hi, {user.email}</span>
            )}

            <Link
              className="hover:text-primary-500"
              href={{ pathname: "/landing/payments" }}
            >
              Payments
            </Link>
            <Link
              className="hover:text-primary-500"
              href={{ pathname: "/landing/courses" }}
            >
              Courses
            </Link>
            <span className="hover:text-primary-500">Benefits</span>
            <span className="hover:text-primary-500">Contact Us</span>

            <div className="mt-6 flex flex-col items-start gap-4">
              {!user ? (
                <>
                  <Link
                    className="hover:text-primary-500"
                    href={{ pathname: "/auth/login" }}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="hover:text-primary-500"
                    href={{ pathname: "/auth/signup" }}
                  >
                    Become a Member
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => signOut()}
                    className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

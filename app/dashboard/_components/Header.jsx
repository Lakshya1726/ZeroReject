"use client";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [state, setState] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const path = usePathname();

  const navigation = [
    { title: "Home", path: "/" },
    { title: "How it works", path: "/#howitworks" },
    { title: "About Developer", path: "/aboutdeveloper" },
  ];

  const Brand = () => (
    <a href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
        <span className="text-white font-bold text-xl">Z</span>
      </div>
      <span className="text-2xl font-bold tracking-wider neon-text">ZeroReject</span>
    </a>
  );

  return (
    <div className="fixed top-0 w-full z-50 px-4 pt-4">
      <div className="max-w-screen-xl mx-auto glass rounded-2xl">
        <div className="flex items-center justify-between py-3 px-6">
          <div className="flex items-center gap-6">
            <Brand />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-8">
            <ul className="flex items-center space-x-6">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-gray-300 hover:text-cyan-400 font-medium transition-colors">
                  <a href={item.path}>{item.title}</a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {isSignedIn ? (
                <a
                  href="/dashboard"
                  className="px-6 py-2 text-white font-semibold rounded-full bg-white/10 hover:bg-white/20 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all backdrop-blur-md"
                >
                  Dashboard
                </a>
              ) : (
                <a
                  href="/sign-in"
                  className="px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
                >
                  Login
                </a>
              )}
              {isSignedIn && <UserButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-cyan-400 focus:outline-none"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {state && (
          <div className="md:hidden px-6 pb-4 pt-2 border-t border-white/10">
            <ul className="flex flex-col space-y-4">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a href={item.path} className="block text-gray-300 hover:text-cyan-400 font-medium">
                    {item.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                {isSignedIn ? (
                  <div className="flex items-center justify-between">
                    <a href="/dashboard" className="px-6 py-2 text-white font-semibold rounded-full bg-white/10 border border-white/20 text-center w-full mr-4">
                      Dashboard
                    </a>
                    <UserButton />
                  </div>
                ) : (
                  <a href="/sign-in" className="block w-full text-center px-6 py-2 text-white font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Login
                  </a>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

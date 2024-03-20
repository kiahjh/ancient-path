"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import { MenuIcon, ChevronLeftIcon } from "lucide-react";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import "@/styles/globals.css";
import GlobalNav from "@/components/GlobalNav";
import { roboto } from "@/lib/fonts";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import BottomBar from "@/components/AudioPlayer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Html from "@/components/Html";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
      setSidebarOpen(false);
    }
  }, []);

  return (
    <GlobalStateProvider>
      <Html>
        <body
          style={{
            backgroundImage: `url(${NoiseBg.src})`,
            backgroundSize: `200px`,
          }}
          className={cx(
            `flex flex-col h-dvh bg-cover bg-center bg-sky-100`,
            roboto,
          )}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cx(
              `w-10 h-10 rounded-full flex justify-center items-center absolute top-2 transition-[left,transform,background-color] duration-300 hover:bg-white z-30 backdrop-blur`,
              sidebarOpen
                ? `sm:left-60 left-[300px] bg-sky-100 sm:bg-sky-50`
                : `left-2 lg:rotate-180 bg-sky-200/50`,
            )}
          >
            <ChevronLeftIcon className="w-6 text-sky-500 hidden lg:block" />
            <MenuIcon className="w-6 text-sky-500 block lg:hidden" />
          </button>
          <div className="flex-grow flex">
            <div
              className={cx(
                `w-72 flex absolute lg:relative flex-col shrink-0 transition-[margin-left] duration-300 bg-sky-100 z-20 h-[calc(100vh-96px)]`,
                !sidebarOpen && `-ml-72`,
              )}
              style={{
                backgroundImage: `url(${NoiseBg.src})`,
                backgroundSize: `200px`,
              }}
            >
              <GlobalNav isMobile={isMobile} setOpen={setSidebarOpen} />
              <LanguageSwitcher />
            </div>
            <main
              className={cx(
                `flex-grow transition-[border-radius] duration-300 bg-sky-50 h-[calc(100vh-96px)] overflow-y-scroll relative`,
                sidebarOpen && `lg:rounded-bl-3xl`,
              )}
            >
              <div
                onClick={() => setSidebarOpen(false)}
                className={cx(
                  `lg:hidden w-full h-[calc(100vh-96px)] top-0 left-0 bg-white/70 z-10 transition-[opacity,backdrop-filter] duration-300 fixed`,
                  sidebarOpen
                    ? `opacity-100 backdrop-blur`
                    : `opacity-0 pointer-events-none`,
                )}
              />
              {children}
            </main>
          </div>
          <BottomBar />
        </body>
      </Html>
    </GlobalStateProvider>
  );
};

export default RootLayout;
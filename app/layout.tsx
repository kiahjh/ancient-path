"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import { MenuIcon, ChevronLeftIcon } from "lucide-react";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { roboto } from "@/lib/fonts";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import BottomBar from "@/components/AudioPlayer";
import SettingsPanel from "@/components/SettingsPanel";
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
            `flex flex-col h-screen bg-cover bg-center bg-sky-100 dark:bg-slate-900`,
            roboto,
          )}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cx(
              `w-10 h-10 rounded-full flex justify-center items-center absolute top-2 transition-[left,transform,background-color] duration-300 hover:bg-white dark:hover:bg-slate-950 z-30 backdrop-blur`,
              sidebarOpen
                ? `left-60 bg-sky-50 dark:bg-slate-800`
                : `left-2 rotate-180 bg-sky-200/50 dark:bg-slate-900`,
            )}
          >
            <ChevronLeftIcon className="w-6 text-sky-500 dark:text-sky-600 hidden lg:block" />
            <MenuIcon className="w-6 text-sky-500 dark:text-sky-600 block lg:hidden" />
          </button>
          <div className="flex-grow flex">
            <div
              className={cx(
                `w-72 flex absolute lg:relative flex-col justify-between shrink-0 transition-[margin-left] duration-300 bg-sky-100 dark:bg-slate-900 z-20 h-[calc(100vh-96px)]`,
                !sidebarOpen && `-ml-72`,
              )}
              style={{
                backgroundImage: `url(${NoiseBg.src})`,
                backgroundSize: `200px`,
              }}
            >
              <div>
                <GlobalNav isMobile={isMobile} setOpen={setSidebarOpen} />
              </div>
              <SettingsPanel />
            </div>
            <main
              className={cx(
                `flex-grow transition-[border-radius] duration-300 bg-sky-50 dark:bg-slate-950/70 h-[calc(100vh-96px)] overflow-scroll relative`,
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

"use client";

import React from "react";
import Script from "next/script";
import cx from "classnames";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { roboto } from "@/lib/fonts";
import GlobalStateProvider from "@/state/GlobalStateProvider";
import BottomBar from "@/components/BottomBar";
import SettingsPanel from "@/components/SettingsPanel";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <GlobalStateProvider>
      <html lang="TODO">
        <body
          style={{
            background: `#e0f2fe url(${NoiseBg.src})`,
            backgroundSize: `200px`,
          }}
          className={cx(
            `flex flex-col min-h-screen bg-cover bg-center`,
            roboto,
          )}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cx(
              `w-10 h-10 rounded-full flex justify-center items-center absolute top-2 transition-[left,transform,background-color] duration-300 hover:bg-white`,
              sidebarOpen
                ? `left-60 bg-sky-50`
                : `left-2 rotate-180 bg-sky-200/50`,
            )}
          >
            <ChevronLeftIcon className="w-6 text-sky-500" />
          </button>
          <div className="flex-grow flex">
            <div
              className={cx(
                `w-72 flex flex-col justify-between shrink-0 transition-[margin-left] duration-300`,
                !sidebarOpen && `-ml-72`,
              )}
            >
              <GlobalNav />
              <SettingsPanel />
            </div>
            <main
              className={cx(
                `flex-grow transition-[border-radius] duration-300 bg-sky-50 h-[calc(100vh-96px)] overflow-scroll`,
                sidebarOpen && `rounded-bl-3xl`,
              )}
            >
              {children}
            </main>
          </div>
          <BottomBar />
        </body>
        <Script src="https://kit.fontawesome.com/597740db7b.js" />
      </html>
    </GlobalStateProvider>
  );
};

export default RootLayout;

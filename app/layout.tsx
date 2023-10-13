"use client";

import React from "react";
import Script from "next/script";
import cx from "classnames";
import {
  BackwardIcon,
  ChevronLeftIcon,
  ForwardIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import NoiseBg from "@/public/chrome-bg-noise.svg";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { roboto } from "@/lib/fonts";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settingsPanelOpen, setSettingsPanelOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  return (
    <html lang="TODO">
      <div className="flex xl:hidden justify-center items-center h-screen">
        Coming soon: small screen support
      </div>
      <body
        style={{ background: `#e0f2fe url(${NoiseBg.src})` }}
        className={cx(
          `xl:flex flex-col min-h-screen bg-cover bg-center hidden`,
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
            <div>
              <div
                className={cx(
                  `mx-4 rounded-3xl flex flex-col transition-[background-color,height,padding] duration-300 overflow-hidden`,
                  settingsPanelOpen ? `h-60 bg-sky-300/30 p-2` : `h-12`,
                )}
              >
                <button
                  onClick={() => setSettingsPanelOpen(!settingsPanelOpen)}
                  className={cx(
                    `flex justify-between items-center h-12 transition-[background-color,padding,border-radius] duration-300 hover:bg-sky-300/20 active:bg-sky-300/40 shrink-0`,
                    settingsPanelOpen ? `px-4 rounded-2xl` : `px-6 rounded-3xl`,
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Cog6ToothIcon className="w-6 h-6 text-sky-500" />
                    <span className="font-medium text-sky-800/80">
                      Settings
                    </span>
                  </div>
                  <PlusIcon
                    className={cx(
                      `w-6 h-6 text-sky-500 transition-transform duration-300`,
                      settingsPanelOpen && `rotate-45`,
                    )}
                  />
                </button>
                <div className="text-center p-4 text-sky-800/50">
                  Coming soon: Spanish support and dark mode
                </div>
              </div>
            </div>
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
        <div className="h-24 flex items-center justify-between gap-8 pr-8">
          <div className="h-full w-72 flex items-center justify-center gap-4">
            <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
              <BackwardIcon className="w-8 ml-0.5 text-sky-500" />
            </button>
            <button
              onClick={() => alert(`Coming soon: audio streaming`)}
              className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center"
            >
              <PlayIcon className="w-6 text-white" />
            </button>
            <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
              <ForwardIcon className="w-8 ml-0.5 text-sky-500" />
            </button>
          </div>
        </div>
      </body>
      <Script src="https://kit.fontawesome.com/597740db7b.js"></Script>
    </html>
  );
};

export default RootLayout;

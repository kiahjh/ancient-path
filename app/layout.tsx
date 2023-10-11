"use client";

import React from "react";
import Script from "next/script";
import cx from "classnames";
import { BackwardIcon, ForwardIcon, PlayIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import NoiseBg from "@/public/noise.svg";
import "./globals.css";
import GlobalNav from "@/components/GlobalNav";
import { roboto } from "@/lib/fonts";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settingsPanelOpen, setSettingsPanelOpen] = React.useState(false);
  return (
    <html lang="TODO">
      <body
        style={{ background: `#e0f2fe url(${NoiseBg.src})` }}
        className={cx(`flex flex-col min-h-screen bg-cover bg-center`, roboto)}
      >
        <div className="flex-grow flex">
          <div className="w-72 flex flex-col justify-between shrink-0">
            <GlobalNav />
            <div>
              <div
                className={cx(
                  `mx-4 rounded-3xl flex flex-col transition-[background-color,height,padding] duration-300`,
                  settingsPanelOpen ? `h-60 bg-sky-300/30 p-2` : `h-12`,
                )}
              >
                <button
                  onClick={() => setSettingsPanelOpen(!settingsPanelOpen)}
                  className={cx(
                    `flex justify-between items-center h-12 transition-[background-color,padding,border-radius] duration-300 hover:bg-sky-300/20 active:bg-sky-300/40`,
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
              </div>
            </div>
          </div>
          <main className="flex-grow rounded-bl-3xl bg-sky-50">{children}</main>
        </div>
        <div className="h-24 flex items-center justify-between gap-8 pr-8">
          <div className="h-24 flex items-center justify-center gap-4 w-72">
            <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
              <BackwardIcon className="w-8 ml-0.5 text-sky-500" />
            </button>
            <button className="w-12 h-12 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-[background-color,transform] duration-200 flex justify-center items-center">
              <PlayIcon className="w-6 ml-0.5 text-white" />
            </button>
            <button className="w-14 h-10 rounded-2xl hover:bg-sky-200/60 flex justify-center items-center transition-[background-color,transform] duration-200 active:bg-sky-300/70 active:scale-95">
              <ForwardIcon className="w-8 ml-0.5 text-sky-500" />
            </button>
          </div>
          <div className="flex justify-center items-center gap-8">
            <Link
              href="/about"
              className="bg-sky-50 w-12 h-12 rounded-full flex justify-center items-center text-sky-600/60 hover:bg-white transition-colors duration-200"
            >
              <QuestionMarkCircleIcon className="w-7" />
            </Link>
            <Link
              href="/contact"
              className="bg-sky-50 w-12 h-12 rounded-full flex justify-center items-center text-sky-600/60 hover:bg-white transition-colors duration-200"
            >
              <ChatBubbleOvalLeftIcon className="w-6" />
            </Link>
          </div>
        </div>
      </body>
      <Script src="https://kit.fontawesome.com/597740db7b.js"></Script>
    </html>
  );
};

export default RootLayout;

"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import ToggleSwitch from "./ToggleSwitch";
import { useGlobalState } from "@/lib/hooks";
import { setLanguageCookie } from "@/app/actions";
import { useAlternateLanguageNavigation } from "@/lib/hooks";
import { initializeLanguage } from "@/app/actions";

const SettingsPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  const renavigate = useAlternateLanguageNavigation();

  useEffect(() => {
    initializeLanguage().then((lang) => {
      dispatch({ type: `setLanguage`, language: lang });
    });
  }, [dispatch]);

  return (
    <div
      className={cx(
        `mx-4 rounded-3xl flex flex-col transition-[background-color,height,padding] duration-300 overflow-hidden`,
        open ? `h-60 bg-sky-300/30 dark:bg-sky-500/20 p-2` : `h-12`,
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cx(
          `flex justify-between items-center h-12 transition-[background-color,padding,border-radius] duration-300 hover:bg-sky-300/20 dark:hover:bg-sky-500/20 active:bg-sky-300/40 dark:active:bg-sky-500/30 shrink-0`,
          open ? `px-4 rounded-2xl` : `px-6 rounded-3xl`,
        )}
      >
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="w-6 h-6 text-sky-500 dark:text-sky-400" />
          <span className="font-medium text-sky-800/80 dark:text-sky-400">
            Settings
          </span>
        </div>
        <PlusIcon
          className={cx(
            `w-6 h-6 text-sky-500 transition-transform duration-300`,
            open && `rotate-45`,
          )}
        />
      </button>
      <div className="text-center p-4 text-sky-800/50 dark:text-sky-500 flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center gap-3">
          <span>English</span>
          <ToggleSwitch
            checked={state.language === `es`}
            onClick={async () => {
              await setLanguageCookie(state.language === `en` ? `es` : `en`);
              renavigate();
              dispatch({
                type: `setLanguage`,
                language: state.language === `en` ? `es` : `en`,
              });
            }}
          />
          <span>Español</span>
        </div>
      </div>
    </div>
  );
};
export default SettingsPanel;

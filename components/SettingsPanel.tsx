"use client";

import React, { useState } from "react";
import cx from "classnames";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import ToggleSwitch from "./ToggleSwitch";
import { useGlobalState } from "@/state/hooks";
import { setLanguageCookie } from "@/app/actions";

const SettingsPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  return (
    <div
      className={cx(
        `mx-4 rounded-3xl flex flex-col transition-[background-color,height,padding] duration-300 overflow-hidden`,
        open ? `h-60 bg-sky-300/30 p-2` : `h-12`,
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className={cx(
          `flex justify-between items-center h-12 transition-[background-color,padding,border-radius] duration-300 hover:bg-sky-300/20 active:bg-sky-300/40 shrink-0`,
          open ? `px-4 rounded-2xl` : `px-6 rounded-3xl`,
        )}
      >
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="w-6 h-6 text-sky-500" />
          <span className="font-medium text-sky-800/80">Settings</span>
        </div>
        <PlusIcon
          className={cx(
            `w-6 h-6 text-sky-500 transition-transform duration-300`,
            open && `rotate-45`,
          )}
        />
      </button>
      <div className="text-center p-4 text-sky-800/50 flex flex-col items-center justify-center flex-grow">
        <div className="flex items-center gap-3">
          <span>English</span>
          <ToggleSwitch
            checked={state.language === `es`}
            onClick={async () => {
              await setLanguageCookie(state.language === `en` ? `es` : `en`);
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

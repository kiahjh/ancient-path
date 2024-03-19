"use client";

import React, { useEffect } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { useGlobalState } from "@/lib/hooks";
import { setLanguageCookie } from "@/app/actions";
import { useAlternateLanguageNavigation } from "@/lib/hooks";
import { initializeLanguage } from "@/app/actions";

const LanguageSwitcher: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const renavigate = useAlternateLanguageNavigation();

  useEffect(() => {
    initializeLanguage().then((lang) => {
      dispatch({
        type: `initialLanguageLoaded`,
        language: lang,
        from: {
          component: `SettingsPanel`,
          context: `useEffect()`,
        },
      });
    });
  }, [dispatch]);

  return (
    <div className="flex justify-center mt-4 items-center gap-3 text-sky-700">
      <span>English</span>
      <ToggleSwitch
        checked={state.language === `es`}
        onClick={async () => {
          await setLanguageCookie(state.language === `en` ? `es` : `en`);
          renavigate();
          dispatch({
            type: `languageToggleClicked`,
            language: state.language === `en` ? `es` : `en`,
            from: {
              component: "SettingsPanel",
              context: "ToggleSwitch onClick()",
            },
          });
        }}
      />
      <span>Español</span>
    </div>
  );
};
export default LanguageSwitcher;

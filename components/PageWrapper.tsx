import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { LanguageContext } from '../lib/LanguageContext';
import { ThemeContext } from '../lib/ThemeContext';
import { Lang, Theme } from '../lib/types';
import BaseHead from './BaseHead';
import Chrome from './Chrome';

type Props = {
  children: React.ReactNode;
  language: Lang;
  theme?: Theme;
  title: string;
  metaDescription: string;
} & (
  | { withChrome: false }
  | { withChrome: true; smallFooter?: boolean; page: string; redirectTo: string }
);

const PageWrapper: React.FC<Props> = (props) => {
  const [lang, setLang] = useState<Lang>(props.language);
  const [theme, setTheme] = useState<Theme>(props.theme || 'light');

  useEffect(() => {
    const themeCookie = getCookie('theme');
    if (themeCookie === 'dark' || themeCookie === 'light') {
      setTheme(themeCookie);
    }
  }, [theme]);

  return (
    <LanguageContext.Provider value={lang}>
      <ThemeContext.Provider value={theme}>
        <BaseHead description={props.metaDescription} title={props.title} />
        <main className={theme}>
          {props.withChrome ? (
            <Chrome
              page={props.page}
              language={lang}
              setLanguage={setLang}
              theme={theme}
              setTheme={setTheme}
              redirectTo={props.redirectTo}
              smallFooter={props.smallFooter}
            >
              {props.children}
            </Chrome>
          ) : (
            props.children
          )}
        </main>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default PageWrapper;

import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { LanguageContext } from '../lib/LanguageContext';
import { Lang, Theme } from '../lib/types';
import BaseHead from './BaseHead';
import Chrome from './Chrome';

type Props = {
  children: React.ReactNode;
  language: Lang;
  title: string;
  metaDescription: string;
} & (
  | { withChrome: false }
  | { withChrome: true; smallFooter?: boolean; page: string; redirectTo: string }
);

const PageWrapper: React.FC<Props> = (props) => {
  const [lang, setLang] = useState<Lang>(props.language);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const themeCookie = getCookie('theme');
    if (themeCookie === 'dark' || themeCookie === 'light') {
      setTheme(themeCookie);
    } else {
      setTheme(`system`);
    }
  }, [theme]);

  return (
    <LanguageContext.Provider value={lang}>
      <BaseHead description={props.metaDescription} title={props.title} />
      <main>
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
    </LanguageContext.Provider>
  );
};

export default PageWrapper;

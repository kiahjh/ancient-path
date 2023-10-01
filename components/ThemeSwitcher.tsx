import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import cx from 'classnames';
import { Lang, Theme } from '../lib/types';
import { deleteCookie, setCookie } from 'cookies-next';

interface Props {
  theme: Theme;
  setTheme(arg: Theme): void;
  language: Lang;
}

const ThemeSwitcher: React.FC<Props> = ({ setTheme, theme, language }) => {
  function changeTheme(arg: Theme): () => void {
    return () => {
      setTheme(arg);
      if (arg === 'system') {
        deleteCookie(`theme`);
      } else {
        setCookie('theme', arg, {
          maxAge: 60 * 60 * 24 * 365, // one year
        });
      }
      if (arg === 'dark') {
        document.querySelector('html')?.classList.add('dark');
      } else if (arg === 'light') {
        document.querySelector('html')?.classList.remove('dark');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector('html')?.classList.add('dark');
      } else {
        document.querySelector('html')?.classList.remove('dark');
      }
    };
  }

  const icon = (() => {
    switch (theme) {
      case `light`:
        return `sun`;
      case `dark`:
        return `moon`;
      case `system`:
        return `desktop`;
    }
  })();

  return (
    <Menu>
      <Menu.Button className="rounded-full border-[0.5px] border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 shadow-md shadow-slate-300/50 w-12 h-12 flex justify-center items-center transition duration-100 hover:bg-sky-50 dark:hover:bg-slate-700 outline-none focus:border-sky-500 dark:focus:border-sky-500">
        <i
          className={cx(
            'fa-solid text-xl text-sky-400 dark:text-sky-500 transition duration-100',
            `fa-${icon}`,
          )}
        />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0 -translate-y-1"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="border-[0.5px] dark:border-slate-700 flex flex-col absolute mt-2 z-50 rounded-xl shadow-xl bg-white dark:bg-slate-800 right-0 md-lg:right-auto outline-none p-1.5">
          <Menu.Item>
            {({ active }) => (
              <button
                className={cx(
                  active && 'bg-slate-50 dark:bg-slate-700/50',
                  'px-4 py-2 flex items-center rounded-xl',
                )}
                onClick={changeTheme('light')}
              >
                <div className="w-8 shrink-0 flex justify-center items-center">
                  <i className="fa-solid fa-sun mr-4 text-slate-500" />
                </div>
                <span className="shrink-0 font-medium text-slate-800 dark:text-slate-300">
                  {language === 'en' ? 'Light' : 'Claro'}
                </span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={cx(
                  active && 'bg-slate-50 dark:bg-slate-700/50',
                  'px-4 py-2 flex items-center rounded-xl',
                )}
                onClick={changeTheme('dark')}
              >
                <div className="w-8 shrink-0 flex justify-center items-center">
                  <i className="fa-solid fa-moon mr-4 text-slate-500" />
                </div>
                <span className="shrink-0 font-medium text-slate-800 dark:text-slate-300">
                  {language === 'en' ? 'Dark' : 'Oscuro'}
                </span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={cx(
                  active && 'bg-slate-50 dark:bg-slate-700/50',
                  'px-4 py-2 flex items-center rounded-xl',
                )}
                onClick={changeTheme('system')}
              >
                <div className="w-8 shrink-0 flex justify-center items-center">
                  <i className="fa-solid fa-desktop mr-4 text-slate-500" />
                </div>
                <span className="shrink-0 font-medium text-slate-800 dark:text-slate-300">
                  {language === 'en' ? 'System' : 'Sistema'}
                </span>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ThemeSwitcher;

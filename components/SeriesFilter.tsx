import { Menu, Transition } from '@headlessui/react';
import cx from 'classnames';
import { Lang, Post } from '../lib/types';

interface Props {
  series: Array<{ id: string; title: string }>;
  setSeriesFilter: (series: string | null) => any;
  seriesFilter: string | null;
  language: Lang;
}

const SeriesFilter: React.FC<Props> = ({
  series,
  setSeriesFilter,
  seriesFilter,
  language, // TODO
}) => {
  const selectedSeriesTitle = series.find((s) => s.id === seriesFilter)?.title;
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="border-[0.5px] border-slate-200 shadow shadow-slate-300/50 px-4 text-slate-400 font-medium text-lg rounded-2xl bg-white w-64 flex items-center justify-between hover:bg-slate-50 transition-colors duration-100">
            {selectedSeriesTitle || 'All series'}
            <i
              className={cx(
                'fas fa-chevron-down ml-4 transition-transform duration-150 text-slate-300',
                open && `-rotate-180`,
              )}
            />
          </Menu.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute border-[0.5px] border-slate-200 shadow-xl bg-white top-16 right-0 z-20 p-1.5 rounded-2xl flex flex-col w-52 outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={cx(
                      `px-4 py-3 rounded-2xl font-medium text-slate-500 transition-colors duration-100 flex justify-between items-center`,
                      active && 'bg-slate-50',
                      seriesFilter === null && 'bg-sky-50 hover:!bg-sky-100',
                    )}
                    onClick={() => setSeriesFilter(null)}
                  >
                    <span className={cx(seriesFilter === null && `text-sky-500`)}>
                      All series
                    </span>
                    {seriesFilter === null && (
                      <i className="fa-solid fa-check text-sky-500" />
                    )}
                  </button>
                )}
              </Menu.Item>
              {series.map((s) => (
                <Menu.Item key={s.id}>
                  {({ active }) => (
                    <button
                      className={cx(
                        `px-4 py-3 rounded-2xl font-medium text-slate-500 transition-colors duration-100 flex justify-between items-center`,
                        active && 'bg-slate-50',
                        s.id === seriesFilter && 'bg-sky-50 hover:!bg-sky-100',
                      )}
                      onClick={() => setSeriesFilter(s.id)}
                    >
                      <span className={cx(s.id === seriesFilter && `text-sky-500`)}>
                        {s.title}
                      </span>
                      {s.id === seriesFilter && (
                        <i className="fa-solid fa-check text-sky-500" />
                      )}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default SeriesFilter;

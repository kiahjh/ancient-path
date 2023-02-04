import { Lang } from './types';

export const englishMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const spanishMonths = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const rtf_en = new Intl.RelativeTimeFormat(`en`, { numeric: `auto` });
const rtf_es = new Intl.RelativeTimeFormat(`es`, { numeric: `auto` });

export function relativeTime(isoOrDate: Date | string, language: Lang): string {
  const date = typeof isoOrDate === `string` ? new Date(isoOrDate) : isoOrDate;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const UNITS = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    week: 24 * 60 * 60 * 1000 * 7,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  } as const;
  for (const [unit, num] of Object.entries(UNITS)) {
    if (Math.abs(diff) > num || unit === `second`) {
      return language === 'en'
        ? rtf_en.format(-Math.round(diff / num), unit as any)
        : rtf_es.format(-Math.round(diff / num), unit as any);
    }
  }
  return `just now`;
}

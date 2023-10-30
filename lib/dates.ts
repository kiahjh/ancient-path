import type { Language } from "./types";

const rtf_en = new Intl.RelativeTimeFormat(`en`, { numeric: `auto` });
const rtf_es = new Intl.RelativeTimeFormat(`es`, { numeric: `auto` });

export function relativeTime(
  isoOrDate: Date | string,
  language: Language,
): string {
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
      return language === `en`
        ? rtf_en.format(-Math.round(diff / num), unit as any) // eslint-disable-line
        : rtf_es.format(-Math.round(diff / num), unit as any); // eslint-disable-line
    }
  }
  return `just now`;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hours ? `${hours}:` : ``}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${secs < 10 ? `0${secs}` : secs}`;
}

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

export function formatShort(iso: string, language: Language): string {
  const date = new Date(iso);
  if (language === `en`) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  } else {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}

// cosmic dates come as full ISO8601 for created_at, published_at, etc,
// but our override_published_at fields are just YYYY-MM-DD, so we handle both
export function toRfc822Date(dateStr: string): string {
  const date = new Date(
    dateStr.length === 10 ? dateStr + `T12:00:00Z` : dateStr,
  );
  const days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  const months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`,
  ];
  const day = days[date.getUTCDay()];
  const dayNum = String(date.getUTCDate()).padStart(2, `0`);
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, `0`);
  const minutes = String(date.getUTCMinutes()).padStart(2, `0`);
  const seconds = String(date.getUTCSeconds()).padStart(2, `0`);
  return `${day}, ${dayNum} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

import { afterEach, describe, expect, it, vi } from "vitest";
import type { AudiobookTrack } from "../types";
import {
  loadAudiobookProgress,
  saveAudiobookProgress,
} from "../audiobook-progress";

const audiobook: AudiobookTrack = {
  id: `power-of-the-gospel`,
  title: `The Power of the Gospel`,
  mp3Url: `https://example.com/audiobook.mp3`,
  duration: 5287,
  language: `en`,
  href: `/books#power-of-the-gospel`,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe(`audiobook progress`, () => {
  it(`restores saved progress`, () => {
    const storage = localStorageStub();
    vi.stubGlobal(`window`, { localStorage: storage });

    saveAudiobookProgress(audiobook, 123.5);

    expect(loadAudiobookProgress(audiobook)).toBe(123.5);
  });

  it(`starts a finished audiobook from the beginning`, () => {
    const storage = localStorageStub();
    vi.stubGlobal(`window`, { localStorage: storage });

    saveAudiobookProgress(audiobook, audiobook.duration - 10);

    expect(loadAudiobookProgress(audiobook)).toBe(0);
  });

  it(`keeps languages and books separate`, () => {
    const storage = localStorageStub();
    vi.stubGlobal(`window`, { localStorage: storage });
    const spanishAudiobook: AudiobookTrack = {
      ...audiobook,
      language: `es`,
    };

    saveAudiobookProgress(audiobook, 100);
    saveAudiobookProgress(spanishAudiobook, 200);

    expect(loadAudiobookProgress(audiobook)).toBe(100);
    expect(loadAudiobookProgress(spanishAudiobook)).toBe(200);
  });
});

function localStorageStub(): Storage {
  const values = new Map<string, string>();
  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value),
  };
}

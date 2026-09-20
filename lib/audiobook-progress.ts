import type { AudiobookTrack } from "./types";

const progressKey = (track: AudiobookTrack): string =>
  `ancient-path:audiobook-progress:${track.language}:${track.id}`;

export function loadAudiobookProgress(track: AudiobookTrack): number {
  if (typeof window === `undefined`) return 0;

  try {
    const progress = Number(window.localStorage.getItem(progressKey(track)));
    if (!Number.isFinite(progress) || progress <= 0) return 0;

    // A finished book should start from the beginning when it is played again.
    return progress < track.duration - 15 ? progress : 0;
  } catch {
    return 0;
  }
}

export function saveAudiobookProgress(
  track: AudiobookTrack,
  progress: number,
): void {
  if (typeof window === `undefined` || !Number.isFinite(progress)) return;

  try {
    if (progress >= track.duration - 15) {
      window.localStorage.removeItem(progressKey(track));
    } else {
      window.localStorage.setItem(progressKey(track), String(progress));
    }
  } catch {
    // Playback should continue even when storage is unavailable.
  }
}

import type { Language } from "@/lib/types";

export interface State {
  audio: {
    source: string | null;
    title: string | null;
    slug: string | null;
    postType: "post" | "teaching" | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    muted: boolean;
    playbackRate: 1 | 1.25 | 1.5 | 2;
  };
  language: Language;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export const initialState: State = {
  audio: {
    source: null,
    title: null,
    slug: null,
    postType: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    muted: false,
    playbackRate: 1,
  },
  language: `en`,
  sidebarOpen: true,
  isMobile: false,
};

export type Action =
  | {
      type: "setAudio";
      source: string;
      title: string;
      slug: string;
      postType: "post" | "teaching";
    }
  | { type: "setAudioDuration"; duration: number }
  | { type: "toggleAudioPlaying" }
  | { type: "toggleAudioMuted" }
  | { type: "setCurrentTime"; time: number }
  | { type: "setLanguage"; language: Language }
  | { type: `setIsMobile`; isMobile: boolean }
  | { type: `toggleSidebarOpen` };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case `setAudio`:
      return {
        ...state,
        audio: {
          ...state.audio,
          source: action.source,
          title: action.title,
          slug: action.slug,
          postType: action.postType,
        },
      };
    case `setAudioDuration`:
      return {
        ...state,
        audio: {
          ...state.audio,
          duration: action.duration,
        },
      };
    case `toggleAudioPlaying`:
      return {
        ...state,
        audio: {
          ...state.audio,
          isPlaying: !state.audio.isPlaying,
        },
      };
    case `toggleAudioMuted`:
      return {
        ...state,
        audio: {
          ...state.audio,
          muted: !state.audio.muted,
        },
      };
    case `setCurrentTime`:
      return {
        ...state,
        audio: {
          ...state.audio,
          currentTime: action.time,
        },
      };
    case `setLanguage`:
      return {
        ...state,
        language: action.language,
      };
    case `setIsMobile`:
      return {
        ...state,
        isMobile: action.isMobile,
      };
    case `toggleSidebarOpen`:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
  }
}

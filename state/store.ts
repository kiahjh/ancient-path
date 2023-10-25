import type { Language } from "@/lib/types";

export interface State {
  audio: {
    source: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    muted: boolean;
    playbackRate: 1 | 1.25 | 1.5 | 2;
  };
  language: Language;
}

export const initialState: State = {
  audio: {
    source: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    muted: false,
    playbackRate: 1,
  },
  language: `en`,
};

export type Action =
  | { type: "setAudioSource"; source: string }
  | { type: "setAudioDuration"; duration: number }
  | { type: "toggleAudioPlaying" }
  | { type: "toggleAudioMuted" }
  | { type: "setCurrentTime"; time: number }
  | { type: "setLanguage"; language: Language };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case `setAudioSource`:
      return {
        ...state,
        audio: {
          ...state.audio,
          source: action.source,
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
  }
}

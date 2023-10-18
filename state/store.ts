export interface State {
  audio: {
    source: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    muted: boolean;
    playbackRate: 1 | 1.25 | 1.5 | 2;
  };
}

export const initialState: State = {
  audio: {
    source: `https://cdn.cosmicjs.com/9390ebd0-5e35-11ee-b975-cb0cfadd93ad-Law-and-Grace-03.mp3`,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    muted: false,
    playbackRate: 1,
  },
};

export type Action =
  | { type: "setAudioSource"; source: string }
  | { type: "setAudioDuration"; duration: number }
  | { type: "toggleAudioPlaying" }
  | { type: "toggleAudioMuted" }
  | { type: "setCurrentTime"; time: number };

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
  }
}

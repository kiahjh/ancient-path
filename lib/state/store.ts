import type { Language, Post } from "@/lib/types";

export interface State {
  audio: {
    isPlaying: boolean;
    currentTime: number;
    post: Post;
  } | null;
  cachedPost: Post | null;
  language: Language;
  sidebarOpen: boolean;
  isMobile: boolean;
}

export const initialState: State = {
  audio: null,
  cachedPost: null,
  language: `en`,
  sidebarOpen: true,
  isMobile: false,
};

export type ActionType =
  | { type: `playButtonClicked`; audio?: State[`audio`] } // specify audio if it's changing
  | { type: `audioTimeUpdated`; time: number }
  | { type: `skip15sClicked` }
  | { type: `skip15sBackClicked` }
  | { type: `initialLanguageLoaded`; language: Language }
  | { type: `languageToggleClicked`; language: Language }
  | { type: `sidebarToggled` }
  | { type: `cachePost`; post: Post };

export type Action = ActionType & {
  from: {
    component: string;
    context: string;
  };
};

export function reducer(state: State, action: Action): State {
  log(
    `💥 "${action.type}" from ${action.from.context} in <${action.from.component}/>`,
  );
  switch (action.type) {
    case `playButtonClicked`:
      return handlePlayButtonClick(state, action.audio);
    case `audioTimeUpdated`:
      return updateAudioTime(state, action.time);
    case `skip15sClicked`:
      return skip15sClicked(state, `forwards`);
    case `skip15sBackClicked`:
      return skip15sClicked(state, `backwards`);
    case `initialLanguageLoaded`:
      return setLanguage(state, action.language);
    case `languageToggleClicked`:
      return setLanguage(state, action.language);
    case `sidebarToggled`:
      return toggleSidebar(state);
    case `cachePost`:
      return cachePost(state, action.post);
  }
}

// handlers

function handlePlayButtonClick(state: State, audio?: State[`audio`]): State {
  if (state.audio) {
    if (audio) {
      return {
        ...state,
        audio,
      };
    } else {
      return {
        ...state,
        audio: {
          ...state.audio,
          isPlaying: !state.audio.isPlaying,
        },
      };
    }
  } else {
    if (audio) {
      return {
        ...state,
        audio,
      };
    } else {
      return state;
    }
  }
}

function updateAudioTime(state: State, time: number): State {
  if (state.audio === null) return state;
  return {
    ...state,
    audio: {
      ...state.audio,
      currentTime: time,
    },
  };
}

function skip15sClicked(
  state: State,
  direction: "forwards" | "backwards",
): State {
  if (state.audio === null) return state;
  return {
    ...state,
    audio: {
      ...state.audio,
      currentTime:
        direction === `forwards`
          ? state.audio.currentTime + 15
          : state.audio.currentTime - 15,
    },
  };
}

function setLanguage(state: State, language: Language): State {
  return {
    ...state,
    language,
  };
}

function toggleSidebar(state: State): State {
  return {
    ...state,
    sidebarOpen: !state.sidebarOpen,
  };
}

function cachePost(state: State, post: Post): State {
  return {
    ...state,
    cachedPost: post,
  };
}

// helpers

function log(text: string): void {
  if (process.env.NODE_ENV === `development`) {
    console.log(
      `%c${text}`,
      `color:white;background:#383838;border-radius:8px;padding:8px`,
    );
  }
}

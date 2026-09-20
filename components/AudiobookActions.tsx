"use client";

import { CirclePauseIcon, CirclePlayIcon, DownloadIcon } from "lucide-react";
import React from "react";
import type { AuthoredBookAudio, AuthoredBookId } from "@/lib/authored-books";
import type { AudiobookTrack, Language } from "@/lib/types";
import Button from "./Button";
import { loadAudiobookProgress } from "@/lib/audiobook-progress";
import { useGlobalState } from "@/lib/hooks";

interface Props {
  bookId: AuthoredBookId;
  title: string;
  language: Language;
  audio: AuthoredBookAudio;
}

const AudiobookActions: React.FC<Props> = ({
  bookId,
  title,
  language,
  audio: audiobookFile,
}) => {
  const { state, dispatch } = useGlobalState();
  const selected =
    state.audio?.type === `audiobook` &&
    state.audio.audiobook.mp3Url === audiobookFile.mp3Url;
  const playing = Boolean(selected && state.audio?.isPlaying);

  const audiobook: AudiobookTrack = {
    id: bookId,
    title,
    mp3Url: audiobookFile.mp3Url,
    duration: audiobookFile.duration,
    language,
    href: `${language === `en` ? `/books` : `/libros`}#${bookId}`,
  };

  return (
    <>
      <Button
        type="button"
        color="secondary"
        icon={playing ? CirclePauseIcon : CirclePlayIcon}
        iconOnLeft
        onClick={() => {
          if (selected) {
            dispatch({
              type: `playButtonClicked`,
              from: {
                component: `AudiobookActions`,
                context: `listen button onClick()`,
              },
            });
          } else {
            dispatch({
              type: `playButtonClicked`,
              audio: {
                isPlaying: true,
                currentTime: loadAudiobookProgress(audiobook),
                type: `audiobook`,
                audiobook,
              },
              from: {
                component: `AudiobookActions`,
                context: `listen button onClick()`,
              },
            });
          }
        }}
      >
        {language === `en`
          ? playing
            ? `Pause audio`
            : `Listen to audio`
          : playing
            ? `Pausar audio`
            : `Escuchar audio`}
      </Button>
      <Button
        type="link"
        to={`/api/download-audiobook/${bookId}/${language}`}
        download={audiobookFile.fileName}
        color="secondary"
        icon={DownloadIcon}
        iconOnLeft
      >
        {language === `en` ? `Download audio` : `Descargar audio`}
      </Button>
    </>
  );
};

export default AudiobookActions;

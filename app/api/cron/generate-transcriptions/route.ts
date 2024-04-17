import { NextResponse } from "next/server";
import { getAllMeetingAudios } from "@/lib/get-data";

export async function GET() {
  console.log(`Checking for meeting audios that need a transcription...`);

  const meetingAudios = await getAllMeetingAudios();
  const meetingAudiosWithoutTranscription = meetingAudios.filter(
    (audio) => audio.transcription === null,
  );

  console.log(
    `Found ${meetingAudiosWithoutTranscription.length} meeting audio(s) without a transcription.`,
  );

  if (meetingAudiosWithoutTranscription.length === 0) {
    console.log(`All meeting audios have already been transcribed.`);
    return NextResponse.json({ ok: true });
  }

  meetingAudiosWithoutTranscription.forEach((audio) => {
    console.log(`Transcribing meeting audio: ${audio.title}`);

    // TODO

    console.log(`✅ Transcribed meeting audio: ${audio.title}`);
  });

  console.log(`All meeting audios have been transcribed.`);

  return NextResponse.json({ ok: true });
}

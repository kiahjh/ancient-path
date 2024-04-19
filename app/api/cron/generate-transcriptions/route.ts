// at the end of every day, check all meeting audios for a transcription. if any don't have one, that means that they were just added that day. for those audios, download the mp3, feed it to whisper to get a transcription, and then update the entity on cosmic with the transcription.

import fs from "fs";
import * as stream from "stream";
import { promisify } from "util";
import OpenAI from "openai";
import axios from "axios";
import { NextResponse } from "next/server";
import { createBucketClient } from "@cosmicjs/sdk";
import type { NextRequest } from "next/server";
import { getAllMeetingAudios } from "@/lib/get-data";

const finished = promisify(stream.finished);

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG ?? ``,
  readKey: process.env.COSMIC_READ_KEY ?? ``,
  writeKey: process.env.COSMIC_WRITE_KEY ?? ``,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (
    req.headers.get(`Authorization`) !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    console.log(`attempted unauthorized access to cron job`);
    return new Response(`Unauthorized`, { status: 401 });
  }

  console.log(`Checking for meeting audios that need a transcription...`);

  const meetingAudios = await getAllMeetingAudios();
  const meetingAudiosWithoutTranscription = meetingAudios.filter(
    (audio) => !audio.transcription,
  );

  console.log(
    `Found ${meetingAudiosWithoutTranscription.length} meeting audio(s) without a transcription: ${meetingAudiosWithoutTranscription.map((audio) => `"${audio.title}"`).join(`, `)}`,
  );

  if (meetingAudiosWithoutTranscription.length === 0) {
    console.log(`All meeting audios have already been transcribed.`);
    return NextResponse.json({ ok: true });
  } else {
    console.log(`Transcribing meeting audio(s)...\n`);
  }

  // I know this isn't performant, but it should only ever be one at a time
  meetingAudiosWithoutTranscription.forEach((audio) => {
    console.log(`Starting transcription for "${audio.title}"...`);

    const fileName = `./app/api/cron/generate-transcriptions/tmp/${audio.slug}.mp3`;

    // create empty file
    fs.writeFileSync(fileName, ``);

    // download file, transcribe, update cosmic
    downloadFile(audio.mp3Url, fileName)
      .then(() => {
        console.log(`✔︎ Downloaded "${audio.title}"`);
        return openai.audio.transcriptions.create({
          file: fs.createReadStream(fileName),
          model: `whisper-1`,
          response_format: `verbose_json`,
          timestamp_granularities: [`word`, `segment`],
        });
      })
      .then((transcription) => {
        console.log(`✔︎ Transcribed "${audio.title}"`);
        return cosmic.objects.updateOne(audio.id, {
          metadata: {
            transcription,
          },
        });
      })
      .then(() => {
        console.log(`✔︎ Updated "${audio.title}"`);
      });
  });

  return NextResponse.json({ ok: true });
}

async function downloadFile(
  fileUrl: string,
  outputLocationPath: string,
): Promise<void> {
  const writer = fs.createWriteStream(outputLocationPath);
  return axios({
    method: `get`,
    url: fileUrl,
    responseType: `stream`,
  }).then((response) => {
    response.data.pipe(writer);
    return finished(writer);
  });
}

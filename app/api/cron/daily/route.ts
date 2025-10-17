import { NextResponse } from "next/server";
import { createBucketClient } from "@cosmicjs/sdk";
import type { NextRequest } from "next/server";
import type { Post, Series } from "@/lib/types";
import { getAllPosts, getAllSeries, getRssFeed } from "@/lib/get-data";
import { podcastXml } from "@/lib/podcast";

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG ?? ``,
  readKey: process.env.COSMIC_READ_KEY ?? ``,
  writeKey: process.env.COSMIC_WRITE_KEY ?? ``,
});

export const revalidate = 0;

export async function GET(req: NextRequest) {
  if (
    req.headers.get(`Authorization`) !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    console.log(`attempted unauthorized access to cron job`);
    return new Response(`Unauthorized`, { status: 401 });
  }

  const posts = await getAllPosts();
  const series = await getAllSeries();
  generatePodcastRss(posts, series);

  return NextResponse.json({ ok: true });
}

async function generatePodcastRss(posts: Array<Post>, series: Array<Series>) {
  console.log(`🫛 Generating podcast rss feeds...`);
  const enXml = podcastXml(`en`, posts, series);
  const esXml = podcastXml(`es`, posts, series);
  const englishRSS = await getRssFeed(`english-rss`);
  const spanishRSS = await getRssFeed(`spanish-rss`);

  if (!englishRSS || !spanishRSS) {
    console.error(`💥 Failed to get rss feeds from cosmic`);
    return;
  }

  try {
    cosmic.objects.updateOne(englishRSS.id, {
      metadata: {
        rss: enXml,
      },
    });
    cosmic.objects.updateOne(spanishRSS.id, {
      metadata: {
        rss: esXml,
      },
    });
  } catch (err) {
    console.error(`💥 Failed to update rss feeds on cosmic with error:`, err);
    return;
  }
}

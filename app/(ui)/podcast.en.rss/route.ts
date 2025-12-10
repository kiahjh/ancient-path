import { NextResponse } from "next/server";
import * as cosmic from "@/lib/get-data";
import { podcastXml } from "@/lib/podcast";

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  const posts = await cosmic.getPostsForRSS();
  const series = await cosmic.getAllSeries();
  const xml = podcastXml(`en`, posts, series);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": `application/rss+xml`,
    },
  });
}

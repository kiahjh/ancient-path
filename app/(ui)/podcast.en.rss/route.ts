import { NextResponse } from "next/server";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import { podcastXml } from "@/lib/podcast";

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  const posts = await getAllPosts();
  const series = await getAllSeries();
  const xml = podcastXml(`en`, posts, series);
  return new NextResponse(xml, {
    headers: {
      "Content-Type": `application/rss+xml`,
    },
  });
}

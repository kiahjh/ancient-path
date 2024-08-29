import { NextResponse } from "next/server";
import { getRssFeed } from "@/lib/get-data";

export const revalidate = 3600;

export async function GET() {
  const rss = await getRssFeed(`spanish-rss`);
  return new NextResponse(rss?.rss);
}

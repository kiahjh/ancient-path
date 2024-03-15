import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getAllSeries, getSeries } from "@/lib/get-data";
import SeriesPageTemplate from "@/components/templates/SeriesPageTemplate";

export async function generateMetadata(arg: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = await getSeries(`en`, arg.params.slug);
  if (!series) return notFound();

  const title = `Series: ${series.en.title} | The Ancient Path`;
  const description = `Series: ${series.en.title} - ${series.en.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const SeriesPage: React.FC<{ params: { slug: string } }> = async ({
  params,
}) => {
  const series = (await getAllSeries()).find((s) => s.en.slug === params.slug);
  if (!series) return notFound();
  const seriesPosts = (await getAllPosts()).filter(
    (post) => post.series === series.id,
  );
  return (
    <SeriesPageTemplate series={series} language="en" posts={seriesPosts} />
  );
};

export default SeriesPage;

import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as cosmic from "@/lib/get-data";
import SeriesPageTemplate from "@/components/templates/SeriesPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(arg: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = await cosmic.getSeriesBySlug(`en`, arg.params.slug);
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
  const series = await cosmic.getSeriesBySlug(`en`, params.slug);
  if (!series) return notFound();
  const seriesPosts = await cosmic.getPostsBySeriesId(series.id);
  return (
    <SeriesPageTemplate series={series} language="en" posts={seriesPosts} />
  );
};

export default SeriesPage;

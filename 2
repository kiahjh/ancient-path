import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getAllSeries, getSeries } from "@/lib/get-data";
import SeriesPageTemplate from "@/components/templates/SeriesPageTemplate";

export const revalidate = 0;

export async function generateMetadata(arg: {
  params: { slug: string };
}): Promise<Metadata> {
  const series = await getSeries(`es`, arg.params.slug);
  if (!series) return notFound();

  const title = `Serie: ${series.es.title} | La Senda Antigua`;
  const description = `Serie: ${series.es.title} - ${series.es.description}`;

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
  const series = (await getAllSeries()).find((s) => s.es.slug === params.slug);
  if (!series) return notFound();
  const seriesPosts = (await getAllPosts()).filter(
    (post) => post.series === series.id,
  );
  return (
    <SeriesPageTemplate series={series} language="es" posts={seriesPosts} />
  );
};

export default SeriesPage;

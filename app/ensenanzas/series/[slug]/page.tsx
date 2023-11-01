import React from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import SeriesPageTemplate from "@/components/templates/SeriesPageTemplate";

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

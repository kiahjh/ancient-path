import React from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import PostPreview from "@/components/PostPreview";

const SeriesPage: React.FC<{ params: { slug: string } }> = async ({
  params,
}) => {
  const series = (await getAllSeries()).find((s) => s.en.slug === params.slug);
  if (!series) return notFound();
  const seriesPosts = (await getAllPosts()).filter(
    (post) => post.series === series.id,
  );
  return (
    <div className="p-20">
      <h3 className="text-lg font-medium text-slate-600">
        {seriesPosts.length} part series:
      </h3>
      <h1 className="text-4xl font-bold w-fit bg-gradient-to-r from-sky-700 to-sky-600 bg-clip-text text-transparent">
        {series.en.title}
      </h1>
      <p className="mt-4 text-slate-500 max-w-5xl">{series.en.description}</p>
      <div className="mt-8 gap-8 flex flex-col">
        {seriesPosts.map((post) => (
          <PostPreview post={post} />
        ))}
      </div>
    </div>
  );
};

export default SeriesPage;

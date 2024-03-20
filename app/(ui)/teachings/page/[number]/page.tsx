import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export async function generateMetadata(arg: {
  params: {
    number: string;
  };
}): Promise<Metadata> {
  const title = `Teachings - Page ${arg.params.number} | The Ancient Path`;
  const description = `Page ${arg.params.number} of the teachings section of The Ancient Path`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const TeachingsPage: NextPage<{ params: { number: string } }> = async ({
  params,
}) => {
  const teachings = (await getAllPosts()).filter(
    (post) => post.category === `teaching`,
  );
  const series = await getAllSeries();
  const numPages = Math.ceil(teachings.length / 8);
  const pageNum = Number(params.number);
  if (isNaN(pageNum)) return notFound();

  if (pageNum < 1 || pageNum > numPages) return notFound();

  return (
    <PostListPageTemplate
      category="teachings"
      language="en"
      posts={teachings}
      series={series}
      currentPage={pageNum}
      numPages={numPages}
    />
  );
};

export default TeachingsPage;

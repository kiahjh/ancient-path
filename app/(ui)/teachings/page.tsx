import React from "react";
import type { Metadata, NextPage } from "next";
import * as cosmic from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Teachings | The Ancient Path`;
  const description = `The teachings section of The Ancient Path`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const TeachingsPage: NextPage = async () => {
  const teachings = (await cosmic.getTeachingsForList()).filter(
    (post) => post.category === `teaching`,
  );
  const series = await cosmic.getAllSeries();

  return (
    <PostListPageTemplate
      category="teachings"
      language="en"
      posts={teachings}
      series={series}
    />
  );
};

export default TeachingsPage;

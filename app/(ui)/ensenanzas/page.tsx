import React from "react";
import type { Metadata, NextPage } from "next";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Enseñanzas | La Senda Antigua`;
  const description = `La sección de enseñanzas de La Senda Antigua`;

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
  const teachings = (await getAllPosts()).filter(
    (post) => post.category === `teaching`,
  );
  const series = await getAllSeries();

  return (
    <PostListPageTemplate
      series={series}
      category="teachings"
      language="es"
      posts={teachings}
    />
  );
};

export default TeachingsPage;

import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

const IndividualTeaching: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const teaching = (await getAllPosts()).find((s) => s.es.slug === params.slug);
  if (!teaching) return notFound();
  return <PostPageTemplate post={teaching} language="es" />;
};

export default IndividualTeaching;

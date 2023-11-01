import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

const IndividualPost: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const post = (await getAllPosts()).find((s) => s.en.slug === params.slug);
  if (!post) return notFound();
  return <PostPageTemplate post={post} language="en" />;
};

export default IndividualPost;

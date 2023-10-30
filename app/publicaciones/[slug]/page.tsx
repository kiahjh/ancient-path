import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostTemplate from "@/components/page-templates/PostTemplate";

const IndividualPost: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const post = (await getAllPosts()).find((s) => s.en.slug === params.slug);
  if (!post) return notFound();
  return <PostTemplate post={post} language="es" />;
};

export default IndividualPost;

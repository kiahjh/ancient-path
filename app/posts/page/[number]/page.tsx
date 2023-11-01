import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

const PostsPage: NextPage<{ params: { number: string } }> = async ({
  params,
}) => {
  const posts = (await getAllPosts()).filter(
    (post) => post.category === `post`,
  );
  const numPages = Math.ceil(posts.length / 8);
  const pageNum = Number(params.number);
  if (isNaN(pageNum)) return notFound();

  if (pageNum < 1 || pageNum > numPages) return notFound();

  return (
    <PostListPageTemplate
      type="posts"
      language="en"
      posts={posts}
      currentPage={pageNum}
      numPages={numPages}
    />
  );
};

export default PostsPage;

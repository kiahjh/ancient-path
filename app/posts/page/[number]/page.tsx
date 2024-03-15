import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export async function generateMetadata(arg: {
  params: {
    number: string;
  };
}): Promise<Metadata> {
  const title = `Posts - Page ${arg.params.number} | The Ancient Path`;
  const description = `Page ${arg.params.number} of the posts section of The Ancient Path`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

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
      category="posts"
      language="en"
      posts={posts}
      currentPage={pageNum}
      numPages={numPages}
    />
  );
};

export default PostsPage;

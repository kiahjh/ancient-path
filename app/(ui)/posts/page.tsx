import React from "react";
import type { Metadata, NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Posts | The Ancient Path`;
  const description = `The posts section of The Ancient Path`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const PostsPage: NextPage = async () => {
  const posts = (await getAllPosts()).filter(
    (post) => post.category === `post`,
  );

  return <PostListPageTemplate category="posts" language="en" posts={posts} />;
};

export default PostsPage;

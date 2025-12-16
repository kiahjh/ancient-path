import React from "react";
import type { Metadata, NextPage } from "next";
import * as cosmic from "@/lib/get-data";
import PostListPageTemplate from "@/components/templates/PostListPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = `Publicaciones | La Senda Antigua`;
  const description = `La sección de publicaciones de La Senda Antigua`;

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
  const posts = (await cosmic.getPostsForList()).filter(
    (post) => post.category === `post`,
  );

  return <PostListPageTemplate category="posts" language="es" posts={posts} />;
};

export default PostsPage;

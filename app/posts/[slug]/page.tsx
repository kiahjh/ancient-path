import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import { getAllPosts, getPost } from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

export async function generateMetadata(arg: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = await getPost(`en`, arg.params.slug);
  if (!post) return notFound();

  const title = `${post.en.title} | The Ancient Path`;
  const description = `${post.en.title} - ${post.en.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const IndividualPost: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const post = (await getAllPosts()).find((s) => s.en.slug === params.slug);
  if (!post) return notFound();
  return <PostPageTemplate post={post} language="en" />;
};

export default IndividualPost;

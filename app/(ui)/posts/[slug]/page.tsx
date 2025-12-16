import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import * as cosmic from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(arg: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = await cosmic.getPostBySlug(`en`, arg.params.slug);
  if (!post) return notFound();

  const title = `${post.en.title} | The Ancient Path`;
  const description = `From The Ancient Path by Jason Henderson: ${post.en.title}`;

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
  const post = await cosmic.getPostBySlug(`en`, params.slug);
  if (!post) return notFound();
  return <PostPageTemplate post={post} language="en" />;
};

export default IndividualPost;

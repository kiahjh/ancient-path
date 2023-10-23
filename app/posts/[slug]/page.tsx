import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostPageAudioPrompt from "@/components/PostPageAudioPrompt";

const IndividualPost: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const post = (await getAllPosts()).find((s) => s.en.slug === params.slug);
  if (!post) return notFound();
  return (
    <div className="p-20">
      <div className="bg-white rounded-3xl p-16 pt-20 flex justify-center">
        <div className="">
          <h1 className="text-4xl font-bold mb-8 text-slate-800">
            {post.en.title}
          </h1>
          <PostPageAudioPrompt mp3Url={post.en.mp3Url} />
          <div
            dangerouslySetInnerHTML={{ __html: post.en.content }}
            className="prose max-w-2xl mt-8"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IndividualPost;

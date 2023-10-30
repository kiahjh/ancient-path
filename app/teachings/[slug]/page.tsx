import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import PostPageAudioPrompt from "@/components/PostPageAudioPrompt";

const IndividualTeaching: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const teaching = (await getAllPosts()).find((s) => s.en.slug === params.slug);
  if (!teaching) return notFound();
  return (
    <div className="p-20">
      <div className="bg-white rounded-3xl p-16 pt-20 flex justify-center">
        <div className="">
          <h1 className="text-4xl font-bold mb-8 text-slate-800">
            {teaching.en.title}
          </h1>
          <PostPageAudioPrompt
            title={teaching.en.title}
            mp3Url={teaching.en.mp3Url}
          />
          <div
            dangerouslySetInnerHTML={{ __html: teaching.en.content }}
            className="prose-lg prose-slate max-w-3xl mt-8"
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualTeaching;

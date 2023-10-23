import React from "react";
import { notFound } from "next/navigation";
import type { NextPage } from "next";
import { getAllPosts } from "@/lib/get-data";
import { paginate } from "@/lib/helpers";
import Paginator from "@/components/Paginator";
import PostPreview from "@/components/PostPreview";

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
    <div className="flex flex-col">
      <main className="flex-grow p-20">
        <h1 className="text-4xl font-bold text-slate-800">Posts</h1>
        <h2 className="text-lg font-medium text-slate-800">
          Page {pageNum} of {Math.ceil(posts.length / 8)}
        </h2>
        <p className="text-lg mt-2 text-slate-500 max-w-4xl">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui
          minim labore adipisicing minim sint cillum sint consectetur cupidatat.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-8">
          {paginate(posts, pageNum, 8).map((teaching) => (
            <PostPreview post={teaching} />
          ))}
        </div>
      </main>
      <footer className="p-4 border-t-2 border-sky-100 flex justify-center items-center">
        <Paginator
          numPages={numPages}
          currentPage={pageNum}
          basePath={`/posts/page`}
        />
      </footer>
    </div>
  );
};

export default PostsPage;

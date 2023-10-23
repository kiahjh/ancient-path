import React from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";

interface Props {
  post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => (
  <Link
    href={`/${post.category === `teaching` ? `teachings` : `posts`}/${
      post.en.slug
    }`}
    className="bg-white p-8 rounded-3xl"
  >
    <h3 className="text-xl font-bold text-slate-800">{post.en.title}</h3>
    <p className="mt-2 text-slate-800/80">{post.en.description}</p>
  </Link>
);

export default PostPreview;

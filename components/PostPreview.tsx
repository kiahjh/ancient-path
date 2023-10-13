import React from "react";
import type { Post } from "@/lib/types";

interface Props {
  post: Post;
}

const PostPreview: React.FC<Props> = ({ post }) => (
  <div className="bg-white p-8 rounded-3xl">
    <h3 className="text-xl font-bold text-slate-800">{post.en.title}</h3>
    <p className="mt-2 text-slate-800/80">{post.en.description}</p>
  </div>
);

export default PostPreview;

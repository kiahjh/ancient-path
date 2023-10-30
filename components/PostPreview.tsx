import React from "react";
import Link from "next/link";
import type { Language, Post } from "@/lib/types";
import { relativeTime } from "@/lib/dates";

interface Props {
  post: Post;
  language: Language;
}

const PostPreview: React.FC<Props> = ({ post, language }) => {
  let basePath = ``;
  if (post.category === `teaching` && language === `en`)
    basePath = `/teachings`;
  else if (post.category === `teaching` && language === `es`)
    basePath = `/ensenanzas`;
  else if (post.category === `post` && language === `en`) basePath = `/posts`;
  else if (post.category === `post` && language === `es`)
    basePath = `/publicaciones`;

  return (
    <Link
      href={`${basePath}/${post[language].slug}`}
      className="bg-white p-8 rounded-3xl hover:bg-sky-100 active:bg-sky-200 active:scale-[98%] transition-[background-color,transform] duration-300"
    >
      <h4 className="text-sky-500 mb-1">
        {relativeTime(post.createdAt, `en`)}
      </h4>
      <h3 className="text-xl font-bold text-slate-800">
        {post[language].title}
      </h3>
      <p className="mt-2 text-slate-800/80">{post[language].description}</p>
    </Link>
  );
};

export default PostPreview;

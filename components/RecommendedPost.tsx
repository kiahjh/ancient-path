import React from "react";
import Link from "next/link";
import cx from "classnames";
import type { Language, Post } from "@/lib/types";
import { relativeTime } from "@/lib/dates";

interface Props {
  post: Post;
  language: Language;
  className?: string;
}

const RecommendedPost: React.FC<Props> = ({ post, language, className }) => {
  let linkHref = ``;
  if (language === `en` && post.category === `post`)
    linkHref = `/posts/${post[language].slug}`;
  else if (language === `es` && post.category === `post`)
    linkHref = `/publicaciones/${post[language].slug}`;
  else if (language === `en` && post.category === `teaching`)
    linkHref = `/teachings/${post[language].slug}`;
  else if (language === `es` && post.category === `teaching`)
    linkHref = `/ensenanzas/${post[language].slug}`;
  return (
    <Link
      href={linkHref}
      className={cx(
        `p-8 rounded-3xl relative overflow-hidden bg-white hover:bg-sky-100 cursor-pointer transition-[background-color,transform] duration-300 active:bg-sky-200 active:scale-[98%]`,
        className,
      )}
    >
      <div className="relative">
        <h4 className="text-sky-500/70">
          {relativeTime(post.createdAt, language)}
        </h4>
        <h3 className="text-xl font-bold text-slate-800">
          {post[language].title}
        </h3>
        <p className="text-slate-500 mt-2">
          {post[language].description.split(` `).slice(0, 40).join(` `).trim() +
            `...`}
        </p>
      </div>
    </Link>
  );
};

export default RecommendedPost;

import React from "react";
import Link from "next/link";
import type { Language, Post, Series } from "@/lib/types";
import { relativeTime } from "@/lib/dates";

type Props = (
  | {
      category: "post";
      post: Post;
    }
  | {
      category: "teaching";
      teaching: Post;
      series?: {
        series: Series;
        part: number;
      };
    }
) & { language: Language };

const PostPreview: React.FC<Props> = (props) => {
  let basePath = ``;
  if (props.category === `teaching` && props.language === `en`)
    basePath = `/teachings`;
  else if (props.category === `teaching` && props.language === `es`)
    basePath = `/ensenanzas`;
  else if (props.category === `post` && props.language === `en`)
    basePath = `/posts`;
  else if (props.category === `post` && props.language === `es`)
    basePath = `/publicaciones`;

  const thisPost = props.category === `post` ? props.post : props.teaching;

  return (
    <Link
      href={`${basePath}/${thisPost[props.language].slug}`}
      className="bg-white p-6 xs:p-8 rounded-3xl hover:bg-sky-100 active:bg-sky-200 active:scale-[98%] transition-[background-color,transform] duration-300 relative group"
    >
      <h4 className="text-sky-500 mb-1">
        {relativeTime(thisPost.createdAt, `en`)}
      </h4>
      <h3 className="text-xl font-bold text-slate-800">
        {thisPost[props.language].title}
      </h3>
      <p className="mt-2 text-slate-500 hidden xs:block">
        {thisPost[props.language].description}
      </p>
      <p className="mt-2 text-slate-500 block xs:hidden">
        {thisPost[props.language].description
          .split(` `)
          .slice(0, 30)
          .join(` `) + `...`}
      </p>
      {props.category === `teaching` && props.series && (
        <div className="flex items-center rounded-full w-fit mt-2 absolute right-4 top-4 p-1 pr-2 transition-colors duration-300 gap-3">
          <div className="font-medium text-sky-800/70">
            {props.series.series[props.language].title}
          </div>
          <div className="font-medium bg-sky-200/50 group-hover:bg-sky-300/50 rounded-full w-9 h-7 flex items-center justify-center text-sky-700 transition-colors duration-300">
            {props.series.part}
          </div>
        </div>
      )}
    </Link>
  );
};

export default PostPreview;

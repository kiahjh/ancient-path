import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import type { Language, Post, Series } from "@/lib/types";
import Button from "./Button";
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
    <div className="bg-white rounded-3xl relative group">
      <div className="pb-0 xs:pb-2 p-6 xs:p-8">
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
      </div>
      <div className="flex justify-end mt-4 p-4 pt-0">
        <Button
          type="link"
          to={`${basePath}/${thisPost[props.language].slug}`}
          color="secondary"
          icon={ArrowRightIcon}
        >
          {props.language === `en` ? `View post` : `Ver publicación`}
        </Button>
      </div>
      {props.category === `teaching` && props.series && (
        <Link
          href={`/${
            props.language === `en` ? `teachings` : `ensenanzas`
          }/series/${props.series.series[props.language].slug}`}
          className="flex items-center rounded-full w-fit mt-2 absolute right-4 top-4 p-1 pr-2 duration-300 gap-3 pl-4 hover:bg-sky-50 transition-[background-color,transform] active:bg-sky-100 active:scale-95 select-none cursor-pointer"
        >
          <div className="font-medium text-sky-800/70">
            {props.series.series[props.language].title}
          </div>
          <div className="font-medium bg-sky-200/50 group-hover:bg-sky-300/50 rounded-full w-9 h-7 flex items-center justify-center text-sky-700 transition-colors duration-300">
            {props.series.part}
          </div>
        </Link>
      )}
    </div>
  );
};

export default PostPreview;

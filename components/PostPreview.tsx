import React from "react";
import { ArrowRightIcon } from "lucide-react";
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

  const isPartOfSeries = props.category === `teaching` && props.series;

  return (
    <div className="bg-white rounded-3xl relative group">
      <div className="pb-0 xs:pb-2 p-6 xs:p-8">
        <h4 className="text-sky-500 mb-1">
          {relativeTime(thisPost.createdAt, `en`)}
        </h4>
        <h3 className="text-xl font-bold text-slate-800">
          {isPartOfSeries
            ? `${props.series?.series[props.language].title} pt. ${props.series?.part}`
            : thisPost[props.language].title}
        </h3>
        {isPartOfSeries && (
          <h4 className="font-medium text-slate-500">
            {thisPost[props.language].title}
          </h4>
        )}
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
    </div>
  );
};

export default PostPreview;

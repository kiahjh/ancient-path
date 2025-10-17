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
    <div className="flex flex-col bg-white/50 rounded-3xl border-[0.5px] border-sky-200">
      <div className="px-6 pt-4 pb-3">
        <h3 className="text-xl font-bold text-sky-950">
          {isPartOfSeries
            ? `${props.series?.series[props.language].title} pt. ${props.series?.part}`
            : thisPost[props.language].title}
        </h3>
        {isPartOfSeries && (
          <h4 className="font-medium text-sky-800/80">
            {thisPost[props.language].title}
          </h4>
        )}
      </div>
      <div className="flex justify-end p-2 bg-white rounded-[18px] border-[0.5px] border-sky-200 mx-1.5 mb-1.5">
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

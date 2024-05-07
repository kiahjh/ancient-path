import React from "react";
import cx from "classnames";
import Link from "next/link";
import type { Language, Post } from "@/lib/types";
import PostPageAudioPrompt from "@/components/PostPageAudioPrompt";
import CachePost from "@/lib/CachePost";

interface Props {
  post: Post;
  language: Language;
  series?: {
    name: string;
    number: number;
    slug: string;
  };
}

const PostPageTemplate: React.FC<Props> = ({ post, language, series }) => (
  <div className="px-0 md:px-16 lg:px-12 py-16 md:py-20 flex justify-center">
    <div className="bg-white rounded-3xl px-6 xs:px-8 sm:px-16 pb-12 sm:pb-16 pt-12 sm:pt-20 flex justify-center max-w-4xl">
      <div>
        <h1
          className={cx(
            `text-2xl xs:text-3xl lg:text-4xl font-bold text-slate-800 max-w-3xl`,
            !series && `mb-8`,
          )}
        >
          {post[language].title}
        </h1>
        {series && language === `es` && (
          <h2 className="mb-8 mt-2 text-lg font-medium text-slate-500">
            Parte {series.number} de{` `}
            <Link
              href={`/ensenanzas/series/${series.slug}`}
              className="text-sky-600 hover:underline"
            >
              {series.name}
            </Link>
          </h2>
        )}
        {series && language === `en` && (
          <h2 className="mb-8 mt-2 text-lg font-medium text-slate-500">
            Part {series.number} from{` `}
            <Link
              href={`/teachings/series/${series.slug}`}
              className="text-sky-600 hover:underline"
            >
              {series.name}
            </Link>
          </h2>
        )}
        <PostPageAudioPrompt />
        <div
          dangerouslySetInnerHTML={{ __html: post[language].content }}
          className="prose-base sm:prose-lg text-justify prose-slate mt-8 prose-a:text-sky-600 prose-a:font-medium hover:prose-a:underline"
        />
      </div>
    </div>
    <CachePost post={post} />
  </div>
);

export default PostPageTemplate;

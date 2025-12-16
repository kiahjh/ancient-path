import React from "react";
import type { Language, Series, PostListItem } from "@/lib/types";
import PostPreview from "../PostPreview";

interface Props {
  series: Series;
  language: Language;
  posts: PostListItem[];
}

const SeriesPageTemplate: React.FC<Props> = ({ series, language, posts }) => (
  <div className="px-6 xs:px-8 md:px-12 lg:px-16 xl:px-20 py-20">
    <h3 className="text-lg font-medium text-slate-600">
      {language === `en`
        ? `${posts.length} part series:`
        : `Serie de ${posts.length} partes:`}
    </h3>
    <h1 className="text-3xl sm:text-4xl font-bold w-fit bg-gradient-to-r from-sky-700 to-sky-600 bg-clip-text text-transparent">
      {series[language].title}
    </h1>
    <p className="mt-2 text-slate-500 max-w-5xl text-lg">
      {series[language].description}
    </p>
    <div className="mt-8 gap-8 flex flex-col -mx-6 xs:mx-0">
      {posts
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .map((post, i) => (
          <PostPreview
            key={post.id}
            teaching={post}
            language={language}
            series={{ series, part: i + 1 }}
            category="teaching"
          />
        ))}
    </div>
  </div>
);

export default SeriesPageTemplate;

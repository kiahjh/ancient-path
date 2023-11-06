import React from "react";
import type { Language, Post, Series } from "@/lib/types";
import PostPreview from "../PostPreview";

interface Props {
  series: Series;
  language: Language;
  posts: Post[];
}

const SeriesPageTemplate: React.FC<Props> = ({ series, language, posts }) => (
  <div className="px-6 xs:px-8 md:px-12 lg:px-16 xl:px-20 py-20">
    <h3 className="text-lg font-medium text-slate-600">
      {posts.length} part series:
    </h3>
    <h1 className="text-3xl sm:text-4xl font-bold w-fit bg-gradient-to-r from-sky-700 to-sky-600 bg-clip-text text-transparent">
      {series[language].title}
    </h1>
    <p className="mt-2 text-slate-500 max-w-5xl text-lg">
      {series[language].description}
    </p>
    <div className="mt-8 gap-8 flex flex-col -mx-6 xs:mx-0">
      {posts.map((post) => (
        <PostPreview teaching={post} language={language} category="teaching" />
      ))}
    </div>
  </div>
);

export default SeriesPageTemplate;

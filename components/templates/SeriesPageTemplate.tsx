import React from "react";
import type { Language, Post, Series } from "@/lib/types";
import PostPreview from "../PostPreview";

interface Props {
  series: Series;
  language: Language;
  posts: Post[];
}

const SeriesPageTemplate: React.FC<Props> = ({ series, language, posts }) => (
  <div className="p-20">
    <h3 className="text-lg font-medium text-slate-600">
      {posts.length} part series:
    </h3>
    <h1 className="text-4xl font-bold w-fit bg-gradient-to-r from-sky-700 to-sky-600 bg-clip-text text-transparent">
      {series[language].title}
    </h1>
    <p className="mt-2 text-slate-500 max-w-5xl text-lg">
      {series[language].description}
    </p>
    <div className="mt-8 gap-8 flex flex-col">
      {posts.map((post) => (
        <PostPreview post={post} language={language} />
      ))}
    </div>
  </div>
);

export default SeriesPageTemplate;

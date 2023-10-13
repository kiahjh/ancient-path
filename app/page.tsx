import React from "react";
import HomePageRecentPost from "@/components/HomePageRecentPost";

const Home: React.FC = () => (
  <div className="py-28 px-12 flex flex-col items-center justify-center gap-20 h-full">
    <div className="flex flex-col items-center">
      <h1 className="font-black text-6xl text-slate-800">The Ancient Path</h1>
      <h2 className="mt-6 text-xl max-w-2xl text-center text-slate-800/70">
        A place to share my thoughts and experiences about the way God works in
        the soul of man.
      </h2>
    </div>
    <div className="p-8 border border-dashed border-sky-500/40 rounded-3xl flex flex-col items-center relative">
      <span className="text-lg text-sky-500/70 absolute -top-4 bg-sky-50 px-4">
        Recent posts
      </span>
      <div className="flex gap-8 flex-wrap justify-center">
        <HomePageRecentPost />
        <HomePageRecentPost />
        <HomePageRecentPost />
      </div>
    </div>
  </div>
);

export default Home;

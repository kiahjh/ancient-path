import React from "react";

const Home: React.FC = () => (
  <div className="p-28 flex flex-col items-center justify-between h-full">
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
        <div className="w-96 bg-white p-8 rounded-3xl">
          <h4 className="text-sky-500/70">3 days ago</h4>
          <h3 className="text-xl font-bold text-slate-800">The Work of God</h3>
          <p className="text-slate-500 mt-2">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </p>
        </div>
        <div className="w-96 bg-white p-8 rounded-3xl">
          <h4 className="text-sky-500/70">last week</h4>
          <h3 className="text-xl font-bold text-slate-800">The Work of God</h3>
          <p className="text-slate-500 mt-2">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </p>
        </div>
        <div className="w-96 bg-white p-8 rounded-3xl">
          <h4 className="text-sky-500/70">2 weeks ago</h4>
          <h3 className="text-xl font-bold text-slate-800">The Work of God</h3>
          <p className="text-slate-500 mt-2">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;

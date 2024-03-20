import React from "react";
import type { NextPage } from "next";
import PodcastPageTemplate from "@/components/templates/PodcastPageTemplate";

export const metadata = {
  title: `Podcast | The Ancient Path`,
  description: `Links to different podcast platforms where you can listen to The Ancient Path.`,
  openGraph: {
    title: `Podcast | The Ancient Path`,
    description: `Links to different podcast platforms where you can listen to The Ancient Path.`,
  },
};

const Podcast: NextPage = () => <PodcastPageTemplate language="en" />;

export default Podcast;

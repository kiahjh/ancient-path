import React from "react";
import type { NextPage } from "next";
import WhereToStartTemplate from "@/components/templates/WhereToStartTemplate";

export const revalidate = 0;

export const metadata = {
  title: `Where to start? | The Ancient Path`,
  description: `A list of recommended posts and teachings for those new to the site.`,
  openGraph: {
    title: `Where to start? | The Ancient Path`,
    description: `A list of recommended posts and teachings for those new to the site.`,
  },
};

const WhereToStart: NextPage = () => <WhereToStartTemplate language="en" />;

export default WhereToStart;

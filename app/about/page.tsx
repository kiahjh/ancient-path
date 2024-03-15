import React from "react";
import type { NextPage } from "next";
import AboutPageTemplate from "@/components/templates/AboutPageTemplate";

export const metadata = {
  title: `About me | The Ancient Path`,
  description: `Learn more about the author and the purpose of this site.`,
  openGraph: {
    title: `About me | The Ancient Path`,
    description: `Learn more about the author and the purpose of this site.`,
  },
};

const About: NextPage = () => <AboutPageTemplate language="en" />;

export default About;

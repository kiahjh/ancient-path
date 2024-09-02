import React from "react";
import type { NextPage } from "next";
import ParentingPageTemplate from "@/components/templates/ParentingPageTemplate";

export const metadata = {
  title: `Parenting | The Ancient Path`,
  description: `Some highly recommended resources for parents who sincerely desire to “bring up their children in the nurture and admonition of the Lord,” and avoid the snares and pitfalls that are particular to the age we live in.`,
  openGraph: {
    title: `Parenting | The Ancient Path`,
    description: `Some highly recommended resources for parents who sincerely desire to “bring up their children in the nurture and admonition of the Lord,” and avoid the snares and pitfalls that are particular to the age we live in.`,
  },
};

const Parenting: NextPage = () => <ParentingPageTemplate language="en" />;

export default Parenting;

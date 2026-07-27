import React from "react";
import type { NextPage } from "next";
import BooksPageTemplate from "@/components/templates/BooksPageTemplate";

export const metadata = {
  title: "Books | The Ancient Path",
  description: `Books by Jason Henderson and other Christian writings he recommends.`,
  openGraph: {
    title: "Books | The Ancient Path",
    description: `Books by Jason Henderson and other Christian writings he recommends.`,
  },
};

const Books: NextPage = () => <BooksPageTemplate language="en" />;

export default Books;

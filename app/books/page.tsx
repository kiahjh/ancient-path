import React from "react";
import type { NextPage } from "next";
import BooksPageTemplate from "@/components/templates/BooksPageTemplate";

export const metadata = {
  title: "Books | The Ancient Path",
  description: `Books from other writers and authers that I highly recommend.`,
  openGraph: {
    title: "Books | The Ancient Path",
    description: `Books from other writers and authers that I highly recommend.`,
  },
};

const Books: NextPage = () => <BooksPageTemplate language="en" />;

export default Books;

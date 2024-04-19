import React from "react";
import type { NextPage } from "next";
import MeetingAudiosPageTemplate from "@/components/templates/MeetingAudiosPageTemplate";

export const revalidate = 0;

export const metadata = {
  title: `Meetings | The Ancient Path`,
  description: `Audio recordings from some meetings.`,
  openGraph: {
    title: `Meetings | The Ancient Path`,
    description: `Audio recordings from some meetings.`,
  },
};

const Meetings: NextPage = async () => (
  <MeetingAudiosPageTemplate language="en" />
);

export default Meetings;

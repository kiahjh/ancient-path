"use client";

import React from "react";
import { MeetingAudio } from "@/lib/types";

const MeetingAudio: React.FC<{ audio: MeetingAudio }> = ({
  audio: { title },
}) => (
  <div className="border">
    <div className="px-8 py-6 rounded-full bg-sky-100">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  </div>
);

export default MeetingAudio;

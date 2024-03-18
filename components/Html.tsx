"use client";

import { useGlobalState } from "@/lib/hooks";
import React from "react";

const Html: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    state: { language },
  } = useGlobalState();
  return <html lang={language}>{children}</html>;
};

export default Html;

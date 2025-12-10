import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import GlobalStateProvider from "@/lib/state/GlobalStateProvider";
import Html from "@/components/Html";
import Chrome from "@/components/Chrome";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <GlobalStateProvider>
    <Html>
      <Chrome>{children}</Chrome>
    </Html>
  </GlobalStateProvider>
);

export default RootLayout;

function getBaseUrl(): string {
  if (process.env.VERCEL_ENV === "production") {
    return "https://hender.blog";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

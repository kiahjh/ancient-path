import React from "react";
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

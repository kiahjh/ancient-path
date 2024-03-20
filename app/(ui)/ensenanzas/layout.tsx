import React from "react";
import { getAllSeries } from "@/lib/get-data";
import TeachingsLayoutTemplate from "@/components/templates/TeachingsLayoutTemplate";

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const series = await getAllSeries();
  return (
    <TeachingsLayoutTemplate series={series} language="es">
      {children}
    </TeachingsLayoutTemplate>
  );
};

export default Layout;

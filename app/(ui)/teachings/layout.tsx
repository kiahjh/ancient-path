import React from "react";
import { getAllPosts, getAllSeries } from "@/lib/get-data";
import TeachingsLayoutTemplate from "@/components/templates/TeachingsLayoutTemplate";

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const series = await getAllSeries();
  const allTeachings = (await getAllPosts()).filter(
    (p) => p.category === `teaching`,
  );

  return (
    <TeachingsLayoutTemplate
      allTeachings={allTeachings}
      series={series}
      language="en"
    >
      {children}
    </TeachingsLayoutTemplate>
  );
};

export default Layout;

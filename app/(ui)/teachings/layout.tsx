import React from "react";
import * as cosmic from "@/lib/get-data";
import TeachingsLayoutTemplate from "@/components/templates/TeachingsLayoutTemplate";

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const series = await cosmic.getAllSeries();
  const allTeachings = (await cosmic.getTeachingsForList()).filter(
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

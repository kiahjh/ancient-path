import React from "react";
import * as cosmic from "@/lib/get-data";
import TeachingsLayoutTemplate from "@/components/templates/TeachingsLayoutTemplate";
import { getSeriesPostCounts } from "@/lib/post-ordering";

export const dynamic = `force-dynamic`;

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const series = await cosmic.getAllSeries();
  const allTeachings = (await cosmic.getTeachingsForList()).filter(
    (p) => p.category === `teaching`,
  );

  return (
    <TeachingsLayoutTemplate
      seriesPostCounts={getSeriesPostCounts(allTeachings)}
      series={series}
      language="en"
    >
      {children}
    </TeachingsLayoutTemplate>
  );
};

export default Layout;

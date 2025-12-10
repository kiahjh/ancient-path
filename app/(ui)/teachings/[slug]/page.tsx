import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import * as cosmic from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(arg: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = await cosmic.getPostBySlug(`en`, arg.params.slug);
  if (!post) return notFound();

  const title = `${post.en.title} | The Ancient Path`;
  const description = `From The Ancient Path by Jason Henderson: ${post.en.title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

const IndividualTeaching: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const thisTeaching = await cosmic.getPostBySlug(`en`, params.slug);
  if (!thisTeaching) return notFound();

  const thisSeriesId = thisTeaching.series;
  let seriesProp:
    | {
        name: string;
        number: number;
        slug: string;
      }
    | undefined = undefined;

  if (thisSeriesId) {
    const allSeries = await cosmic.getAllSeries();
    const thisSeries = allSeries.find((s) => s.id === thisSeriesId);
    if (thisSeries) {
      const allTeachings = (await cosmic.getTeachingsForList()).filter(
        (t) => t.category === `teaching`,
      );
      const teachingsFromThisSeries = allTeachings.filter(
        (t) => t.series === thisSeriesId,
      );
      seriesProp = {
        name: thisSeries.en.title,
        number:
          teachingsFromThisSeries.length -
          teachingsFromThisSeries.findIndex((p) => p.id === thisTeaching.id),
        slug: thisSeries.en.slug,
      };
    }
  }

  return (
    <PostPageTemplate post={thisTeaching} language="en" series={seriesProp} />
  );
};

export default IndividualTeaching;

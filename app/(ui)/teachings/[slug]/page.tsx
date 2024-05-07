import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import { getAllPosts, getAllSeries, getPost } from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

export const revalidate = 0;

export async function generateMetadata(arg: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = await getPost(`en`, arg.params.slug);
  if (!post) return notFound();

  const title = `${post.en.title} | The Ancient Path`;
  const description = `${post.en.title} - ${post.en.description}`;

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
  const allTeachings = (await getAllPosts()).filter(
    (p) => p.category === `teaching`,
  );
  const thisTeaching = allTeachings.find((s) => s.en.slug === params.slug);
  const thisSeriesId = thisTeaching?.series;
  let seriesProp:
    | {
        name: string;
        number: number;
        slug: string;
      }
    | undefined = undefined;
  if (thisSeriesId) {
    const allSeries = await getAllSeries();
    const thisSeries = allSeries.find((s) => s.id === thisSeriesId);
    if (thisSeries) {
      const teachingsFromThisSeries = allTeachings.filter(
        (t) => t.series === thisSeriesId,
      );
      seriesProp = {
        name: thisSeries.en.title,
        number:
          teachingsFromThisSeries.length -
          teachingsFromThisSeries.findIndex((p) => p.id === thisTeaching?.id),
        slug: thisSeries.en.slug,
      };
    }
  }

  if (!thisTeaching) return notFound();

  return (
    <PostPageTemplate post={thisTeaching} language="en" series={seriesProp} />
  );
};

export default IndividualTeaching;

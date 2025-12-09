import React from "react";
import { notFound } from "next/navigation";
import type { Metadata, NextPage } from "next";
import { getAllPosts, getAllSeries, getPost } from "@/lib/get-data";
import PostPageTemplate from "@/components/templates/PostPageTemplate";

export const revalidate = 3600;

export async function generateMetadata(arg: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = await getPost(`es`, arg.params.slug);
  if (!post) return notFound();

  const title = `${post.es.title} | La Senda Antigua`;
  const description = `From The Ancient Path by Jason Henderson: ${post.es.title}`;

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
  const thisTeaching = allTeachings.find((s) => s.es.slug === params.slug);
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
        name: thisSeries.es.title,
        number:
          teachingsFromThisSeries.length -
          teachingsFromThisSeries.findIndex((p) => p.id === thisTeaching?.id),
        slug: thisSeries.es.slug,
      };
    }
  }

  if (!thisTeaching) return notFound();

  return (
    <PostPageTemplate post={thisTeaching} language="es" series={seriesProp} />
  );
};

export default IndividualTeaching;

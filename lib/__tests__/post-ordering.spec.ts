import { describe, expect, it } from "vitest";
import {
  getPostsInSeriesOrder,
  getSeriesPartNumber,
  groupSeriesPostsForList,
} from "../post-ordering";
import type { Post } from "../types";

function post(
  id: string,
  slug: string,
  series: string | null,
  createdAt = `2024-01-01T00:00:00.000Z`,
): Post {
  return {
    id,
    createdAt,
    modifiedAt: createdAt,
    publishedAt: createdAt,
    series,
    category: `teaching`,
    en: {
      title: id,
      slug,
      content: ``,
      mp3Url: ``,
      audioSize: 0,
      audioDuration: 0,
    },
    es: {
      title: id,
      slug: `es-${slug}`,
      content: ``,
      mp3Url: ``,
      audioSize: 0,
      audioDuration: 0,
    },
  };
}

describe(`post ordering`, () => {
  it(`orders series posts by explicit part number from slug`, () => {
    const posts = [
      post(`part 3`, `the-gospel-pt-3`, `series-1`, `2024-01-03`),
      post(`part 1`, `the-gospel-pt-1`, `series-1`, `2024-01-01`),
      post(`part 2`, `the-gospel-pt-2`, `series-1`, `2024-01-02`),
    ];

    expect(getPostsInSeriesOrder(posts).map((p) => p.id)).toEqual([
      `part 1`,
      `part 2`,
      `part 3`,
    ]);
    expect(getSeriesPartNumber(posts, `part 3`)).toBe(3);
  });

  it(`emits each series as a part-ordered group on list pages`, () => {
    const posts = [
      post(`standalone`, `standalone`, null),
      post(`part 3`, `abide-pt-3`, `series-1`),
      post(`part 1`, `abide-pt-1`, `series-1`),
      post(`part 2`, `abide-pt-2`, `series-1`),
    ];

    expect(groupSeriesPostsForList(posts, `en`, () => 1000).map((p) => p.id))
      .toEqual([`standalone`, `part 1`, `part 2`, `part 3`]);
  });
});

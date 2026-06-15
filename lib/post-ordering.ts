import type { Language, PostListItem } from "./types";

export function getPostsInSeriesOrder(
  posts: PostListItem[],
): PostListItem[] {
  return [...posts].sort(compareSeriesPosts);
}

export function getSeriesPartNumber(
  postsInSeries: PostListItem[],
  postId: string,
): number {
  const index = getPostsInSeriesOrder(postsInSeries).findIndex(
    (post) => post.id === postId,
  );
  return index === -1 ? 0 : index + 1;
}

export function getSeriesPartNumbers(
  posts: PostListItem[],
): Map<string, number> {
  const postsBySeries = new Map<string, PostListItem[]>();
  for (const post of posts) {
    if (!post.series) continue;
    postsBySeries.set(post.series, [
      ...(postsBySeries.get(post.series) ?? []),
      post,
    ]);
  }

  const partNumbers = new Map<string, number>();
  for (const postsInSeries of postsBySeries.values()) {
    getPostsInSeriesOrder(postsInSeries).forEach((post, index) => {
      partNumbers.set(post.id, index + 1);
    });
  }
  return partNumbers;
}

export function getSeriesPostCounts(
  posts: PostListItem[],
): Record<string, number> {
  return posts.reduce<Record<string, number>>((counts, post) => {
    if (post.series) {
      counts[post.series] = (counts[post.series] ?? 0) + 1;
    }
    return counts;
  }, {});
}

export function groupSeriesPostsForList(
  posts: PostListItem[],
  language: Language,
  getListOrder: (slug: string) => number,
): PostListItem[] {
  const baseOrder = [...posts].sort(
    (a, b) =>
      getListOrder(a[language].slug) - getListOrder(b[language].slug),
  );

  const postsBySeries = new Map<string, PostListItem[]>();
  for (const post of posts) {
    if (!post.series) continue;
    postsBySeries.set(post.series, [
      ...(postsBySeries.get(post.series) ?? []),
      post,
    ]);
  }

  const emittedSeries = new Set<string>();
  const result: PostListItem[] = [];

  for (const post of baseOrder) {
    if (!post.series) {
      result.push(post);
      continue;
    }

    if (emittedSeries.has(post.series)) continue;
    emittedSeries.add(post.series);
    result.push(...getPostsInSeriesOrder(postsBySeries.get(post.series) ?? []));
  }

  return result;
}

function compareSeriesPosts(a: PostListItem, b: PostListItem): number {
  const partA = getPartNumberFromPostSlug(a);
  const partB = getPartNumberFromPostSlug(b);

  if (partA !== null || partB !== null) {
    if (partA === null) return 1;
    if (partB === null) return -1;
    if (partA !== partB) return partA - partB;
  }

  return (
    timestamp(a.createdAt) - timestamp(b.createdAt) || a.id.localeCompare(b.id)
  );
}

function getPartNumberFromPostSlug(post: PostListItem): number | null {
  return (
    getPartNumberFromSlug(post.en.slug) ?? getPartNumberFromSlug(post.es.slug)
  );
}

function getPartNumberFromSlug(slug: string): number | null {
  const match = slug.match(/(?:^|-)pt-?(\d+)$/i);
  if (!match?.[1]) return null;

  const part = Number.parseInt(match[1], 10);
  return Number.isFinite(part) ? part : null;
}

function timestamp(value: string): number {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? time : 0;
}

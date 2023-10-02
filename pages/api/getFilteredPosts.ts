import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts, getAllSeries } from '../../lib/getData';
import { Lang, Post, Series } from '../../lib/types';

type ResponseData =
  | { error: string }
  | { filteredPosts: Post<Lang>[]; allSeries: Series[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { q: query, series, lang } = req.query;
  if (lang !== `en` && lang !== `es`) {
    res.status(400).json({ error: 'Must supply a valid value for "lang"' });
    return;
  }
  const allPosts = (await getAllPosts()).map((post) => post[lang]);
  const allSeries = await getAllSeries();
  const filteredPosts = allPosts
    .filter((post) => {
      if (typeof query === `string`) {
        return (
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      return true;
    })
    .filter((post) => {
      if (typeof series === `string`) {
        return post.series === series;
      }
      return true;
    });

  res.status(200).json({ filteredPosts, allSeries });
}

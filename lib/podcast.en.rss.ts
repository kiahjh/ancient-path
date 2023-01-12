import { getAllPosts } from './getAllPosts';
import { podcastXml } from './podcast';

export const get = async () => {
  const englishPosts = (await getAllPosts()).map((dual) => dual.en);
  return { body: podcastXml(englishPosts) };
};

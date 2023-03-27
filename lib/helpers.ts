import striptags from 'striptags';
import { Lang, Post } from './types';

export function paginate<T>(arr: Array<T>, whichPage: number, perPage: number): Array<T> {
  return arr.slice((whichPage - 1) * perPage, whichPage * perPage);
}

export function description(post: Post<Lang>): string {
  return post.description || getExcerpt(post.content, 300);
}

export function getExcerpt(text: string, characters: number): string {
  return striptags(text).replace(`&nbsp;`, ` `).substring(0, characters).trim() + '...';
}

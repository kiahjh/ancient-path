import striptags from 'striptags';

export function paginate<T>(arr: Array<T>, whichPage: number, perPage: number): Array<T> {
  return arr.slice((whichPage - 1) * perPage, whichPage * perPage);
}

// todo: either replace all use cases with custom descriptions or make this better
export function getExcerpt(text: string, characters: number): string {
  return striptags(text).replace(`&nbsp;`, ` `).substring(0, characters).trim() + '...';
}

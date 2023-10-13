export function paginate<T>(
  arr: Array<T>,
  whichPage: number,
  perPage: number,
): Array<T> {
  return arr.slice((whichPage - 1) * perPage, whichPage * perPage);
}

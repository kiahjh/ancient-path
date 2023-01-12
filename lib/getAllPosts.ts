import { toDual } from './data';
import { ApiPost, DualPost } from './types';

const bucketSlug = process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG;
const readKey = process.env.NEXT_PUBLIC_COSMIC_READ_KEY;

export async function getAllPosts(): Promise<DualPost[]> {
  const endpoint = `https://api.cosmicjs.com/v2/buckets`;
  const type = process.env.MODE === 'development' ? 'posts' : 'posts';
  const query = encodeURIComponent(`{"type":"${type}"}`);
  const url = `${endpoint}/${bucketSlug}/objects?&query=${query}&read_key=${readKey}`;
  const response = await fetch(url);
  const objs = await response.json();
  const allApiPosts: Array<ApiPost> = objs.objects;
  return allApiPosts.map(toDual);
}

import type { Post } from "./types";

export function getAlternateLanguagePath(
  path: string,
  post: Post | null,
): string {
  switch (true) {
    // one-offs
    case path === `/where-to-start`:
      return `/donde-empezar`;
    case path === `/donde-empezar`:
      return `/where-to-start`;
    case path === `/about`:
      return `/acerca-de-mi`;
    case path === `/acerca-de-mi`:
      return `/about`;
    case path === `/contact`:
      return `/contacto`;
    case path === `/contacto`:
      return `/contact`;
    case path === `/books`:
      return `/libros`;
    case path === `/libros`:
      return `/books`;
    case path === `/podcast-en`:
      return `/podcast-es`;
    case path === `/podcast-es`:
      return `/podcast-en`;
    case path === `/books`:
      return `/libros`;
    case path === `/libros`:
      return `/books`;
    case path === `/meetings`:
      return `/reuniones`;
    case path === `/reuniones`:
      return `/meetings`;
    case path === `/parenting`:
      return `/crianza`;
    case path === `/crianza`:
      return `/parenting`;

    // individual teachings (must come before pages of teachings)
    case path.startsWith(`/teachings/`):
      return post ? `/ensenanzas/${post.es.slug}` : `/ensenanzas`;
    case path.startsWith(`/ensenanzas/`):
      return post ? `/teachings/${post.en.slug}` : `/teachings`;

    // individual posts (must come before pages of posts)
    case path.startsWith(`/posts/`):
      return post ? `/publicaciones/${post.es.slug}` : `/publicaciones`;
    case path.startsWith(`/publicaciones/`):
      return post ? `/posts/${post.en.slug}` : `/posts`;

    // pages of teachings
    case path.startsWith(`/teachings`):
      return path.replace(`/teachings`, `/ensenanzas`);
    case path.startsWith(`/ensenanzas`):
      return path.replace(`/ensenanzas`, `/teachings`);

    // pages of posts
    case path.startsWith(`/posts`):
      return path.replace(`/posts`, `/publicaciones`);
    case path.startsWith(`/publicaciones`):
      return path.replace(`/publicaciones`, `/posts`);

    default:
      return `/`;
  }
}

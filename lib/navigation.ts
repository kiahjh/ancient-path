import { Post } from "./types";

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

    // pages of teachings
    case path.startsWith(`/teachings/page/`):
      return path.replace(`/teachings/page/`, `/ensenanzas/pagina/`);
    case path.startsWith(`/ensenanzas/pagina/`):
      return path.replace(`/ensenanzas/pagina/`, `/teachings/page/`);

    // pages of posts
    case path.startsWith(`/posts/page/`):
      return path.replace(`/posts/page/`, `/publicaciones/pagina/`);
    case path.startsWith(`/publicaciones/pagina/`):
      return path.replace(`/publicaciones/pagina/`, `/posts/page/`);

    // individual teachings
    case path.startsWith(`/teachings/`):
      return post ? `/ensenanzas/${post.es.slug}` : `/ensenanzas/pagina/1`;
    case path.startsWith(`/ensenanzas/`):
      return post ? `/teachings/${post.en.slug}` : `/teachings/page/1`;

    // individual posts
    case path.startsWith(`/posts/`):
      return post
        ? `/publicaciones/${post.es.slug}`
        : `/publicaciones/pagina/1`;
    case path.startsWith(`/publicaciones/`):
      return post ? `/posts/${post.en.slug}` : `/posts/page/1`;

    default:
      return `/`;
  }
}

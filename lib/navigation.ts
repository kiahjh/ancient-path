export function getAlternateLanguagePath(
  path: string,
  alternateSlug?: string,
): string {
  switch (path) {
    case `/where-to-start`:
      return `/donde-empezar`;
    case `/donde-empezar`:
      return `/where-to-start`;
    case `/about`:
      return `/acerca-de`;
    case `/acerca-de`:
      return `/about`;
    case `/contact`:
      return `/contacto`;
    case `/contacto`:
      return `/contact`;
    case `/books`:
      return `/libros`;
    case `/libros`:
      return `/books`;
    default:
      return `/`;
  }
}
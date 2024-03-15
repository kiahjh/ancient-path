export function getAlternateLanguagePath(path: string): string {
  switch (path) {
    case `/where-to-start`:
      return `/donde-empezar`;
    case `/donde-empezar`:
      return `/where-to-start`;
    case `/about`:
      return `/acerca-de-mi`;
    case `/acerca-de-mi`:
      return `/about`;
    case `/contact`:
      return `/contacto`;
    case `/contacto`:
      return `/contact`;
    case `/books`:
      return `/libros`;
    case `/libros`:
      return `/books`;
    case `/podcast-en`:
      return `/podcast-es`;
    case `/podcast-es`:
      return `/podcast-en`;
    default:
      return `/`;
  }
}

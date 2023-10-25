import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export function useAlternateLangageNavigation(): () => void {
  const path = usePathname();
  const router = useRouter();
  return () => {
    switch (path) {
      case `/where-to-start`:
        router.push(`/donde-empezar`);
        break;
      case `/donde-empezar`:
        router.push(`/where-to-start`);
        break;
      case `/about`:
        router.push(`/acerca-de`);
        break;
      case `/acerca-de`:
        router.push(`/about`);
        break;
      case `/contact`:
        router.push(`/contacto`);
        break;
      case `/contacto`:
        router.push(`/contact`);
        break;
      case `/books`:
        router.push(`/libros`);
        break;
      case `/libros`:
        router.push(`/books`);
        break;
      default:
        router.push(`/`);
        break;
    }
  };
}

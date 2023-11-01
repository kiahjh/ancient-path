import { describe, expect, it } from "vitest";
import { getAlternateLanguagePath } from "../navigation";

describe(`useAlternateLanguageNavigation`, () => {
  it(`navigates to the correct paths for basic cases`, () => {
    expect(getAlternateLanguagePath(`/`)).toBe(`/`);
    expect(getAlternateLanguagePath(`/where-to-start`)).toBe(`/donde-empezar`);
    expect(getAlternateLanguagePath(`/donde-empezar`)).toBe(`/where-to-start`);
    expect(getAlternateLanguagePath(`/about`)).toBe(`/acerca-de`);
    expect(getAlternateLanguagePath(`/acerca-de`)).toBe(`/about`);
    expect(getAlternateLanguagePath(`/contact`)).toBe(`/contacto`);
    expect(getAlternateLanguagePath(`/contacto`)).toBe(`/contact`);
    expect(getAlternateLanguagePath(`/books`)).toBe(`/libros`);
    expect(getAlternateLanguagePath(`/libros`)).toBe(`/books`);
  });

  it(`works for more advanced cases`, () => {
    expect(getAlternateLanguagePath(`/posts/page/1`)).toBe(
      `/publicaciones/pagina/1`,
    );
    expect(getAlternateLanguagePath(`/publicaciones/pagina/7`)).toBe(
      `/posts/page/7`,
    );
    expect(getAlternateLanguagePath(`/teachings/page/4`)).toBe(
      `/ensenanzas/pagina/4`,
    );
    expect(getAlternateLanguagePath(`/ensenanzas/pagina/2`)).toBe(
      `/teachings/page/2`,
    );
  });
});

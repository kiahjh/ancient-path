import { describe, expect, it } from "vitest";
import { getAlternateLanguagePath } from "../navigation";
import { Post } from "../types";

describe(`useAlternateLanguageNavigation`, () => {
  const testPost: Post = {
    id: `1`,
    createdAt: `2021-01-01`,
    modifiedAt: `2021-01-01`,
    publishedAt: `2021-01-01`,
    series: null,
    category: `post`,
    en: {
      title: `Test Post`,
      slug: `test-post`,
      content: `Test content`,
      description: `Test description`,
      mp3Url: `test.mp3`,
      audioSize: 1,
      audioDuration: 1,
    },
    es: {
      title: `Publicación de prueba`,
      slug: `publicacion-de-prueba`,
      content: `Contenido de prueba`,
      description: `Descripción de prueba`,
      mp3Url: `prueba.mp3`,
      audioSize: 1,
      audioDuration: 1,
    },
  };

  it(`navigates to the correct paths for basic cases`, () => {
    expect(getAlternateLanguagePath(`/`, testPost)).toBe(`/`);
    expect(getAlternateLanguagePath(`/where-to-start`, testPost)).toBe(
      `/donde-empezar`,
    );
    expect(getAlternateLanguagePath(`/donde-empezar`, testPost)).toBe(
      `/where-to-start`,
    );
    expect(getAlternateLanguagePath(`/about`, testPost)).toBe(`/acerca-de-mi`);
    expect(getAlternateLanguagePath(`/acerca-de-mi`, testPost)).toBe(`/about`);
    expect(getAlternateLanguagePath(`/contact`, testPost)).toBe(`/contacto`);
    expect(getAlternateLanguagePath(`/contacto`, testPost)).toBe(`/contact`);
    expect(getAlternateLanguagePath(`/books`, testPost)).toBe(`/libros`);
    expect(getAlternateLanguagePath(`/libros`, testPost)).toBe(`/books`);
  });

  it(`works for more advanced cases`, () => {
    expect(getAlternateLanguagePath(`/posts/page/1`, testPost)).toBe(
      `/publicaciones/pagina/1`,
    );
    expect(getAlternateLanguagePath(`/publicaciones/pagina/7`, testPost)).toBe(
      `/posts/page/7`,
    );
    expect(getAlternateLanguagePath(`/teachings/page/4`, testPost)).toBe(
      `/ensenanzas/pagina/4`,
    );
    expect(getAlternateLanguagePath(`/ensenanzas/pagina/2`, testPost)).toBe(
      `/teachings/page/2`,
    );

    expect(getAlternateLanguagePath(`/teachings/test-post`, testPost)).toBe(
      `/ensenanzas/publicacion-de-prueba`,
    );
    expect(
      getAlternateLanguagePath(`/ensenanzas/publicacion-de-prueba`, testPost),
    ).toBe(`/teachings/test-post`);
    expect(getAlternateLanguagePath(`/posts/test-post`, testPost)).toBe(
      `/publicaciones/publicacion-de-prueba`,
    );
    expect(
      getAlternateLanguagePath(
        `/publicaciones/publicacion-de-prueba`,
        testPost,
      ),
    ).toBe(`/posts/test-post`);
  });
});

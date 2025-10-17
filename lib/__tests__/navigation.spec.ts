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
      mp3Url: `test.mp3`,
      audioSize: 1,
      audioDuration: 1,
    },
    es: {
      title: `Publicación de prueba`,
      slug: `publicacion-de-prueba`,
      content: `Contenido de prueba`,
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
    expect(getAlternateLanguagePath(`/posts`, testPost)).toBe(`/publicaciones`);
    expect(getAlternateLanguagePath(`/publicaciones`, testPost)).toBe(`/posts`);
    expect(getAlternateLanguagePath(`/teachings`, testPost)).toBe(
      `/ensenanzas`,
    );
    expect(getAlternateLanguagePath(`/ensenanzas`, testPost)).toBe(
      `/teachings`,
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

import type { Language } from "@/lib/types";
import {
  authoredBookIds,
  authoredBooks,
  type AuthoredBookId,
} from "@/lib/authored-books";

export const dynamic = `force-dynamic`;

export async function GET(
  request: Request,
  { params }: { params: { bookId: string; language: string } },
): Promise<Response> {
  if (!isAuthoredBookId(params.bookId) || !isLanguage(params.language)) {
    return new Response(`Audiobook not found`, { status: 404 });
  }

  const audiobook =
    authoredBooks[params.bookId].translations[params.language].audio;
  if (!audiobook) {
    return new Response(`Audiobook not found`, { status: 404 });
  }

  const requestHeaders = new Headers();
  const range = request.headers.get(`range`);
  if (range) requestHeaders.set(`range`, range);

  const upstream = await fetch(audiobook.mp3Url, {
    headers: requestHeaders,
    cache: `no-store`,
    signal: request.signal,
  });

  if (!upstream.ok) {
    return new Response(`Unable to download audiobook`, {
      status: upstream.status,
    });
  }

  const headers = new Headers({
    "Accept-Ranges": upstream.headers.get(`accept-ranges`) ?? `bytes`,
    "Cache-Control": `private, no-store`,
    "Content-Disposition": contentDisposition(audiobook.fileName),
    "Content-Type": `audio/mpeg`,
    "X-Content-Type-Options": `nosniff`,
  });

  for (const name of [
    `content-length`,
    `content-range`,
    `etag`,
    `last-modified`,
  ]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
}

function isAuthoredBookId(value: string): value is AuthoredBookId {
  return authoredBookIds.includes(value as AuthoredBookId);
}

function isLanguage(value: string): value is Language {
  return value === `en` || value === `es`;
}

function contentDisposition(fileName: string): string {
  const asciiFileName = fileName
    .replace(/[^\x20-\x7e]/g, `_`)
    .replace(/["\\]/g, `_`);
  const encodedFileName = encodeURIComponent(fileName).replace(
    /['()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `attachment; filename="${asciiFileName}"; filename*=UTF-8''${encodedFileName}`;
}

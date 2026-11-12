import type { Language } from "@/lib/types";
import {
  authoredBookIds,
  authoredBooks,
  type AuthoredBookId,
} from "@/lib/authored-books";

export const dynamic = `force-dynamic`;

// Redirect to the file instead of proxying it: proxying every byte through a
// function counts against Vercel's Fast Origin Transfer limit.
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

  return Response.redirect(audiobook.mp3Url, 302);
}

function isAuthoredBookId(value: string): value is AuthoredBookId {
  return authoredBookIds.includes(value as AuthoredBookId);
}

function isLanguage(value: string): value is Language {
  return value === `en` || value === `es`;
}

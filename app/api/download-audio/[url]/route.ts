// Redirect to the file instead of proxying it: proxying every byte through a
// function counts against Vercel's Fast Origin Transfer limit.
const ALLOWED_HOSTS = [
  `hender-blog.nyc3.digitaloceanspaces.com`,
  `nyc3.digitaloceanspaces.com`,
];

export async function GET(
  request: Request,
  { params }: { params: { url: string } },
): Promise<Response> {
  let url: URL;
  try {
    url = new URL(params.url);
  } catch {
    return new Response(`Invalid audio URL`, { status: 400 });
  }

  const allowed =
    url.protocol === `https:` &&
    ALLOWED_HOSTS.includes(url.hostname) &&
    (url.hostname !== `nyc3.digitaloceanspaces.com` ||
      url.pathname.startsWith(`/hender-blog/`));
  if (!allowed) {
    return new Response(`Invalid audio URL`, { status: 400 });
  }

  return Response.redirect(url, 302);
}

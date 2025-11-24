export async function GET(
  request: Request,
  { params }: { params: { url: string } },
): Promise<Response> {
  const { url } = params;
  const res = await fetch(url);
  const status = res.status;
  const blob = await res.blob();
  return new Response(blob, {
    status,
    headers: {
      "Content-Type": `audio/mpeg`,
    },
  });
}

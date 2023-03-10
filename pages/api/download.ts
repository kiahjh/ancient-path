import { NextApiHandler } from 'next';
import fetch from 'node-fetch';

const handler: NextApiHandler = async (req, res) => {
  const url = req.query.url;
  const fileName = decodeURIComponent(req.query.title as string).replace(
    /[^a-z0-9]/gi,
    '_',
  );
  const fetchResponse = await fetch(url as string);
  const bob = await fetchResponse.arrayBuffer();
  res
    .setHeader('Content-Type', 'application/mp3')
    .setHeader('Content-Length', bob.byteLength)
    .setHeader('Content-Disposition', `filename="${fileName}"`)
    .status(200)
    .end(Buffer.from(bob));
};

export default handler;

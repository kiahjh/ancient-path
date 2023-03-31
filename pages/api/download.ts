import { NextApiHandler } from 'next';
import fetch from 'node-fetch';

const handler: NextApiHandler = async (req, res) => {
  const url = req.query.url;
  const title = req.query.title;
  if (typeof url !== 'string' || typeof title !== 'string') {
    res.status(400).send('Bad Request');
    return;
  }
  const fileName = decodeURIComponent(title).replace(/[^a-z0-9]/gi, '_');
  const fetchResponse = await fetch(url);
  const buffer = await fetchResponse.arrayBuffer();
  res
    .setHeader('Content-Type', 'application/mp3')
    .setHeader('Content-Length', buffer.byteLength)
    .setHeader('Content-Disposition', `filename="${fileName}"`)
    .status(200)
    .end(Buffer.from(buffer));
};

export default handler;

export const config = {
  api: {
    responseLimit: '100mb',
  },
};

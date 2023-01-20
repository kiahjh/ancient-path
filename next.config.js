/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: `/podcast.en.rss`,
        headers: [{ key: `Content-Type`, value: `text/xml;charset=UTF-8` }],
      },
      {
        source: `/podcast.es.rss`,
        headers: [{ key: `Content-Type`, value: `text/xml;charset=UTF-8` }],
      },
    ];
  },
};

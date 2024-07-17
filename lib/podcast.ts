import type { Language, Post } from "./types";

export function podcastXml(lang: Language, posts: Array<Post>): string {
  const description =
    lang === `en`
      ? `I write because I feel, and in order to be felt, and not for amusement. Remember, life is short, its business arduous, the prize immortal glory, the failure eternal misery.`
      : `Escribo porque siento, y para que me sientan, y no por diversión. Recuerda que la vida es corta, su labor es ardua, el premio es la gloria inmortal, el fracaso la miseria eterna.`;
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <rss
    version="2.0"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <atom:link
        href="${url()}/podcast.${lang}.rss"
        rel="self"
        type="application/rss+xml"
      />
      <title>${lang === `en` ? `The Ancient Path` : `La Senda Antigua`}</title>
      <link>${url()}</link>
      <language>en</language>
      <itunes:author>Jason Henderson</itunes:author>
      <itunes:subtitle>${description}</itunes:subtitle>
      <description>${description}</description>
      <itunes:summary>${description}</itunes:summary>
      <itunes:explicit>clean</itunes:explicit>
      <itunes:type>episodic</itunes:type>
      <itunes:owner>
        <itunes:name>Jared Henderson</itunes:name>
        <itunes:email>jared.thomas.henderson@gmail.com</itunes:email>
      </itunes:owner>
      <itunes:image href="https://flp-assets.nyc3.digitaloceanspaces.com/ancient-path/podcast-${lang}.png" />
      <image>
        <url>https://flp-assets.nyc3.digitaloceanspaces.com/ancient-path/podcast-${lang}.png</url>
        <title>${lang === `en` ? `The Ancient Path` : `La Senda Antigua`}</title>
        <link>${url()}</link>
      </image>
      <itunes:category text="Religion &amp; Spirituality">
        <itunes:category text="Christianity" />
      </itunes:category>
      ${posts
        .map(
          (post) => `
          <item>
      ${audioItemData(lang, post)}
          </item>
        `,
        )
        .join(``)}
    </channel>
  </rss>`.trim();
}

function cdata(text: string): string {
  const encoded = text
    .replace(/&#x26;mdash;/g, `&mdash;`)
    .replace(/&#x26;nbsp;&#x26;nbsp;/g, ``)
    .replace(/&?nbsp;/g, ` `)
    .replace(/&#39;/g, ``)
    .replace(/&oacute;/g, `ó`)
    .replace(/&aacute;/g, `á`)
    .replace(/&eacute;/g, `é`)
    .replace(/&iacute;/g, `í`)
    .replace(/&ntilde;/g, `ñ`)
    .replace(/&mdash;/g, `—`)
    .replace(/&nbsp;/g, ` `)
    .replace(/&rsquo;/g, `’`)
    .replace(/&lsquo;/g, `‘`)
    .replace(/&rdquo;/g, `”`)
    .replace(/&ldquo;/g, `“`)
    .replace(/ +/g, ` `);
  return `<![CDATA[${encoded}]]>`;
}

function audioItemData(lang: Language, post: Post): string {
  const thisPost = post[lang];
  return [
    `<title>${thisPost.title}</title>`,
    `<enclosure url="${thisPost.mp3Url}" length="${thisPost.audioSize}" type="audio/mpeg" />`,
    `<itunes:author>Jason Henderson</itunes:author>`,
    `<itunes:subtitle>${cdata(thisPost.description)}</itunes:subtitle>`,
    `<itunes:summary>${cdata(thisPost.description)}</itunes:summary>`,
    `<description>${cdata(thisPost.description)}</description>`,
    `<link>${url()}/posts/${thisPost.slug}</link>`,
    `<guid>${url()}/posts/${thisPost.slug}</guid>`,
    `<pubDate>${post.createdAt}</pubDate>`,
    `<itunes:duration>${thisPost.audioDuration}</itunes:duration>`,
    `<itunes:explicit>clean</itunes:explicit>`,
    `<itunes:episodeType>full</itunes:episodeType>`,
  ]
    .map((line) => `      ${line}`)
    .join(`\n    `);
}

function url(): string {
  if (process.env.VERCEL_ENV === `production`) {
    return `https://hender.blog`;
  } else if (process.env.VERCEL_URL !== undefined) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return `http://localhost:3000`;
  }
}

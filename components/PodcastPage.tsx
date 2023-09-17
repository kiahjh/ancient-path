import React from 'react';
import PageWrapper from '../components/PageWrapper';
import PodcastService from '../components/PodcastService';
import { Lang } from '../lib/types';

import Apple from '../public/apple-podcasts.webp';
import Overcast from '../public/overcast.webp';
import Spotify from '../public/spotify.webp';
import Android from '../public/android.webp';
import RSS from '../public/rss.webp';

interface Props {
  language: Lang;
}

const PodcastPage: React.FC<Props> = ({ language }) => {
  const c = content[language];

  return (
    <PageWrapper
      page={c.page}
      smallFooter
      language={language}
      withChrome
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={c.metaDescription}
    >
      <div className="p-8 md:p-16 dark:bg-slate-900">
        <h2 className="text-3xl xs:text-4xl font-inter dark:text-white">{c.heading}</h2>
        <p className="mt-3 text-slate-500">{c.paragraph}</p>
        <div className="flex items-center justify-center flex-wrap bg-slate-100 dark:bg-black/20 mt-12 rounded-3xl p-6">
          <PodcastService href={c.links.apple} name="Apple" img={Apple.src} />
          <PodcastService href={c.links.overcast} name="Overcast" img={Overcast.src} />
          <PodcastService href={c.links.spotify} name="Spotify" img={Spotify.src} />
          <PodcastService href={c.links.android} name="Android" img={Android.src} />
          <PodcastService
            name="RSS"
            img={RSS.src}
            onClick={() => {
              navigator.clipboard
                .writeText(`https://hender.blog/podcast.${language}.rss`)
                .then(() => alert(c.RSSAlertText));
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default PodcastPage;

const content = {
  en: {
    page: '/en-podcast',
    redirectTo: '/es-podcast',
    title: 'Podcast | The Ancient Path',
    metaDescription: 'Spiritual writings',
    heading: 'Podcast',
    links: {
      apple: 'https://podcasts.apple.com/us/podcast/hender-blog/id1645365966',
      overcast: 'https://overcast.fm/itunes1645365966',
      spotify: 'https://open.spotify.com/show/3JDQmzp0D4FNXeE7NC5D5S',
      android: 'https://www.subscribeonandroid.com/hender.blog/podcast.en.rss',
    },
    paragraph:
      'To subscribe to a podcast of the audio versions of posts from this blog, click one of the links below:',
    RSSAlertText:
      'The podcast URL was copied to your clipboard. Open your podcast app of choice and paste it in. You may need to search for an advanced option that allows you to "Add a show by URL".',
  },
  es: {
    page: '/es-podcast',
    redirectTo: '/en-podcast',
    title: 'Podcast | La Senda Antigua',
    metaDescription: 'Escrituras espirituales',
    heading: 'Podcast',
    links: {
      apple: 'https://podcasts.apple.com/us/podcast/la-senda-antigua/id1645366119',
      overcast: 'https://overcast.fm/itunes1645366119',
      spotify: 'https://open.spotify.com/show/3T32aJ757tMg2kyzG2kANh',
      android: 'https://www.subscribeonandroid.com/hender.blog/podcast.es.rss',
    },
    paragraph:
      'Para suscribirte a un podcast de los audios de las publicaciones de este blog, haz clic en uno de los enlaces siguientes:',
    RSSAlertText:
      'La URL del podcast se ha copiado en el portapapeles. Abre la aplicación de podcasts que prefieras y pégala. Puede que tengas que buscar una opción avanzada que te permita “Añadir un programa por URL”.',
  },
};

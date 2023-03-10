import React from 'react';
import PodcastService from '../components/PodcastService';

import Apple from '../public/apple-podcasts.webp';
import Overcast from '../public/overcast.webp';
import Spotify from '../public/spotify.webp';
import Android from '../public/android.webp';
import RSS from '../public/rss.webp';
import PageWrapper from '../components/PageWrapper';

const SpanishPodcasts: React.FC = () => {
  return (
    <PageWrapper
      page="/es-podcast"
      smallFooter
      language="es"
      withChrome
      redirectTo="/en-podcast"
      title="Podcast | La Senda Antigua"
      metaDescription="Escrituras espirituales"
    >
      <div className="p-8 md:p-16 dark:bg-slate-900">
        <h2 className="text-3xl xs:text-4xl font-inter dark:text-white">Podcast</h2>
        <p className="mt-3 text-slate-500">
          Para suscribirte a un podcast de los audios de las publicaciones de este blog,
          haz clic en uno de los enlaces siguientes:
        </p>
        <div className="flex items-center justify-center flex-wrap bg-slate-100 dark:bg-black/20 mt-12 rounded-3xl p-6">
          <PodcastService
            href="https://podcasts.apple.com/us/podcast/hender-blog/id1645366119"
            name="Apple"
            img={Apple.src}
          />
          <PodcastService
            href="https://overcast.fm/itunes1645366119"
            name="Overcast"
            img={Overcast.src}
          />
          <PodcastService
            href="https://open.spotify.com/show/3T32aJ757tMg2kyzG2kANh"
            name="Spotify"
            img={Spotify.src}
          />
          <PodcastService
            href="https://www.subscribeonandroid.com/hender.blog/podcast.es.rss"
            name="Android"
            img={Android.src}
          />
          <PodcastService
            name="RSS"
            img={RSS.src}
            onClick={() => {
              navigator.clipboard
                .writeText('http://hender.blog/podcast.es.rss')
                .then(() =>
                  alert(
                    'l enlace del podcast se ha copiado en el portapapeles. Abre tu aplicaci??n de podcast y p??galo. Puede que tengas que buscar una opci??n avanzada que te permita ???A??adir un programa por URL???.',
                  ),
                );
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default SpanishPodcasts;

import React from 'react';
import Chrome from '../components/Chrome';
import PodcastService from '../components/PodcastService';

import Apple from '../public/apple-podcasts.webp';
import Overcast from '../public/overcast.webp';
import Spotify from '../public/spotify.webp';
import Android from '../public/android.webp';
import RSS from '../public/rss.webp';

const SpanishPodcasts: React.FC = () => {
  return (
    <Chrome page="/es-podcast" smallFooter>
      <div className="p-8 md:p-16">
        <h2 className="text-3xl xs:text-4xl font-inter">Podcast</h2>
        <p className="mt-3 text-gray-500">
          Para suscribirte a un podcast de los audios de las publicaciones de este blog,
          haz clic en uno de los enlaces siguientes:
        </p>
        <div className="flex items-center justify-center flex-wrap bg-gray-100 mt-12 rounded-3xl p-6">
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
                    'l enlace del podcast se ha copiado en el portapapeles. Abre tu aplicación de podcast y pégalo. Puede que tengas que buscar una opción avanzada que te permita “Añadir un programa por URL”.',
                  ),
                );
            }}
          />
        </div>
      </div>
    </Chrome>
  );
};

export default SpanishPodcasts;

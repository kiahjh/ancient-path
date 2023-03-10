import React from 'react';
import PageWrapper from '../components/PageWrapper';
import PodcastService from '../components/PodcastService';

import Apple from '../public/apple-podcasts.webp';
import Overcast from '../public/overcast.webp';
import Spotify from '../public/spotify.webp';
import Android from '../public/android.webp';
import RSS from '../public/rss.webp';

const EnglishPodcasts: React.FC = () => {
  return (
    <PageWrapper
      page="/en-podcast"
      smallFooter
      language="en"
      withChrome
      redirectTo="/es-podcast"
      title="Podcast | The Ancient Path"
      metaDescription="Spiritual writings"
    >
      <div className="p-8 md:p-16 dark:bg-slate-900">
        <h2 className="text-3xl xs:text-4xl font-inter dark:text-white">Podcast</h2>
        <p className="mt-3 text-slate-500">
          To subscribe to a podcast of the audio versions of posts from this blog, click
          one of the links below:
        </p>
        <div className="flex items-center justify-center flex-wrap bg-slate-100 dark:bg-black/20 mt-12 rounded-3xl p-6">
          <PodcastService
            href="https://podcasts.apple.com/us/podcast/hender-blog/id1645365966"
            name="Apple"
            img={Apple.src}
          />
          <PodcastService
            href="https://overcast.fm/itunes1645365966"
            name="Overcast"
            img={Overcast.src}
          />
          <PodcastService
            href="https://open.spotify.com/show/3JDQmzp0D4FNXeE7NC5D5S"
            name="Spotify"
            img={Spotify.src}
          />
          <PodcastService
            href="https://www.subscribeonandroid.com/hender.blog/podcast.en.rss"
            name="Android"
            img={Android.src}
          />
          <PodcastService
            name="RSS"
            img={RSS.src}
            onClick={() => {
              navigator.clipboard
                .writeText('http://hender.blog/podcast.en.rss')
                .then(() =>
                  alert(
                    'The podcast URL was copied to your clipboard. Open your podcast app of choice and paste it in. You may need to search for an advanced option that allows you to "Add a show by URL".',
                  ),
                );
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default EnglishPodcasts;

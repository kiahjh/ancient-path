import Image from 'next/image';
import React from 'react';
import Chrome from '../components/Chrome';

interface Props {}

const AboutMe: React.FC<Props> = ({}) => {
  return (
    <Chrome page="/about" smallFooter>
      <section className="flex justify-center items-center py-8 px-3 sm:px-8 relative">
        <div className="absolute w-full h-112 bg-sky-100 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 z-0"></div>
        <div className="py-10 px-6 sm:px-10 border-[0.5px] shadow-xl rounded-2xl relative bg-white max-w-4xl">
          <h1 className="text-3xl font-inter text-opacity-70 text-center mb-8">
            About me
          </h1>
          <Image
            src="/profile.jpg"
            alt="photo of Jason Henderson"
            width={288}
            height={288}
            className="rounded-3xl hidden sm:block w-52 md:w-72 float-left mr-6 mb-4 shadow-xl"
          />
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            I don’t have much to say about myself. But I understand that some who come
            across this site may, for their own peace of mind, desire to know something
            about the author. To these then, let me say: I am a Christian, a sincere
            believer in Jesus Christ, and one who desires with all his heart to walk in
            the new and living way that He has opened for the redeemed. My honest desire
            and sole aspiration is to love the Lord my God with all of my heart, soul,
            mind and strength, to honor Him by the perfect surrender of my will, to fear
            Him as the Judge of all the living, to seek Him by an incessant prayer of the
            heart, to know Him by the revelation and formation of His life in me, to serve
            Him by the operation of His grace, and to please Him by offering Him the
            increase of His own heavenly seed.
          </p>
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            I have no credentials, degrees, connections, prestige, endorsements, or
            success stories to offer for your consideration, and would never recommend my
            writings based upon such things. I can only say that, by the mercy of God, and
            in response to great anxiety and desperation, there was a day when I began to
            see past the shell of religion, into a measure of the living kernel, and to
            find and feel that all the religion in the world is like a fading leaf when it
            lacks the pure life and living power of God which saves from sin, transforms
            the soul, and brings into oneness with Him. This is all I want to share—my
            small measure of His light and life—for the encouragement and the fellowship
            of those who can feel something behind the words. I am not looking for “likes”
            or subscribers; I have no monetary motives, and have the greatest aversion to
            theological debates. My one objective and hope, is that by sharing these
            things, some of you may feel the stirring of Christ’s life in your hearts, the
            shining of His light upon the ancient Highway of Holiness, and find a
            willingness wrought in your hearts to follow Him more fully in the narrow (and
            increasingly unpopular) way of the cross.
          </p>
          <p className="mt-5 text-lg text-black text-opacity-60 text-justify">
            I am married, have four children, and live in Ohio, USA, where I am very
            involved in a small local church.
          </p>
          <p className="mt-5 text-lg italic text-right font-medium text-black/80">
            &ndash; Jason Henderson, August 2022
          </p>
        </div>
      </section>
    </Chrome>
  );
};

export default AboutMe;

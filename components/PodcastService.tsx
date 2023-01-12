import React from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  img: string;
  href?: string;
  onClick?: () => unknown;
}

const PodcastService: React.FC<Props> = ({ name, img, href, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex flex-col items-center justify-center space-y-3 p-6 m-4 md:m-8 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-150 rounded-xl w-24 xs:w-32 border-[0.5px] bg-white"
    >
      <Image src={img} width={50} height={50} alt={'Podcast service logo'} />
      <h4 className="text-lg font-bold text-gray-800">{name}</h4>
    </a>
  );
};

export default PodcastService;

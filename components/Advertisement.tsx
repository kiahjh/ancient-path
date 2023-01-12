import Image from 'next/image';
import React from 'react';

interface Props {
  img: string;
  description: string;
  url: string;
}

const Advertisement: React.FC<Props> = ({ img, description, url }) => {
  return (
    <div className="bg-white flex flex-col rounded-xl shadow-lg">
      <div className="p-6 pb-3">
        <Image width={200} height={200} alt="company logo" src={img} className="mb-4" />
        <p className="text-gray-500 mb-3">{description}</p>
      </div>
      <div className="flex justify-end p-4 bg-slate-50 rounded-b-xl">
        <a
          className="text-blue-500 hover:text-blue-600 transition duration-100 cursor-pointer"
          href={url}
        >
          Check it out <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
        </a>
      </div>
    </div>
  );
};

export default Advertisement;

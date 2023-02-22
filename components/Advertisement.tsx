import Image from 'next/image';
import React, { useContext } from 'react';
import { LanguageContext } from '../lib/LanguageContext';

interface Props {
  img: string;
  description: string;
  url: string;
}

const Advertisement: React.FC<Props> = ({ img, description, url }) => {
  const language = useContext(LanguageContext);
  return (
    <div className="bg-white dark:bg-slate-900 flex flex-col rounded-xl shadow-lg">
      <div className="p-6 pb-3">
        <Image
          width={200}
          height={200}
          alt="company logo"
          src={img}
          className="mb-4 dark:[filter:brightness(200)]"
        />
        <p className="text-slate-500 dark:text-slate-400 mb-3">{description}</p>
      </div>
      <div className="flex justify-end p-4 bg-slate-50 dark:bg-slate-800 rounded-b-xl">
        <a
          className="text-blue-500 dark:text-sky-400 hover:text-blue-600 dark:hover:text-sky-300 transition duration-100 cursor-pointer"
          href={url}
        >
          {language === 'en' ? 'Check it out' : 'Echa un vistazo'}{' '}
          <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
        </a>
      </div>
    </div>
  );
};

export default Advertisement;

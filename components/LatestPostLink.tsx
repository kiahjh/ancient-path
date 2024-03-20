import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { initializeLanguage } from "@/lib/actions";
import { relativeTime } from "@/lib/dates";
import { getAllPosts } from "@/lib/get-data";

const LatestPostLink: React.FC = async () => {
  const language = await initializeLanguage();

  const latestPost = (await getAllPosts())[0];

  if (!latestPost) {
    return null;
  }

  let latestPostLink = `/`;
  if (latestPost.category === `post` && language === `en`) {
    latestPostLink = `/posts/${latestPost[language].slug}`;
  } else if (latestPost.category === `post` && language === `es`) {
    latestPostLink = `/publicaciones/${latestPost[language].slug}`;
  } else if (latestPost.category === `teaching` && language === `en`) {
    latestPostLink = `/teachings/${latestPost[language].slug}`;
  } else if (latestPost.category === `teaching` && language === `es`) {
    latestPostLink = `/ensenanzas/${latestPost[language].slug}`;
  }

  return (
    <Link
      href={latestPostLink}
      className="flex items-center justify-between gap-16 bg-sky-200/70 hover:bg-sky-200 transition-colors duration-300 rounded-full p-1 mb-12 group"
    >
      <div className="gap-3 flex items-center">
        <span className="capitalize text-sky-800 bg-sky-300/50 rounded-full px-4 py-0.5 font-medium hidden xs:block">
          {relativeTime(latestPost.createdAt, language)}:
        </span>
        <span className="font-semibold text-sky-800 pl-4 xs:pl-0">
          {latestPost[language].title}
        </span>
      </div>
      <div className="w-7 h-7 rounded-full bg-white/50 flex items-center justify-center text-sky-600">
        <ArrowRightIcon className="w-5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
};

export default LatestPostLink;

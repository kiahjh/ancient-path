"use client";

import React from "react";
import {
  ArchiveIcon,
  BookOpenIcon,
  MessageCircleIcon,
  MessageSquareIcon,
  HomeIcon,
  MapPinIcon,
  CircleHelpIcon,
  PodcastIcon,
  AudioLinesIcon,
  LightbulbIcon,
  StickyNoteIcon,
  FeatherIcon,
  PencilIcon,
  FilePen,
  LightbulbOffIcon,
  DogIcon,
  MilestoneIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { useGlobalState } from "@/lib/hooks";

const GlobalNav: React.FC<{
  isMobile: boolean;
  setOpen(open: boolean): void;
}> = ({ isMobile, setOpen }) => {
  const { state } = useGlobalState();
  const path = usePathname();

  function dual<T>(english: T, spanish: T): T {
    return state.language === `en` ? english : spanish;
  }

  return (
    <nav className="">
      <div className="mt-10 sm:mt-12 p-4">
        <div className="sm:p-2">
          <NavLink
            href="/"
            setOpen={setOpen}
            isMobile={isMobile}
            selected={path === `/`}
            icon={HomeIcon}
          >
            {dual(`Home`, `Inicio`)}
          </NavLink>
          <NavLink
            href={dual(`/where-to-start`, `/donde-empezar`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(
              path === `/where-to-start`,
              path === `/donde-empezar`,
            )}
            icon={MapPinIcon}
          >
            {dual(`Where to start`, `Donde empezar`)}
          </NavLink>
          <NavLink
            href={dual(`/podcast-en`, `/podcast-es`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(path === `/podcast-en`, path === `/podcast-es`)}
            icon={PodcastIcon}
          >
            Podcast
          </NavLink>
          <NavLink
            href={dual(`/about`, `/acerca-de-mi`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(path === `/about`, path === `/acerca-de-mi`)}
            icon={CircleHelpIcon}
          >
            {dual(`About`, `Acerca de mí`)}
          </NavLink>
          <NavLink
            href={dual(`/contact`, `/contacto`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(path === `/contact`, path === `/contacto`)}
            icon={MessageCircleIcon}
          >
            {dual(`Contact me`, `Contacto`)}
          </NavLink>
        </div>
        <div className="mt-6 sm:mt-8">
          <h4 className="ml-6 mb-1 font-medium text-sky-700/60 dark:text-slate-600">
            {dual(`Resources`, `Recursos`)}
          </h4>
          <div className="bg-sky-200/10 dark:bg-sky-800/5 sm:border border-dashed border-sky-300/50 dark:border-sky-500/20 sm:p-2 rounded-3xl">
            <NavLink
              href={dual(`/teachings/page/1`, `/ensenanzas/pagina/1`)}
              setOpen={setOpen}
              isMobile={isMobile}
              selected={dual(
                path.includes(`/teachings`),
                path.includes(`/ensenanzas`),
              )}
              icon={FilePen}
            >
              {dual(`Teachings`, `Enseñanzas`)}
            </NavLink>
            <NavLink
              href={dual(`/posts/page/1`, `/publicaciones/pagina/1`)}
              setOpen={setOpen}
              isMobile={isMobile}
              selected={dual(
                path.includes(`/posts`),
                path.includes(`/publicaciones`),
              )}
              icon={MilestoneIcon}
            >
              {dual(`Posts`, `Publicaciones`)}
            </NavLink>
            <NavLink
              href={dual(`/meetings`, `/reuniones`)}
              setOpen={setOpen}
              isMobile={isMobile}
              selected={dual(path === `/meetings`, path === `/reuniones`)}
              icon={AudioLinesIcon}
            >
              {dual(`Meetings`, `Reuniones`)}
            </NavLink>
            <NavLink
              href={dual(`/books`, `/libros`)}
              setOpen={setOpen}
              isMobile={isMobile}
              selected={dual(path === `/books`, path === `/libros`)}
              icon={BookOpenIcon}
            >
              {dual(`Books`, `Libros`)}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;

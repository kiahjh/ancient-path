"use client";

import React, { useEffect, useState } from "react";
import {
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  ChatBubbleLeftIcon as ChatBubbleLeftIconOutline,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  HomeIcon as HomeIconOutline,
  MapPinIcon as MapPinIconOutline,
  QuestionMarkCircleIcon as QuestionMarkCircleIconOutline,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  HomeIcon as HomeIconSolid,
  MapPinIcon as MapPinIconSolid,
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { useGlobalState } from "@/lib/hooks";

const GlobalNav: React.FC<{
  isMobile: boolean;
  setOpen(open: boolean): void;
}> = ({ isMobile, setOpen }) => {
  const {
    state: { language },
  } = useGlobalState();
  const path = usePathname();

  function dual<T>(english: T, spanish: T): T {
    return language === `en` ? english : spanish;
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
            DefaultIcon={HomeIconOutline}
            SelectedIcon={HomeIconSolid}
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
            DefaultIcon={MapPinIconOutline}
            SelectedIcon={MapPinIconSolid}
          >
            {dual(`Where to start`, `Donde empezar`)}
          </NavLink>
          <NavLink
            href={dual(`/about`, `/acerca-de-mi`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(path === `/about`, path === `/acerca-de-mi`)}
            DefaultIcon={QuestionMarkCircleIconOutline}
            SelectedIcon={QuestionMarkCircleIconSolid}
          >
            {dual(`About`, `Acerca de mí`)}
          </NavLink>
          <NavLink
            href={dual(`/contact`, `/contacto`)}
            setOpen={setOpen}
            isMobile={isMobile}
            selected={dual(path === `/contact`, path === `/contacto`)}
            DefaultIcon={ChatBubbleOvalLeftIconOutline}
            SelectedIcon={ChatBubbleOvalLeftIconSolid}
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
              DefaultIcon={ArchiveBoxIconOutline}
              SelectedIcon={ArchiveBoxIconSolid}
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
              DefaultIcon={ChatBubbleLeftIconOutline}
              SelectedIcon={ChatBubbleLeftIconSolid}
            >
              {dual(`Posts`, `Publicaciones`)}
            </NavLink>
            <NavLink
              href={dual(`/books`, `/libros`)}
              setOpen={setOpen}
              isMobile={isMobile}
              selected={dual(path.includes(`/books`), path.includes(`/libros`))}
              DefaultIcon={BookOpenIconOutline}
              SelectedIcon={BookOpenIconSolid}
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

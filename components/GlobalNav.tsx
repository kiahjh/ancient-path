"use client";

import React from "react";
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

const GlobalNav: React.FC = () => {
  const {
    state: { language },
  } = useGlobalState();
  const path = usePathname();

  function dual<T>(english: T, spanish: T): T {
    return language === `en` ? english : spanish;
  }

  return (
    <nav className="">
      <div className="mt-12 p-4">
        <div className="p-2">
          <NavLink
            href="/"
            selected={path === `/`}
            DefaultIcon={HomeIconOutline}
            SelectedIcon={HomeIconSolid}
          >
            {dual(`Home`, `Inicio`)}
          </NavLink>
          <NavLink
            href={dual(`/where-to-start`, `/donde-empezar`)}
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
            href={dual(`/about`, `/sobre-mi`)}
            selected={dual(path === `/about`, path === `/sobre-mi`)}
            DefaultIcon={QuestionMarkCircleIconOutline}
            SelectedIcon={QuestionMarkCircleIconSolid}
          >
            {dual(`About`, `Sobre mi`)}
          </NavLink>
          <NavLink
            href={dual(`/contact`, `/contacto`)}
            selected={dual(path === `/contact`, path === `/contacto`)}
            DefaultIcon={ChatBubbleOvalLeftIconOutline}
            SelectedIcon={ChatBubbleOvalLeftIconSolid}
          >
            {dual(`Contact me`, `Contacto`)}
          </NavLink>
        </div>
        <div className="mt-8">
          <h4 className="ml-6 mb-1 font-medium text-sky-700/60 dark:text-slate-600">
            {dual(`Resources`, `Recursos`)}
          </h4>
          <div className="bg-sky-200/10 dark:bg-sky-800/5 border border-dashed border-sky-300/50 dark:border-sky-500/20 p-2 rounded-3xl">
            <NavLink
              href={dual(`/teachings/page/1`, `/ensenanzas/pagina/1`)}
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

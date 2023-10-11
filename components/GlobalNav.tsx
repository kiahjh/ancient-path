"use client"; // TODO

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
import NavLink from "./NavLink";

const GlobalNav: React.FC = () => (
  <nav className="">
    <div className="mt-12 p-4">
      <div className="p-2">
        <NavLink
          href="/"
          DefaultIcon={HomeIconOutline}
          SelectedIcon={HomeIconSolid}
        >
          Home
        </NavLink>
        <NavLink
          href="/where-to-start"
          DefaultIcon={MapPinIconOutline}
          SelectedIcon={MapPinIconSolid}
        >
          Where to start
        </NavLink>
        <NavLink
          href="/about"
          DefaultIcon={QuestionMarkCircleIconOutline}
          SelectedIcon={QuestionMarkCircleIconSolid}
        >
          About
        </NavLink>
        <NavLink
          href="/books"
          DefaultIcon={BookOpenIconOutline}
          SelectedIcon={BookOpenIconSolid}
        >
          Books
        </NavLink>
        <NavLink
          href="/contact"
          DefaultIcon={ChatBubbleOvalLeftIconOutline}
          SelectedIcon={ChatBubbleOvalLeftIconSolid}
        >
          Contact me
        </NavLink>
      </div>
      <div className="mt-8">
        <h4 className="ml-6 mb-1 font-medium text-sky-700/60">Posts</h4>
        <div className="bg-sky-200/10 border border-dashed border-sky-300/50 p-2 rounded-3xl">
          <NavLink
            href="/teachings"
            DefaultIcon={ArchiveBoxIconOutline}
            SelectedIcon={ArchiveBoxIconSolid}
          >
            Teachings
          </NavLink>
          <NavLink
            href="/replies"
            DefaultIcon={ChatBubbleLeftIconOutline}
            SelectedIcon={ChatBubbleLeftIconSolid}
          >
            Replies
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

export default GlobalNav;

"use client"; // TODO

import React from "react";
import {
  ArchiveBoxIcon as ArchiveBoxIconOutline,
  BookOpenIcon as BookOpenIconOutline,
  ChatBubbleLeftIcon as ChatBubbleLeftIconOutline,
  HomeIcon as HomeIconOutline,
} from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";
import NavLink from "./NavLink";

const GlobalNav: React.FC = () => (
  <nav className="">
    <div className="mt-8 p-4">
      <div className="p-2">
        <NavLink
          href="/"
          DefaultIcon={HomeIconOutline}
          SelectedIcon={HomeIconSolid}
        >
          Home
        </NavLink>
        <NavLink
          href="/books"
          DefaultIcon={BookOpenIconOutline}
          SelectedIcon={BookOpenIconSolid}
        >
          Books
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

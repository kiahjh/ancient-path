"use client";

import React from "react";
import { SendIcon } from "lucide-react";
import type { Language } from "@/lib/types";
import Button from "../Button";

const ContactPageTemplate: React.FC<{ language: Language }> = ({
  language,
}) => {
  const c = content[language];
  return (
    <div className="min-h-full flex flex-col 2xl:flex-row justify-center items-center gap-12 2xl:gap-20 px-0 xs:px-8 sm:px-12 md:px-20 pt-20 pb-12 sm:pb-20">
      <div className="px-6 xs:px-0">
        <h1 className="text-4xl font-bold text-slate-800">{c.title}</h1>
        <p className="mt-4 max-w-xl text-lg text-slate-500">{c.subheading}</p>
      </div>
      <form className="rounded-3xl bg-sky-100/70 p-6 xs:p-8 sm:p-12 flex flex-col gap-8 w-full md:w-152 2xl:shrink-0">
        <div className="flex flex-col gap-1 w-full">
          <label
            className="text-lg font-medium text-sky-800/70 ml-6"
            htmlFor="name"
          >
            {c.name.title}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={c.name.placeholder}
            className="px-6 py-4 rounded-full text-lg placeholder:text-slate-300 text-slate-800 hover:bg-white/80 transition-[background-color,border-color] duration-300 outline-none border-white border-2 focus:border-sky-300 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            className="text-lg font-medium text-sky-800/70 ml-6"
            htmlFor="email"
          >
            {c.email.title}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={c.email.placeholder}
            className="px-6 py-4 rounded-full text-lg placeholder:text-slate-300 text-slate-800 hover:bg-white/80 transition-[background-color,border-color] duration-300 outline-none border-white border-2 focus:border-sky-300 focus:bg-white"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            className="text-lg font-medium text-sky-800/70 ml-6"
            htmlFor="message"
          >
            {c.message.title}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={c.message.placeholder}
            rows={5}
            className="px-6 py-4 rounded-[36px] text-lg placeholder:text-slate-300 text-slate-800 hover:bg-white/80 transition-[background-color,border-color] duration-300 outline-none border-white border-2 focus:border-sky-300 focus:bg-white"
          />
        </div>
        <Button
          type="button"
          onClick={() => {}}
          color="primary"
          className="self-end"
          size="lg"
          icon={SendIcon}
        >
          {c.button}
        </Button>
      </form>
    </div>
  );
};

const content = {
  en: {
    title: `Contact me`,
    subheading: `Feel free to contact me using the form with any questions or comments. I'll respond to you as soon as possible.`,
    button: `Submit`,
    name: {
      title: `Name`,
      placeholder: `John Doe`,
    },
    email: {
      title: `Email`,
      placeholder: `me@example.com`,
    },
    message: {
      title: `Message`,
      placeholder: `Questions, comments, etc.`,
    },
  },
  es: {
    title: `Contacto`,
    subheading: `No dudes en ponerte en contacto conmigo a través del siguiente formulario si tienes alguna pregunta o comentario. Te responderé lo antes posible.`,
    button: `Enviar`,
    name: {
      title: `Nombre`,
      placeholder: `Juan Pérez`,
    },
    email: {
      title: `Correo electrónico`,
      placeholder: `yo@ejemplo.com`,
    },
    message: {
      title: `Mensaje`,
      placeholder: `Preguntas, comentarios, etc.`,
    },
  },
};

export default ContactPageTemplate;

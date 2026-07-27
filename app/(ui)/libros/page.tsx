import React from "react";
import type { NextPage } from "next";
import BooksPageTemplate from "@/components/templates/BooksPageTemplate";

export const metadata = {
  title: "Libros | La Senda Antigua",
  description: `Libros de Jason Henderson y otros escritos cristianos que él recomienda.`,
  openGraph: {
    title: "Libros | La Senda Antigua",
    description: `Libros de Jason Henderson y otros escritos cristianos que él recomienda.`,
  },
};

const Libros: NextPage = () => <BooksPageTemplate language="es" />;

export default Libros;

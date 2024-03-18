import React from "react";
import type { NextPage } from "next";
import BooksPageTemplate from "@/components/templates/BooksPageTemplate";

export const metadata = {
  title: "Libros | La Senda Antigua",
  description: `Libros de otros escritores y autores que recomiendo altamente.`,
  openGraph: {
    title: "Libros | La Senda Antigua",
    description: `Libros de otros escritores y autores que recomiendo altamente.`,
  },
};

const Libros: NextPage = () => <BooksPageTemplate language="es" />;

export default Libros;

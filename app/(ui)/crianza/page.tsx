import React from "react";
import type { NextPage } from "next";
import ParentingPageTemplate from "@/components/templates/ParentingPageTemplate";

export const metadata = {
  title: `Crianza | La Senda Antigua`,
  description: `Algunos recursos muy recomendables para los padres que desean sinceramente “criar a sus hijos en disciplina y amonestación del Señor”, y evitar las trampas y peligros propios de la época en que vivimos.`,
  openGraph: {
    title: `Crianza | La Senda Antigua`,
    description: `Algunos recursos muy recomendables para los padres que desean sinceramente “criar a sus hijos en disciplina y amonestación del Señor”, y evitar las trampas y peligros propios de la época en que vivimos.`,
  },
};

const Parenting: NextPage = () => <ParentingPageTemplate language="es" />;

export default Parenting;

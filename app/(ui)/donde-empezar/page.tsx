import React from "react";
import type { NextPage } from "next";
import WhereToStartTemplate from "@/components/templates/WhereToStartTemplate";

export const metadata = {
  title: `¿Por dónde empezar? | La Senda Antigua`,
  description: `Una lista de publicaciones y enseñanzas recomendadas para aquellos que son nuevos en el sitio.`,
  openGraph: {
    title: `¿Por dónde empezar? | La Senda Antigua`,
    description: `Una lista de publicaciones y enseñanzas recomendadas para aquellos que son nuevos en el sitio.`,
  },
};

const WhereToStart: NextPage = () => <WhereToStartTemplate language="es" />;

export default WhereToStart;

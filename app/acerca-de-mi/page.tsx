import React from "react";
import type { NextPage } from "next";
import AboutPageTemplate from "@/components/templates/AboutPageTemplate";

export const metadata = {
  title: `Acerca de mi | La Senda Antigua`,
  description: `Aprende más sobre el autor y el propósito de este sitio.`,
  openGraph: {
    title: `Acerca de mi | La Senda Antigua`,
    description: `Aprende más sobre el autor y el propósito de este sitio.`,
  },
};

const About: NextPage = () => <AboutPageTemplate language="es" />;

export default About;

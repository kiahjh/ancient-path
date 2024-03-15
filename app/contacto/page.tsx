import React from "react";
import type { NextPage } from "next";
import ContactPageTemplate from "@/components/templates/ContactPageTemplate";

export const metadata = {
  title: `Contacto | La Senda Antigua`,
  description: `Envía un mensaje a Jason Henderson.`,
  openGraph: {
    title: `Contacto | La Senda Antigua`,
    description: `Envía un mensaje a Jason Henderson.`,
  },
};

const Contact: NextPage = () => <ContactPageTemplate language="es" />;

export default Contact;

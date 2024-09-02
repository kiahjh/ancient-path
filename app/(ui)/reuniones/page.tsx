import React from "react";
import type { NextPage } from "next";
import MeetingAudiosPageTemplate from "@/components/templates/MeetingAudiosPageTemplate";

export const revalidate = 0;

export const metadata = {
  title: `Reuniones | La Senda Antigua`,
  description: `Grabaciones de audio de algunas reuniones.`,
  openGraph: {
    title: `Reuniones | La Senda Antigua`,
    description: `Grabaciones de audio de algunas reuniones.`,
  },
};

const Reuniones: NextPage = () => <MeetingAudiosPageTemplate language="es" />;

export default Reuniones;

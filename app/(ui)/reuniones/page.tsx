import React from "react";
import MeetingAudiosPageTemplate from "@/components/templates/MeetingAudiosPageTemplate";

export const metadata = {
  title: `Reuniones | La Senda Antigua`,
  description: `Grabaciones de audio de algunas reuniones.`,
  openGraph: {
    title: `Reuniones | La Senda Antigua`,
    description: `Grabaciones de audio de algunas reuniones.`,
  },
};

const Reuniones: React.FC = () => <MeetingAudiosPageTemplate language="es" />;

export default Reuniones;

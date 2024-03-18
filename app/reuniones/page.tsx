import React from "react";

export const metadata = {
  title: `Reuniones | La Senda Antigua`,
  description: `Grabaciones de audio de algunas reuniones.`,
  openGraph: {
    title: `Reuniones | La Senda Antigua`,
    description: `Grabaciones de audio de algunas reuniones.`,
  },
};

const Reuniones: React.FC = () => {
  return (
    <div className="min-h-full flex justify-center items-center text-2xl font-medium">
      Próximamente
    </div>
  );
};

export default Reuniones;

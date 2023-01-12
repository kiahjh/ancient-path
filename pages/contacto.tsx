import React from 'react';
import Chrome from '../components/Chrome';

const Contacto: React.FC = () => {
  return (
    <Chrome page="/contacto" smallFooter>
      <div className="flex justify-center items-center py-12 px-6 sm:px-12 flex-grow">
        <div className="absolute w-full h-112 bg-sky-100 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 z-0"></div>
        <form className="border-[0.5px] rounded-2xl shadow-xl py-8 px-6 sm:px-8 max-w-xl bg-white relative">
          <h2 className="text-2xl font-inter text-center sm:text-left">Contacto</h2>
          <p className="text-slate-500 mt-2 text-center sm:text-left">
            No dudes en ponerte en contacto conmigo a través del siguiente formulario si
            tienes alguna pregunta o comentario. Te responderé lo antes posible.
          </p>
          <div className="flex flex-col mt-8">
            <div className="flex flex-col mb-8 space-y-2">
              <label className="text-gray-600 font-medium">Correo electrónico</label>
              <input
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                placeholder="yo@ejemplo.com"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600 font-medium">Mensaje</label>
              <textarea
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                rows={5}
                placeholder="Preguntas o comentarios"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="flex justify-center items-center bg-sky-500 text-white rounded-lg shadow-md py-2 px-5 font-medium text-lg hover:bg-sky-400 transition duration-100 active:shadow-sm active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 flex-grow xs:flex-grow-0"
              type="submit"
            >
              <i className="fa-solid fa-arrow-right mr-3"></i>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </Chrome>
  );
};

export default Contacto;

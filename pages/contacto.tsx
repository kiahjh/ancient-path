import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Chrome from '../components/Chrome';
import FormBanner from '../components/FormBanner';

const Contacto: React.FC = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!);
  let bannerMessage =
    'Algo ha fallado. Intenta actualizar la página y vuelve a intentarlo.';
  let bannerState: 'missing_field' | 'api_error' | 'success' | 'idle' = 'idle';
  if (state.succeeded) {
    bannerMessage = 'Gracias por el mensaje. Intentaré responderte lo antes posible.';
    bannerState = 'success';
  } else if (state.errors.length > 0) {
    bannerState = 'api_error';
    bannerMessage =
      'Algo ha fallado. Intenta actualizar la página y vuelve a intentarlo.';
  }

  return (
    <Chrome page="/contacto" smallFooter>
      <div className="flex justify-center items-center py-12 px-6 sm:px-12 flex-grow">
        <div className="absolute w-full h-112 bg-sky-100 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 z-0"></div>
        <form
          className="border-[0.5px] rounded-2xl shadow-xl py-8 px-6 sm:px-8 max-w-xl bg-white relative"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-inter text-center sm:text-left">Contacto</h2>
          <p className="text-slate-500 mt-2 text-center sm:text-left">
            No dudes en ponerte en contacto conmigo a través del siguiente formulario si
            tienes alguna pregunta o comentario. Te responderé lo antes posible.
          </p>
          <FormBanner
            message={bannerMessage}
            type={bannerState}
            className={bannerState === 'idle' ? 'my-0' : 'my-4'}
          />
          <div className="flex flex-col">
            <div className="flex flex-col mb-8 space-y-2">
              <label className="text-gray-600 font-medium" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                placeholder="yo@ejemplo.com"
                id="email"
                type="email"
                name="email"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600 font-medium" htmlFor="message">
                Mensaje
              </label>
              <textarea
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                rows={5}
                placeholder="Preguntas o comentarios"
                id="message"
                name="message"
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="flex justify-center items-center bg-sky-500 text-white rounded-lg shadow-md py-2 px-5 font-medium text-lg hover:bg-sky-400 transition duration-100 active:shadow-sm active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 flex-grow xs:flex-grow-0"
              type="submit"
              disabled={state.submitting}
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

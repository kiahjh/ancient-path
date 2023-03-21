import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import FormBanner from '../components/FormBanner';
import PageWrapper from '../components/PageWrapper';
import { Lang } from '../lib/types';

interface Props {
  language: Lang;
}

const ContactPage: React.FC<Props> = ({ language }) => {
  const c = content[language];

  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!);
  let bannerMessage = c.errMessage;
  let bannerState: 'missing_field' | 'api_error' | 'success' | 'idle' = 'idle';

  if (state.succeeded) {
    bannerMessage = c.successMessage;
    bannerState = 'success';
  } else if (state.errors.length > 0) {
    bannerState = 'api_error';
    bannerMessage = c.errMessage;
  }

  return (
    <PageWrapper
      page={c.page}
      language={language}
      withChrome
      smallFooter
      redirectTo={c.redirectTo}
      title={c.title}
      metaDescription={c.metaDescription}
    >
      <div className="flex justify-center items-center py-12 px-6 sm:px-12 flex-grow">
        <div className="absolute w-full h-112 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-10 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 dark:bg-opacity-10 z-0"></div>
        <form
          className="border-[0.5px] rounded-2xl shadow-xl py-8 px-6 sm:px-8 max-w-xl bg-white dark:bg-slate-800/50 dark:backdrop-blur dark:border-slate-700 relative"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-inter text-center sm:text-left dark:text-white">
            {c.heading}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center sm:text-left">
            {c.paragraph}
          </p>
          <FormBanner
            message={bannerMessage}
            type={bannerState}
            className={bannerState === 'idle' ? 'my-0' : 'my-4'}
          />
          <div className="flex flex-col">
            <div className="flex flex-col mb-8 space-y-2">
              <label
                className="text-slate-600 dark:text-slate-400 font-medium"
                htmlFor="email"
              >
                {c.emailLabel}
              </label>
              <input
                className="outline-none border py-3 px-4 rounded-lg dark:bg-slate-900/70 dark:text-slate-200 dark:border-slate-700 focus:border-sky-300 dark:focus:border-sky-600 dark:placeholder:text-slate-600 transition duration-100 shadow"
                placeholder={c.emailPlaceholder}
                id="email"
                type="email"
                name="email"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>
            <div className="flex flex-col space-y-2">
              <label
                className="text-slate-600 dark:text-slate-400 font-medium"
                htmlFor="message"
              >
                {c.messageLabel}
              </label>
              <textarea
                className="outline-none border py-3 px-4 rounded-lg dark:bg-slate-900/70 dark:text-slate-200 dark:border-slate-700 focus:border-sky-300 dark:focus:border-sky-600 dark:placeholder:text-slate-600 transition duration-100 shadow"
                rows={5}
                placeholder={c.messagePlaceholder}
                id="message"
                name="message"
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="flex justify-center items-center bg-sky-500 dark:bg-sky-800 text-white rounded-lg shadow-md py-2 px-5 font-medium text-lg hover:bg-sky-400 dark:hover:bg-sky-700 transition duration-100 active:shadow-sm active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 flex-grow xs:flex-grow-0"
              type="submit"
              disabled={state.submitting}
            >
              <i className="fa-solid fa-arrow-right mr-3"></i>
              {c.buttonText}
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;

const content = {
  en: {
    errMessage:
      'Whoops, something went wrong on our end. Try refreshing the page and trying again.',
    successMessage:
      "Thanks for the message! I'll try to get back to you as soon as possible.",
    page: '/contact',
    redirectTo: '/contacto',
    title: 'Contact me | The Ancient Path',
    metaDescription: 'Spiritual writings',
    heading: 'Contact me',
    paragraph:
      "Feel free to contact me using the form below with any questions or comments. I'll respond to you as soon as possible.",
    emailLabel: 'Email',
    emailPlaceholder: 'me@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Questions or comments',
    buttonText: 'Submit',
  },
  es: {
    errMessage: 'Algo ha fallado. Intenta actualizar la página y vuelve a intentarlo.',
    successMessage: 'Gracias por el mensaje. Intentaré responderte lo antes posible.',
    page: '/contacto',
    redirectTo: '/contact',
    title: 'Contacto | La Senda Antigua',
    metaDescription: 'Escrituras espirituales',
    heading: 'Contacto',
    paragraph:
      'No dudes en ponerte en contacto conmigo a través del siguiente formulario si tienes alguna pregunta o comentario. Te responderé lo antes posible.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'yo@ejemplo.com',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Preguntas o comentarios',
    buttonText: 'Enviar',
  },
};

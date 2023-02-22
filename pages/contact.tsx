import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import FormBanner from '../components/FormBanner';
import PageWrapper from '../components/PageWrapper';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!);
  let bannerMessage =
    'Whoops, something went wrong on our end. Try refreshing the page and trying again.';
  let bannerState: 'missing_field' | 'api_error' | 'success' | 'idle' = 'idle';

  if (state.succeeded) {
    bannerMessage =
      "Thanks for the message! I'll try to get back to you as soon as possible.";
    bannerState = 'success';
  } else if (state.errors.length > 0) {
    bannerState = 'api_error';
    bannerMessage =
      'Whoops, something went wrong on our end. Try refreshing the page and trying again.';
  }

  return (
    <PageWrapper
      page="/contact"
      language="en"
      withChrome
      smallFooter
      redirectTo="/contacto"
      title="Contact me | The Ancient Path"
      metaDescription="Spiritual writings"
    >
      <div className="flex justify-center items-center py-12 px-6 sm:px-12 flex-grow">
        <div className="absolute w-full h-112 bg-sky-100 dark:bg-sky-500 dark:bg-opacity-10 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 dark:bg-opacity-10 z-0"></div>
        <form
          className="border-[0.5px] rounded-2xl shadow-xl py-8 px-6 sm:px-8 max-w-xl bg-white dark:bg-slate-800/50 dark:backdrop-blur dark:border-slate-700 relative"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-inter text-center sm:text-left dark:text-white">
            Contact me
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center sm:text-left">
            Feel free to contact me using the form below with any questions or comments.
            I'll respond to you as soon as possible.
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
                Email
              </label>
              <input
                className="outline-none border py-3 px-4 rounded-lg dark:bg-slate-900/70 dark:text-slate-200 dark:border-slate-700 focus:border-sky-300 dark:focus:border-sky-600 dark:placeholder:text-slate-600 transition duration-100 shadow"
                placeholder="me@example.com"
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
                Message
              </label>
              <textarea
                className="outline-none border py-3 px-4 rounded-lg dark:bg-slate-900/70 dark:text-slate-200 dark:border-slate-700 focus:border-sky-300 dark:focus:border-sky-600 dark:placeholder:text-slate-600 transition duration-100 shadow"
                rows={5}
                placeholder="Questions or comments"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Contact;

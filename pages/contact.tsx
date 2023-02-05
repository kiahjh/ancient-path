import React, { useState } from 'react';
import Chrome from '../components/Chrome';
import FormBanner from '../components/FormBanner';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'success' | 'missing_field' | 'api_error'
  >('idle');
  const [bannerMessage, setBannerMessage] = useState('');
  return (
    <Chrome page="/contact" smallFooter>
      <div className="flex justify-center items-center py-12 px-6 sm:px-12 flex-grow">
        <div className="absolute w-full h-112 bg-sky-100 z-0"></div>
        <div className="absolute w-full h-96 bg-sky-400 z-0"></div>
        <form className="border-[0.5px] rounded-2xl shadow-xl py-8 px-6 sm:px-8 max-w-xl bg-white relative">
          <h2 className="text-2xl font-inter text-center sm:text-left">Contact me</h2>
          <p className="text-slate-500 mt-2 text-center sm:text-left">
            Feel free to contact me using the form below with any questions or comments.
            I'll respond to you as soon as possible.
          </p>
          <FormBanner
            message={bannerMessage}
            type={status}
            className={status === 'idle' ? 'my-0' : 'my-4'}
          />
          <div className="flex flex-col">
            <div className="flex flex-col mb-8 space-y-2">
              <label className="text-gray-600 font-medium">Email</label>
              <input
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                placeholder="me@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600 font-medium">Message</label>
              <textarea
                className="outline-none border py-3 px-4 rounded-lg focus:border-sky-300 transition duration-100 shadow"
                rows={5}
                placeholder="Questions or comments"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button
              className="flex justify-center items-center bg-sky-500 text-white rounded-lg shadow-md py-2 px-5 font-medium text-lg hover:bg-sky-400 transition duration-100 active:shadow-sm active:scale-95 active:translate-y-0.5 hover:-translate-y-0.5 flex-grow xs:flex-grow-0"
              onClick={async (event) => {
                event.preventDefault();
                // if (!email) {
                //   setStatus('missing_field');
                //   setBannerMessage('Please fill out email field');
                //   return;
                // }
                // if (!message) {
                //   setStatus('missing_field');
                //   setBannerMessage('Please fill out message field');
                //   return;
                // }
                // const res = await fetch(`/api/send-email`, {
                //   method: 'POST',
                //   headers: {
                //     'Content-Type': 'application/json',
                //   },
                //   body: JSON.stringify({ email, message }),
                // });
                // if (res.status === 200) {
                //   setStatus('success');
                //   setBannerMessage(
                //     "Thanks for the message! I'll get back to you as soon as I can.",
                //   );
                // } else {
                //   setStatus('api_error');
                //   setBannerMessage(
                //     'Whoops, looks like something went wrong on our end. Try refreshing the page and trying again.',
                //   );
                // }
                alert(
                  'Sorry, our contact form is currently not working. Check back tomorrow and it should be functional.',
                );
              }}
            >
              <i className="fa-solid fa-arrow-right mr-3"></i>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Chrome>
  );
};

export default Contact;

import { NextPage } from "next";
import Link from "next/link";

const ConferenceInfoPage: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center sm:p-8">
      <div className="bg-sky-100 p-8 xs:p-12 rounded-3xl flex flex-col">
        <h1 className="text-3xl font-semibold text-sky-700">
          Upcoming conference
        </h1>
        <h2 className="text-lg text-sky-700/60">May 23-25</h2>
        <p className="max-w-2xl mt-6 text-sky-900/70 xs:text-lg">
          For those who are interested in the teachings on this blog, or the
          writings of the EARLY Society of Friends, you may also be interested
          in joining us for one of our biannual conferences (May and October) in
          Wadsworth, Ohio. These conferences are an opportunity for people from
          other places to meet together with our local group to wait on the
          Lord, to hear some teachings, and to spend lots of time with
          like-minded believers. If you’re interested,{" "}
          <Link
            href="/contact"
            className="text-sky-600 underline font-semibold"
          >
            send me an email
          </Link>{" "}
          and I’d be happy to give you more information.
        </p>
      </div>
    </div>
  );
};

export default ConferenceInfoPage;

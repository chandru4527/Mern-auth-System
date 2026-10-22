import { Link } from "react-router-dom";

// Icons
import {
  MdArrowForward,
  MdHome,
  MdSearchOff,
  MdSecurity,
} from "react-icons/md";

// Components
import Button from "../Button";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-5 pb-12 pt-24 sm:px-8">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex max-w-2xl items-center justify-center">
          <div className="absolute h-56 w-56 rounded-full bg-green-50 sm:h-72 sm:w-72 lg:h-64 lg:w-64" />
          <div className="absolute h-40 w-40 rounded-full border border-dashed border-green-200 sm:h-56 sm:w-56 lg:h-48 lg:w-48" />

          <div className="relative flex items-center justify-center gap-2 sm:gap-4 lg:gap-3">
            <span className="text-7xl font-black tracking-tighter text-green-700 sm:text-8xl md:text-[10rem] lg:text-8xl">
              4
            </span>

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-green-100 bg-white text-green-600 shadow-xl shadow-green-900/10 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-24 lg:w-24">
              <MdSearchOff className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl" />
            </div>

            <span className="text-7xl font-black tracking-tighter text-green-700 sm:text-8xl md:text-[10rem] lg:text-8xl">
              4
            </span>
          </div>

          <span className="absolute right-8 top-2 h-3 w-3 rounded-full bg-green-300 sm:right-20 sm:top-0 lg:right-24" />
          <span className="absolute bottom-4 left-8 h-2.5 w-2.5 rounded-full bg-green-500 sm:left-20 lg:left-24" />
        </div>

        {/* Error Message */}
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold tracking-widest text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            ERROR 404
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Oops! Page{" "}
            <span className="text-green-600">Not Found.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            The page you're looking for doesn't exist, may have been moved, or
            the URL might be incorrect. Let's get you back on track.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/">
              <Button variant="success" icon={MdHome} iconSize={20} iconPosition="start" text="Go Back Home" />
            </Link>

            <Button
              type="button"
              variant="themeGhost"
              text="Go Back"
              onClick={() => window.history.back()}
            />
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="mt-14 flex flex-col items-center">
          <div className="flex w-full max-w-xs items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <MdSecurity className="text-2xl text-green-600" />
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="mt-3 text-xs font-medium tracking-wide text-gray-400">
            Better Authentication. A Safer Tomorrow.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
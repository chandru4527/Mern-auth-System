import React from "react";
import { Link } from "react-router-dom";
import {
  MdErrorOutline,
  MdRefresh,
  MdHome,
  MdSecurity,
} from "react-icons/md";

const ErrorPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-5 pb-10 pt-24 sm:px-8">
      
      <div className="mx-auto w-full max-w-3xl text-center">
        {/* Error Illustration */}
        <div className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64 lg:h-56 lg:w-56">
          <div className="absolute inset-0 rounded-full bg-green-50" />
          <div className="absolute inset-5 rounded-full border border-dashed border-green-200" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-green-100 bg-white text-green-600 shadow-xl shadow-green-900/10 sm:h-36 sm:w-36 lg:h-32 lg:w-32">
            <MdErrorOutline className="text-7xl sm:text-8xl" />
          </div>

          <span className="absolute right-2 top-5 h-3 w-3 rounded-full bg-green-400" />
          <span className="absolute bottom-5 left-2 h-4 w-4 rounded-full bg-green-200" />
        </div>

        {/* Error Message */}
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-xs font-bold tracking-widest text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            SOMETHING WENT WRONG
          </span>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Oops! Something{" "}
            <span className="text-green-600">Went Wrong.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            We couldn't complete your request. This might be a temporary
            problem. Please try again in a moment.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700"
            >
              <MdRefresh size={20} />
              Try Again
            </button>

            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <MdHome size={20} />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Brand Footer */}
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

export default ErrorPage;
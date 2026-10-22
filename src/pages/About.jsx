import React from "react";
import { Link } from "react-router-dom";

// icons
import {
  MdSecurity, MdVerifiedUser, MdLock, MdDevices, MdCode, MdStorage, MdApi,
  MdArrowForward, MdCheckCircle, MdShield,
} from "react-icons/md";

// components
import Button from "../components/Button";
import Badge from '../components/Badge';

// hooks
import { useCurrentUser } from '../hooks/useAuth';
const About = () => {

  const { data: user, isLoading } = useCurrentUser();


  const technologies = [
    {
      name: "MongoDB",
      category: "Database",
      description: "Stores user accounts and application data.",
      icon: MdStorage,
    },
    {
      name: "Express.js",
      category: "Backend Framework",
      description: "Handles API routes and server-side requests.",
      icon: MdApi,
    },
    {
      name: "React.js",
      category: "Frontend Library",
      description: "Builds a responsive and interactive user interface.",
      icon: MdCode,
    },
    {
      name: "Node.js",
      category: "Runtime Environment",
      description: "Runs the backend authentication services.",
      icon: MdDevices,
    },
  ];

  const principles = [
    {
      icon: MdSecurity,
      title: "Security First",
      description:
        "Designed around authentication, protected resources, and responsible handling of account access.",
    },
    {
      icon: MdDevices,
      title: "Responsive Design",
      description:
        "A user interface designed to work across mobile phones, tablets, laptops, and desktop screens.",
    },
    {
      icon: MdVerifiedUser,
      title: "Simple Experience",
      description:
        "Clear forms and straightforward navigation help users manage their accounts with ease.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white pt-16">

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-green-50 via-white to-green-100/60 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-27">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>

            <Badge className="text-green-700" variant="success" appearance="soft">
              <MdShield size={18} />
              GET TO KNOW AUTHIFY
            </Badge>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Making Digital
              <span className="block text-green-700">
                Access Simpler.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              Authify is a MERN stack authentication project built to
              demonstrate a modern approach to account registration, login,
              secure access, and profile management through a clean,
              user-friendly experience.
            </p>

            {!isLoading && (
              !user && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/register">
                    <Button variant="success" className="w-full sm:w-auto" icon={MdArrowForward} iconPosition="end"
                      text="Get Started" />
                  </Link>

                  <Link to="/features">
                    <Button variant="themeOutline" className="w-full sm:w-auto" text="  Explore Features" />
                  </Link>
                </div>
              )
            )

            }

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <MdCheckCircle className="text-green-600" size={18} />
                Full-stack project
              </span>
              <span className="flex items-center gap-2">
                <MdCheckCircle className="text-green-600" size={18} />
                Responsive interface
              </span>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 bg-green-200/10 blur-lg" />

            <div className="relative rounded-lg border border-green-100 bg-white p-5 shadow-lg shadow-green-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/20">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <p className="text-xs text-gray-500">Welcome to</p>
                  <h2 className="mt-0.5 text-lg font-bold text-gray-900">
                    Authify
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <MdVerifiedUser size={22} />
                </div>
              </div>

              <div className="py-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-6 border-green-50 bg-green-100 text-green-700">
                  <MdLock size={30} />
                </div>

                <h3 className="mt-3 text-base font-bold text-gray-900">
                  Your Account, Your Control
                </h3>

                <p className="mx-auto mt-1.5 max-w-xs text-xs leading-5 text-gray-500">
                  One place to authenticate, access your account, and manage your profile.
                </p>
              </div>

              <div className="space-y-1.5">
                {[
                  "Account registration and login",
                  "Protected account access",
                  "Profile management",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg bg-gray-50 px-3 py-2.5"
                  >
                    <MdCheckCircle
                      className="shrink-0 text-green-600"
                      size={17}
                    />

                    <span className="text-xs font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2.5 text-xs font-medium text-green-800">
                <MdShield size={16} />
                Built with the MERN stack
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Story */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Our Project
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Understanding the
              <span className="text-green-700"> Purpose of Authify</span>
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-gray-600">
            <p>
              Authentication is an important part of many web applications.
              It helps identify users and control access to account-specific
              information and features.
            </p>

            <p>
              Authify brings these concepts together in a practical full-stack
              application. It connects a React frontend to a Node.js and
              Express.js backend, with MongoDB used for data persistence.
            </p>

            <p>
              The project also serves as a practical demonstration of frontend
              development, API integration, routing, form handling, and
              backend authentication workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Technology Stack
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Built with Modern Technologies
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Authify uses the MERN stack to connect the user interface,
              backend services, and database in one application.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <div
                  key={technology.name}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-green-700">
                    {technology.category}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {technology.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {technology.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              What Matters to Us
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              The Principles Behind Authify
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="rounded-2xl border border-gray-100 p-7 transition-all duration-300 hover:border-green-200 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                    <Icon size={29} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </main>
  );
};

export default About;
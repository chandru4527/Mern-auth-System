import React from "react";
import { Link } from "react-router-dom";

// icons
import { MdVerifiedUser, MdLock, MdManageAccounts, MdSecurity } from "react-icons/md";

// components
import Hero from "../components/pages/Hero";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Card from '../components/Card';

// hooks
import { useCurrentUser } from '../hooks/useAuth';
const Home = () => {

  const { data: user, isLoading } = useCurrentUser();

  const features = [
    {
      icon: MdVerifiedUser,
      title: "User Authentication",
      description:
        "Register and log in securely with an authentication system designed to manage user access.",
    },
    {
      icon: MdLock,
      title: "Password Management",
      description:
        "Reset forgotten passwords and change existing passwords through dedicated account features.",
    },
    {
      icon: MdManageAccounts,
      title: "Profile Management",
      description:
        "View and update your personal information and manage your account details easily.",
    },
    {
      icon: MdSecurity,
      title: "Protected Routes",
      description:
        "Restrict access to private pages so that only authenticated users can access protected resources.",
    },
  ];

  return (
    <main>
      {/* Hero Carousel */}
      <Hero />

      {/* About Authify */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <Badge variant="success" text=" About Our Project" className="bg-green-50" />

            <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Introducing{" "}
              <span className="text-green-700">Authify</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Authify is a full-stack MERN authentication web application
              designed to provide users with a simple way to create accounts,
              sign in, and manage their profiles. It brings essential
              authentication features together in one clean, user-friendly
              platform.
            </p>
          </div>

          {/* Project Information */}
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-3xl border border-green-100 bg-linear-to-br from-green-50 to-white p-6 sm:p-9">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-700/20">
                <MdSecurity size={30} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Security Meets Simplicity
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                The main goal of Authify is to demonstrate how a modern
                authentication system works, from user registration and login
                to protected pages and profile management. The application
                combines a responsive React interface with a Node.js and
                Express.js backend and MongoDB for data storage.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"].map(
                  (tech, index) => (
                    <Badge key={index} variant="success" text={tech} appearance="solid" />
                  )
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group transition-colors hover:border-green-600 rounded-lg"
                  icon={feature.icon}
                  iconClassName="text-green-600 transition-colors group-hover:text-white"
                  iconWrapperClassName="bg-green-100 transition-colors group-hover:bg-green-600"
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          {!isLoading && (
            !user && (
              <div className="mt-16 rounded-xl bg-green-700 px-6 py-10 text-center sm:px-10 sm:py-14">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Ready to Get Started?
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-green-50 sm:text-base">
                  Create your Authify account and explore a simple,
                  user-friendly authentication experience.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link to="/register">
                    <Button
                      variant="normal"
                      className="w-full bg-white text-green-800 hover:bg-green-50 sm:w-auto"
                    >
                      Create Account
                    </Button>
                  </Link>

                  <Link to="/login">
                    <Button
                      variant="normal"
                      className="w-full border border-white/40 bg-green-800 text-white hover:bg-green-900 sm:w-auto"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
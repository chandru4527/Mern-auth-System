import React from "react";
import { Link } from "react-router-dom";

// icons
import {
  MdSecurity, MdKeyboardArrowUp, MdArrowForward, MdCheckCircle, MdCode, MdShield, MdWeb, MdArrowUpward,
} from "react-icons/md";

// components
import Button from '../../components/Button';
import Badge from '../../components/Badge'
import Image from "../../components/media/Image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: "Home", to: "/" },
    { title: "About Us", to: "/about" },
    { title: "Features", to: "/features" },
    { title: "Profile", to: "/profile" },
  ];

  const technologies = [
    "MongoDB",
    "Express",
    "React",
    "Node",
    'Tailwind'
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-green-100 bg-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center">
              <Image
                src="https://res.cloudinary.com/dyiuqcqg2/image/upload/v1790512102/mainlogo_qndlrt.png"
                alt="Authify logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600">
              Authify is a modern MERN stack authentication project designed
              to demonstrate secure account access, protected resources, and
              simple profile management.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                <MdSecurity size={16} />
                Secure Authentication
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                <MdCheckCircle size={16} />
                Full Stack Project
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Explore
            </h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors duration-200 hover:text-green-700"
                  >
                    {item.title}

                    <MdArrowForward
                      size={15}
                      className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Project
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdWeb className="text-green-600" size={18} />
                MERN Stack
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdShield className="text-green-600" size={18} />
                Authentication
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdCode className="text-green-600" size={18} />
                Modern Web App
              </div>
            </div>

            {/* Built With */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Built With
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {technologies.map((tech, index) => (

                  <Badge key={index} text={tech} size="xs" variant="success" appearance="solid" />

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-100 bg-green-50/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 flex-row sm:px-8 lg:px-12">

          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-600">
              © {currentYear} Authify. All rights reserved.
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              Simple. Secure. Authenticated.
            </p>
          </div>

          <Button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            variant="themeOutline"
            className="flex h-9 w-9 "
            icon={MdArrowUpward}
          />

        </div>
      </div>
    </footer>
  );
};

export default Footer;
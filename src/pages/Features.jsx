import React from "react";
import { Link } from "react-router-dom";

// icons
import {
    MdPersonAddAlt1, MdLogin, MdLockReset, MdVerifiedUser, MdManageAccounts, MdSecurity, MdEmail, MdPassword,
    MdRoute, MdArrowForward, MdCheckCircle, MdShield, MdDevices, MdVpnKey, MdLock
} from "react-icons/md";

// components
import Button from "../components/Button";
import Badge from '../components/Badge';
import Card from '../components/Card'

// hooks
import { useCurrentUser } from '../hooks/useAuth';

const Features = () => {

    const { data: user, isLoading } = useCurrentUser();

    const features = [
        {
            icon: MdPersonAddAlt1,
            title: "User Registration",
            description:
                "Create a new account through a simple registration form with the required user information and validation.",
            tag: "Account",
        },
        {
            icon: MdLogin,
            title: "Secure Login",
            description:
                "Allow registered users to sign in and access their accounts through the authentication workflow.",
            tag: "Authentication",
        },
        {
            icon: MdEmail,
            title: "Email Verification",
            description:
                "Verify user email addresses to help confirm account ownership during registration.",
            tag: "Verification",
        },
        {
            icon: MdLockReset,
            title: "Forgot Password",
            description:
                "Provide a password recovery flow for users who can no longer remember their account password.",
            tag: "Recovery",
        },
        {
            icon: MdPassword,
            title: "Reset Password",
            description:
                "Allow users to set a new password through the password reset process.",
            tag: "Recovery",
        },
        {
            icon: MdManageAccounts,
            title: "Profile Management",
            description:
                "Give authenticated users a place to view and update their personal account information.",
            tag: "Account",
        },
        {
            icon: MdRoute,
            title: "Protected Routes",
            description:
                "Restrict private pages and account resources to users who meet the application's authentication requirements.",
            tag: "Access Control",
        },
        {
            icon: MdVpnKey,
            title: "Session Management",
            description:
                "Manage authenticated sessions and token renewal where refresh-token functionality is configured.",
            tag: "Authentication",
        },
    ];

    const benefits = [
        {
            icon: MdSecurity,
            title: "Security-focused",
            description:
                "Authentication workflows help control access to private account features.",
        },
        {
            icon: MdDevices,
            title: "Responsive Interface",
            description:
                "A consistent user experience across mobile, tablet, and desktop screens.",
        },
        {
            icon: MdVerifiedUser,
            title: "User-friendly",
            description:
                "Clear forms, useful feedback, and straightforward navigation.",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Create an Account",
            description:
                "Register with the required information to create your Authify account.",
        },
        {
            number: "02",
            title: "Verify & Sign In",
            description:
                "Complete any required verification and sign in using your credentials.",
        },
        {
            number: "03",
            title: "Manage Your Account",
            description:
                "Access available protected pages and manage your profile.",
        },
    ];

    return (
        <main className="overflow-hidden bg-white pt-16">

            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-green-50 via-white to-green-100/60 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-30">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">

                    <Badge variant="success" className="bg-green-50 border border-green-700 uppercase" text="authify features" />

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Everything You Need for
                        <span className="block text-green-700">
                            Simple Authentication
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
                        Explore the features designed to demonstrate user authentication,
                        account management, and controlled access in the Authify
                        full-stack web application.
                    </p>

                    {!isLoading && (
                        !user && (
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link to="/register">
                                    <Button variant="theme" text="Get Started" className="w-full" icon={MdArrowForward} iconPosition="end" />
                                </Link>

                                <Link to="/login">
                                    <Button variant="themeOutline" text="Sign In " className="w-full" />
                                </Link>
                            </div>
                        )
                    )}

                    {/* Technology Tags */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"].map(
                            (tech, index) => (
                                <Badge variant="success" key={index} text={tech} appearance="solid" />
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-5 py-10 sm:px-8 sm:py-20 lg:px-12 lg:py-15">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                            What You Can Do
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Explore Authify Features
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Discover the key authentication and account management
                            capabilities available in the application.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <Card
                                key={feature.title}
                                className="group rounded-md transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5"
                                icon={feature.icon}
                                iconClassName="text-green-700 transition-colors duration-300 group-hover:text-white"
                                iconWrapperClassName="bg-green-50 transition-colors duration-300 group-hover:bg-green-700"
                                badge={feature.tag}
                                badgePosition="top-right"
                                badgeClassName='text-green-700'
                                badgeProps={{
                                    size: "xs",
                                    appearance: "light",
                                    border: false,
                                }}
                                title={feature.title}
                                titleClassName="mt-5 text-lg font-bold"
                                description={feature.description}
                                descriptionClassName="mt-3 text-sm leading-6"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                            Simple Workflow
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            How Authify Works
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            A straightforward journey from account creation to accessing
                            your personal account.
                        </p>
                    </div>

                    <div className="relative mt-12 grid gap-6 md:grid-cols-3">
                        {steps.map((step) => (
                            <article
                                key={step.number}
                                className="relative rounded-lg border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <span className="text-sm font-bold tracking-widest text-green-700">
                                    STEP {step.number}
                                </span>

                                <h3 className="mt-4 text-xl font-bold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-gray-600">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Benefits */}
            <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                                Designed Around Users
                            </span>

                            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                                More Than Just a
                                <span className="text-green-700"> Login Page</span>
                            </h2>

                            <p className="mt-5 leading-7 text-gray-600">
                                Authify demonstrates how multiple parts of a web application
                                work together, from the user interface to backend APIs,
                                authentication checks, and database operations.
                            </p>

                            <div className="mt-7 space-y-4">
                                {[
                                    "Organized authentication workflows",
                                    "Reusable and responsive UI components",
                                    "Frontend and backend API integration",
                                    "Account-specific access controls",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <MdCheckCircle
                                            className="mt-0.5 shrink-0 text-green-600"
                                            size={21}
                                        />
                                        <p className="text-sm leading-6 text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-green-100 bg-linear-to-br from-green-50 to-white p-7 sm:p-10">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-700/20">
                                <MdShield size={34} />
                            </div>

                            <h3 className="mt-6 text-2xl font-bold text-gray-900">
                                Access with Confidence
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                                The application can use backend validation, secure cookie
                                settings, token-based authentication, and protected routes
                                as part of its access-control design. Actual protection
                                depends on the implementation and configuration.
                            </p>

                            <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-100 bg-white p-4">
                                <MdLock className="shrink-0 text-green-700" size={23} />
                                <p className="text-sm font-medium text-gray-700">
                                    Authentication and authorization work together to manage
                                    access to protected resources.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
};

export default Features;
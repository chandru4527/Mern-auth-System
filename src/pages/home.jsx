import React from "react";

export const Homepage = () => {
    return (
        <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-5">

            <div className="flex flex-col items-center w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-shadow-lg">
                    JWT Authentication System
                </h1>

                <p className="text-lg font-semibold text-gray-900 mt-4 text-justify max-w-2xl text-shadow-md">
                    A secure authentication platform built with React, Node.js, Express, MongoDB, and JWT.
                    Features user registration, login, protected routes, role-based access control, and cookie-based authentication.
                </p>

            </div>

        </div>
    );
};
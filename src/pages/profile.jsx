import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthstore } from "../store/user.authstore";
import { toast } from "react-toastify";

export const Profile = () => {
    const user = useAuthstore((state) => state.user);
    const logout = useAuthstore((state) => state.logout);
    const loading = useAuthstore((state) => state.loading);
    const updateUserProImg = useAuthstore(
        (state) => state.updateUserProImg
    );

    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <h1 className="text-white">Loading...</h1>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <h1 className="text-white">No user found</h1>
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        toast.success("Logout successfully");
        navigate("/");
    };

    const handleFileUpdate = async (e) => {
        const file = e.target.files[0];

        const maxsize = 2 * 1024 * 1024;

        const accept_file = [
            "image/jpeg",
            "image/webp",
            "image/png",
        ];

        if (!file) return;

        if (file.size >= maxsize) {
            toast.error("Image must be less than 2MB");
            e.target.value = "";
            return;
        }

        if (!accept_file.includes(file.type)) {
            toast.error(
                "Only JPG, PNG, and WEBP images are allowed"
            );
            e.target.value = "";
            return;
        }

        const result = await updateUserProImg(file);

        result.success
            ? toast.success(result.message)
            : toast.error(result.message);
    };

    return (
        <div className="min-h-screen bg-black/50 px-4 py-8 sm:px-6 lg:px-10">

            <div className="w-full max-w-7xl mx-auto">

                {/* Main Layout */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-[220px_1fr]
                    lg:grid-cols-[280px_1fr]
                    gap-8
                    md:gap-10
                    lg:gap-16
                ">

                    {/* ================= LEFT SIDEBAR ================= */}
                    <div className="w-full">

                        {/* Profile Image */}
                        <div className="
                            w-full
                            h-64
                            sm:h-72
                            md:h-56
                            lg:h-72
                            bg-white
                            flex
                            items-center
                            justify-center
                            mb-6
                            border
                            border-gray-300
                            relative
                            overflow-hidden
                        ">

                            <img
                                src={user?.profileImage}
                                alt="Profile"
                                className="
                                    w-full
                                    h-full
                                    object-cover
                                    object-center
                                "
                            />

                            {/* Upload Button */}
                            <label
                                htmlFor="profileImage"
                                className="
                                    absolute
                                    bottom-3
                                    right-3
                                    w-8
                                    h-8
                                    rounded-full
                                    bg-gray-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    hover:bg-gray-700
                                    shadow-lg
                                    text-xl
                                "
                            >
                                +
                            </label>

                            {/* Hidden Input */}
                            <input
                                type="file"
                                id="profileImage"
                                accept="image/*"
                                onChange={handleFileUpdate}
                                className="hidden"
                            />

                        </div>

                        {/* Work */}
                        <div className="mb-8">

                            <p className="
                                text-[10px]
                                text-white
                                tracking-widest
                                mb-4
                            ">
                                WORK
                            </p>

                            <h3 className="
                                font-medium
                                text-white
                                text-lg
                            ">
                                Developer
                            </h3>

                            <p className="
                                text-xs
                                text-gray-100
                                mt-2
                            ">
                                MERN Stack Developer
                            </p>

                            <p className="
                                text-xs
                                text-gray-100
                            ">
                                India
                            </p>

                        </div>

                        {/* Skills */}
                        <div>

                            <p className="
                                text-[10px]
                                text-gray-100
                                tracking-widest
                                mb-4
                            ">
                                SKILLS
                            </p>

                            <div className="
                                text-sm
                                text-slate-100
                                space-y-1
                            ">
                                <p>React.js</p>
                                <p>Node.js</p>
                                <p>MongoDB</p>
                                <p>Express.js</p>
                                <p>JavaScript</p>
                            </div>

                        </div>

                    </div>


                    {/* ================= RIGHT CONTENT ================= */}
                    <div className="w-full">

                        {/* User Header */}
                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:justify-between
                            sm:items-start
                            gap-3
                        ">

                            <div>

                                <h1 className="
                                    text-2xl
                                    sm:text-3xl
                                    lg:text-4xl
                                    font-bold
                                    text-white
                                    uppercase
                                    wrap-break-word
                                ">
                                    {user.name}
                                </h1>

                            </div>

                            <span className="
                                text-xs
                                text-gray-50
                                whitespace-nowrap
                            ">
                                🔖 Bookmark
                            </span>

                        </div>


                        {/* Basic Information */}
                        <div className="mt-8 sm:mt-10">

                            <p className="
                                text-white
                                font-semibold
                                tracking-widest
                                text-sm
                                mb-5
                            ">
                                BASIC INFORMATION
                            </p>

                            <div className="space-y-5 text-sm">

                                {/* Username */}
                                <div className="
                                    grid
                                    grid-cols-[100px_1fr]
                                    gap-3
                                    items-start
                                ">

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        Username:
                                    </span>

                                    <span className="
                                        text-white
                                        break-all
                                    ">
                                        {user.userName}
                                    </span>

                                </div>


                                {/* Role */}
                                <div className="
                                    grid
                                    grid-cols-[100px_1fr]
                                    gap-3
                                    items-start
                                ">

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        Role:
                                    </span>

                                    <span className="
                                        text-white
                                        capitalize
                                    ">
                                        {user.role}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Contact Information */}
                        <div className="mt-8">

                            <p className="
                                text-[10px]
                                text-white
                                tracking-widest
                                mb-5
                            ">
                                CONTACT INFORMATION
                            </p>

                            <div className="space-y-5 text-sm">

                                {/* Phone */}
                                <div className="
                                    grid
                                    grid-cols-[100px_1fr]
                                    gap-3
                                    items-start
                                ">

                                    <span className="
                                        font-medium
                                        text-black
                                    ">
                                        Phone:
                                    </span>

                                    <span className="
                                        text-white
                                        break-all
                                    ">
                                        +91 123 456 7890
                                    </span>

                                </div>


                                {/* Region */}
                                <div className="
                                    grid
                                    grid-cols-[100px_1fr]
                                    gap-3
                                    items-start
                                ">

                                    <span className="
                                        font-medium
                                        text-black
                                    ">
                                        Region:
                                    </span>

                                    <span className="
                                        text-white
                                    ">
                                        India
                                    </span>

                                </div>


                                {/* Email */}
                                <div className="
                                    grid
                                    grid-cols-[100px_1fr]
                                    gap-3
                                    items-start
                                ">

                                    <span className="
                                        font-medium
                                        text-black
                                    ">
                                        E-mail:
                                    </span>

                                    <span className="
                                        text-white
                                        break-all
                                    ">
                                        {user.email}
                                    </span>

                                </div>

                            </div>

                        </div>


                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="
                                mt-10
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-6
                                py-2
                                rounded
                                transition
                                w-full
                                sm:w-auto
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};
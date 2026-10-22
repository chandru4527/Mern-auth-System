import React, { memo } from "react";
import {
    MdPerson, MdAlternateEmail, MdEmail, MdPhone, MdAdminPanelSettings, MdCake,
    MdLocationOn, MdCalendarMonth, MdUpdate, MdVerifiedUser, MdPersonOff,
} from "react-icons/md";

// components
import Image from "../../components/media/Image";
import Badge from "../../components/Badge";

// utils
import { formatDate } from '../../utils/formatters';

const ViewUser = ({ data }) => {

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center bg-white px-6 py-12 text-center">
                <MdPersonOff className="mb-3 text-5xl text-gray-300" />
                <h3 className="text-base font-semibold text-gray-700">
                    User Not Found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    User details are currently unavailable.
                </p>
            </div>
        );
    }

    const details = [
        {
            label: "Full Name",
            value: data.name,
            icon: MdPerson,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50",
        },
        {
            label: "Username",
            value: data.userName ? `@${data.userName}` : "",
            icon: MdAlternateEmail,
            iconColor: "text-violet-600",
            iconBg: "bg-violet-50",
        },
        {
            label: "Email Address",
            value: data.email,
            icon: MdEmail,
            iconColor: "text-rose-600",
            iconBg: "bg-rose-50",
        },
        {
            label: "Mobile Number",
            value: data.mobile,
            icon: MdPhone,
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-50",
        },
        {
            label: "Role",
            value: data.role,
            icon: MdAdminPanelSettings,
            iconColor: "text-indigo-600",
            iconBg: "bg-indigo-50",
            capitalize: true,
        },
        {
            label: "Date of Birth",
            value: formatDate(data?.dateOfBirth),
            icon: MdCake,
            iconColor: "text-pink-600",
            iconBg: "bg-pink-50",
        },
        {
            label: "Address",
            value: data.address,
            icon: MdLocationOn,
            iconColor: "text-orange-600",
            iconBg: "bg-orange-50",
            fullWidth: true,
        },
        {
            label: "Account Created",
            value: formatDate(data.createdAt),
            icon: MdCalendarMonth,
            iconColor: "text-teal-600",
            iconBg: "bg-teal-50",
        },
        {
            label: "Last Updated",
            value: formatDate(data.updatedAt),
            icon: MdUpdate,
            iconColor: "text-amber-600",
            iconBg: "bg-amber-50",
        },
    ];

    return (
        <div className="mx-auto w-full max-w-4xl overflow-hidden">

            {/* Profile Header */}
            <div className="relative border-b border-gray-100 bg-linear-to-r from-green-50 via-green-50 to-green-100 
            px-5 py-7 sm:px-7 rounded-md">
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                    <div className="relative shrink-0">
                        <div className="rounded-lg border-4 border-white shadow-md">
                            <Image
                                src={data.profileImage}
                                alt={data.name || "User"}
                                className="h-24 w-24 object-cover rounded-lg sm:h-28 sm:w-28 "
                            />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                        <h3 className="wrap-break-word text-xl font-bold text-gray-900 sm:text-2xl">
                            {data.name || "Unnamed User"}
                        </h3>
                        <h3 className="wrap-break-word text-sm font-semibold text-gray-600">
                            {data.email || "Unnamed User"}
                        </h3>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                            <Badge
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${data.isActive
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {data.isActive ? (
                                    <MdVerifiedUser className="text-base" />
                                ) : (
                                    <MdPersonOff className="text-base" />
                                )}
                                {data.isActive ? "Active" : "Inactive"}
                            </Badge>

                            <Badge
                                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold capitalize text-indigo-700" >
                                <MdAdminPanelSettings className="text-base" />
                                {data.role || "User"}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="mt-5">
                {/* <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <MdPerson className="text-xl text-blue-600" />
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800">
                            Personal Information
                        </h3>
                        <p className="text-xs text-gray-500">
                            User profile and account details
                        </p>
                    </div>
                </div> */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {details.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className={`group flex min-w-0 items-start gap-2 rounded-md border border-gray-100 bg-gray-50/70 p-3 transition-colors hover:border-gray-200 hover:bg-white 
                                    ${item.fullWidth ? "sm:col-span-2" : ""}`}
                            >
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${item.iconBg}`}
                                >
                                    <Icon className={`text-xl ${item.iconColor}`} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-500">
                                        {item.label}
                                    </p>

                                    <p
                                        className={`mt-1 wrap-break-word text-sm font-semibold text-gray-800 ${item.mono ? "font-mono text-xs" : ""
                                            } ${item.capitalize ? "capitalize" : ""
                                            }`}
                                    >
                                        {item.value || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(ViewUser);
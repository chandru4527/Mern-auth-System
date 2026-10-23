import React from "react";
import { MdCheckCircle, MdCancel, MdDescription, MdViewCarousel, MdCalendarMonth, MdFormatListNumbered } from "react-icons/md";

// Components
import Badge from "../../components/Badge";
import Image from "../../components/media/Image";

// utils 
import { formatDate } from '../../utils/formatters';

const ViewBanner = ({ banner }) => {
    const isActive = banner?.isActive;

    return (
        <div className="space-y-5">

            <div className="relative overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                <Image
                    src={banner?.image}
                    alt={banner?.title || "Banner"}
                    className="h-48 w-full object-cover sm:h-56"
                />
                <div className="absolute right-3 top-3">
                    <Badge
                        text={isActive ? "Active" : "Inactive"}
                        variant={isActive ? "success" : "danger"}
                    />
                </div>
            </div>

            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <MdViewCarousel className="text-2xl" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="wrap-break-word text-lg font-bold text-gray-900">
                        {banner?.title || "Untitled Banner"}
                    </h3>
                    {banner?.highlight && (
                        <p className=" text-sm font-semibold text-green-700">
                            {banner.highlight}
                        </p>
                    )}
                    {/* <p className="mt-1 text-xs text-gray-500">
                        Banner Details
                    </p> */}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

                <div className="rounded-md border border-gray-200 p-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <MdFormatListNumbered className="text-lg text-violet-600" />
                        <span className="text-xs font-medium">Display Order</span>
                    </div>
                    <p className="mt-2 text-lg font-bold text-gray-800">
                        {banner?.order ?? 0}
                    </p>

                </div>

                <div className="rounded-md border border-gray-200 p-3">
                    <div className="flex items-center gap-2 text-gray-500">
                        <MdCalendarMonth className="text-lg text-blue-600" />
                        <span className="text-xs font-medium">Created Date</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                        {formatDate(banner?.createdAt)}
                    </p>
                </div>
            </div>

            <div className="rounded-md border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                    <MdDescription className="text-xl text-green-700" />
                    <h4 className="text-sm font-semibold text-gray-800">
                        Description
                    </h4>
                </div>
                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-600">
                    {banner?.description || "No description available."}
                </p>
            </div>

            <div className={`flex items-start gap-3 rounded-md border p-4 ${isActive ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                }`}>
                {isActive ? (
                    <MdCheckCircle className="mt-0.5 shrink-0 text-xl text-green-600" />
                ) : (
                    <MdCancel className="mt-0.5 shrink-0 text-xl text-gray-500" />
                )}
                <div>
                    <p className={`text-sm font-semibold ${isActive ? "text-green-800" : "text-gray-700"
                        }`}>
                        {isActive ? "Banner is active" : "Banner is inactive"}
                    </p>
                    <p className={`mt-1 text-xs leading-5 ${isActive ? "text-green-700" : "text-gray-500"
                        }`}>
                        {isActive
                            ? "This banner is enabled on the platform."
                            : "This banner is currently disabled on the platform."}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default ViewBanner;
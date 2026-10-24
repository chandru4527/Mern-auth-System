import { twMerge } from "tailwind-merge";

const DEFAULT_IMAGE = "https://res.cloudinary.com/dyiuqcqg2/image/upload/v1792761998/default_profile_img_fdmhlz.webp";

const Image = ({
    src,
    alt = "",
    className = "",
    wrapperClassName = "",
    loading = "lazy",
    ...props
}) => {
    return (
        <div className={twMerge("overflow-hidden", wrapperClassName)}>
            <img
                src={src || DEFAULT_IMAGE}
                alt={alt}
                loading={loading}
                referrerPolicy="no-referrer"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = DEFAULT_IMAGE;
                }}
                className={twMerge("block h-auto w-full object-cover", className)}
                {...props}
            />
        </div>
    );
};

export default Image;
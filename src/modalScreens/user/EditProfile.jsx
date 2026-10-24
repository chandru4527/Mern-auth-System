import React, { memo, useState } from "react";

// icons
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdLocationOn, MdAlternateEmail } from "react-icons/md";

// form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import Input from "../../components/forms/Input";
import ProfileImageUpload from '../../components/ProfileImageUpload';

// hooks
import { useUpdateProfile } from '../../hooks/user/useProfile';
import { useUploadImage } from '../../hooks/useUploadImage';

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const profileSchema = z.object({
    name: z.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name cannot exceed 30 characters"),

    email: z.string()
        .trim()
        .min(1, "Email is required")
        .email("Enter a valid email address"),

    userName: z.string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    mobile: z.string()
        .trim()
        .refine(value => value === "" || /^[0-9]{10}$/.test(value), "Enter a valid 10-digit mobile number"),

    dateOfBirth: z.string()
        .refine(value => !value || (
            /^\d{4}-\d{2}-\d{2}$/.test(value) &&
            !Number.isNaN(Date.parse(value)) &&
            new Date(value).toISOString().slice(0, 10) === value &&
            value < new Date().toISOString().slice(0, 10)
        ), "Enter a valid date of birth in the past"),

    address: z.string()
        .trim()
        .max(100, "Address cannot exceed 100 characters"),
});

const EditProfile = memo(({ user, formId }) => {
    console.log(user);

    const { closeModal, setActionLoading } = useModalStore();

    const { mutate, isPending } = useUpdateProfile();

    const [selectedImage, setSelectedImage] = useState(null);

    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || "",
            userName: user?.userName || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            dateOfBirth: user?.dateOfBirth
                ? String(user.dateOfBirth).slice(0, 10)
                : "",
            address: user?.address || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setActionLoading(true);

            let profileImage = user?.profileImage || "";

            if (selectedImage) {
                profileImage = await uploadImage(selectedImage);
            }

            const payload = {
                ...data,
                profileImage,
            };

            mutate(payload, {
                onSuccess: () => {
                    toastify.success("Profile updated successfully");
                    closeModal();
                },
                onError: (error) => {
                    toastify.error(error?.message || "Failed to update profile");
                },
                onSettled: () => {
                    setActionLoading(false);
                },
            });
        } catch (error) {
            setActionLoading(false);
            toastify.error(error?.message || "Image upload failed");
        }
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} id={formId} className="space-y-5">

            {user && (
                <ProfileImageUpload
                    value={user.profileImage}
                    onChange={setSelectedImage}
                    disabled={isUploading}
                    loading={isUploading}
                />
            )}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                    label="Name"
                    iconClassName="text-blue-600"
                    placeholder="Enter your full name"
                    icon={MdPerson}
                    error={errors.name?.message}
                    {...register("name")}
                />

                <Input
                    label="Username"
                    placeholder="Enter your username"
                    icon={MdAlternateEmail}
                    iconClassName="text-pink-600"
                    error={errors.userName?.message}
                    {...register("userName")}
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    icon={MdEmail}
                    iconClassName="text-teal-600"
                    disabled={user?.uid}
                    error={errors.email?.message}
                    {...register("email")}
                />

                <Input
                    label="Mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    icon={MdPhone}
                    iconClassName="text-green-600"
                    error={errors.mobile?.message}
                    {...register("mobile")}
                />
                <Input
                    label="Date of Birth"
                    type="date"
                    icon={MdCalendarToday}
                    iconClassName="text-purple-600"
                    error={errors.dateOfBirth?.message}
                    {...register("dateOfBirth")}
                />
                <Input
                    label="Address"
                    placeholder="Enter your city"
                    icon={MdLocationOn}
                    iconClassName="text-amber-600"
                    error={errors.address?.message}
                    {...register("address")}
                />
            </div>

        </form>
    );
})

export default EditProfile;
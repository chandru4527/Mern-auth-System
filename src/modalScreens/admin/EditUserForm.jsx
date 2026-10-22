import React, { memo, useState } from "react";

// icons
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdLocationCity, } from "react-icons/md";

// form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import Input from "../../components/forms/Input";
import ProfileImageUpload from '../../components/ProfileImageUpload';

// hooks
import { useEditUser } from '../../hooks/admin/useUsers';
import { useUploadImage } from '../../hooks/useUploadImage';

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const EditUserForm = ({ user, formId }) => {

    const { closeModal, setActionLoading } = useModalStore();


    const { mutate, isPending } = useEditUser();

    const [selectedImage, setSelectedImage] = useState(null);

    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

    const { register, handleSubmit, formState: { errors }, } = useForm({
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

            mutate(
                {
                    id: user._id,
                    data: payload,
                },
                {
                    onSuccess: () => {
                        toastify.success("User updated successfully");
                        closeModal();
                    },
                    onError: (error) => {
                        toastify.error(error?.message || "Failed to update user");
                    },
                    onSettled: () => {
                        setActionLoading(false);
                    },
                }
            );
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
                    placeholder="Enter your full name"
                    icon={MdPerson}
                    iconClassName="text-blue-600"
                    inputClassName="focus:border-blue-500 focus:ring-blue-500"
                    error={errors.name?.message}
                    {...register("name")}
                />
                <Input
                    label="Username"
                    placeholder="Enter your username"
                    icon={MdPerson}
                    iconClassName="text-purple-600"
                    inputClassName="focus:border-purple-500 focus:ring-purple-500"
                    error={errors.userName?.message}
                    {...register("userName")}
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    icon={MdEmail}
                    iconClassName="text-emerald-600"
                    inputClassName="focus:border-emerald-500 focus:ring-emerald-500"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Input
                    label="Mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    icon={MdPhone}
                    iconClassName="text-orange-600"
                    inputClassName="focus:border-orange-500 focus:ring-orange-500"
                    error={errors.mobile?.message}
                    {...register("mobile")}
                />
                <Input
                    label="Date of Birth"
                    type="date"
                    icon={MdCalendarToday}
                    iconClassName="text-pink-600"
                    inputClassName="focus:border-pink-500 focus:ring-pink-500"
                    error={errors.dateOfBirth?.message}
                    {...register("dateOfBirth")}
                />
                <Input
                    label="Address"
                    placeholder="Enter your city"
                    icon={MdLocationCity}
                    iconClassName="text-cyan-600"
                    inputClassName="focus:border-cyan-500 focus:ring-cyan-500"
                    error={errors.address?.message}
                    {...register("address")}
                />
            </div>

        </form>
    )
}

export default EditUserForm;
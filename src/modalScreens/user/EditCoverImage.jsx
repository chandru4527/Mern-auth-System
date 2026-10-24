import React, { useState, memo } from "react";

// icons
import { MdCloudUpload } from "react-icons/md";

// components
import CoverImageUpload from "../../components/CoverImageUpload";
import Button from "../../components/Button";

// hooks
import { useUpdateProfile } from "../../hooks/user/useProfile";
import { useUploadImage } from "../../hooks/useUploadImage";

// store
import useModalStore from "../../store/modalStore";

// utils
import { toastify } from "../../utils/toastify";

const EditCoverImage = memo(({ user }) => {

    const { closeModal, setActionLoading } = useModalStore();

    const [selectedImage, setSelectedImage] = useState(null);

    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

    const handleSubmit = async () => {
        if (!selectedImage) {
            toastify.error("Please select a cover image");
            return;
        }

        try {
            setActionLoading(true);

            const coverImage = await uploadImage(selectedImage);

            updateProfile(
                { coverImage },
                {
                    onSuccess: () => {
                        toastify.success("Cover image updated successfully");
                        closeModal();
                    },
                    onError: (error) => {
                        toastify.error(
                            error?.response?.data?.message ||
                            error?.message || "Failed to update cover image"
                        );
                    },
                    onSettled: () => {
                        setActionLoading(false);
                    },
                }
            );
        } catch (error) {
            setActionLoading(false);
            toastify.error(error?.message || "Cover image upload failed");
        }
    };

    return (
        <div className="space-y-5">

            <CoverImageUpload
                value={user?.coverImage}
                onChange={setSelectedImage}
                height={220}
                maxSizeMB={5}
                helperText="Choose a JPG, PNG, or WEBP image. Maximum size: 5MB."
                disabled={isUploading || isUpdating}
                loading={isUploading}
            />

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    text="Cancel"
                    variant="secondary"
                    onClick={closeModal}
                    disabled={isUploading || isUpdating}
                />
                <Button
                    type="button"
                    variant="themeDark"
                    text={isUploading || isUpdating ? "Updating..." : "Update"}
                    icon={MdCloudUpload}
                    onClick={handleSubmit}
                    disabled={isUploading || isUpdating || !selectedImage}
                />
            </div>
        </div>
    );
});

export default EditCoverImage;
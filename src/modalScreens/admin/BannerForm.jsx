import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdMessage, MdLabel, MdTitle, MdSort,MdFormatColorText } from "react-icons/md";

// Components
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import Switch from "../../components/forms/Switch";
import BannerImageUpload from "../../components/BannerImageUpload";

// Hooks
import { useCreateBanner, useUpdateBanner } from "../../hooks/admin/useAdminBanners";
import { useUploadImage } from '../../hooks/useUploadImage';

// Store
import useModalStore from "../../store/modalStore";

// Utils
import { toastify } from "../../utils/toastify";

const bannerSchema = z.object({
  image: z.string().trim().min(1, "Banner image is required"),
  badge: z.string().trim().min(1, "Badge is required").max(50, "Badge cannot exceed 50 characters"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  highlight: z.string().trim().min(1, "Highlight is required").max(100, "Highlight cannot exceed 100 characters"),
  description: z.string().trim().min(1, "Description is required").max(300, "Description cannot exceed 300 characters"),
  order: z.coerce.number().int("Display order must be a whole number").min(0, "Display order cannot be negative"),
  isActive: z.boolean(),
});

const BannerForm = ({ data = null, mode = "add", formId }) => {

  const { closeModal, setActionLoading } = useModalStore();

  const [bannerImage, setBannerImage] = useState(null)

  const { mutate: createBanner, isPending: isCreating } = useCreateBanner();
  const { mutate: updateBanner, isPending: isUpdating } = useUpdateBanner();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const { register, handleSubmit, watch, control, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(bannerSchema),
    mode: "onChange",
    defaultValues: {
      image: data?.image || "",
      badge: data?.badge || "",
      title: data?.title || "",
      highlight: data?.highlight || "",
      description: data?.description || "",
      order: data?.order ?? 0,
      isActive: data?.isActive ?? true,
    },
  });

  const onSubmit = async (formData) => {
    setActionLoading(true);

    try {
      let imageUrl = data?.image || "";

      if (bannerImage) {
        imageUrl = await uploadImage(bannerImage);
      } else if (mode === "add") {
        imageUrl = "";
      } else {
        imageUrl = formData.image;
      }

      if (!imageUrl) {
        toastify.error("Please upload a banner image");
        setActionLoading(false);
        return;
      }

      const payload = {
        ...formData,
        image: imageUrl,
        order: Number(formData.order),
      };

      const options = {
        onSuccess: () => {
          toastify.success(`Banner ${mode === "edit" ? "updated" : "created"} successfully`);
          closeModal();
        },
        onError: (error) => {
          toastify.error(error?.message || "Failed to save banner");
        },
        onSettled: () => {
          setActionLoading(false);
        },
      };

      if (mode === "edit") {
        updateBanner({ id: data._id, data: payload }, options);
      } else {
        createBanner(payload, options);
      }
    } catch (error) {
      toastify.error(error?.message || "Failed to upload banner image");
      setActionLoading(false);
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      <BannerImageUpload
        loading={isCreating || isUpdating || isUploading}
        value={watch("image")}
        onChange={(file) => {
          setBannerImage(file);
          if (file) {
            setValue("image", "selected-image", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
      />

      <Input
        label="Badge"
        placeholder="Enter badge"
        icon={MdLabel}
        iconClassName="text-purple-600"
        error={errors.badge?.message}
        {...register("badge")}
      />

      <Input
        label="Banner Title"
        placeholder="Enter banner title"
        icon={MdTitle}
        iconClassName="text-blue-600"
        error={errors.title?.message}
        {...register("title")}
      />

      <Input
        label="Highlighted Title"
        icon={MdFormatColorText}
        iconClassName="text-amber-600"
        placeholder="Enter highlighted title"
        error={errors.highlight?.message}
        {...register("highlight")}
      />

      <Textarea
        label="Description"
        icon={MdMessage}
        iconClassName="text-green-600"
        placeholder="Enter banner description"
        rows={3}
        error={errors.description?.message}
        {...register("description")}
      />

      <Input
        label="Display Order"
        type="number"
        icon={MdSort}
         iconClassName="text-orange-600"
        error={errors.order?.message}
        {...register("order")}
      />

      <Switch
        size="sm"
        label="Active Banner"
        description="Enable or disable this banner on the home page."
        name="isActive"
        control={control}
        activeColor="bg-blue-600"
        inactiveColor="bg-gray-300"
      />
    </form>
  );
};

export default BannerForm;
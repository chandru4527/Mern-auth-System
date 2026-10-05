// import { useMutation } from "@tanstack/react-query";
// import { postFormData } from "../api/axios";
// import { Endpoints } from "../api/endpoints";

// const uploadImage = async (file) => {
//     if (!(file instanceof File)) {
//         throw new Error("Please select a valid image file");
//     }

//     const formData = new FormData();
//     formData.append("image", file, file.name);

//     const response = await postFormData(
//         Endpoints.UPLOAD_IMAGE,
//         formData
//     );

//     return response?.url;
// };

// export const useUploadImage = () => {
//     return useMutation({
//         mutationFn: uploadImage,
//     });
// };
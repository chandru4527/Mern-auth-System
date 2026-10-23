import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "../../api/axios";
import { Endpoints } from "../../api/apiendpoints";

const ADMIN_BANNER_KEY = ["admin-banners"];

export const useAdminBanners = (params = {}) => useQuery({
    queryKey: [...ADMIN_BANNER_KEY, params],
    queryFn: () => get(Endpoints.BANNERS_ADMIN, params),
});

export const useCreateBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => post(Endpoints.BANNERS_ADMIN, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_BANNER_KEY }),
    });
};

export const useUpdateBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => patch(`${Endpoints.BANNERS_ADMIN}/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_BANNER_KEY }),
    });
};

export const useDeleteBanner = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => del(`${Endpoints.BANNERS_ADMIN}/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_BANNER_KEY }),
    });
};
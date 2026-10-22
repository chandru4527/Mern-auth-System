import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, patch } from "../../api/axios";
import { Endpoints } from "../../api/apiendpoints";

export const AUTH_USER_KEY = ["auth", "user"];

// update profile
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => patch(Endpoints.UPDATE_PROFILE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTH_USER_KEY });
        },
    });
};

// change password
export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data) => patch(Endpoints.CHANGE_PASSWORD, data),
    });
};
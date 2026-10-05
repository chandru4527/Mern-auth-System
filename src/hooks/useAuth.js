import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { get, post } from "../api/axios";
import { Endpoints } from "../api/apiendpoints";

export const AUTH_USER_KEY = ["auth", "user"];

// use current user
export const useCurrentUser = () => {
    return useQuery({
        queryKey: AUTH_USER_KEY,
        queryFn: async () => {
            const data = await get(Endpoints.GET_ME);
            return data?.results?.user;
        },
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
};

// use login
export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => post(Endpoints.LOGIN, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: AUTH_USER_KEY,
            });
        },
    });
};

// use register
export const useRegister = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) => post(Endpoints.REGISTER, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: AUTH_USER_KEY,
            });
        },
    });
};

// use google login
export const useGoogleLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (firebaseToken) =>
            post(Endpoints.GOOGLE_LOGIN, {
                googleToken: firebaseToken,
                 termsAccepted: true,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: AUTH_USER_KEY,
            });
        },
    });
};

// use logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => post(Endpoints.LOGOUT),
        onSuccess: () => {
            queryClient.setQueryData(AUTH_USER_KEY, null);
        },
    });
};
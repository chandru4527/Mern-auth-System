import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, patch, del } from "../../api/axios";
import { Endpoints } from "../../api/apiendpoints";

const USER_KEY = ["users"];

// Get all users
export const useAllUsers = (params = {}) => {
    return useQuery({
        queryKey: [...USER_KEY, params],
        queryFn: () => get(Endpoints.USERS, params)
    });
};

// Edit user details
export const useEditUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => patch(`${Endpoints.USERS}/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEY });
        }
    });
};

// Delete user
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => del(`${Endpoints.USERS}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_KEY });
        }
    });
};
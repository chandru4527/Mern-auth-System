import { create } from "zustand";
import api from "../api/axios";

export const useAuthstore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    checkingAuth: true,

    // Register
    register: async (formData) => {
        try {
            set({ loading: true });

            const res = await api.post("/users/register", formData);
            const data = res.data

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
            });

            return {
                success: true,
                message: data.message,
            };

        } catch (error) {
            set({ loading: false });

            return {
                success: false,
                message: error.message,
            };
        }
    },

    // Login
    login: async (formData) => {

        try {
            set({ loading: true });

            const res = await api.post("/users/login", formData);
            const data = res.data;

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false
            });

            return {
                success: true,
                message: data.message
            };

        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                loading: false
            });

            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };

        }

    },

    // Check Auth
    checkAuth: async () => {
        try {
            set({ loading: true, checkingAuth: true });

            const res = await api.get("/users/profile");
            const data = res.data;

            console.log(data);

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
                checkingAuth: false
            });

        } catch (error) {;

            set({
                user: null,
                isAuthenticated: false,
                loading: false,
                checkingAuth: false
            });
        }
    },

    // logout
    logout: async () => {

        try {
            const res = await api.post("/users/logout");
            const data = res.data;

            set({
                user: null,
                isAuthenticated: false,
                loading: false,
            });

            return {
                success: true,
                message: data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Logout Failed'
            };
        }
    },

    updateUserProImg: async (file) => {
        set({ loading: true })

        try {
            const formData = new FormData()
            formData.append('profileImage', file)

            const res = await api.put('/users/profile-image', formData)
            const data = res.data;

            console.log('data', data);

            set((state) => ({
                user: {
                    ...state.user, profileImage: data.user.profileImage
                },
                loading: false
            }))

            return {
                success: true,
                message: data.message
            }

        } catch (error) {

            set({ loading: false })
            return {
                success: false,
                message: error.message
            }
        }

    }

}));
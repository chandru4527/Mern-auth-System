import axios from "axios";
import { Endpoints } from "./apiendpoints";

const baseurl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Don't refresh authentication requests
        const authEndpoints = [
            Endpoints.LOGIN,
            Endpoints.REGISTER,
            Endpoints.GOOGLE_LOGIN,
            Endpoints.REFRESH_TOKEN,
        ];

        if (authEndpoints.includes(originalRequest.url)) {
            return Promise.reject(error);
        }

        // Access token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token is sent automatically through HTTP-only cookie
                await api.post(Endpoints.REFRESH_TOKEN);

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const get = async (url, params = {}) => {
    const { data } = await api.get(url, { params });
    return data;
};

export const post = async (url, payload = {}, config = {}) => {
    const { data } = await api.post(url, payload, config);
    return data;
};

export const put = async (url, payload = {}, config = {}) => {
    const { data } = await api.put(url, payload, config);
    return data;
};

export const patch = async (url, payload = {}, config = {}) => {
    const { data } = await api.patch(url, payload, config);
    return data;
};

export const del = async (url, config = {}) => {
    const { data } = await api.delete(url, config);
    return data;
};

export const postFormData = async (url, formData, config = {}) => {
    const { data } = await api.post(url, formData, { ...config, });

    return data;
};

export default api;
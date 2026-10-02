import axios from "axios";
import { Endpoints } from "./apiendpoints";

const baseurl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (originalRequest.url === "/users/refreshtoken") {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post(Endpoints.REFRESH_TOKEN);
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const get = async (url, config = {}) => {
    const { data } = await api.get(url, config);
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

// Reusable single or multiple file upload
export const fileUpload = async (url, formData, config = {}) => {
    const { data } = await api.post(url, formData, {
        ...config,
    });

    return data;
};

export default api;
import axios from "axios";

const baseurl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: baseurl,
    withCredentials: true
});

api.interceptors.response.use(

    // Success
    (res) => {
        return res;
    },

    // Error
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url === "/users/refreshtoken") {
            return Promise.reject(error);
        }

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry =
                true;

            try {

                await api.post("/users/refreshtoken");

                return api(originalRequest);

            } catch (refreshError) {

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);


export default api;
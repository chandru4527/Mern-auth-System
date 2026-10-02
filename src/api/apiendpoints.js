export const Endpoints = {

    // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    GET_ME: "/auth/me",

    // Users
    GET_USERS: "/users",
    GET_USER_BY_ID: (id) => `/users/${id}`,
};
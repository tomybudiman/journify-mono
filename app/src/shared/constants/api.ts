import Config from "react-native-config";

export const API_BASE_URL = Config.API_BASE_URL;

export const API_ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  journal: {
    getAll: "/journals",
    getById: (id: number) => `/journals/${id}`,
    create: "/journals",
    update: (id: number) => `/journals/${id}`,
    delete: (id: number) => `/journals/${id}`,
  },
};

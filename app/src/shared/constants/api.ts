export const API_BASE_URL = "http://10.0.2.2:3000";

export const API_ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  journal: {
    getAll: "/journals",
    getById: (id: string): string => `/journals/${id}`,
    create: "/journals",
    update: (id: string): string => `/journals/${id}`,
    delete: (id: string): string => `/journals/${id}`,
  },
};

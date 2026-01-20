import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Units API
export const unitsAPI = {
  getAll: (params) => api.get("/units", { params }),
  getById: (id) => api.get(`/units/${id}`),
  getByProject: (projectId, params) =>
    api.get(`/units/project/${projectId}`, { params }),
};

// Projects API
export const projectsAPI = {
  getAll: (params) => api.get("/projects", { params }),
  getById: (id) => api.get(`/projects/${id}`),
  getByDeveloper: (developerId, params) =>
    api.get(`/projects/developer/${developerId}`, { params }),
};

// Developers API
export const developersAPI = {
  getAll: (params) => api.get("/developers", { params }),
  getById: (id) => api.get(`/developers/${id}`),
};

// Areas API
export const areasAPI = {
  getAll: (params) => api.get("/areas", { params }),
  getById: (id) => api.get(`/areas/${id}`),
};

// Types API
export const typesAPI = {
  getAll: (params) => api.get("/types", { params }),
  getUnitsByType: (typeId, params) =>
    api.get(`/types/${typeId}/units`, { params }),
};

// Search API
export const searchAPI = {
  search: (query, params) =>
    api.get("/search", { params: { q: query, ...params } }),
};

export default api;

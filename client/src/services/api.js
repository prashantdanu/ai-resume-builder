import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updatePreferences: (preferences) => api.put('/auth/preferences', preferences),
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData),
}

// Resume API
export const resumeAPI = {
  getResumes: () => api.get('/resume'),
  getResume: (id) => api.get(`/resume/${id}`),
  createResume: (resumeData) => api.post('/resume', resumeData),
  updateResume: (id, resumeData) => api.put(`/resume/${id}`, resumeData),
  deleteResume: (id) => api.delete(`/resume/${id}`),
  duplicateResume: (id) => api.post(`/resume/${id}/duplicate`),
  generatePDF: (id) => api.get(`/resume/${id}/pdf`, { responseType: 'blob' }),
  generateDOCX: (id) => api.get(`/resume/${id}/docx`, { responseType: 'blob' }),
  shareResume: (id) => api.post(`/resume/${id}/share`),
  unshareResume: (id) => api.post(`/resume/${id}/unshare`),
  getSharedResume: (token) => api.get(`/resume/shared/${token}`),
}

// AI API
export const aiAPI = {
  enhanceContent: (data) => api.post('/ai/enhance-content', data),
  generateSummary: (data) => api.post('/ai/generate-summary', data),
  calculateATSScore: (data) => api.post('/ai/ats-score', data),
  getKeywordSuggestions: (data) => api.post('/ai/keyword-suggestions', data),
}

// Template API
export const templateAPI = {
  getTemplates: () => api.get('/templates'),
  getTemplate: (id) => api.get(`/templates/${id}`),
  getTemplatePreview: (id) => api.get(`/templates/${id}/preview`),
}

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
}

export default api

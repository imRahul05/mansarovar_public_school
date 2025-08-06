import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

api.interceptors.request.use((config) => {

  return config;
});

export const superAdminAPI = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/superAdmin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/superAdmin/users/${id}`);
      return response.data;
    } catch (error) {
      try {
        const allUsersResponse = await api.get('/superAdmin/users');
        if (allUsersResponse.data.success) {
          const user = allUsersResponse.data.users.find(u => u._id === id);
          if (user) {
            return { success: true, user };
          } else {
            throw new Error('User not found');
          }
        }
        throw error.response?.data || error;
      } catch (fallbackError) {
        throw fallbackError.response?.data || fallbackError;
      }
    }
  },

  // Verify user
  verifyUser: async (id) => {
    try {
      const response = await api.put(`/superAdmin/verify/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateUserStatus: async (id, isActive) => {
    try {
      const response = await api.put(`/superAdmin/users/${id}/status`, { isActive });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/superAdmin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get unverified users
  getUnverifiedUsers: async () => {
    try {
      const response = await api.get('/superAdmin/unverified-users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Admin APIs for creating users
export const adminAPI = {
  // Create student
  createStudent: async (studentData) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create teacher
  createTeacher: async (teacherData) => {
    try {
      const response = await api.post('/teachers', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create multiple students
  createMultipleStudents: async (studentsData) => {
    try {
      const promises = studentsData.map(student => api.post('/students', student));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create multiple teachers
  createMultipleTeachers: async (teachersData) => {
    try {
      const promises = teachersData.map(teacher => api.post('/teachers', teacher));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default api;

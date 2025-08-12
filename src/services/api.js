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


export const AdminControlAPI = {
  // Get all users
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      try {
        const allUsersResponse = await api.get('/admin/users');
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

  // update Specific User Details; Method = PUT, role= Admin
  updateSpecificUserDetail: async (id, payload) => {
    try {
      const response = await api.put(`/admin/users/${id}/update`, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // // update Specific User Details; Method = PUT, role= Admin
  // updateSpecificUserDetail: async (id) => {
  //   try {
  //     const response = await api.put(`/admin/users/${id}/update`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || error;
  //   }
  // },

  // Verify user
  verifyUser: async (id) => {
    try {
      const response = await api.put(`/admin/verify/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // mark User As isActive= true
  updateUserStatus: async (id, isActive) => {
    try {
      const response = await api.put(`/admin/users/${id}/status`, { isActive });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Delete specific User's Account, also prevent user's to delete their own account permanently
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Get unverified users
  getUnverifiedUsers: async () => {
    try {
      const response = await api.get('/admin/unverified-users');
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
      const response = await api.post('/admin/students/batch', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create teacher
  createTeacher: async (teacherData) => {
    try {
      const response = await api.post('/admin/teachers/batch', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create multiple students
  createMultipleStudents: async (studentsData) => {
    try {
      const promises = studentsData.map(student => api.post('/admin/students/batch', student));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Create multiple teachers
  createMultipleTeachers: async (teachersData) => {
    try {
      const promises = teachersData.map(teacher => api.post('/admin/teachers/batch', teacher));
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Analytics APIs
  getAnalyticsDataByAdmin: async () => {
    try {
      const response = await api.get('/admin/analytics-data');
      //console.log("dbejbd", response.data.data)
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // get user growth by role= Admin
  getUserGrowthDataByAdmin: async (period = '6') => {
    try {
      const response = await api.get(`/admin/user-growth?period=${period}`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // role-distribution by role= Admin
  getRoleDistributionByAdmin: async () => {
    try {
      const response = await api.get('/admin/role-distribution');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAllUserAccessByAdmin: async () => {
    try {
      const response = await api.get('admin/all-users')
      return response.data.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // get recent-activity by role= Admin
  getRecentActivityByAdmin: async (days = '7') => {
    try {
      const response = await api.get(`/admin/recent-activity?days=${days}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Analytics APIs
  getAnalyticsData: async () => {
    try {
      const response = await api.get('/superAdmin/analytics-data');
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },


  getUserGrowthData: async (period = '6') => {
    try {
      const response = await api.get(`/superAdmin/user-growth?period=${period}`);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getRoleDistribution: async () => {
    try {
      const response = await api.get('/superAdmin/role-distribution');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getRecentActivity: async (days = '7') => {
    try {
      const response = await api.get(`/superAdmin/recent-activity?days=${days}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default api;

// Guest login credentials for different roles
export const guestCredentials = {
  superadmin: {
    email: "superadmin@example.com",
    password: "Superadmin123",
    label: "Guest Super Admin"
  },
  admin: {
    email: "amit.admin@example.com",
    password: "Admin1234",
    label: "Guest Admin"
  },
  teacher: {
    email: "priya.teacher@example.com",
    password: "Teacher123",
    label: "Guest Teacher"
  },
  student: {
    email: "rahul.student@example.com",
    password: "Student123",
    label: "Guest Student"
  }
};

// Array of roles for easy mapping
export const guestRoles = ['superadmin', 'admin', 'teacher', 'student'];

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
    email: "jhanvidummy@fakeemail.com",
    password: "GIYj46JpkV_4+c",
    label: "Guest Teacher"
  },
  student: {
    email: "rahull.22.mcav@acharya.ac.in",
    password: ".^EHI.OE%$g?#2",
    label: "Guest Student"
  }
};

// Array of roles for easy mapping
export const guestRoles = ['superadmin', 'admin', 'teacher', 'student'];

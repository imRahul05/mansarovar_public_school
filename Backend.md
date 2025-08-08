# 🏫 Mansarovar Public School - Backend Architecture

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

## 📋 Table of Contents
- [🏗️ Architecture Overview](#architecture-overview)
- [📁 Project Structure](#project-structure)
- [🗃️ Database Models](#database-models)
- [🛣️ API Endpoints](#api-endpoints)
- [🔐 Authentication & Authorization](#authentication--authorization)
- [🚀 Getting Started](#getting-started)
- [🌍 Environment Variables](#environment-variables)

---

## 🏗️ Architecture Overview

### **Technology Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **CORS**: Configured for cross-origin requests
- **Deployment**: Production-ready with Vercel support

### **Key Features**
- 🔐 Role-based authentication (Student, Teacher, Admin, SuperAdmin)
- 📊 Analytics and reporting system
- 🎓 Student management system
- 👨‍🏫 Teacher management system
- 📢 Notice board functionality
- 🎉 Event management
- 🖼️ Gallery management
- 📱 RESTful API design
- 🛡️ Secure password handling
- 📈 User growth tracking

---

## 📁 Project Structure

```
BackendMNS/
├── 📄 server.js                 # Main server entry point
├── 📄 .env                      # Environment variables
├── 
├── 📁 config/
│   └── 📄 db.js                 # Database connection configuration
├── 
├── 📁 controllers/
│   ├── 📄 authController.js     # Authentication logic
│   ├── 📄 eventController.js    # Event management logic
│   ├── 📄 noticeController.js   # Notice board logic
│   └── 📄 superadminController.js # Super admin operations
├── 
├── 📁 middlewares/
│   └── 📄 authMiddleware.js     # Authentication & authorization middleware
├── 
├── 📁 models/
│   ├── 📄 User.js               # Base user model
│   ├── 📄 Student.js            # Student-specific data
│   ├── 📄 Teacher.js            # Teacher-specific data
│   ├── 📄 Event.js              # Event model
│   ├── 📄 Notice.js             # Notice model
│   └── 📄 counter.js            # Auto-increment counter
├── 
├── 📁 routes/
│   ├── 📄 authRoutes.js         # Authentication endpoints
│   ├── 📄 superAdminRoute.js    # Super admin endpoints
│   ├── 📄 adminRoute.js         # Admin endpoints
│   ├── 📄 studentRoutes.js      # Student endpoints
│   ├── 📄 teacherRoutes.js      # Teacher endpoints
│   ├── 📄 noticeRoutes.js       # Notice endpoints
│   ├── 📄 eventRoutes.js        # Event endpoints
│   └── 📄 galleryRoutes.js      # Gallery endpoints
├── 
└── 📁 utils/
    ├── 📄 generateCustomID.js   # Custom ID generation
    └── 📄 generateToken.js      # JWT token utilities
```

---

## 🗃️ Database Models

### 👤 **User Model** (`models/User.js`)
**Base model for all users in the system**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Full name of the user |
| `email` | String | ✅ | Unique email address |
| `password` | String | ✅ | Hashed password (bcrypt) |
| `customID` | String | ➖ | Auto-generated unique ID |
| `role` | String | ✅ | `student`, `teacher`, `admin`, `superadmin` |
| `profilePicture` | String | ➖ | Profile image URL |
| `contactNumber` | String | ➖ | 10-digit phone number |
| `address` | Object | ➖ | Street, city, state, zipCode |
| `isActive` | Boolean | ➖ | Account status (default: true) |
| `isVerified` | Boolean | ➖ | Verification status (default: false) |
| `lastLogin` | Date | ➖ | Last login timestamp |
| `resetPasswordToken` | String | ➖ | Password reset token |
| `resetPasswordExpire` | Date | ➖ | Token expiration date |

**Indexes**: `role`, `isActive`, `isVerified`, `email`, `customID`, `createdAt`, `updatedAt`

---

### 🎓 **Student Model** (`models/Student.js`)
**Extended profile for students**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user` | ObjectId | ✅ | Reference to User model |
| `admissionNumber` | String | ✅ | Unique admission number |
| `class` | String | ✅ | `Nursery`, `LKG`, `UKG`, `1`-`10` |
| `section` | String | ✅ | Class section (A, B, C, etc.) |
| `rollNumber` | Number | ✅ | Roll number in class |
| `dateOfBirth` | Date | ✅ | Student's birth date |
| `gender` | String | ✅ | `Male`, `Female`, `Other` |
| `bloodGroup` | String | ➖ | Blood group information |
| `fatherName` | String | ✅ | Father's full name |
| `motherName` | String | ✅ | Mother's full name |
| `parentContactNumber` | String | ✅ | Parent's phone number |
| `parentEmail` | String | ➖ | Parent's email address |
| `emergencyContactName` | String | ➖ | Emergency contact person |
| `emergencyContactNumber` | String | ➖ | Emergency phone number |
| `emergencyContactRelation` | String | ➖ | Relationship to student |
| `admissionDate` | Date | ➖ | Date of admission |
| `previousSchool` | String | ➖ | Previous school name |
| `academicYear` | String | ✅ | Current academic year |
| `medicalConditions` | String | ➖ | Health conditions |
| `isActive` | Boolean | ➖ | Enrollment status |

---

### 👨‍🏫 **Teacher Model** (`models/Teacher.js`)
**Extended profile for teachers**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user` | ObjectId | ✅ | Reference to User model |
| `employeeId` | String | ✅ | Unique employee ID |
| `designation` | String | ✅ | Job title/position |
| `subjectsSpecialization` | [String] | ✅ | Array of subjects |
| `classTeacherOf` | Object | ➖ | Class and section details |
| `qualification` | String | ✅ | Educational qualifications |
| `experience` | [Object] | ➖ | Work experience array |
| `dateOfJoining` | Date | ➖ | Joining date |
| `salary` | Number | ➖ | Monthly salary |
| `isActive` | Boolean | ➖ | Employment status |

---

### 📢 **Notice Model** (`models/Notice.js`)
**Notice board announcements**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Notice headline |
| `description` | String | ✅ | Full notice content |
| `date` | Date | ➖ | Publication date |
| `category` | String | ➖ | `general`, `academic`, `exam`, `event`, `holiday`, `admission`, `other` |
| `important` | Boolean | ➖ | Priority flag |
| `attachmentUrl` | String | ➖ | File attachment URL |
| `forClass` | [String] | ➖ | Target classes (`all` or specific) |
| `publishedBy` | ObjectId | ➖ | Reference to User |
| `expiresOn` | Date | ➖ | Expiration date |
| `isActive` | Boolean | ➖ | Visibility status |

---

### 🎉 **Event Model** (`models/Event.js`)
**School events and activities**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ | Event name |
| `description` | String | ✅ | Full event details |
| `shortDescription` | String | ➖ | Brief summary (max 200 chars) |
| `date` | Date | ✅ | Event start date |
| `endDate` | Date | ➖ | Event end date |
| `time` | String | ➖ | Event timing |
| `location` | String | ➖ | Venue information |
| `category` | String | ➖ | `cultural`, `sports`, `academic`, `celebration`, `competition`, `other` |
| `featured` | Boolean | ➖ | Featured event flag |
| `image` | String | ➖ | Main event image |
| `gallery` | [Object] | ➖ | Image gallery array |
| `forClass` | [String] | ➖ | Target classes |
| `organizer` | ObjectId | ➖ | Reference to User |
| `registrationRequired` | Boolean | ➖ | Registration needed |
| `registrationDeadline` | Date | ➖ | Registration cutoff |
| `maxParticipants` | Number | ➖ | Participant limit |
| `isActive` | Boolean | ➖ | Event status |

---

## 🛣️ API Endpoints

### 🔐 **Authentication Routes** (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/setup-superadmin` | Public | Initial superadmin setup |
| `POST` | `/register` | Admin/SuperAdmin | Register new users |
| `POST` | `/login` | Public | User authentication |
| `POST` | `/logout` | Public | User logout |
| `GET` | `/me` | Private | Get current user profile |
| `PUT` | `/profile` | Private | Update user profile |
| `POST` | `/forgot-password` | Public | Password reset request |
| `PUT` | `/reset-password/:token` | Public | Reset password with token |

---

### 👑 **Super Admin Routes** (`/api/superadmin`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/users` | SuperAdmin | Get all users |
| `GET` | `/users/:id` | SuperAdmin | Get user by ID |
| `GET` | `/unverified-users` | SuperAdmin | Get unverified users |
| `PUT` | `/verify/:id` | SuperAdmin | Verify user account |
| `PUT` | `/users/:id/status` | SuperAdmin | Update user status |
| `DELETE` | `/users/:id` | SuperAdmin | Delete user account |
| `GET` | `/analytics-data` | SuperAdmin | Get system analytics |
| `GET` | `/user-growth` | SuperAdmin | User growth statistics |
| `GET` | `/role-distribution` | SuperAdmin | User role distribution |
| `GET` | `/recent-activity` | SuperAdmin | Recent user activities |

---

### 🏫 **Admin Routes** (`/api/admin`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/students/batch` | Admin/SuperAdmin | Create student in batch |
| `POST` | `/teachers/batch` | Admin/SuperAdmin | Create teacher in batch |
| `GET` | `/dashboard-stats` | Admin | Admin dashboard statistics |
| `GET` | `/pending-approvals` | Admin | Get pending approvals |

---

### 🎓 **Student Routes** (`/api/students`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Admin/Teacher | Get all students |
| `GET` | `/:id` | Admin/Teacher/Self | Get student by ID |
| `PUT` | `/:id` | Admin/Teacher | Update student info |
| `DELETE` | `/:id` | Admin | Delete student |
| `GET` | `/class/:class` | Teacher | Get students by class |
| `GET` | `/:id/grades` | Admin/Teacher/Self | Get student grades |
| `POST` | `/:id/grades` | Teacher | Add student grades |

---

### 👨‍🏫 **Teacher Routes** (`/api/teachers`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Admin | Get all teachers |
| `GET` | `/:id` | Admin/Self | Get teacher by ID |
| `PUT` | `/:id` | Admin/Self | Update teacher info |
| `DELETE` | `/:id` | Admin | Delete teacher |
| `GET` | `/:id/classes` | Admin/Self | Get teacher's classes |
| `GET` | `/:id/schedule` | Admin/Self | Get teaching schedule |

---

### 📢 **Notice Routes** (`/api/notices`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all active notices |
| `GET` | `/:id` | Public | Get notice by ID |
| `POST` | `/` | Admin/Teacher | Create new notice |
| `PUT` | `/:id` | Admin/Creator | Update notice |
| `DELETE` | `/:id` | Admin/Creator | Delete notice |
| `GET` | `/important` | Public | Get important notices |
| `GET` | `/category/:category` | Public | Get notices by category |

---

### 🎉 **Event Routes** (`/api/events`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all active events |
| `GET` | `/:id` | Public | Get event by ID |
| `POST` | `/` | Admin/Teacher | Create new event |
| `PUT` | `/:id` | Admin/Creator | Update event |
| `DELETE` | `/:id` | Admin/Creator | Delete event |
| `GET` | `/featured` | Public | Get featured events |
| `GET` | `/upcoming` | Public | Get upcoming events |
| `POST` | `/:id/register` | Student | Register for event |

---

### 🖼️ **Gallery Routes** (`/api/gallery`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get gallery images |
| `POST` | `/` | Admin | Upload new images |
| `PUT` | `/:id` | Admin | Update image details |
| `DELETE` | `/:id` | Admin | Delete image |
| `GET` | `/events/:eventId` | Public | Get event gallery |

---

## 🔐 Authentication & Authorization

### **JWT Token Structure**
```javascript
{
  userId: "user_object_id",
  role: "student|teacher|admin|superadmin",
  customID: "generated_custom_id",
  iat: timestamp,
  exp: timestamp
}
```

### **Role Hierarchy & Permissions**

| Role | Permissions | Access Level |
|------|-------------|--------------|
| **SuperAdmin** | 🌟 Full system access | Create/Read/Update/Delete all resources |
| **Admin** | 🏫 School management | Manage students, teachers, notices, events |
| **Teacher** | 👨‍🏫 Class management | View students, create notices, manage grades |
| **Student** | 🎓 Personal access | View profile, notices, events, grades |

### **Protected Route Middleware**
```javascript
// Authentication required
protect: Verifies JWT token

// Role-based authorization
authorizeRoles('admin', 'superadmin'): Restricts access by role
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18+)
- MongoDB
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd BackendMNS

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

### **Production Build**
```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mansarovar_school

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Client URL
CLIENT_URL=http://localhost:5173

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./public/uploads

# Security
COOKIE_EXPIRE=30
```

---

## 📊 Analytics Features

The backend includes comprehensive analytics:

- 📈 **User Growth Tracking**: Monthly registration and verification trends
- 👥 **Role Distribution**: Pie chart of user roles
- 📊 **Recent Activity**: Latest registrations and verifications
- 🎯 **Custom Analytics**: Configurable time periods and filters

---

## 🛡️ Security Features

- 🔐 **Password Hashing**: bcrypt with salt rounds
- 🎫 **JWT Authentication**: Secure token-based auth
- 🔒 **Role-Based Access**: Hierarchical permission system
- 🛡️ **Input Validation**: Mongoose schema validation
- 🚫 **CORS Protection**: Configured cross-origin policies
- 🔍 **SQL Injection Prevention**: NoSQL query protection

---

**Built with ❤️ for Mansarovar Public School**

*Last Updated: August 8, 2025*
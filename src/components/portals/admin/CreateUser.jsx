import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Users, 
  GraduationCap, 
  Save,
  UserPlus,
  AlertCircle
} from 'lucide-react';

const CreateUser = () => {
  const [userType, setUserType] = useState('student');
  const [users, setUsers] = useState([{
    id: 1,
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    // Student specific fields
    studentClass: '',
    section: '',
    rollNumber: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    // Teacher specific fields
    subject: '',
    qualification: '',
    experience: '',
    employeeId: ''
  }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: '',
      email: '',
      password: '',
      contactNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      },
      // Student specific fields
      studentClass: '',
      section: '',
      rollNumber: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      // Teacher specific fields
      subject: '',
      qualification: '',
      experience: '',
      employeeId: ''
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (id) => {
    if (users.length > 1) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const updateUser = (id, field, value) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...user,
            [parent]: {
              ...user[parent],
              [child]: value
            }
          };
        }
        return { ...user, [field]: value };
      }
      return user;
    }));

    // Clear error when user starts typing
    if (errors[`${id}.${field}`]) {
      setErrors({
        ...errors,
        [`${id}.${field}`]: ''
      });
    }
  };

  const validateUsers = () => {
    const newErrors = {};
    
    users.forEach(user => {
      // Common validations
      if (!user.name.trim()) {
        newErrors[`${user.id}.name`] = 'Name is required';
      }
      if (!user.email.trim()) {
        newErrors[`${user.id}.email`] = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        newErrors[`${user.id}.email`] = 'Email is invalid';
      }
      if (!user.password) {
        newErrors[`${user.id}.password`] = 'Password is required';
      } else if (user.password.length < 6) {
        newErrors[`${user.id}.password`] = 'Password must be at least 6 characters';
      }

      // Student specific validations
      if (userType === 'student') {
        if (!user.studentClass) {
          newErrors[`${user.id}.studentClass`] = 'Class is required';
        }
        if (!user.section) {
          newErrors[`${user.id}.section`] = 'Section is required';
        }
        if (!user.rollNumber) {
          newErrors[`${user.id}.rollNumber`] = 'Roll number is required';
        }
        if (!user.parentName.trim()) {
          newErrors[`${user.id}.parentName`] = 'Parent name is required';
        }
      }

      // Teacher specific validations
      if (userType === 'teacher') {
        if (!user.subject) {
          newErrors[`${user.id}.subject`] = 'Subject is required';
        }
        if (!user.qualification.trim()) {
          newErrors[`${user.id}.qualification`] = 'Qualification is required';
        }
        if (!user.employeeId.trim()) {
          newErrors[`${user.id}.employeeId`] = 'Employee ID is required';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateUsers()) {
      return;
    }

    setLoading(true);
    
    try {
      // API call to create multiple users
      const usersToCreate = users.map(user => ({
        name: user.name,
        email: user.email,
        password: user.password,
        role: userType,
        contactNumber: user.contactNumber,
        address: user.address,
        ...(userType === 'student' && {
          studentClass: user.studentClass,
          section: user.section,
          rollNumber: user.rollNumber,
          parentName: user.parentName,
          parentEmail: user.parentEmail,
          parentPhone: user.parentPhone
        }),
        ...(userType === 'teacher' && {
          subject: user.subject,
          qualification: user.qualification,
          experience: user.experience,
          employeeId: user.employeeId
        })
      }));

      console.log('Creating users:', usersToCreate);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setUsers([{
        id: 1,
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        address: { street: '', city: '', state: '', zipCode: '' },
        studentClass: '', section: '', rollNumber: '', parentName: '', parentEmail: '', parentPhone: '',
        subject: '', qualification: '', experience: '', employeeId: ''
      }]);
      
      alert(`${users.length} ${userType}(s) created successfully!`);
    } catch (error) {
      console.error('Error creating users:', error);
      alert('Error creating users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCommonFields = (user) => (
    <>
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateUser(user.id, 'name', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.name`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter full name"
          />
          {errors[`${user.id}.name`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.name`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateUser(user.id, 'email', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.email`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter email address"
          />
          {errors[`${user.id}.email`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.email`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password *</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => updateUser(user.id, 'password', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.password`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter password"
          />
          {errors[`${user.id}.password`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.password`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            value={user.contactNumber}
            onChange={(e) => updateUser(user.id, 'contactNumber', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter contact number"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={user.address.street}
              onChange={(e) => updateUser(user.id, 'address.street', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Street Address"
            />
          </div>
          <div>
            <input
              type="text"
              value={user.address.city}
              onChange={(e) => updateUser(user.id, 'address.city', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="City"
            />
          </div>
          <div>
            <input
              type="text"
              value={user.address.state}
              onChange={(e) => updateUser(user.id, 'address.state', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="State"
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentFields = (user) => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Student Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Class *</label>
          <select
            value={user.studentClass}
            onChange={(e) => updateUser(user.id, 'studentClass', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.studentClass`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Class</option>
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i + 6} value={i + 6}>Class {i + 6}</option>
            ))}
          </select>
          {errors[`${user.id}.studentClass`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.studentClass`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Section *</label>
          <select
            value={user.section}
            onChange={(e) => updateUser(user.id, 'section', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.section`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Section</option>
            {['A', 'B', 'C', 'D'].map(section => (
              <option key={section} value={section}>Section {section}</option>
            ))}
          </select>
          {errors[`${user.id}.section`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.section`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Roll Number *</label>
          <input
            type="text"
            value={user.rollNumber}
            onChange={(e) => updateUser(user.id, 'rollNumber', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.rollNumber`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter roll number"
          />
          {errors[`${user.id}.rollNumber`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.rollNumber`]}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700">Parent/Guardian Information</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Name *</label>
            <input
              type="text"
              value={user.parentName}
              onChange={(e) => updateUser(user.id, 'parentName', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors[`${user.id}.parentName`] ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter parent name"
            />
            {errors[`${user.id}.parentName`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.parentName`]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Email</label>
            <input
              type="email"
              value={user.parentEmail}
              onChange={(e) => updateUser(user.id, 'parentEmail', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter parent email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
            <input
              type="tel"
              value={user.parentPhone}
              onChange={(e) => updateUser(user.id, 'parentPhone', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter parent phone"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherFields = (user) => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Teacher Information</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject *</label>
          <select
            value={user.subject}
            onChange={(e) => updateUser(user.id, 'subject', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.subject`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
          {errors[`${user.id}.subject`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.subject`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employee ID *</label>
          <input
            type="text"
            value={user.employeeId}
            onChange={(e) => updateUser(user.id, 'employeeId', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.employeeId`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter employee ID"
          />
          {errors[`${user.id}.employeeId`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.employeeId`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Qualification *</label>
          <input
            type="text"
            value={user.qualification}
            onChange={(e) => updateUser(user.id, 'qualification', e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors[`${user.id}.qualification`] ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter qualification (e.g., B.Ed, M.A.)"
          />
          {errors[`${user.id}.qualification`] && <p className="mt-1 text-sm text-red-600">{errors[`${user.id}.qualification`]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience (years)</label>
          <input
            type="number"
            value={user.experience}
            onChange={(e) => updateUser(user.id, 'experience', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter years of experience"
            min="0"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Users</h2>
          <p className="mt-2 text-sm text-gray-700">
            Add new {userType}s to the system. You can create multiple users at once.
          </p>
        </div>
      </div>

      {/* User Type Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select User Type</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setUserType('student')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              userType === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Student
          </button>
          <button
            onClick={() => setUserType('teacher')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              userType === 'teacher'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Teacher
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Users List */}
        {users.map((user, index) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} #{index + 1}
              </h3>
              {users.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUser(user.id)}
                  className="flex items-center px-2 py-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-6">
              {renderCommonFields(user)}
              {userType === 'student' && renderStudentFields(user)}
              {userType === 'teacher' && renderTeacherFields(user)}
            </div>
          </div>
        ))}

        {/* Add User Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addUser}
            className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              setUsers([{
                id: 1,
                name: '', email: '', password: '', contactNumber: '',
                address: { street: '', city: '', state: '', zipCode: '' },
                studentClass: '', section: '', rollNumber: '', parentName: '', parentEmail: '', parentPhone: '',
                subject: '', qualification: '', experience: '', employeeId: ''
              }]);
              setErrors({});
            }}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create {users.length} {userType}{users.length > 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Information</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>All users will be created as unverified and need superadmin approval.</li>
                <li>Temporary passwords should be shared securely with the users.</li>
                <li>Users will receive their unique ID after account creation.</li>
                <li>Required fields are marked with an asterisk (*).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

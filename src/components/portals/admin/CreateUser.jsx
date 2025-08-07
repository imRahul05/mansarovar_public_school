import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Users, 
  GraduationCap, 
  Save,
  UserPlus,
  Star,
  AlertCircle
} from 'lucide-react';
import { studentFields, studentFieldValidations, studentFormSections } from '../../../data/studentFields.js';
import { teacherFields, teacherFieldValidations, teacherFormSections } from '../../../data/teacherFields.js';
import { adminAPI } from '../../../services/api.js';

const CreateUser = () => {
  const [userType, setUserType] = useState('student');
  const [users, setUsers] = useState([{ 
    id: 1, 
    ...studentFields
  }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Get current field template based on user type
  const getFieldTemplate = () => {
    return userType === 'student' ? studentFields : teacherFields;
  };

  // Get current validations based on user type
  const getValidations = () => {
    return userType === 'student' ? studentFieldValidations : teacherFieldValidations;
  };

  // Get current form sections based on user type
  const getFormSections = () => {
    return userType === 'student' ? studentFormSections : teacherFormSections;
  };

  // Reset users when type changes
  const handleUserTypeChange = (type) => {
    setUserType(type);
    const template = type === 'student' ? studentFields : teacherFields;
    setUsers([{ id: 1, ...template }]);
    setErrors({});
  };

  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      ...getFieldTemplate()
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
          const fieldParts = field.split('.');
          let updatedUser = { ...user };
          let current = updatedUser;
          
          // Navigate to the nested object
          for (let i = 0; i < fieldParts.length - 1; i++) {
            current[fieldParts[i]] = { ...current[fieldParts[i]] };
            current = current[fieldParts[i]];
          }
          
          // Set the final value
          current[fieldParts[fieldParts.length - 1]] = value;
          return updatedUser;
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
    const validations = getValidations();
    
    users.forEach(user => {
      // Check required fields
      validations.required.forEach(field => {
        const value = getNestedValue(user, field);
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[`${user.id}.${field}`] = `${formatFieldName(field)} is required`;
        }
      });

      // Email validation
      if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
        newErrors[`${user.id}.email`] = 'Email is invalid';
      }

      // Password validation
      if (user.password && user.password.length < 6) {
        newErrors[`${user.id}.password`] = 'Password must be at least 6 characters';
      }

      // Parent email validation (for students)
      if (userType === 'student' && user.parentEmail && !/\S+@\S+\.\S+/.test(user.parentEmail)) {
        newErrors[`${user.id}.parentEmail`] = 'Parent email is invalid';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to get nested value
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // Helper function to format field names for display
  const formatFieldName = (field) => {
    return field.split('.').pop().replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateUsers()) {
      return;
    }

    setLoading(true);
    
    try {
      const usersToCreate = users.map(user => {
        // Remove the id field as it's only for frontend tracking
        const { id, ...userData } = user;
        
        // For students, ensure the class field is properly named
        if (userType === 'student') {
          return {
            ...userData,
            class: userData.class // Ensure class field is properly set
          };
        }
        
        return userData;
      });

      let response;
      if (userType === 'student') {
        if (users.length === 1) {
          response = await adminAPI.createStudent(usersToCreate[0]);
        } else {
          response = await adminAPI.createMultipleStudents(usersToCreate);
        }
      } else {
        if (users.length === 1) {
          response = await adminAPI.createTeacher(usersToCreate[0]);
        } else {
          response = await adminAPI.createMultipleTeachers(usersToCreate);
        }
      }
      
      // Reset form
      setUsers([{ id: 1, ...getFieldTemplate() }]);
      setErrors({});
      
      // Show success message
      const successMessage = Array.isArray(response) 
        ? `${response.length} ${userType}(s) created successfully!`
        : `${userType.charAt(0).toUpperCase() + userType.slice(1)} created successfully!`;
      
      alert(successMessage);
      
    } catch (error) {
      console.error('Error creating users:', error);
      const errorMessage = error.message || 'Error creating users. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic field renderer
  const renderField = (user, field, fieldConfig = {}) => {
    const validations = getValidations();
    const fieldValue = getNestedValue(user, field);
    const isRequired = validations.required.includes(field);
    const hasError = errors[`${user.id}.${field}`];
    const options = validations.options[field] || validations.options[field.split('.').pop()];

    const fieldProps = {
      value: fieldValue || '',
      onChange: (e) => updateUser(user.id, field, e.target.value),
      className: `mt-1 block w-full px-3 py-2 border ${
        hasError ? 'border-red-300' : 'border-gray-300'
      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`,
      placeholder: fieldConfig.placeholder || `Enter ${formatFieldName(field).toLowerCase()}`
    };

    let fieldElement;

    // Handle special field types
    if (field === 'subjectsSpecialization') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects Specialization {isRequired && '*'}
          </label>
          <select
            multiple
            {...fieldProps}
            value={fieldValue || []}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              updateUser(user.id, field, selectedOptions);
            }}
            className={`${fieldProps.className} h-24`}
          >
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
          {hasError && <p className="mt-1 text-sm text-red-600">{hasError}</p>}
        </div>
      );
    }

    if (options) {
      // Dropdown field
      fieldElement = (
        <select {...fieldProps}>
          <option value="">Select {formatFieldName(field)}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    } else if (field.includes('date') || field === 'dateOfBirth' || field === 'dateOfJoining' || field === 'admissionDate') {
      // Date field
      const today = new Date().toISOString().split('T')[0];
      fieldElement = (
        <input
          type="date"
          {...fieldProps}
          max={field === 'dateOfBirth' ? today : undefined}
        />
      );
    } else if (field === 'password') {
      // Password field
      fieldElement = (
        <input
          type="password"
          {...fieldProps}
        />
      );
    } else if (field === 'email' || field === 'parentEmail') {
      // Email field
      fieldElement = (
        <input
          type="email"
          {...fieldProps}
        />
      );
    } else if (field.includes('Number') || field.includes('years') || field === 'rollNumber') {
      // Number field
      fieldElement = (
        <input
          type="number"
          {...fieldProps}
          min="0"
        />
      );
    } else if (field.includes('details') || field === 'medicalConditions') {
      // Textarea field
      fieldElement = (
        <textarea
          {...fieldProps}
          rows="3"
          className={fieldProps.className.replace('block w-full', 'block w-full resize-none')}
        />
      );
    } else {
      // Text field
      fieldElement = (
        <input
          type="text"
          {...fieldProps}
        />
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formatFieldName(field)} {isRequired && <span className='text-red-600'>*</span>}
        </label>
        {fieldElement}
        {hasError && <p className="mt-1 text-sm text-red-600">{hasError}</p>}
      </div>
    );
  };

  // Render form sections dynamically
  const renderFormSections = (user) => {
    const sections = getFormSections();
    
    return sections.map((section, index) => (
      <div key={index} className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
          {section.title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {section.fields.map(field => (
            <div key={field} className={
              field.includes('address.street') || field.includes('details') || field === 'medicalConditions'
                ? 'md:col-span-2' 
                : ''
            }>
              {renderField(user, field)}
            </div>
          ))}
        </div>
      </div>
    ));
  };

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
            onClick={() => handleUserTypeChange('student')}
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
            onClick={() => handleUserTypeChange('teacher')}
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
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} #{index + 1}
              </h3>
              {users.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUser(user.id)}
                  className="flex items-center px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-6">
              {renderFormSections(user)}
            </div>
          </div>
        ))}

        {/* Add User Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addUser}
            className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              setUsers([{ id: 1, ...getFieldTemplate() }]);
              setErrors({});
            }}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                <li>All {userType}s will be created according to the backend API structure.</li>
                <li>Required fields are marked with an asterisk (*).</li>
                <li>For students: Academic year and admission details are required.</li>
                <li>For teachers: Employee ID and subject specialization are required.</li>
                <li>Passwords should be shared securely with the users after creation.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

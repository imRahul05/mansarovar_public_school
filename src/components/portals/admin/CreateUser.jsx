import { useState, useEffect } from 'react';
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

  // Handle user type change - reinitialize users with correct template
  useEffect(() => {
    const template = userType === 'student' ? studentFields : teacherFields;
    setUsers([{
      id: 1,
      ...template,
      // Ensure experience array is properly initialized for teachers
      ...(userType === 'teacher' && {
        experience: template.experience?.length ? template.experience : [{
          position: '',
          organization: '',
          fromDate: '',
          toDate: '',
          isCurrent: false,
          description: ''
        }]
      })
    }]);
    setErrors({}); // Clear any existing errors
  }, [userType]);

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
    const template = getFieldTemplate();
    const newUser = {
      id: users.length + 1,
      ...template,
      // Ensure experience array is properly initialized for teachers
      ...(userType === 'teacher' && {
        experience: template.experience?.length ? template.experience : [{
          position: '',
          organization: '',
          fromDate: '',
          toDate: '',
          isCurrent: false,
          description: ''
        }]
      })
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

  // Render experience section dynamically
  const renderExperienceSection = (user) => {
    const experiences = user.experience || [];

    const addExperience = () => {
      const newExperience = {
        position: '',
        organization: '',
        fromDate: '',
        toDate: '',
        isCurrent: false,
        description: ''
      };
      updateUser(user.id, 'experience', [...experiences, newExperience]);
    };

    const removeExperience = (index) => {
      if (experiences.length > 1) {
        const updatedExperiences = experiences.filter((_, i) => i !== index);
        updateUser(user.id, 'experience', updatedExperiences);
      }
    };

    const updateExperience = (index, field, value) => {
      const updatedExperiences = experiences.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      );
      updateUser(user.id, 'experience', updatedExperiences);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
            <span className="text-sm font-medium text-gray-800">Work Experience</span> */}
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors border border-indigo-300"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Experience
          </button>
        </div>

        {experiences.map((experience, index) => (
          <div key={index} className="border border-indigo-200 rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-sm font-medium text-indigo-800 flex items-center">
                <div className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></div>
                Experience #{index + 1}
              </h5>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-100 rounded border border-red-200"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Position/Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={experience.position || ''}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Mathematics Teacher"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Organization <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={experience.organization || ''}
                  onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., ABC School"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  From Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={experience.fromDate || ''}
                  onChange={(e) => updateExperience(index, 'fromDate', e.target.value)}
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={experience.toDate || ''}
                  onChange={(e) => updateExperience(index, 'toDate', e.target.value)}
                  disabled={experience.isCurrent}
                  className={`block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                    experience.isCurrent ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center text-xs font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={experience.isCurrent || false}
                    onChange={(e) => {
                      updateExperience(index, 'isCurrent', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(index, 'toDate', '');
                      }
                    }}
                    className="mr-2 h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  Currently working here
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={experience.description || ''}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows="2"
                  className="block w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  placeholder="Brief description of responsibilities and achievements..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render form sections dynamically
  const renderFormSections = (user) => {
    const sections = getFormSections();
    
    // Array of background colors for different sections
    const sectionColors = [
      'bg-blue-50 border-blue-200',     // Personal Information
      'bg-green-50 border-green-200',   // Academic/Professional Details
      'bg-purple-50 border-purple-200', // Contact Information
      'bg-orange-50 border-orange-200', // Additional Details
      'bg-indigo-50 border-indigo-200', // Experience/Medical
      'bg-pink-50 border-pink-200',     // Emergency/Guardian
      'bg-yellow-50 border-yellow-200', // Other sections
    ];
    
    return sections.map((section, index) => {
      const colorClass = sectionColors[index % sectionColors.length];
      
      return (
        <div key={index} className={`p-4 rounded-lg border ${colorClass} space-y-4`}>
          <h4 className="text-sm font-medium text-gray-800 border-b border-gray-300 pb-2 flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              index % sectionColors.length === 0 ? 'bg-blue-400' :
              index % sectionColors.length === 1 ? 'bg-green-400' :
              index % sectionColors.length === 2 ? 'bg-purple-400' :
              index % sectionColors.length === 3 ? 'bg-orange-400' :
              index % sectionColors.length === 4 ? 'bg-indigo-400' :
              index % sectionColors.length === 5 ? 'bg-pink-400' :
              'bg-yellow-400'
            }`}></div>
            {section.title}
          </h4>
          
          {/* Special handling for experience section */}
          {section.isExperience ? (
            renderExperienceSection(user)
          ) : (
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
          )}
        </div>
      );
    });
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
                <li>Required fields are marked with an asterisk (<span className='text-red-700 text-lg'>*</span>).</li>
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

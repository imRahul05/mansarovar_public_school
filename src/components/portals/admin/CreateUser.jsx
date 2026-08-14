import { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Users, 
  GraduationCap, 
  Save, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  User,
  MapPin,
  Briefcase,
  Heart,
  ShieldAlert,
  BookOpen,
  Building2,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { studentFields, studentFieldValidations, studentFormSections } from '../../../data/studentFields.js';
import { teacherFields, teacherFieldValidations, teacherFormSections } from '../../../data/teacherFields.js';
import { adminAPI } from '../../../services/api.js';
import { generateSecurePassword, calculatePasswordStrength } from '../../../lib/cryptoPassword.js';

const CreateUser = () => {
  const [userType, setUserType] = useState('student');
  const [users, setUsers] = useState([{ 
    id: 1, 
    ...studentFields
  }]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Track password visibility & copy state per user
  const [showPasswords, setShowPasswords] = useState({});
  const [copiedPasswordId, setCopiedPasswordId] = useState(null);

  // Track expanded user cards (array of user IDs)
  const [expandedUsers, setExpandedUsers] = useState([1]);
  
  // Track open sections per user: { [userId]: [sectionIndex, ...] }
  const [openSections, setOpenSections] = useState({ 1: [0] });

  const sectionRefs = useRef({});

  // Helper function to get current field template based on user type
  const getFieldTemplate = () => {
    return userType === 'student' ? studentFields : teacherFields;
  };

  // Helper function to get current validations based on user type
  const getValidations = () => {
    return userType === 'student' ? studentFieldValidations : teacherFieldValidations;
  };

  // Helper function to get current form sections based on user type
  const getFormSections = () => {
    return userType === 'student' ? studentFormSections : teacherFormSections;
  };

  // Handle user type change - reinitialize users with correct template
  useEffect(() => {
    const template = userType === 'student' ? studentFields : teacherFields;
    setUsers([{
      id: 1,
      ...template,
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
    setExpandedUsers([1]);
    setOpenSections({ 1: [0] });
    setErrors({});
  }, [userType]);

  const handleUserTypeChange = (type) => {
    if (type === userType) return;
    setUserType(type);
  };

  // Add a new user card and collapse previous ones
  const addUser = () => {
    const template = getFieldTemplate();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      ...template,
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
    
    setUsers(prev => [...prev, newUser]);
    // Expand only the new user, collapsing previous ones to keep UI compact and friendly
    setExpandedUsers([newId]);
    // Open the first section of the new user
    setOpenSections(prev => ({ ...prev, [newId]: [0] }));
  };

  const removeUser = (id) => {
    if (users.length > 1) {
      setUsers(prev => prev.filter(user => user.id !== id));
      setExpandedUsers(prev => prev.filter(userId => userId !== id));
      setOpenSections(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const toggleUserExpanded = (id) => {
    setExpandedUsers(prev => 
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  const expandAllUsers = () => {
    setExpandedUsers(users.map(u => u.id));
    const allSections = {};
    const sections = getFormSections();
    users.forEach(u => {
      allSections[u.id] = sections.map((_, i) => i);
    });
    setOpenSections(allSections);
  };

  const collapseAllUsers = () => {
    setExpandedUsers([]);
  };

  const toggleSection = (userId, sectionIndex) => {
    setOpenSections(prev => {
      const userSections = prev[userId] || [];
      const isAlreadyOpen = userSections.includes(sectionIndex);
      return {
        ...prev,
        [userId]: isAlreadyOpen 
          ? userSections.filter(idx => idx !== sectionIndex)
          : [...userSections, sectionIndex]
      };
    });
  };

  // Move to next section: collapses current and expands next
  const goToNextSection = (userId, currentSectionIndex) => {
    const sections = getFormSections();
    if (currentSectionIndex < sections.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      setOpenSections(prev => ({
        ...prev,
        [userId]: [nextIndex]
      }));
      // Scroll to the next section gently
      setTimeout(() => {
        const el = sectionRefs.current[`${userId}-${nextIndex}`];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  // Move to previous section
  const goToPrevSection = (userId, currentSectionIndex) => {
    if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      setOpenSections(prev => ({
        ...prev,
        [userId]: [prevIndex]
      }));
      setTimeout(() => {
        const el = sectionRefs.current[`${userId}-${prevIndex}`];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  const updateUser = (id, field, value) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        if (field.includes('.')) {
          const fieldParts = field.split('.');
          let updatedUser = { ...user };
          let current = updatedUser;
          
          for (let i = 0; i < fieldParts.length - 1; i++) {
            current[fieldParts[i]] = { ...current[fieldParts[i]] };
            current = current[fieldParts[i]];
          }
          
          current[fieldParts[fieldParts.length - 1]] = value;
          return updatedUser;
        }
        return { ...user, [field]: value };
      }
      return user;
    }));

    if (errors[`${id}.${field}`]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[`${id}.${field}`];
        return updated;
      });
    }
  };

  // Toggle password visibility for a specific user card
  const toggleShowPassword = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Generate a cryptographically secure, unguessable random password
  const handleGeneratePassword = (userId) => {
    // Generates a 14-char CSPRNG non-deterministic password with uppercase, lowercase, numbers, and symbols
    const newPassword = generateSecurePassword({ length: 14 });
    updateUser(userId, 'password', newPassword);
    
    // Automatically make password visible so the admin can view and note it
    setShowPasswords(prev => ({
      ...prev,
      [userId]: true
    }));

    // Clear password error if present
    if (errors[`${userId}.password`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`${userId}.password`];
        return next;
      });
    }
  };

  // Copy password to clipboard with visual feedback
  const handleCopyPassword = async (userId, password) => {
    if (!password) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = password;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedPasswordId(userId);
      setTimeout(() => {
        setCopiedPasswordId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  // Helper function to get nested value
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  // Helper function to format field names for display
  const formatFieldName = (field) => {
    return field.split('.').pop().replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const validateUsers = () => {
    const newErrors = {};
    const validations = getValidations();
    const sections = getFormSections();
    
    const usersWithErrors = new Set();
    const sectionsToOpen = {};

    users.forEach(user => {
      // Check required fields
      validations.required.forEach(field => {
        const value = getNestedValue(user, field);
        if (value === undefined || value === null || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
          newErrors[`${user.id}.${field}`] = `${formatFieldName(field)} is required`;
          usersWithErrors.add(user.id);
        }
      });

      // Email validation
      if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
        newErrors[`${user.id}.email`] = 'Email is invalid';
        usersWithErrors.add(user.id);
      }

      // Password validation
      if (user.password && user.password.length < 6) {
        newErrors[`${user.id}.password`] = 'Password must be at least 6 characters';
        usersWithErrors.add(user.id);
      }

      // Parent email validation (for students)
      if (userType === 'student' && user.parentEmail && !/\S+@\S+\.\S+/.test(user.parentEmail)) {
        newErrors[`${user.id}.parentEmail`] = 'Parent email is invalid';
        usersWithErrors.add(user.id);
      }

      // Find which sections contain errors to auto-expand them
      sections.forEach((sec, idx) => {
        const hasErrorInSec = (sec.fields || []).some(f => newErrors[`${user.id}.${f}`]);
        if (hasErrorInSec) {
          if (!sectionsToOpen[user.id]) sectionsToOpen[user.id] = [];
          sectionsToOpen[user.id].push(idx);
        }
      });
    });

    setErrors(newErrors);

    // If there are errors, automatically expand the user cards and their problematic sections
    if (Object.keys(newErrors).length > 0) {
      setExpandedUsers(prev => Array.from(new Set([...prev, ...Array.from(usersWithErrors)])));
      setOpenSections(prev => {
        const next = { ...prev };
        Object.keys(sectionsToOpen).forEach(uid => {
          next[uid] = Array.from(new Set([...(next[uid] || []), ...sectionsToOpen[uid]]));
        });
        return next;
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateUsers()) {
      return;
    }

    setLoading(true);
    
    try {
      const usersToCreate = users.map(user => {
        const { id: _id, ...userData } = user;
        if (userType === 'student') {
          return {
            ...userData,
            class: userData.class
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
      setExpandedUsers([1]);
      setOpenSections({ 1: [0] });
      setErrors({});
      
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

  // Helper to check section completion and summary
  const getSectionStatus = (user, section) => {
    const validations = getValidations();
    const requiredFields = (section.fields || []).filter(f => validations.required.includes(f));
    
    // Check for errors in this section
    const errorCount = (section.fields || []).filter(f => errors[`${user.id}.${f}`]).length;
    
    // Check if required fields are satisfied
    let isComplete = false;
    if (requiredFields.length > 0) {
      isComplete = requiredFields.every(f => {
        const val = getNestedValue(user, f);
        return val !== undefined && val !== null && (typeof val === 'string' ? val.trim() !== '' : true) && (!Array.isArray(val) || val.length > 0);
      });
    } else {
      // If optional section, complete if at least one field is filled
      if (section.isExperience) {
        isComplete = (user.experience || []).some(exp => exp.position || exp.organization);
      } else {
        isComplete = (section.fields || []).some(f => {
          const val = getNestedValue(user, f);
          return val !== undefined && val !== null && (typeof val === 'string' ? val.trim() !== '' : true);
        });
      }
    }

    return { errorCount, isComplete, hasRequired: requiredFields.length > 0 };
  };

  // Generate a friendly preview summary for a collapsed section
  const getSectionSummaryText = (user, section) => {
    if (section.title === 'Basic Information') {
      const parts = [user.name, user.email, user.contactNumber].filter(Boolean);
      return parts.length ? parts.join(' • ') : 'No basic information added yet';
    }
    if (section.title === 'Address') {
      const addr = user.address || {};
      const parts = [addr.street, addr.city, addr.state, addr.zipCode].filter(Boolean);
      return parts.length ? parts.join(', ') : 'No address entered';
    }
    if (section.title === 'Academic Information') {
      const parts = [];
      if (user.admissionNumber) parts.push(`Adm #${user.admissionNumber}`);
      if (user.class) parts.push(`Class ${user.class}${user.section ? `-${user.section}` : ''}`);
      if (user.rollNumber) parts.push(`Roll #${user.rollNumber}`);
      if (user.academicYear) parts.push(`Year: ${user.academicYear}`);
      return parts.length ? parts.join(' • ') : 'No academic details entered';
    }
    if (section.title === 'Professional Information') {
      const parts = [];
      if (user.employeeId) parts.push(`Emp ID: ${user.employeeId}`);
      if (user.designation) parts.push(user.designation);
      if (Array.isArray(user.subjectsSpecialization) && user.subjectsSpecialization.length) {
        parts.push(user.subjectsSpecialization.slice(0, 2).join(', '));
      }
      return parts.length ? parts.join(' • ') : 'No professional details entered';
    }
    if (section.title.includes('Assign Teacher')) {
      const ct = user.classTeacherOf || {};
      if (ct.class) return `Class Teacher for Class ${ct.class}${ct.section ? `-${ct.section}` : ''}`;
      return 'Not assigned to a class (Optional)';
    }
    if (section.title === 'Work Experience') {
      const exps = user.experience || [];
      const valid = exps.filter(e => e.position || e.organization);
      return valid.length > 0 ? `${valid.length} experience record(s) added` : 'No previous experience added';
    }
    if (section.title === 'Personal Information') {
      const parts = [];
      if (user.gender) parts.push(user.gender);
      if (user.dateOfBirth) parts.push(`DOB: ${user.dateOfBirth}`);
      if (user.bloodGroup) parts.push(`Blood: ${user.bloodGroup}`);
      return parts.length ? parts.join(' • ') : 'No personal info entered';
    }
    if (section.title.includes('Parent')) {
      const parts = [];
      if (user.fatherName) parts.push(`Father: ${user.fatherName}`);
      if (user.motherName) parts.push(`Mother: ${user.motherName}`);
      if (user.parentContactNumber) parts.push(`Tel: ${user.parentContactNumber}`);
      return parts.length ? parts.join(' • ') : 'No parent/guardian info entered';
    }
    if (section.title === 'Emergency Contact') {
      const parts = [];
      if (user.emergencyContactName) parts.push(user.emergencyContactName);
      if (user.emergencyContactRelation) parts.push(`(${user.emergencyContactRelation})`);
      if (user.emergencyContactNumber) parts.push(user.emergencyContactNumber);
      return parts.length ? parts.join(' ') : 'No emergency contact entered';
    }
    return '';
  };

  // Section icon mapping
  const getSectionIcon = (title) => {
    if (title === 'Basic Information') return <User className="h-4 w-4 text-blue-600" />;
    if (title === 'Address') return <MapPin className="h-4 w-4 text-emerald-600" />;
    if (title === 'Academic Information') return <GraduationCap className="h-4 w-4 text-indigo-600" />;
    if (title === 'Professional Information') return <Briefcase className="h-4 w-4 text-indigo-600" />;
    if (title.includes('Assign Teacher')) return <BookOpen className="h-4 w-4 text-amber-600" />;
    if (title === 'Work Experience') return <Building2 className="h-4 w-4 text-purple-600" />;
    if (title === 'Personal Information') return <Heart className="h-4 w-4 text-rose-600" />;
    if (title.includes('Parent')) return <Users className="h-4 w-4 text-cyan-600" />;
    if (title === 'Emergency Contact') return <ShieldAlert className="h-4 w-4 text-orange-600" />;
    return <User className="h-4 w-4 text-gray-600" />;
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
      className: `mt-1 block w-full px-3 py-2 text-sm border ${
        hasError ? 'border-red-400 ring-1 ring-red-300 bg-red-50/20' : 'border-gray-300 bg-white'
      } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`,
      placeholder: fieldConfig.placeholder || `Enter ${formatFieldName(field).toLowerCase()}`
    };

    let fieldElement;

    if (field === 'subjectsSpecialization') {
      return (
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            Subjects Specialization {isRequired && <span className="text-red-500">*</span>}
          </label>
          <select
            multiple
            {...fieldProps}
            value={fieldValue || []}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
              updateUser(user.id, field, selectedOptions);
            }}
            className={`${fieldProps.className} h-28`}
          >
            {options?.map(option => (
              <option key={option} value={option} className="py-1 px-2">{option}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple subjects</p>
          {hasError && <p className="mt-1 text-xs text-red-600 font-medium">{hasError}</p>}
        </div>
      );
    }

    if (options) {
      fieldElement = (
        <select {...fieldProps}>
          <option value="">Select {formatFieldName(field)}</option>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    } else if (field.includes('date') || field === 'dateOfBirth' || field === 'dateOfJoining' || field === 'admissionDate') {
      const today = new Date().toISOString().split('T')[0];
      fieldElement = (
        <input
          type="date"
          {...fieldProps}
          max={field === 'dateOfBirth' ? today : undefined}
        />
      );
    } else if (field === 'password') {
      const isVisible = showPasswords[user.id] || false;
      const strength = calculatePasswordStrength(fieldValue);
      const isCopied = copiedPasswordId === user.id;

      fieldElement = (
        <div className="space-y-2">
          <div className="relative flex items-center">
            <input
              type={isVisible ? 'text' : 'password'}
              {...fieldProps}
              className={`${fieldProps.className} pr-20 font-mono text-sm tracking-wider`}
              placeholder="Enter password or click Generate"
              autoComplete="new-password"
            />
            
            <div className="absolute right-2 flex items-center space-x-1">
              {fieldValue && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCopyPassword(user.id, fieldValue)}
                    className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                      isCopied 
                        ? 'bg-emerald-100 text-emerald-700 font-medium' 
                        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    title={isCopied ? 'Copied to clipboard!' : 'Copy password'}
                  >
                    {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleShowPassword(user.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                    title={isVisible ? 'Hide password' : 'Show password'}
                  >
                    {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Action Row: Generate Button & Strength Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => handleGeneratePassword(user.id)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 active:bg-blue-200 border border-blue-200 rounded-lg shadow-xs transition-all cursor-pointer group"
              title="Generate a cryptographically secure random password (CSPRNG)"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-600 group-hover:rotate-12 transition-transform" />
              <span>Generate Strong Password</span>
            </button>

            {fieldValue ? (
              <div className="flex items-center space-x-2">
                <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full ${strength.color} transition-all duration-300`} 
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
                <span className={`text-[11px] font-semibold ${strength.textColor}`}>
                  {strength.label}
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-gray-400">
                Min 6 chars
              </span>
            )}
          </div>
        </div>
      );
    } else if (field === 'email' || field === 'parentEmail') {
      fieldElement = (
        <input
          type="email"
          {...fieldProps}
        />
      );
    } else if (field.includes('Number') || field.includes('years') || field === 'rollNumber') {
      fieldElement = (
        <input
          type="number"
          {...fieldProps}
          min="0"
        />
      );
    } else if (field.includes('details') || field === 'medicalConditions') {
      fieldElement = (
        <textarea
          {...fieldProps}
          rows="2"
          className={fieldProps.className.replace('block w-full', 'block w-full resize-none')}
        />
      );
    } else {
      fieldElement = (
        <input
          type="text"
          {...fieldProps}
        />
      );
    }

    return (
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
          {formatFieldName(field)} {isRequired && <span className="text-red-500">*</span>}
        </label>
        {fieldElement}
        {hasError && <p className="mt-1 text-xs text-red-600 font-medium">{hasError}</p>}
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
          <span className="text-xs font-medium text-gray-500">Add prior teaching or industry experience</span>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Another Experience
          </button>
        </div>

        {experiences.map((experience, index) => (
          <div key={index} className="border border-purple-100 rounded-xl p-4 bg-white/90 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h5 className="text-xs font-bold text-purple-900 flex items-center tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                Experience #{index + 1}
              </h5>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="flex items-center px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Position / Title
                </label>
                <input
                  type="text"
                  value={experience.position || ''}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Mathematics Teacher"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Organization / School
                </label>
                <input
                  type="text"
                  value={experience.organization || ''}
                  onChange={(e) => updateExperience(index, 'organization', e.target.value)}
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. Modern Academy"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={experience.fromDate || ''}
                  onChange={(e) => updateExperience(index, 'fromDate', e.target.value)}
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className={`block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    experience.isCurrent ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experience.isCurrent || false}
                    onChange={(e) => {
                      updateExperience(index, 'isCurrent', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(index, 'toDate', '');
                      }
                    }}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  Currently working in this position
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Job Description / Achievements
                </label>
                <textarea
                  value={experience.description || ''}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows="2"
                  className="block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Key responsibilities, grades taught, or milestones..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render form sections with Collapsible / Accordion behavior
  const renderFormSections = (user) => {
    const sections = getFormSections();
    const userOpenSections = openSections[user.id] || [];

    return (
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isOpen = userOpenSections.includes(index);
          const { errorCount, isComplete, hasRequired } = getSectionStatus(user, section);
          const summaryText = getSectionSummaryText(user, section);
          const isFirstSection = index === 0;
          const isLastSection = index === sections.length - 1;

          return (
            <div 
              key={index} 
              ref={el => sectionRefs.current[`${user.id}-${index}`] = el}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen 
                  ? 'border-blue-300 bg-white shadow-sm ring-1 ring-blue-100' 
                  : errorCount > 0
                  ? 'border-red-200 bg-red-50/30 hover:border-red-300'
                  : isComplete
                  ? 'border-gray-200 bg-gray-50/60 hover:border-gray-300'
                  : 'border-gray-200 bg-gray-50/40 hover:border-gray-300'
              }`}
            >
              {/* Collapsible Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(user.id, index)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors select-none"
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className={`p-2 rounded-lg flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getSectionIcon(section.title)}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900 truncate">
                        {section.title}
                      </span>
                      {hasRequired && (
                        <span className="text-xs text-gray-400 font-normal">
                          (Required)
                        </span>
                      )}
                    </div>
                    
                    {/* Collapsed summary snippet */}
                    {!isOpen && summaryText && (
                      <p className="text-xs text-gray-500 truncate mt-0.5 max-w-md md:max-w-lg">
                        {summaryText}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Error badge */}
                  {errorCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errorCount} error{errorCount > 1 ? 's' : ''}
                    </span>
                  )}

                  {/* Completion badge */}
                  {errorCount === 0 && isComplete && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3 h-3 mr-1" />
                      Completed
                    </span>
                  )}

                  {/* Chevron Toggle */}
                  <div className={`p-1 text-gray-400 rounded-md transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </button>

              {/* Section Body */}
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                  <div className="pt-3">
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

                  {/* Step Navigation footer between sections */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {!isFirstSection && (
                        <button
                          type="button"
                          onClick={() => goToPrevSection(user.id, index)}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                          Previous Section
                        </button>
                      )}
                    </div>

                    <div>
                      {!isLastSection ? (
                        <button
                          type="button"
                          onClick={() => goToNextSection(user.id, index)}
                          className="inline-flex items-center px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
                        >
                          Next Section
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleSection(user.id, index)}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Done Section
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Get user overall completion status for the top header
  const getUserCompletionStatus = (user) => {
    const sections = getFormSections();
    let completedCount = 0;
    let totalErrors = 0;

    sections.forEach(sec => {
      const { errorCount, isComplete } = getSectionStatus(user, sec);
      if (errorCount > 0) totalErrors += errorCount;
      if (isComplete) completedCount += 1;
    });

    const isAllComplete = completedCount === sections.length && totalErrors === 0;

    return {
      completedCount,
      totalSections: sections.length,
      totalErrors,
      isAllComplete
    };
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Create {userType === 'student' ? 'Students' : 'Teachers'}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below. Sections collapse smoothly as you progress to keep your workspace clean and organized.
          </p>
        </div>

        {/* Global Expand/Collapse controls if multiple users */}
        {users.length > 1 && (
          <div className="mt-3 sm:mt-0 flex items-center space-x-2">
            <button
              type="button"
              onClick={expandAllUsers}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
              title="Expand all cards"
            >
              <Maximize2 className="h-3.5 w-3.5 mr-1 text-gray-500" />
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAllUsers}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm"
              title="Collapse all cards"
            >
              <Minimize2 className="h-3.5 w-3.5 mr-1 text-gray-500" />
              Collapse All
            </button>
          </div>
        )}
      </div>

      {/* User Type Switcher */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select User Category</h3>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => handleUserTypeChange('student')}
            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              userType === 'student'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Student
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeChange('teacher')}
            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              userType === 'teacher'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Teacher
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* List of Users (Student / Teacher Cards) */}
        {users.map((user, index) => {
          const isUserExpanded = expandedUsers.includes(user.id);
          const { completedCount, totalSections, totalErrors, isAllComplete } = getUserCompletionStatus(user);
          const userName = user.name?.trim();
          const userIdentifier = userType === 'student' 
            ? (user.class ? `Class ${user.class}${user.section ? `-${user.section}` : ''}` : '')
            : (user.designation || '');

          return (
            <div 
              key={user.id} 
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 ${
                isUserExpanded 
                  ? 'border-gray-300 ring-1 ring-black/5' 
                  : totalErrors > 0 
                  ? 'border-red-200 bg-red-50/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* User Card Header - Clickable dropdown accordion */}
              <div 
                onClick={() => toggleUserExpanded(user.id)}
                className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none rounded-2xl hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center space-x-3 min-w-0 pr-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${
                    isAllComplete
                      ? 'bg-emerald-100 text-emerald-800'
                      : isUserExpanded
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {userName || `${userType.charAt(0).toUpperCase() + userType.slice(1)} #${index + 1}`}
                      </h3>
                      {userIdentifier && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {userIdentifier}
                        </span>
                      )}
                      {user.email && (
                        <span className="text-xs text-gray-500 truncate hidden sm:inline">
                          • {user.email}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-0.5">
                      {completedCount} of {totalSections} sections filled
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Status tags */}
                  {totalErrors > 0 ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                      {totalErrors} Error{totalErrors > 1 ? 's' : ''}
                    </span>
                  ) : isAllComplete ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Ready
                    </span>
                  ) : (
                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      In Progress
                    </span>
                  )}

                  {/* Remove User button */}
                  {users.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUser(user.id);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                      title="Remove this user"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}

                  {/* Expand/Collapse Chevron */}
                  <div className={`p-1.5 text-gray-400 rounded-lg transition-transform duration-200 ${
                    isUserExpanded ? 'rotate-180 text-blue-600 bg-blue-50' : 'hover:bg-gray-100'
                  }`}>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* User Card Content (Nested Form Sections) */}
              {isUserExpanded && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-gray-100 space-y-4">
                  {renderFormSections(user)}
                </div>
              )}
            </div>
          );
        })}

        {/* Add Another User Button */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={addUser}
            className="flex items-center px-5 py-2.5 border-2 border-dashed border-gray-300 text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-blue-50/50 hover:border-blue-400 hover:text-blue-700 transition-all shadow-sm group"
          >
            <Plus className="h-4 w-4 mr-2 text-gray-500 group-hover:text-blue-600 transition-colors" />
            Add Another {userType.charAt(0).toUpperCase() + userType.slice(1)}
          </button>
        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            Total to create: <span className="font-semibold text-gray-800">{users.length} {userType}{users.length > 1 ? 's' : ''}</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset all inputs?')) {
                  setUsers([{ id: 1, ...getFieldTemplate() }]);
                  setExpandedUsers([1]);
                  setOpenSections({ 1: [0] });
                  setErrors({});
                }
              }}
              className="px-4 py-2 text-xs font-medium rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Reset All
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create {users.length} {userType.charAt(0).toUpperCase() + userType.slice(1)}{users.length > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Helpful Tips Card */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div className="ml-3">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Helpful Navigation Tips</h4>
            <div className="mt-1 text-xs text-blue-800 space-y-1">
              <p>• Click on any section header to expand or collapse it.</p>
              <p>• Use the "Next Section" button at the bottom of each block to progress step-by-step.</p>
              <p>• When adding another {userType}, previous entries automatically collapse into compact summary cards.</p>
              <p>• Required fields are indicated with an asterisk (<span className="text-red-600 font-bold">*</span>).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

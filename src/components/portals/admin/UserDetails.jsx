import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
} from 'lucide-react';
import { AdminControlAPI } from '@/services/api';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [additionalDetail, setAdditionalDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await AdminControlAPI.getUserById(id);
        if (data.success) {
          setUser(data.user);
          setAdditionalDetail(data.additionalDetail);
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            contactNumber: data.user.contactNumber || '',
            role: 'admin',
            street: data.user.address?.street || '',
            city: data.user.address?.city || '',
            state: data.user.address?.state || '',
            zipCode: data.user.address?.zipCode || '',
            ...(data.additionalDetail && {
              admissionNumber: data.additionalDetail.admissionNumber || '',
              class: data.additionalDetail.class || '',
              section: data.additionalDetail.section || '',
              rollNumber: data.additionalDetail.rollNumber || '',
              dateOfBirth: data.additionalDetail.dateOfBirth
                ? new Date(data.additionalDetail.dateOfBirth).toISOString().split('T')[0]
                : '',
              gender: data.additionalDetail.gender || '',
              bloodGroup: data.additionalDetail.bloodGroup || '',
              fatherName: data.additionalDetail.fatherName || '',
              motherName: data.additionalDetail.motherName || '',
              parentContactNumber: data.additionalDetail.parentContactNumber || '',
              parentEmail: data.additionalDetail.parentEmail || '',
              emergencyContactName: data.additionalDetail.emergencyContactName || '',
              emergencyContactNumber: data.additionalDetail.emergencyContactNumber || '',
              emergencyContactRelation: data.additionalDetail.emergencyContactRelation || '',
              admissionDate: data.additionalDetail.admissionDate
                ? new Date(data.additionalDetail.admissionDate).toISOString().split('T')[0]
                : '',
              previousSchool: data.additionalDetail.previousSchool || '',
              academicYear: data.additionalDetail.academicYear || '',
              medicalConditions: data.additionalDetail.medicalConditions || '',
            }),
          });
        } else {
          setError(data.message || 'Failed to load user');
          alert(data.message || 'Failed to load user');
        }
      } catch (err) {
        setError(err.message || 'Error fetching user');
        alert(err.message || 'Error fetching user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (isEditOpen) {
      document.querySelector('input[name="name"]').focus();
    }
  }, [isEditOpen]);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setModifiedFields((prev) => ({
      ...prev,
      [name]: value !== (user[name] || additionalDetail[name] || ''),
    }));

    let error = null;
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email address';
    } else if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    } else if (name === 'contactNumber' && value && !/^\d{10}$/.test(value)) {
      error = 'Contact number must be 10 digits';
    } else if (name === 'medicalConditions' && value.length > 500) {
      error = 'Medical conditions cannot exceed 500 characters';
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors || !formData.name || !formData.email) {
      alert('Please fix the errors before submitting');
      setSubmitLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        role: formData.role,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        ...(additionalDetail && {
          admissionNumber: formData.admissionNumber,
          class: formData.class,
          section: formData.section,
          rollNumber: formData.rollNumber,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          bloodGroup: formData.bloodGroup,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          parentContactNumber: formData.parentContactNumber,
          parentEmail: formData.parentEmail,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactNumber: formData.emergencyContactNumber,
          emergencyContactRelation: formData.emergencyContactRelation,
          admissionDate: formData.admissionDate,
          previousSchool: formData.previousSchool,
          academicYear: formData.academicYear,
          medicalConditions: formData.medicalConditions,
        }),
      };

      const response = await AdminControlAPI.updateSpecificUserDetail(id, payload);
      if (response.success) {
        setUser((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          role: formData.role,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        }));
        if (additionalDetail) {
          setAdditionalDetail((prev) => ({
            ...prev,
            admissionNumber: formData.admissionNumber,
            class: formData.class,
            section: formData.section,
            rollNumber: formData.rollNumber,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            bloodGroup: formData.bloodGroup,
            fatherName: formData.fatherName,
            motherName: formData.motherName,
            parentContactNumber: formData.parentContactNumber,
            parentEmail: formData.parentEmail,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactNumber: formData.emergencyContactNumber,
            emergencyContactRelation: formData.emergencyContactRelation,
            admissionDate: formData.admissionDate,
            previousSchool: formData.previousSchool,
            academicYear: formData.academicYear,
            medicalConditions: formData.medicalConditions,
          }));
        }
        setIsEditOpen(false);
        setModifiedFields({});
        setErrors({});
        alert('User details updated successfully');
      } else {
        alert(response.message || 'Failed to update user');
      }
    } catch (err) {
      alert(err.message || 'Error updating user');
    } finally {
      setSubmitLoading(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      superadmin: 'bg-red-100 text-red-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">User not found</h3>
        <p className="mt-1 text-sm text-gray-500">The user you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/portal/admin/users')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const showValue = (val) =>
    val !== undefined && val !== null && val !== '' ? val : 'Not provided';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/portal/admin/users')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Users
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600">View and manage user information</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>

        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 rounded-full p-3">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{showValue(user.email)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{showValue(user.contactNumber)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Joined</p>
                    <p className="text-sm text-gray-600">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {user.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    {showValue(user.address.street)}<br />
                    {showValue(user.address.city)}, {showValue(user.address.state)}{' '}
                    {showValue(user.address.zipCode)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status & Actions */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Verification</span>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Role</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Details (conditional) */}
      {additionalDetail && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Academic Details</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Admission Number</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.admissionNumber)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Class</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.class)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Section</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.section)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Roll Number</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.rollNumber)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date of Birth</p>
                    <p className="text-sm text-gray-600">
                      {additionalDetail.dateOfBirth
                        ? new Date(additionalDetail.dateOfBirth).toLocaleDateString()
                        : 'Not provided'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Gender</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.gender)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Blood Group</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.bloodGroup)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Admission Date</p>
                    <p className="text-sm text-gray-600">
                      {additionalDetail.admissionDate
                        ? new Date(additionalDetail.admissionDate).toLocaleDateString()
                        : 'Not provided'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Previous School</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.previousSchool)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Academic Year</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.academicYear)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medical Conditions</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.medicalConditions)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Family Information (conditional) */}
      {additionalDetail && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Family Information</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Father's Name</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.fatherName)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mother's Name</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.motherName)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Parent Contact Number</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.parentContactNumber)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Parent Email</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.parentEmail)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact (conditional) */}
      {additionalDetail && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact Name</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.emergencyContactName)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Contact Number</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.emergencyContactNumber)}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Relation</p>
                    <p className="text-sm text-gray-600">{showValue(additionalDetail.emergencyContactRelation)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-auto max-h-[90vh] relative"
          >
            <h3 className="text-xl font-semibold mb-4">Edit User Details</h3>
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Close edit form"
            >
              ✕
            </button>

            {/* Personal Information */}
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  Name:
                  <input
                    type="text"
                    name="name"
                    defaultValue={formData.name}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.name ? 'border-red-500' : modifiedFields.name ? 'border-yellow-500' : ''}`}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </label>
                <label className="block">
                  Email:
                  <input
                    type="email"
                    name="email"
                    defaultValue={formData.email}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.email ? 'border-red-500' : modifiedFields.email ? 'border-yellow-500' : ''}`}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </label>
                <label className="block">
                  Contact Number:
                  <input
                    type="text"
                    name="contactNumber"
                    defaultValue={formData.contactNumber}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.contactNumber ? 'border-red-500' : modifiedFields.contactNumber ? 'border-yellow-500' : ''}`}
                    aria-invalid={!!errors.contactNumber}
                    aria-describedby={errors.contactNumber ? 'contactNumber-error' : undefined}
                  />
                  {errors.contactNumber && (
                    <p id="contactNumber-error" className="text-red-600 text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </label>
                <label className="block">
                  Role:
                  <input
                    type="text"
                    name="role"
                    defaultValue={formData.role}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded mt-1"
                    disabled
                  />
                </label>
                <label className="block">
                  Street:
                  <input
                    type="text"
                    name="street"
                    defaultValue={formData.street}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.street ? 'border-red-500' : modifiedFields.street ? 'border-yellow-500' : ''}`}
                  />
                </label>
                <label className="block">
                  City:
                  <input
                    type="text"
                    name="city"
                    defaultValue={formData.city}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.city ? 'border-red-500' : modifiedFields.city ? 'border-yellow-500' : ''}`}
                  />
                </label>
                <label className="block">
                  State:
                  <input
                    type="text"
                    name="state"
                    defaultValue={formData.state}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.state ? 'border-red-500' : modifiedFields.state ? 'border-yellow-500' : ''}`}
                  />
                </label>
                <label className="block">
                  Zip Code:
                  <input
                    type="text"
                    name="zipCode"
                    defaultValue={formData.zipCode}
                    onBlur={handleBlur}
                    className={`w-full border p-2 rounded mt-1 ${errors.zipCode ? 'border-red-500' : modifiedFields.zipCode ? 'border-yellow-500' : ''}`}
                  />
                </label>
              </div>
            </div>

            {/* Academic Details (conditional) */}
            {additionalDetail && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Academic Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Admission Number:
                    <input
                      type="text"
                      name="admissionNumber"
                      defaultValue={formData.admissionNumber}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.admissionNumber ? 'border-red-500' : modifiedFields.admissionNumber ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Class:
                    <input
                      type="text"
                      name="class"
                      defaultValue={formData.class}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.class ? 'border-red-500' : modifiedFields.class ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Section:
                    <input
                      type="text"
                      name="section"
                      defaultValue={formData.section}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.section ? 'border-red-500' : modifiedFields.section ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Roll Number:
                    <input
                      type="number"
                      name="rollNumber"
                      defaultValue={formData.rollNumber}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.rollNumber ? 'border-red-500' : modifiedFields.rollNumber ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Date of Birth:
                    <input
                      type="date"
                      name="dateOfBirth"
                      defaultValue={formData.dateOfBirth}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.dateOfBirth ? 'border-red-500' : modifiedFields.dateOfBirth ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Gender:
                    <select
                      name="gender"
                      defaultValue={formData.gender}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.gender ? 'border-red-500' : modifiedFields.gender ? 'border-yellow-500' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label className="block">
                    Blood Group:
                    <input
                      type="text"
                      name="bloodGroup"
                      defaultValue={formData.bloodGroup}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.bloodGroup ? 'border-red-500' : modifiedFields.bloodGroup ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Admission Date:
                    <input
                      type="date"
                      name="admissionDate"
                      defaultValue={formData.admissionDate}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.admissionDate ? 'border-red-500' : modifiedFields.admissionDate ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Previous School:
                    <input
                      type="text"
                      name="previousSchool"
                      defaultValue={formData.previousSchool}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.previousSchool ? 'border-red-500' : modifiedFields.previousSchool ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Academic Year:
                    <input
                      type="text"
                      name="academicYear"
                      defaultValue={formData.academicYear}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.academicYear ? 'border-red-500' : modifiedFields.academicYear ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Medical Conditions:
                    <textarea
                      name="medicalConditions"
                      defaultValue={formData.medicalConditions}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.medicalConditions ? 'border-red-500' : modifiedFields.medicalConditions ? 'border-yellow-500' : ''}`}
                      aria-invalid={!!errors.medicalConditions}
                      aria-describedby={errors.medicalConditions ? 'medicalConditions-error' : undefined}
                    />
                    {errors.medicalConditions && (
                      <p id="medicalConditions-error" className="text-red-600 text-sm mt-1">
                        {errors.medicalConditions}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            )}

            {/* Family Information (conditional) */}
            {additionalDetail && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Family Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Father's Name:
                    <input
                      type="text"
                      name="fatherName"
                      defaultValue={formData.fatherName}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.fatherName ? 'border-red-500' : modifiedFields.fatherName ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Mother's Name:
                    <input
                      type="text"
                      name="motherName"
                      defaultValue={formData.motherName}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.motherName ? 'border-red-500' : modifiedFields.motherName ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Parent Contact Number:
                    <input
                      type="text"
                      name="parentContactNumber"
                      defaultValue={formData.parentContactNumber}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.parentContactNumber ? 'border-red-500' : modifiedFields.parentContactNumber ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Parent Email:
                    <input
                      type="email"
                      name="parentEmail"
                      defaultValue={formData.parentEmail}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.parentEmail ? 'border-red-500' : modifiedFields.parentEmail ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Emergency Contact (conditional) */}
            {additionalDetail && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    Contact Name:
                    <input
                      type="text"
                      name="emergencyContactName"
                      defaultValue={formData.emergencyContactName}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.emergencyContactName ? 'border-red-500' : modifiedFields.emergencyContactName ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Contact Number:
                    <input
                      type="text"
                      name="emergencyContactNumber"
                      defaultValue={formData.emergencyContactNumber}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.emergencyContactNumber ? 'border-red-500' : modifiedFields.emergencyContactNumber ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                  <label className="block">
                    Relation:
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      defaultValue={formData.emergencyContactRelation}
                      onBlur={handleBlur}
                      className={`w-full border p-2 rounded mt-1 ${errors.emergencyContactRelation ? 'border-red-500' : modifiedFields.emergencyContactRelation ? 'border-yellow-500' : ''}`}
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {submitLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

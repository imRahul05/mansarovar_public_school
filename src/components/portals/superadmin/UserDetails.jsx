import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  User,
  Edit,
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';
import { superAdminAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../common/ConfirmationDialog';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await superAdminAPI.getUserById(id);
        if (response.success) {
          setUser(response.user);
        } else {
          toast.error('Failed to fetch user details');
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error(error.message || 'Failed to fetch user details');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleVerifyToggle = async () => {
    try {
      if (!user.isVerified) {
        const response = await superAdminAPI.verifyUser(user._id);
        if (response.success) {
          setUser(prev => ({ ...prev, isVerified: true }));
          toast.success(response.message || 'User verified successfully');
        }
      }
    } catch (error) {
      console.error('Error toggling verification:', error);
      toast.error(error.message || 'Failed to verify user');
    }
  };

  const handleActiveToggle = async () => {
    try {
      const response = await superAdminAPI.updateUserStatus(user._id, !user.isActive);
      if (response.success) {
        setUser(prev => ({ ...prev, isActive: !prev.isActive }));
        toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'} successfully`);
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      toast.error(error.message || 'Failed to update user status');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await superAdminAPI.deleteUser(user._id);
      if (response.success) {
        toast.success('User deleted successfully');
        navigate('/portal/superadmin/users');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">User not found</h3>
        <p className="mt-1 text-sm text-gray-500">The user you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/portal/superadmin/users')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      superadmin: 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/portal/superadmin/users')}
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
          <ConfirmationDialog
            trigger={
              <button
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  user.isVerified
                    ? 'text-gray-500 bg-gray-100 cursor-not-allowed'
                    : 'text-green-700 bg-green-100 hover:bg-green-200'
                }`}
                disabled={user.isVerified}
              >
                {user.isVerified ? <UserCheck className="h-4 w-4 mr-1" /> : <UserCheck className="h-4 w-4 mr-1" />}
                {user.isVerified ? 'Verified' : 'Verify'}
              </button>
            }
            title="Verify User"
            description={`Are you sure you want to verify ${user.name}? Once verified, this action cannot be reversed. Please check the user data carefully before proceeding.`}
            actionText="Verify User"
            cancelText="Cancel"
            onConfirm={handleVerifyToggle}
            variant="warning"
          />
          
          <ConfirmationDialog
            trigger={
              <button
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md ${
                  user.isActive
                    ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                    : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                }`}
              >
                {user.isActive ? 'Deactivate' : 'Activate'}
              </button>
            }
            title={user.isActive ? 'Deactivate User' : 'Activate User'}
            description={`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${user.name}? ${user.isActive ? 'The user will lose access to the system.' : 'The user will regain access to the system.'}`}
            actionText={user.isActive ? 'Deactivate' : 'Activate'}
            cancelText="Cancel"
            onConfirm={handleActiveToggle}
            variant={user.isActive ? 'warning' : 'default'}
          />
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
          
          <ConfirmationDialog
            trigger={
              <button
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            }
            title="Delete User"
            description={`Are you sure you want to delete ${user.name}? This action cannot be undone. All user data will be permanently removed from the system.`}
            actionText="Delete User"
            cancelText="Cancel"
            onConfirm={handleDeleteUser}
            variant="destructive"
          />
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
                <p className="text-gray-600">{user.customID}</p>
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
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{user.contactNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Joined</p>
                    <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Last Login</p>
                    <p className="text-sm text-gray-600">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
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
                    {user.address.street}<br />
                    {user.address.city}, {user.address.state} {user.address.zipCode}
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
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Status</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.isActive ? 'Active' : 'Inactive'}
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

          {/* Quick Actions */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <ConfirmationDialog
                trigger={
                  <button
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                      user.isVerified
                        ? 'text-gray-500 bg-gray-100 cursor-not-allowed'
                        : 'text-green-700 bg-green-100 hover:bg-green-200'
                    }`}
                    disabled={user.isVerified}
                  >
                    {user.isVerified ? <UserCheck className="h-4 w-4 mr-2" /> : <UserCheck className="h-4 w-4 mr-2" />}
                    {user.isVerified ? 'Already Verified' : 'Verify User'}
                  </button>
                }
                title="Verify User"
                description={`Are you sure you want to verify ${user.name}? Once verified, this action cannot be reversed. Please check the user data carefully before proceeding.`}
                actionText="Verify User"
                cancelText="Cancel"
                onConfirm={handleVerifyToggle}
                variant="warning"
              />

              <ConfirmationDialog
                trigger={
                  <button
                    className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                      user.isActive
                        ? 'text-orange-700 bg-orange-100 hover:bg-orange-200'
                        : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                    }`}
                  >
                    {user.isActive ? 'Deactivate Account' : 'Activate Account'}
                  </button>
                }
                title={user.isActive ? 'Deactivate User' : 'Activate User'}
                description={`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${user.name}? ${user.isActive ? 'The user will lose access to the system.' : 'The user will regain access to the system.'}`}
                actionText={user.isActive ? 'Deactivate' : 'Activate'}
                cancelText="Cancel"
                onConfirm={handleActiveToggle}
                variant={user.isActive ? 'warning' : 'default'}
              />

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>

              <ConfirmationDialog
                trigger={
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete User
                  </button>
                }
                title="Delete User"
                description={`Are you sure you want to delete ${user.name}? This action cannot be undone. All user data will be permanently removed from the system.`}
                actionText="Delete User"
                cancelText="Cancel"
                onConfirm={handleDeleteUser}
                variant="destructive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

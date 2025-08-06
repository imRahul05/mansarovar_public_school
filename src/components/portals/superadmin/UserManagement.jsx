import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  UserCheck, 
  UserX, 
  Search, 
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Users,
  Power,
  PowerOff
} from 'lucide-react';
import { superAdminAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../common/ConfirmationDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await superAdminAPI.getUsers();
        if (response.success) {
          setUsers(response.users);
        } else {
          toast.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error(error.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleVerifyToggle = async (userId, currentStatus) => {
    try {
      if (!currentStatus) {
        // Only verify users, not unverify
        const response = await superAdminAPI.verifyUser(userId);
        if (response.success) {
          setUsers(users.map(user => 
            user._id === userId 
              ? { ...user, isVerified: true }
              : user
          ));
          toast.success(response.message || 'User verified successfully');
        }
      }
    } catch (error) {
      console.error('Error toggling verification:', error);
      toast.error(error.message || 'Failed to verify user');
    }
  };

  const handleActiveToggle = async (userId, currentStatus) => {
    try {
      const response = await superAdminAPI.updateUserStatus(userId, !currentStatus);
      if (response.success) {
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isActive: !currentStatus }
            : user
        ));
        toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      toast.error(error.message || 'Failed to update user status');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.customID.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'verified' && user.isVerified) ||
                         (filterStatus === 'unverified' && !user.isVerified) ||
                         (filterStatus === 'active' && user.isActive) ||
                         (filterStatus === 'inactive' && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      superadmin: 'bg-red-100 text-red-800'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="mt-2 text-sm text-gray-700">
            Manage all users in the system. View details, verify accounts, and control access.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
              <option value="superadmin">Superadmins</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">{user.customID}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        {user.isVerified ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">
                          {user.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-1 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-xs text-gray-500">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/portal/superadmin/users/${user._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      <ConfirmationDialog
                        trigger={
                          <button
                            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                              user.isVerified ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 hover:text-green-700'
                            }`}
                            title={user.isVerified ? 'Already Verified' : 'Verify User'}
                            disabled={user.isVerified}
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        }
                        title="Verify User"
                        description={`Are you sure you want to verify ${user.name}? Once verified, this action cannot be reversed. Please check the user data carefully before proceeding.`}
                        actionText="Verify User"
                        cancelText="Cancel"
                        onConfirm={() => handleVerifyToggle(user._id, user.isVerified)}
                        variant="warning"
                      />
                      
                      <ConfirmationDialog
                        trigger={
                          <button
                            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
                              user.isActive ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'
                            }`}
                            title={user.isActive ? 'Deactivate User' : 'Activate User'}
                          >
                            {user.isActive ? (
                              <PowerOff className="h-4 w-4" />
                            ) : (
                              <Power className="h-4 w-4" />
                            )}
                          </button>
                        }
                        title={user.isActive ? 'Deactivate User' : 'Activate User'}
                        description={`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${user.name}? ${user.isActive ? 'The user will lose access to the system.' : 'The user will regain access to the system.'}`}
                        actionText={user.isActive ? 'Deactivate' : 'Activate'}
                        cancelText="Cancel"
                        onConfirm={() => handleActiveToggle(user._id, user.isActive)}
                        variant={user.isActive ? 'warning' : 'default'}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: users.length, color: 'bg-blue-500' },
          { label: 'Verified', value: users.filter(u => u.isVerified).length, color: 'bg-green-500' },
          { label: 'Unverified', value: users.filter(u => !u.isVerified).length, color: 'bg-red-500' },
          { label: 'Active', value: users.filter(u => u.isActive).length, color: 'bg-purple-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

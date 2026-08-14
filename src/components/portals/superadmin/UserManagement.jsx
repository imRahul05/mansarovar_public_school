import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  UserCheck, 
  Search, 
  Filter,
  CheckCircle, 
  XCircle, 
  Users, 
  Power, 
  PowerOff,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { superAdminAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../common/ConfirmationDialog';

const PAGE_SIZE = 12;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    activeUsers: 0
  });

  const observerTargetRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch initial page on mount or whenever filters change
  useEffect(() => {
    let isCancelled = false;

    const fetchInitialUsers = async () => {
      try {
        setLoading(true);
        const response = await superAdminAPI.getUsers({
          page: 1,
          limit: PAGE_SIZE,
          search: debouncedSearch,
          role: filterRole,
          status: filterStatus
        });

        if (isCancelled) return;

        if (response.success) {
          const fetchedUsers = Array.isArray(response.users) ? response.users : [];
          setUsers(fetchedUsers);
          setPage(1);
          setHasMore(response.hasMore ?? (fetchedUsers.length === PAGE_SIZE));
          setTotalCount(response.total ?? fetchedUsers.length);

          if (response.stats) {
            setStats(response.stats);
          }
        } else {
          toast.error(response.message || 'Failed to fetch users');
          setUsers([]);
          setHasMore(false);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Error fetching users:', error);
          toast.error(error.message || 'Failed to fetch users');
          setUsers([]);
          setHasMore(false);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchInitialUsers();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearch, filterRole, filterStatus]);

  // Load next page
  const loadMoreUsers = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;

      const response = await superAdminAPI.getUsers({
        page: nextPage,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        role: filterRole,
        status: filterStatus
      });

      if (response.success) {
        const newUsers = Array.isArray(response.users) ? response.users : [];

        setUsers(prevUsers => {
          const existingIds = new Set(prevUsers.map(u => u._id));
          const filteredNew = newUsers.filter(u => !existingIds.has(u._id));
          return [...prevUsers, ...filteredNew];
        });

        setPage(nextPage);
        setHasMore(response.hasMore ?? (newUsers.length === PAGE_SIZE));
        if (response.total !== undefined) {
          setTotalCount(response.total);
        }
        if (response.stats) {
          setStats(response.stats);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more users:', error);
      toast.error(error.message || 'Failed to load more users');
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [loading, loadingMore, hasMore, page, debouncedSearch, filterRole, filterStatus]);

  // IntersectionObserver for infinite scroll trigger
  useEffect(() => {
    const target = observerTargetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          loadMoreUsers();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.05
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasMore, loading, loadingMore, loadMoreUsers]);

  const handleVerifyToggle = async (userId, currentStatus) => {
    if (currentStatus) return;

    try {
      const response = await superAdminAPI.verifyUser(userId);
      if (response.success) {
        setUsers(prev => 
          prev.map(user => 
            user._id === userId ? { ...user, isVerified: true } : user
          )
        );
        setStats(prev => ({
          ...prev,
          verifiedUsers: prev.verifiedUsers + 1,
          unverifiedUsers: Math.max(0, prev.unverifiedUsers - 1)
        }));
        toast.success(response.message || 'User verified successfully');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      toast.error(error.message || 'Failed to verify user');
    }
  };

  const handleActiveToggle = async (userId, currentStatus) => {
    try {
      const response = await superAdminAPI.updateUserStatus(userId, !currentStatus);
      if (response.success) {
        setUsers(prev => 
          prev.map(user => 
            user._id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );
        setStats(prev => ({
          ...prev,
          activeUsers: !currentStatus ? prev.activeUsers + 1 : Math.max(0, prev.activeUsers - 1)
        }));
        toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      toast.error(error.message || 'Failed to update user status');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      superadmin: 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const isFiltersActive = debouncedSearch || filterRole !== 'all' || filterStatus !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage all users in the system with seamless infinite scroll pagination.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-sm text-gray-500 font-medium">
          {totalCount > 0 && (
            <span>
              Showing <span className="font-bold text-gray-900">{users.length}</span> of{' '}
              <span className="font-bold text-gray-900">{totalCount}</span> users
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
          {/* Search */}
          <div className="relative md:col-span-1 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
              <option value="superadmin">Superadmins</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {isFiltersActive && (
              <button
                onClick={resetFilters}
                className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                title="Reset Filters"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            <p className="text-sm text-gray-500">Loading users...</p>
          </div>
        ) : (
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
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{user.email || 'N/A'}</div>
                        <div className="text-xs text-gray-400">{user.customID || 'N/A'}</div>
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
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/portal/superadmin/users/${user._id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        
                        <ConfirmationDialog
                          trigger={
                            <button
                              className={`p-1 rounded transition-colors ${
                                user.isVerified 
                                  ? 'text-gray-400 cursor-not-allowed' 
                                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                              }`}
                              title={user.isVerified ? 'Already Verified' : 'Verify User'}
                              disabled={user.isVerified}
                            >
                              <UserCheck className="h-4 w-4" />
                            </button>
                          }
                          title="Verify User"
                          description={`Are you sure you want to verify ${user.name || 'this user'}? Once verified, this action cannot be reversed. Please check the user data carefully before proceeding.`}
                          actionText="Verify User"
                          cancelText="Cancel"
                          onConfirm={() => handleVerifyToggle(user._id, user.isVerified)}
                          variant="warning"
                        />
                        
                        <ConfirmationDialog
                          trigger={
                            <button
                              className={`p-1 rounded transition-colors ${
                                user.isActive 
                                  ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' 
                                  : 'text-green-600 hover:text-green-700 hover:bg-green-50'
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
                          description={`Are you sure you want to ${user.isActive ? 'deactivate' : 'activate'} ${user.name || 'this user'}? ${user.isActive ? 'The user will lose access to the system.' : 'The user will regain access to the system.'}`}
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
        )}

        {/* Empty state */}
        {!loading && users.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {isFiltersActive
                ? 'Try adjusting your search or filter criteria.'
                : 'No users registered in the system.'}
            </p>
            {isFiltersActive && (
              <button
                onClick={resetFilters}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Sentinel element & Infinite Scroll Loading indicator */}
        {!loading && users.length > 0 && (
          <div ref={observerTargetRef} className="py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-center">
            {loadingMore ? (
              <div className="flex items-center space-x-2 text-sm text-blue-600 font-medium">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Loading more users...</span>
              </div>
            ) : hasMore ? (
              <button
                onClick={loadMoreUsers}
                className="text-xs text-gray-500 hover:text-blue-600 hover:underline"
              >
                Scroll down or click here to load more
              </button>
            ) : (
              <p className="text-xs text-gray-400">
                All {totalCount} users loaded
              </p>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
          { label: 'Verified', value: stats.verifiedUsers, color: 'bg-green-500' },
          { label: 'Unverified', value: stats.unverifiedUsers, color: 'bg-red-500' },
          { label: 'Active', value: stats.activeUsers, color: 'bg-purple-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Users className="h-6 w-6 text-white" />
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

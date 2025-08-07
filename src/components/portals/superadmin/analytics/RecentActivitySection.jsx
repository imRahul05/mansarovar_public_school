import { Users, UserCheck } from 'lucide-react';

const RecentActivitySection = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Registrations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-500" />
          Recent Registrations
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data.recentRegistrations?.length > 0 ? (
            data.recentRegistrations.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'teacher' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No recent registrations</p>
          )}
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <UserCheck className="h-5 w-5 mr-2 text-green-500" />
          Recent Verifications
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data.recentVerifications?.length > 0 ? (
            data.recentVerifications.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'teacher' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No recent verifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivitySection;

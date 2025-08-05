import { Users, GraduationCap, UserCheck, Clock } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="mt-2 text-sm text-gray-700">
          Overview of users you've created and their status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Created', value: '156', icon: Users, color: 'bg-blue-500' },
          { label: 'Students', value: '120', icon: GraduationCap, color: 'bg-green-500' },
          { label: 'Teachers', value: '36', icon: Users, color: 'bg-purple-500' },
          { label: 'Verified', value: '89', icon: UserCheck, color: 'bg-orange-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Created student', name: 'John Doe', time: '2 hours ago' },
            { action: 'Created teacher', name: 'Jane Smith', time: '1 day ago' },
            { action: 'Created student', name: 'Bob Wilson', time: '2 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {activity.action} <span className="font-medium">{activity.name}</span>
              </span>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

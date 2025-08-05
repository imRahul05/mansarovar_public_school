import { BookOpen, Calendar, Award, Bell } from 'lucide-react';

const StudentHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Student!</h2>
        <p className="mt-2 text-sm text-gray-700">
          Here's what's happening in your classes today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Assignments Due', value: '3', icon: BookOpen, color: 'bg-blue-500' },
          { label: 'Classes Today', value: '6', icon: Calendar, color: 'bg-green-500' },
          { label: 'Average Grade', value: 'A-', icon: Award, color: 'bg-purple-500' },
          { label: 'Notifications', value: '2', icon: Bell, color: 'bg-orange-500' }
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

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">Your assignments and grades will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;

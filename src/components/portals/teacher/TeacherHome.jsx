import { Users, BookOpen, Calendar, Award } from 'lucide-react';

const TeacherHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Teacher!</h2>
        <p className="mt-2 text-sm text-gray-700">
          Here's an overview of your classes and today's schedule.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '120', icon: Users, color: 'bg-blue-500' },
          { label: 'Classes Today', value: '5', icon: Calendar, color: 'bg-green-500' },
          { label: 'Assignments', value: '8', icon: BookOpen, color: 'bg-purple-500' },
          { label: 'Pending Grades', value: '15', icon: Award, color: 'bg-orange-500' }
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

      {/* Today's Schedule */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Your class schedule will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;

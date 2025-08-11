import { Users, Activity, TrendingUp, UserCheck } from 'lucide-react';

const StatsGrid = ({ analyticsData }) => {
  // Stats configuration
  const stats = [
    {
      label: 'Total Users',
      value: analyticsData?.overview?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${analyticsData?.overview?.newRegistrationsLastMonth || 0}`,
      changeLabel: 'new this month'
    },
    {
      label: 'Active Users',
      value: analyticsData?.overview?.activeUsers || 0,
      icon: Activity,
      color: 'bg-green-500',
      change: `${((analyticsData?.overview?.activeUsers / analyticsData?.overview?.totalUsers) * 100).toFixed(1) || 0}%`,
      changeLabel: 'of total users'
    },
    {
      label: 'Verified Users',
      value: analyticsData?.overview?.verifiedUsers || 0,
      icon: UserCheck,
      color: 'bg-purple-500',
      change: `+${analyticsData?.overview?.verifiedUsersLastMonth || 0}`,
      changeLabel: 'verified this month'
    },
    {
      label: 'New Registrations',
      value: analyticsData?.overview?.newRegistrationsLastMonth || 0,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+18%',
      changeLabel: 'from last month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
              <p className="text-xs text-green-600">{stat.change} {stat.changeLabel}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

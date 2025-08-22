

import { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/api';
import { Users, GraduationCap, Activity, TrendingUp, RefreshCw, UserCheck, BarChart3 } from 'lucide-react';
import Plot from 'react-plotly.js';
import LoadingSpinner from '../../common/LoadingSpinner';


const AnalyticsHeader = () => {
  return (
    <div className="flex items-center">
      <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">Comprehensive overview of student and teacher statistics.</p>
      </div>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, label, value, color, change, changeLabel }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && changeLabel && (
            <p className="text-xs text-green-600">{change} {changeLabel}</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

// UserGrowthChart Component
const UserGrowthChart = ({ data, selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
  ];

  const plotData = [
    {
      x: data.map((item) => item.month),
      y: data.map((item) => item.registrations),
      type: 'bar',
      name: 'New Users',
      marker: { color: '#3B82F6' },
    },
    {
      x: data.map((item) => item.month),
      y: data.map((item) => item.verifications),
      type: 'bar',
      name: 'Verified Users',
      marker: { color: '#10B981' },
    },
    {
      x: data.map((item) => item.month),
      y: data.map((item) => item.cumulative),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Total Users',
      line: { color: '#8B5CF6', width: 3 },
      marker: { color: '#8B5CF6', size: 6 },
      yaxis: 'y2',
    },
  ];

  const layout = {
    title: 'User Growth Trends',
    xaxis: { title: 'Month' },
    yaxis: { title: 'Users (New/Verified)', side: 'left' },
    yaxis2: {
      title: 'Total Users',
      side: 'right',
      overlaying: 'y',
    },
    legend: { x: 0, y: 1.1, orientation: 'h' },
    margin: { t: 60, b: 40, l: 60, r: 60 },
    height: 350,
    barmode: 'group',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${selectedPeriod === period.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      <Plot
        data={plotData}
        layout={layout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// RoleDistributionChart Component
const RoleDistributionChart = ({ data }) => {
  if (!data || !data.distribution) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Roles Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const plotData = [
    {
      values: data.distribution.map((item) => item.count),
      labels: data.distribution.map((item) => item.role.charAt(0).toUpperCase() + item.role.slice(1)),
      type: 'pie',
      textinfo: 'label+percent',
      textposition: 'outside',
      marker: {
        colors: colors.slice(0, data.distribution.length),
      },
      hole: 0.4,
    },
  ];

  const layout = {
    title: 'User Roles Distribution',
    margin: { t: 60, b: 40, l: 40, r: 40 },
    height: 350,
    showlegend: true,
    legend: { x: 0, y: 0 },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Roles Distribution</h3>
        {/* <p className="text-sm text-gray-500">Total: {data.totalUsers} users</p> */}
      </div>
      <Plot
        data={plotData}
        layout={layout}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// RecentActivitySection Component
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
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${user.role === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                  >
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
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${user.role === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}
                  >
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

// Main Analytics Component
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    Total_Student_Count: 0,
    Total_Teacher_Count: 0,
    activeUsers: 0,
    newRegistrationsLastMonth: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [roleDistributionData, setRoleDistributionData] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('6');

  // Fetch all analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [analytics, userGrowth, roleDistribution, activity] = await Promise.all([
        adminAPI.getAnalyticsDataByAdmin(),
        adminAPI.getUserGrowthDataByAdmin(selectedPeriod),
        adminAPI.getRoleDistributionByAdmin(),
        adminAPI.getRecentActivityByAdmin('30'), // getRecentActivity
      ]);

      setAnalyticsData(analytics);
      setUserGrowthData(userGrowth);
      setRoleDistributionData(roleDistribution);
      // console.log(roleDistribution)
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  // Handle period change for user growth chart
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <AnalyticsHeader />
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner message="Loading analytics data..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <AnalyticsHeader />
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="mt-4 flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }
  console.log(analyticsData)
  // Stats configuration
  // Calculate combined total
  const totalTeachers = roleDistributionData?.distribution?.find((item) => item.role === 'teacher')?.count || 0;
  const totalStudents = roleDistributionData?.distribution?.find((item) => item.role === 'student')?.count || 0;
  let combinedTotal = totalTeachers + totalStudents;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents || analyticsData.Total_Student_Count || 0,
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
      change: `+${combinedTotal}`,
      changeLabel: 'new this month',
    },
    {
      label: 'Total Teachers',
      value: totalTeachers || analyticsData.Total_Teacher_Count || 0,
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
      change: `+${combinedTotal}`,
      changeLabel: 'new this month',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <AnalyticsHeader />
        <button
          onClick={fetchAnalyticsData}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value.toLocaleString()}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            changeLabel={stat.changeLabel}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart
          data={userGrowthData}
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />
        <RoleDistributionChart data={roleDistributionData} />
      </div>

      {/* Recent Activity Section */}
      <RecentActivitySection data={recentActivity} />
    </div>
  );
};

export default Analytics;


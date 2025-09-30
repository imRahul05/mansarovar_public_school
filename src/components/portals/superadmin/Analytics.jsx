import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../../../services/api';
import UserGrowthChart from './analytics/UserGrowthChart';
import StatsGrid from './analytics/StatsGrid';
import RoleDistributionChart from './analytics/RoleDistributionChart';
import RecentActivitySection from './analytics/RecentActivitySection';
import AnalyticsHeader from './analytics/AnalyticsHeader';AnalyticsHeader
import ErrorState from './analytics/ErrorState'; 
import LoadingState from './analytics/LoadingState'; // Assuming you have a LoadingState component
const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [roleDistributionData, setRoleDistributionData] = useState(null);
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('6');

  // Fetch all analytics data
  const fetchAnalyticsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [analytics, userGrowth, roleDistribution, activity] = await Promise.all([
        adminAPI.getAnalyticsData(),
        adminAPI.getUserGrowthData(selectedPeriod),
        adminAPI.getRoleDistribution(),
        adminAPI.getRecentActivity('30')
      ]);

      setAnalyticsData(analytics);
      setUserGrowthData(userGrowth);
      setRoleDistributionData(roleDistribution);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Failed to load analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  },[selectedPeriod]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Handle period change for user growth chart
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={fetchAnalyticsData} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnalyticsHeader onRefresh={fetchAnalyticsData} />

      {/* Stats Grid */}
      <StatsGrid analyticsData={analyticsData} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <UserGrowthChart 
          data={userGrowthData} 
          selectedPeriod={selectedPeriod}
          onPeriodChange={handlePeriodChange}
        />

        {/* Role Distribution Chart */}
        <RoleDistributionChart data={roleDistributionData} />
      </div>

      {/* Recent Activity Section */}
      <RecentActivitySection data={recentActivity} />
    </div>
  );
};

export default Analytics;

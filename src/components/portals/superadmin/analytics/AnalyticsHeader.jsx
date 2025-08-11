import { RefreshCw } from 'lucide-react';

const AnalyticsHeader = ({ onRefresh }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="mt-2 text-sm text-gray-700">
          Comprehensive overview of system usage and user statistics.
        </p>
      </div>
      <button
        onClick={onRefresh}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh Data
      </button>
    </div>
  );
};

export default AnalyticsHeader;

import { RefreshCw } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="mt-2 text-sm text-gray-700">Loading analytics data...</p>
      </div>
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    </div>
  );
};

export default LoadingState;

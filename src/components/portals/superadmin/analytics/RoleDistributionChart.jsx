import Plot from 'react-plotly.js';

const RoleDistributionChart = ({ data }) => {
  // Add debugging
  console.log('RoleDistributionChart received data:', data);
  
  if (!data || !data.distribution || !Array.isArray(data.distribution)) {
    console.warn('Invalid data structure in RoleDistributionChart:', data);
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Roles Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  // Filter out invalid data items and log them
  const validDistribution = data.distribution.filter(item => {
    const isValid = item && 
      typeof item === 'object' && 
      item.role && 
      typeof item.role === 'string' &&
      typeof item.count === 'number' &&
      item.count >= 0;
    
    if (!isValid) {
      console.warn('Invalid distribution item found:', item);
    }
    
    return isValid;
  });

  if (validDistribution.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">User Roles Distribution</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No valid data available</p>
        </div>
      </div>
    );
  }

  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  const plotData = [{
    values: validDistribution.map(item => item.count || 0),
    labels: validDistribution.map(item => {
      const role = item.role || 'unknown';
      return role.charAt(0).toUpperCase() + role.slice(1);
    }),
    type: 'pie',
    textinfo: 'label+percent',
    textposition: 'outside',
    textfont: {
      size: 12,
      color: '#374151'
    },
    marker: {
      colors: colors.slice(0, validDistribution.length)
    },
    hole: 0.4,
    // pull: 0.05
  }];

  const layout = {
    title: {
      text: 'User Roles Distribution',
      font: { size: 16, color: '#1F2937' }
    },
    margin: { t: 80, b: 80, l: 80, r: 80 },
    height: 400,
    showlegend: true,
    legend: { 
      x: 0, 
      y: -0.1,
      orientation: 'h',
      xanchor: 'left'
    },
    font: {
      family: 'Inter, system-ui, sans-serif'
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Roles Distribution</h3>
        <p className="text-sm text-gray-500">Total: {data.totalUsers || 0} users</p>
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

export default RoleDistributionChart;

import Plot from 'react-plotly.js';

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

  const plotData = [{
    values: data.distribution.map(item => item.count),
    labels: data.distribution.map(item => item.role.charAt(0).toUpperCase() + item.role.slice(1)),
    type: 'pie',
    textinfo: 'label+percent',
    textposition: 'outside',
    marker: {
      colors: colors.slice(0, data.distribution.length)
    },
    hole: 0.4
  }];

  const layout = {
    title: 'User Roles Distribution',
    margin: { t: 60, b: 40, l: 40, r: 40 },
    height: 350,
    showlegend: true,
    legend: { x: 0, y: 0 }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Roles Distribution</h3>
        <p className="text-sm text-gray-500">Total: {data.totalUsers} users</p>
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

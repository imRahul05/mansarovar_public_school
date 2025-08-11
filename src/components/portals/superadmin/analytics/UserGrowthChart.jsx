import Plot from 'react-plotly.js';

const UserGrowthChart = ({ data, selectedPeriod, onPeriodChange }) => {
  const periods = [
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' }
  ];

  const plotData = [
    {
      x: data.map(item => item.month),
      y: data.map(item => item.registrations),
      type: 'bar',
      name: 'New Registrations',
      marker: { color: '#3B82F6' },
    },
    {
      x: data.map(item => item.month),
      y: data.map(item => item.verifications),
      type: 'bar',
      name: 'Verifications',
      marker: { color: '#10B981' },
    },
    {
      x: data.map(item => item.month),
      y: data.map(item => item.cumulative),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Total Users',
      line: { color: '#8B5CF6', width: 3 },
      marker: { color: '#8B5CF6', size: 6 },
      yaxis: 'y2'
    }
  ];

  const layout = {
    title: 'User Growth Trends',
    xaxis: { title: 'Month' },
    yaxis: { title: 'New Users', side: 'left' },
    yaxis2: {
      title: 'Total Users',
      side: 'right',
      overlaying: 'y'
    },
    legend: { x: 0, y: 1.1, orientation: 'h' },
    margin: { t: 60, b: 40, l: 60, r: 60 },
    height: 350
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
        <div className="flex space-x-2">
          {periods.map(period => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedPeriod === period.value
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

export default UserGrowthChart;

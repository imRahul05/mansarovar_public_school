import React from 'react';
import Plot from 'react-plotly.js';

const TeacherStudentRatioChart = ({ data = [], loading, error }) => {
  if (loading || error || !data || data.length === 0) {
    return null;
  }

  // Sort data by class
  const sortedData = [...data].sort((a, b) => {
    // Handle Nursery, LKG, UKG first
    if (a.class === 'Nursery') return -1;
    if (b.class === 'Nursery') return 1;
    if (a.class === 'LKG') return -1;
    if (b.class === 'LKG') return 1;
    if (a.class === 'UKG') return -1;
    if (b.class === 'UKG') return 1;
    
    // Then numeric classes
    if (!isNaN(a.class) && !isNaN(b.class)) {
      return parseInt(a.class) - parseInt(b.class);
    }
    return a.class.localeCompare(b.class);
  });

  const plotData = [
    {
      x: sortedData.map(item => item.class),
      y: sortedData.map(item => item.ratio),
      type: 'bar',
      name: 'Student-Teacher Ratio',
      marker: {
        color: sortedData.map(item => {
          // Color based on ratio (lower is better)
          if (item.ratio <= 15) return '#10B981'; // Green for good ratio
          if (item.ratio <= 25) return '#F59E0B'; // Yellow for medium ratio
          return '#EF4444'; // Red for high ratio
        }),
      },
      text: sortedData.map(item => `${item.ratio}:1`),
      textposition: 'auto',
      hoverinfo: 'x+text',
      hovertemplate: 
        '<b>Class %{x}</b><br>' +
        'Students: %{customdata[0]}<br>' +
        'Teachers: %{customdata[1]}<br>' +
        'Ratio: %{y}:1<extra></extra>',
      customdata: sortedData.map(item => [item.totalStudents, item.totalTeachers])
    }
  ];

  const layout = {
    title: {
      text: 'Student-Teacher Ratio by Class',
      font: { size: 14, color: '#1F2937' }
    },
    xaxis: { 
      title: 'Class',
      tickangle: -45,
      automargin: true,
      titlefont: { size: 12 }
    },
    yaxis: { 
      title: 'Student-Teacher Ratio',
      gridcolor: '#E5E7EB',
      automargin: true,
      titlefont: { size: 12 }
    },
    margin: { t: 50, b: 60, l: 50, r: 20 },
    height: 300,
    plot_bgcolor: '#FFFFFF',
    paper_bgcolor: '#FFFFFF',
    bargap: 0.3,
    autosize: true
  };

  // Calculate average ratio
  const avgRatio = sortedData.reduce((sum, item) => sum + item.ratio, 0) / sortedData.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Teacher-Student Ratio</h3>
        <div className="flex space-x-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            Avg. Ratio: {avgRatio.toFixed(1)}:1
          </span>
        </div>
      </div>
      <div className="w-full h-[300px] overflow-hidden">
        <Plot
          data={plotData}
          layout={{
            ...layout,
            height: 300,
            autosize: true
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  );
};

export default TeacherStudentRatioChart;

import React from 'react';
import Plot from 'react-plotly.js';

const TeacherStudentRatioChart = ({ data = [], loading, error }) => {
  if (loading || error || !data || data.length === 0) {
    return null;
  }

  // Sort data by class for consistent display
  const sortedData = [...data].sort((a, b) => {
    // Handle Nursery, LKG, UKG first
    if (a.class === 'Nursery') return -1;
    if (b.class === 'Nursery') return 1;
    if (a.class === 'LKG') return -1;
    if (b.class === 'LKG') return 1;
    if (a.class === 'UKG') return -1;
    if (b.class === 'UKG') return 1;
    
    // Handle numeric vs non-numeric classes
    if (!isNaN(a.class) && !isNaN(b.class)) {
      return Number(a.class) - Number(b.class);
    }
    return a.class.localeCompare(b.class);
  });

  // Process data for visualization
  const classes = sortedData.map(item => item.class);
  const ratios = sortedData.map(item => item.ratio);
  const students = sortedData.map(item => item.totalStudents);
  const teachers = sortedData.map(item => item.totalTeachers);
  
  // Prepare custom data for hover information
  const customdata = sortedData.map(item => [
    item.totalStudents,
    item.totalTeachers
  ]);

  // Chart configuration
  const chartData = [
    {
      x: classes,
      y: ratios,
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
      customdata: customdata,
      hovertemplate: 
        '<b>Class %{x}</b><br>' +
        'Students: %{customdata[0]}<br>' +
        'Teachers: %{customdata[1]}<br>' +
        'Ratio: %{y}:1<extra></extra>'
    }
  ];

  const layout = {
    title: 'Teacher-Student Ratio by Class',
    xaxis: {
      title: 'Class',
      tickangle: -45
    },
    yaxis: {
      title: 'Ratio (students per teacher)'
    },
    margin: {
      l: 60,
      r: 40,
      t: 80,
      b: 80
    },
    autosize: true
  };

  return (
    <Plot
      data={chartData}
      layout={layout}
      config={{ responsive: true }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
};

export default TeacherStudentRatioChart;

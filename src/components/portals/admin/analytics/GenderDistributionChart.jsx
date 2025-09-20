import React from 'react';
import Plot from 'react-plotly.js';

const GenderDistributionChart = ({ data = [], isTeachers = false, loading, error }) => {
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

  // Calculate total counts by gender
  const totalMale = sortedData.reduce((sum, item) => sum + (item.male || 0), 0);
  const totalFemale = sortedData.reduce((sum, item) => sum + (item.female || 0), 0);
  const totalOther = sortedData.reduce((sum, item) => sum + (item.other || 0), 0);

  const plotData = [
    {
      values: [totalMale, totalFemale, totalOther],
      labels: ['Male', 'Female', 'Other'],
      type: 'pie',
      name: isTeachers ? 'Teachers' : 'Students',
      hole: 0.4,
      marker: {
        colors: ['#3B82F6', '#EC4899', '#8B5CF6']
      },
      textinfo: 'label+percent',
      textposition: 'outside',
      title: isTeachers ? 'Teachers' : 'Students'
    }
  ];

  const layout = {
    title: {
      text: isTeachers ? 'Teacher Gender Distribution' : 'Student Gender Distribution',
      font: { size: 16, color: '#1F2937' }
    },
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.1
    },
    margin: { t: 80, b: 80, l: 40, r: 40 },
    height: 400
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={{ responsive: true, displayModeBar: false }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler={true}
    />
  );
};

export default GenderDistributionChart;

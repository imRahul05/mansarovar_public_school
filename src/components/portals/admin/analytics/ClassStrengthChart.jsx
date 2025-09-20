import React from 'react';
import Plot from 'react-plotly.js';

const ClassStrengthChart = ({ data = [], showAgeDistribution = false, loading, error }) => {
  if (loading || error || !data || data.length === 0) {
    return null;
  }
  
  // Sort data by class for consistent display
  const sortedData = [...data].sort((a, b) => {
    // Handle numeric vs non-numeric classes
    if (!isNaN(a.class) && !isNaN(b.class)) {
      return Number(a.class) - Number(b.class);
    }
    return a.class.localeCompare(b.class);
  });

  // Prepare data for the chart
  const classes = sortedData.map(item => item.class);
  const studentCounts = sortedData.map(item => item.totalStudents);
  
  const plotData = [
    {
      x: classes,
      y: studentCounts,
      type: 'bar',
      name: 'Student Count',
      marker: {
        color: 'rgba(55, 128, 191, 0.7)',
        line: {
          color: 'rgba(55, 128, 191, 1.0)',
          width: 1
        }
      }
    }
  ];

  // Add age data if requested
  if (showAgeDistribution) {
    const avgAges = sortedData.map(item => item.avgAge);
    
    plotData.push({
      x: classes,
      y: avgAges,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Avg Age',
      yaxis: 'y2',
      marker: {
        size: 8,
        color: 'rgba(219, 64, 82, 0.7)',
      },
      line: {
        color: 'rgba(219, 64, 82, 0.7)',
        width: 2
      }
    });
  }

  const layout = {
    title: {
      text: showAgeDistribution ? 'Class Strength & Age Distribution' : 'Class Strength Distribution',
      font: { size: 16, color: '#1F2937' }
    },
    xaxis: {
      title: 'Class',
      tickangle: -45,
      automargin: true
    },
    yaxis: {
      title: 'Number of Students',
      side: 'left',
      automargin: true
    },
    yaxis2: showAgeDistribution ? {
      title: 'Average Age (years)',
      side: 'right',
      overlaying: 'y',
      automargin: true
    } : {},
    legend: {
      orientation: 'h',
      y: -0.15,
      xanchor: 'center',
      x: 0.5
    },
    margin: {
      l: 60,
      r: 50,
      b: 70,
      t: 60
    },
    autosize: true,
    plot_bgcolor: '#FFFFFF',
    paper_bgcolor: '#FFFFFF'
  };

  return (
    <div className="w-full h-full">
      <Plot
        data={plotData}
        layout={{
          ...layout,
          height: 350,
          autosize: true
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
};

export default ClassStrengthChart;

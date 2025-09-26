import React from 'react';
import Plot from 'react-plotly.js';
//showProjection = false
const AcademicYearTrendsChart = ({ data = [], teacherData = [], loading, error }) => {
  if (loading || error || !data || data.length === 0) {
    return null;
  }

  // Format teacher data to match academic years
  const formattedTeacherData = teacherData && teacherData.length ? teacherData.map(item => ({
    academicYear: `${item._id?.year}-${item._id?.year + 1}`,
    teacherCount: item.teacherCount
  })) : [];

  // Combine both datasets for all years
  const allYears = [...new Set([
    ...data.map(item => item.academicYear),
    ...formattedTeacherData.map(item => item.academicYear)
  ])].sort();

  const plotData = [
    {
      x: allYears,
      y: allYears.map(year => {
        const match = data.find(item => item.academicYear === year);
        return match ? match.studentCount : 0;
      }),
      type: 'bar',
      name: 'Students',
      marker: { color: '#3B82F6' }
    },
    {
      x: allYears,
      y: allYears.map(year => {
        const match = formattedTeacherData.find(item => item.academicYear === year);
        return match ? match.teacherCount : 0;
      }),
      type: 'bar',
      name: 'Teachers',
      marker: { color: '#10B981' }
    }
  ];

  const layout = {
    title: {
      text: 'Enrollment & Recruitment Trends by Academic Year',
      font: { size: 14, color: '#1F2937' }
    },
    xaxis: { 
      title: 'Academic Year',
      tickangle: -45,
      automargin: true,
      titlefont: { size: 12 }
    },
    yaxis: { 
      title: 'Count',
      gridcolor: '#E5E7EB',
      automargin: true,
      titlefont: { size: 12 }
    },
    legend: {
      orientation: 'h',
      y: -0.2,
      xanchor: 'center',
      x: 0.5,
      font: { size: 11 }
    },
    barmode: 'group',
    margin: { t: 50, b: 70, l: 50, r: 20 },
    height: 300,
    plot_bgcolor: '#FFFFFF',
    paper_bgcolor: '#FFFFFF',
    bargap: 0.15,
    bargroupgap: 0.1
  };

  // Calculate totals
  const totalStudents = data.reduce((sum, item) => sum + item.studentCount, 0);
  const totalTeachers = formattedTeacherData.reduce((sum, item) => sum + item.teacherCount, 0);
  
  // Calculate growth rates
  let studentGrowth = 0;
  let teacherGrowth = 0;
  
  if (data.length >= 2) {
    const sorted = [...data].sort((a, b) => a.academicYear.localeCompare(b.academicYear));
    const current = sorted[sorted.length - 1].studentCount;
    const previous = sorted[sorted.length - 2].studentCount;
    studentGrowth = previous ? ((current - previous) / previous * 100).toFixed(1) : 0;
  }
  
  if (formattedTeacherData.length >= 2) {
    const sorted = [...formattedTeacherData].sort((a, b) => a.academicYear.localeCompare(b.academicYear));
    const current = sorted[sorted.length - 1].teacherCount;
    const previous = sorted[sorted.length - 2].teacherCount;
    teacherGrowth = previous ? ((current - previous) / previous * 100).toFixed(1) : 0;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Academic Year Trends</h3>
        <div className="flex space-x-3">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            Students: {totalStudents} ({studentGrowth >= 0 ? '+' : ''}{studentGrowth}%)
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
            Teachers: {totalTeachers} ({teacherGrowth >= 0 ? '+' : ''}{teacherGrowth}%)
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

export default AcademicYearTrendsChart;

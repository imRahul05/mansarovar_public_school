import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AttendanceAnalyticsChart = ({ attendanceData, loading, error }) => {
  const [chartConfig, setChartConfig] = useState({
    data: [],
    layout: {}
  });

  useEffect(() => {
    if (attendanceData && !loading) {
      // Transform data for visualization
      const classes = attendanceData.map(item => item.class);
      const attendance = attendanceData.map(item => item.averageAttendance);
      
      // Create chart configuration
      setChartConfig({
        data: [
          {
            x: classes,
            y: attendance,
            type: 'bar',
            marker: {
              color: 'rgba(55, 128, 191, 0.7)',
              line: {
                color: 'rgba(55, 128, 191, 1.0)',
                width: 1
              }
            }
          }
        ],
        layout: {
          title: 'Average Attendance by Class',
          font: {
            family: 'Arial, sans-serif'
          },
          xaxis: {
            title: 'Class',
            tickangle: -45
          },
          yaxis: {
            title: 'Average Attendance (%)',
            range: [0, 100]
          },
          margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
          },
          autosize: true
        }
      });
    }
  }, [attendanceData, loading]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">Error loading attendance data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!attendanceData || attendanceData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No attendance data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Analytics</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <Plot
          data={chartConfig.data}
          layout={chartConfig.layout}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </CardContent>
    </Card>
  );
};

export default AttendanceAnalyticsChart;

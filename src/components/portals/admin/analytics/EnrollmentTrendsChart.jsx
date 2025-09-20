import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const EnrollmentTrendsChart = ({ enrollmentData, loading, error }) => {
  const [chartConfig, setChartConfig] = useState({
    data: [],
    layout: {}
  });

  useEffect(() => {
    if (enrollmentData && !loading) {
      // Transform data for visualization
      const years = enrollmentData.map(item => item.year);
      const enrollments = enrollmentData.map(item => item.enrollmentCount);
      
      // Create chart configuration
      setChartConfig({
        data: [
          {
            x: years,
            y: enrollments,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: 'rgba(75, 192, 192, 1)',
              size: 8
            },
            line: {
              color: 'rgba(75, 192, 192, 0.7)',
              width: 2
            }
          }
        ],
        layout: {
          title: 'Enrollment Trends by Year',
          font: {
            family: 'Arial, sans-serif'
          },
          xaxis: {
            title: 'Academic Year',
            tickmode: 'array',
            tickvals: years
          },
          yaxis: {
            title: 'Number of Students Enrolled'
          },
          margin: {
            l: 50,
            r: 50,
            b: 70,
            t: 100,
            pad: 4
          },
          autosize: true
        }
      });
    }
  }, [enrollmentData, loading]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
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
          <CardTitle>Enrollment Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">Error loading enrollment data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!enrollmentData || enrollmentData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No enrollment data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrollment Trends</CardTitle>
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

export default EnrollmentTrendsChart;

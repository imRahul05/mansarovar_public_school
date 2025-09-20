import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PerformanceAnalyticsChart = ({ performanceData, loading, error }) => {
  const [chartConfig, setChartConfig] = useState({
    data: [],
    layout: {}
  });

  useEffect(() => {
    if (performanceData && !loading) {
      // Transform data for visualization
      const subjects = performanceData.map(item => item.subject);
      const averageScores = performanceData.map(item => item.averageScore);
      
      // Create chart configuration
      setChartConfig({
        data: [
          {
            x: subjects,
            y: averageScores,
            type: 'bar',
            marker: {
              color: 'rgba(102, 187, 106, 0.7)',
              line: {
                color: 'rgba(102, 187, 106, 1.0)',
                width: 1
              }
            }
          }
        ],
        layout: {
          title: 'Average Performance by Subject',
          font: {
            family: 'Arial, sans-serif'
          },
          xaxis: {
            title: 'Subject',
            tickangle: -45
          },
          yaxis: {
            title: 'Average Score (%)',
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
  }, [performanceData, loading]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
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
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">Error loading performance data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!performanceData || performanceData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No performance data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
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

export default PerformanceAnalyticsChart;

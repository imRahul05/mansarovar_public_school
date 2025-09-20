import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw, BarChart3, GraduationCap, Users, BookOpen } from 'lucide-react';
import { toast } from "sonner";
import { adminAPI } from '@/services/api';

import StatCard from './StatCard';
import ClassStrengthChart from './ClassStrengthChart';
import GenderDistributionChart from './GenderDistributionChart';
import TeacherStudentRatioChart from './TeacherStudentRatioChart';
import AcademicYearTrendsChart from './AcademicYearTrendsChart';
import AttendanceAnalyticsChart from './AttendanceAnalyticsChart';
import PerformanceAnalyticsChart from './PerformanceAnalyticsChart';
import EnrollmentTrendsChart from './EnrollmentTrendsChart';
// No mock data - actual data will be loaded from API

const AdminAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Process data for different charts
  const classStrengthData = analyticsData?.classStrengthAgeDistribution || [];
  const genderDistributionStudents = analyticsData?.femaleVsMaleStudents || [];
  const genderDistributionTeachers = analyticsData?.femaleVsMaleTeachers || [];
  const teacherStudentRatio = analyticsData?.teacherStudentRatio || [];
  const academicYearTrends = analyticsData?.academicYearTrends || [];
  const teacherJoinTrends = analyticsData?.teacherJoinTrends || [];
  const totalTeachers = analyticsData?.Total_Teacher_Count || 0;
  const totalStudents = analyticsData?.Total_Student_Count || 0;
  const allTeachers = analyticsData?.allTeachers || [];
  const allStudents = analyticsData?.allStudents || [];

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Real API call to get analytics data
      const response = await adminAPI.getAnalyticsDataByAdmin();
      // Check if we have the data in the expected format
      if (response && response.data) {
        setAnalyticsData(response.data);
        console.log("Analytics data loaded:", response.data);
      } else {
        setAnalyticsData(response); // Fallback if data is not in .data property
        console.log("Analytics data:", response);
      }
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Failed to load analytics data. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load analytics data'
      });
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = () => {
    fetchData();
    toast({
      title: 'Refreshing Data',
      description: 'Analytics data is being updated'
    });
  };

  // Download analytics report
  const handleDownload = () => {
    // In a real app, this would generate a PDF report or CSV export
    toast({
      title: 'Report Downloaded',
      description: 'Analytics report has been downloaded successfully'
    });
  };

  // Initialize data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into school performance and trends
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={loading}
            className="!border-gray-300 !bg-white !text-gray-700 hover:!bg-gray-50 hover:!text-gray-900 px-4 py-2 rounded-md border shadow-sm"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button 
            variant="default"
            onClick={handleDownload}
            className="!bg-blue-600 !text-white hover:!bg-blue-700 px-4 py-2 rounded-md shadow-sm border-0"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 !bg-gray-100 !border !border-gray-200 rounded-lg p-1 w-full max-w-full h-12">
          <TabsTrigger 
            value="overview"
            className="!bg-white !text-gray-700 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white hover:!bg-gray-50 hover:!text-gray-900 px-2 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="academic"
            className="!bg-white !text-gray-700 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white hover:!bg-gray-50 hover:!text-gray-900 px-2 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Academic Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="demographic"
            className="!bg-white !text-gray-700 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white hover:!bg-gray-50 hover:!text-gray-900 px-2 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Demographics
          </TabsTrigger>
          <TabsTrigger 
            value="trends"
            className="!bg-white !text-gray-700 data-[state=active]:!bg-blue-600 data-[state=active]:!text-white hover:!bg-gray-50 hover:!text-gray-900 px-2 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            Trends & Forecasts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-10 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                icon={<Users className="text-white h-6 w-6" />}
                label="Total Students"
                value={totalStudents}
                color="bg-blue-500"
                change={`+${analyticsData?.academicYearTrends?.length > 1 ? 
                  analyticsData?.academicYearTrends[analyticsData.academicYearTrends.length - 1].studentCount - 
                  analyticsData?.academicYearTrends[analyticsData.academicYearTrends.length - 2].studentCount : 0}`}
                changeLabel="from last year"
              />
              <StatCard 
                icon={<GraduationCap className="text-white h-6 w-6" />}
                label="Teachers"
                value={totalTeachers}
                color="bg-green-500"
                change={`+${teacherJoinTrends?.length > 1 ? 
                  teacherJoinTrends[teacherJoinTrends.length - 1].teacherCount - 
                  teacherJoinTrends[teacherJoinTrends.length - 2].teacherCount : 0}`}
                changeLabel="from last year"
              />
              <StatCard 
                icon={<BarChart3 className="text-white h-6 w-6" />}
                label="Classes Covered"
                value={teacherStudentRatio?.length || 0}
                color="bg-purple-500"
              />
              <StatCard 
                icon={<BookOpen className="text-white h-6 w-6" />}
                label="Subjects Taught"
                value={Array.from(new Set(allTeachers?.flatMap(teacher => teacher.subjectsSpecialization || []))).length || 0}
                color="bg-amber-500"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Strength Distribution</CardTitle>
                <CardDescription>
                  Number of students per class
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[420px] flex items-center justify-center overflow-hidden">
                {loading ? (
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : error ? (
                  <p className="text-red-500">Error loading data: {error}</p>
                ) : (
                  <div className="w-full h-full">
                    <ClassStrengthChart 
                      data={classStrengthData} 
                      loading={loading} 
                      error={error} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Teacher-Student Ratio</CardTitle>
                <CardDescription>
                  Ratio of teachers to students by class
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[420px] flex items-center justify-center overflow-hidden">
                {loading ? (
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : error ? (
                  <p className="text-red-500">Error loading data: {error}</p>
                ) : (
                  <div className="w-full h-full">
                    <TeacherStudentRatioChart 
                      data={teacherStudentRatio} 
                      loading={loading} 
                      error={error} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Academic Year Trends</CardTitle>
              <CardDescription>
                Student enrollment trends by academic year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[420px] flex items-center justify-center overflow-hidden">
              {loading ? (
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : error ? (
                <p className="text-red-500">Error loading data: {error}</p>
              ) : (
                <div className="w-full h-full">
                  <AcademicYearTrendsChart 
                    data={academicYearTrends} 
                    teacherData={teacherJoinTrends}
                    loading={loading} 
                    error={error} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>
                Detailed insights into student academic achievements across subjects and grades
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="w-full text-center">
                  <p>Academic Analytics Content - To be implemented</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>
                  Analysis of student population by age, gender, and other factors
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                {loading ? (
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <GenderDistributionChart 
                      data={genderDistributionStudents}
                      loading={loading} 
                      error={error} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Teacher Demographics</CardTitle>
                <CardDescription>
                  Analysis of teaching staff by experience, qualifications, and specializations
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[400px] flex items-center justify-center">
                {loading ? (
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="text-center w-full">
                    <GenderDistributionChart 
                      data={genderDistributionTeachers}
                      isTeachers={true}
                      loading={loading} 
                      error={error} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Class Strength Analysis</CardTitle>
              <CardDescription>
                Distribution of students across different classes and sections
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="text-center w-full">
                  <ClassStrengthChart 
                    data={classStrengthData} 
                    showAgeDistribution={true}
                    loading={loading} 
                    error={error} 
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teacher-Student Ratio</CardTitle>
              <CardDescription>
                Analysis of teacher to student ratio across different classes
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <TeacherStudentRatioChart 
                  data={teacherStudentRatio} 
                  loading={loading} 
                  error={error} 
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
              <CardDescription>
                Historical enrollment data and future projections
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] flex items-center justify-center">
              {loading ? (
                <div className="w-full space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="text-center w-full">
                  <AcademicYearTrendsChart 
                    data={academicYearTrends}
                    loading={loading} 
                    error={error} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Additional trend charts would go here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalyticsDashboard;

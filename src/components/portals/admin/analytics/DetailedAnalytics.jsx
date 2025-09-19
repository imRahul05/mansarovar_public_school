import React from 'react';
import ClassStrengthChart from './ClassStrengthChart';
import GenderDistributionChart from './GenderDistributionChart';
import TeacherStudentRatioChart from './TeacherStudentRatioChart';
import AcademicYearTrendsChart from './AcademicYearTrendsChart';
import { ArrowLeft } from 'lucide-react';

const DetailedAnalytics = ({ data, onBack }) => {
  if (!data) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Analytics</h2>
        </div>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading data...</p>
        </div>
      </div>
    );
  }

  const {
    classStrengthAgeDistribution,
    femaleVsMaleStudents,
    femaleVsMaleTeachers,
    teacherStudentRatio,
    academicYearTrends,
    teacherJoinTrends,
    Total_Teacher_Count,
    Total_Student_Count
  } = data;

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <button 
            onClick={onBack} 
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Detailed Analytics</h2>
        </div>
        <p className="ml-12 text-gray-600">Comprehensive analysis of school data</p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700">Total Students</p>
            <p className="text-2xl font-bold text-blue-900">{Total_Student_Count}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700">Total Teachers</p>
            <p className="text-2xl font-bold text-green-900">{Total_Teacher_Count}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClassStrengthChart data={classStrengthAgeDistribution} />
        <GenderDistributionChart 
          studentData={femaleVsMaleStudents} 
          teacherData={femaleVsMaleTeachers} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeacherStudentRatioChart data={teacherStudentRatio} />
        <AcademicYearTrendsChart 
          studentData={academicYearTrends} 
          teacherData={teacherJoinTrends}
        />
      </div>
      
      {/* Spacer for bottom margin */}
      <div className="h-6"></div>
    </div>
  );
};

export default DetailedAnalytics;

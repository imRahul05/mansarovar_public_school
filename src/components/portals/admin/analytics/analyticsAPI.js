import React from 'react';
import { adminAPI } from '../../../services/api';

// Export analytics related API endpoints
export const getAdminAnalyticsData = async () => {
  try {
    return await adminAPI.getAnalyticsDataByAdmin();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
};

export const getAttendanceAnalyticsData = async (period = '30') => {
  try {
    return await adminAPI.getAttendanceAnalytics(period);
  } catch (error) {
    console.error('Error fetching attendance analytics:', error);
    throw error;
  }
};

export const getPerformanceAnalyticsData = async (classId = null) => {
  try {
    return await adminAPI.getPerformanceAnalytics(classId);
  } catch (error) {
    console.error('Error fetching performance analytics:', error);
    throw error;
  }
};

export const getEnrollmentTrendsData = async (years = 5) => {
  try {
    return await adminAPI.getEnrollmentTrends(years);
  } catch (error) {
    console.error('Error fetching enrollment trends:', error);
    throw error;
  }
};

export const getClassStrengthData = async () => {
  try {
    return await adminAPI.getClassStrength();
  } catch (error) {
    console.error('Error fetching class strength data:', error);
    throw error;
  }
};

export const getGenderDistributionData = async () => {
  try {
    return await adminAPI.getGenderDistribution();
  } catch (error) {
    console.error('Error fetching gender distribution data:', error);
    throw error;
  }
};

export const getTeacherStudentRatioData = async () => {
  try {
    return await adminAPI.getTeacherStudentRatio();
  } catch (error) {
    console.error('Error fetching teacher-student ratio data:', error);
    throw error;
  }
};

export const getAcademicYearTrendsData = async () => {
  try {
    return await adminAPI.getAcademicYearTrends();
  } catch (error) {
    console.error('Error fetching academic year trends:', error);
    throw error;
  }
};

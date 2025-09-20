import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, PieChart, AreaChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalyticsButton = () => {
  return (
    <Link to="/portal/admin/analytics-dashboard">
      <Button variant="default" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
        <BarChart className="h-4 w-4" />
        Advanced Analytics
      </Button>
    </Link>
  );
};

// This is a preview component that can be used on the admin dashboard
const AnalyticsPreview = () => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Analytics Overview</h3>
          <AnalyticsButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
            <BarChart className="h-8 w-8 text-blue-500 mb-2" />
            <h4 className="font-medium text-blue-700">Class Analytics</h4>
            <p className="text-sm text-gray-600 text-center">View student attendance and performance by class</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
            <PieChart className="h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-medium text-green-700">Demographics</h4>
            <p className="text-sm text-gray-600 text-center">Analyze student and teacher distribution</p>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
            <AreaChart className="h-8 w-8 text-purple-500 mb-2" />
            <h4 className="font-medium text-purple-700">Trends</h4>
            <p className="text-sm text-gray-600 text-center">Track enrollment and performance trends over time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { AnalyticsButton, AnalyticsPreview };

import React from 'react';
import { BarChart3, Users, GraduationCap, BookOpen } from 'lucide-react';

const StatCard = ({ icon, label, value, color, change, changeLabel }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && changeLabel && (
            <p className="text-xs text-green-600">{change} {changeLabel}</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;

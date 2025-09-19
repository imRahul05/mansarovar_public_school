import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../../../components/portals/admin/AdminSidebar';
import CreateUser from '../../../components/portals/admin/CreateUser';
import UserList from '../../../components/portals/admin/UserList';
import Analytics from '../../../components/portals/admin/Analytics';
import Settings from '../../../components/portals/admin/Settings';
import AdminAnalyticsDashboard from '../../../components/portals/admin/analytics/AdminAnalyticsDashboard';
// import UserDetails from '@/components/portals/admin/UserDetails';

import UserDetails from '../../../components/portals/admin/UserDetails';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage students and teachers</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<CreateUser />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/:id" element={<UserDetails/>} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="analytics-dashboard" element={<AdminAnalyticsDashboard />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

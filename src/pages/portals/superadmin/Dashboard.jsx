import { Routes, Route } from 'react-router-dom';
import SuperadminSidebar from '../../../components/portals/superadmin/SuperadminSidebar';
import UserManagement from '../../../components/portals/superadmin/UserManagement';
import UserDetails from '../../../components/portals/superadmin/UserDetails';
import Analytics from '../../../components/portals/superadmin/Analytics';
import Settings from '../../../components/portals/superadmin/Settings';

const SuperadminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SuperadminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Superadmin Dashboard</h1>
            <p className="text-gray-600">Manage all users and system settings</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<UserManagement />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperadminDashboard;

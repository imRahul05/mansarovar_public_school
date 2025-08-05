import { Routes, Route } from 'react-router-dom';
import TeacherSidebar from '../../../components/portals/teacher/TeacherSidebar';
import TeacherHome from '../../../components/portals/teacher/TeacherHome';

const TeacherDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <TeacherSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Teacher Portal</h1>
            <p className="text-gray-600">Manage your classes and students</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route index element={<TeacherHome />} />
              <Route path="home" element={<TeacherHome />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
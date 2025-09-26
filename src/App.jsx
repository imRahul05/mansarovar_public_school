import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout components
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Facilities = lazy(() => import('./pages/Facilities'));
const NoticeBoard = lazy(() => import('./pages/NoticeBoard'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

// Auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Portal pages
const StudentDashboard = lazy(() => import('./pages/portals/student/Dashboard'));
const TeacherDashboard = lazy(() => import('./pages/portals/teacher/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/portals/admin/Dashboard'));
const SuperadminDashboard = lazy(() => import('./pages/portals/superadmin/Dashboard'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-3 text-gray-700">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="academics" element={<Academics />} />
              <Route path="admissions" element={<Admissions />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="noticeboard" element={<NoticeBoard />} />
              <Route path="events" element={<Events />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            
            {/* Auth Routes */}
            <Route path="auth">
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Protected Portal Routes */}
            <Route path="portal" element={<DashboardLayout />}>
              <Route path="student/*" element={<StudentDashboard />} />
              <Route path="teacher/*" element={<TeacherDashboard />} />
              <Route path="admin/*" element={<AdminDashboard />} />
              <Route path="superadmin/*" element={<SuperadminDashboard />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        {/* Toast notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 900,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 1000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you are looking for might have been removed or is temporarily unavailable.</p>
        <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default App;

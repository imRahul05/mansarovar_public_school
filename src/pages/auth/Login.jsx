import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ButtonLoadingSpinner from '../../components/common/ButtonLoadingSpinner';
import { guestCredentials, guestRoles } from '../../data/guestCredentials';
import logo from '../../assets/images/logo.jpeg'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guestLoading, setGuestLoading] = useState(
    guestRoles.reduce((acc, role) => ({ ...acc, [role]: false }), {})
  );
  
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const redirectPath = getRedirectPath(currentUser.role);
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, navigate]);

  const getRedirectPath = (role) => {
    const from = location.state?.from?.pathname;
    if (from) return from;
    
    switch (role) {
      case 'superadmin': return '/portal/superadmin';
      case 'admin': return '/portal/admin';
      case 'teacher': return '/portal/teacher';
      case 'student': return '/portal/student';
      default: return '/';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to login. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async (role) => {
    setError('');
    
    try {
      setGuestLoading(prev => ({ ...prev, [role]: true }));
      const credentials = guestCredentials[role];
      await login(credentials.email, credentials.password);
      toast.success(`Logged in as Guest ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || `Failed to login as guest ${role}`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGuestLoading(prev => ({ ...prev, [role]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <Link to="/">
              <img 
                src={logo}
                alt="Mansarovar Public School" 
                className="mx-auto h-16 w-auto rounded-md"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access the School Portal
            </p>
          </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        {/* Guest Login Buttons */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or try guest access</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {guestRoles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleGuestLogin(role)}
                disabled={guestLoading[role] || loading}
                className={`
                  relative w-full py-2 px-4 border border-gray-300 text-sm font-medium rounded-md
                  transition-all duration-200 ease-in-out
                  ${guestLoading[role] 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-75' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:bg-gray-100'
                  }
                  disabled:cursor-not-allowed
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
              >
                {guestLoading[role] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 rounded-md">
                    <ButtonLoadingSpinner />
                  </div>
                ) : null}
                <span className={guestLoading[role] ? 'opacity-30' : 'opacity-100'}>
                  {guestCredentials[role].label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="font-medium text-sm text-blue-600 hover:text-blue-500">
            Back to Home
          </Link>
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
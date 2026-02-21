import { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Building2, Users, BookOpen, FileText, Settings,
  LogOut, Menu, X, Bell, ChevronRight, Shield, Home, ClipboardCheck,
  TrendingUp, Database, Award, MessageSquare, DollarSign, Calendar, FileCheck
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const AdminHub = () => {
  const { user: currentUser, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
        scrollContainerRef.current.scrollLeft = 0;
      }
    };
    scrollToTop();
    requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(scrollToTop);
    });
  }, [location.pathname]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/portal/admin/dashboard' },
    { id: 'admissions', label: 'Admissions Management', icon: Users, path: '/portal/admin/admissions' },
    { id: 'franchises', label: 'Franchise Management', icon: Building2, path: '/portal/admin/franchises' },
    { id: 'students', label: 'Student Management', icon: Users, path: '/portal/admin/students' },
    { id: 'courses', label: 'Course Management', icon: BookOpen, path: '/portal/admin/courses' },
    { id: 'create-exam', label: 'Create Exam', icon: Calendar, path: '/portal/admin/create-exam' },
    { id: 'publish-results', label: 'Publish Results', icon: FileCheck, path: '/portal/admin/publish-results' },
    { id: 'requests', label: 'Franchise Requests', icon: ClipboardCheck, path: '/portal/admin/requests' },
    { id: 'resources', label: 'Resources', icon: Book, path: '/portal/admin/resources' },

    // Disabled features - Coming soon
    { id: 'certificates', label: 'Certificates', icon: Award, path: '/portal/admin/certificates' },
    // { id: 'results', label: 'Results Management', icon: FileText, path: '/portal/admin/results' },
    // { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp, path: '/portal/admin/analytics' },
    // { id: 'content', label: 'Website Content', icon: Database, path: '/portal/admin/content' },
    // { id: 'financial', label: 'Financial Overview', icon: DollarSign, path: '/portal/admin/financial' },
    // { id: 'communications', label: 'Communications', icon: MessageSquare, path: '/portal/admin/communications' },
    // { id: 'settings', label: 'Settings', icon: Settings, path: '/portal/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 shadow-xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-[#0F172A] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900">VESDM</h1>
              <p className="text-xs text-red-600 font-semibold uppercase tracking-wider">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Admin Profile Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-red-600 to-[#0F172A] p-4 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <Shield size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base truncate">{currentUser?.name || 'Administrator'}</p>
                <p className="text-xs text-red-200 truncate">Super Admin</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <p className="text-xl font-bold">45</p>
                <p className="text-[10px] text-red-200">Franchises</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <p className="text-xl font-bold">5.2K</p>
                <p className="text-[10px] text-red-200">Students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <p className="text-xl font-bold">28</p>
                <p className="text-[10px] text-red-200">Courses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-slate-200'
                }`}>
                  <Icon size={18} className={isActive ? '' : 'text-slate-600'} />
                </div>
                <span className="font-semibold text-xs flex-1">{item.label}</span>
                {isActive && <ChevronRight size={16} />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all font-semibold text-slate-700 text-sm"
          >
            <Home size={18} />
            Back to Website
          </Link>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 rounded-xl transition-all font-semibold text-white shadow-lg shadow-rose-500/30"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Menu size={24} className="text-slate-700" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Portal'}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">Complete system control and management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 hover:bg-slate-100 rounded-xl transition-colors group">
                <Bell size={22} className="text-slate-600 group-hover:text-slate-900" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto portal-content-scroll">
          <div className="p-6 max-w-[1600px] mx-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTop = 0;
                }
              }}
            >
              <Outlet context={{ currentUser }} />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-[#0F172A] rounded-xl flex items-center justify-center">
                      <Shield size={20} className="text-white" />
                    </div>
                    <div>
                      <h1 className="font-bold text-lg text-slate-900">VESDM</h1>
                      <p className="text-xs text-red-600">Admin Portal</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-slate-600" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="bg-gradient-to-br from-red-600 to-[#0F172A] p-4 rounded-2xl text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Shield size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{currentUser?.name || 'Administrator'}</p>
                        <p className="text-xs text-red-200 truncate">Super Admin</p>
                      </div>
                    </div>
                  </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setShowMobileMenu(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="font-semibold text-sm">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-4 border-t border-slate-200 space-y-2">
                  <Link
                    to="/"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 rounded-xl font-semibold text-slate-700 text-sm"
                  >
                    <Home size={18} />
                    Back to Website
                  </Link>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl font-semibold text-white"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowLogoutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogOut size={32} className="text-rose-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Logout Confirmation</h3>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to logout? You'll need to login again to access the admin portal.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-rose-500/30"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminHub;

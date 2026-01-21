import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, BookOpen, FileText
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    franchises: 0,
    students: 0,
    courses: 0,
    applications: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [franchisesRes, studentsRes, coursesRes, applicationsRes] = await Promise.all([
        apiClient.get('/users'),
        apiClient.get('/students'),
        apiClient.get('/courses'),
        apiClient.get('/inquiries')
      ]);

      // Count franchisees (users with role='franchisee')
      const franchiseeCount = franchisesRes.data.filter(u => u.role === 'franchisee').length;
      
      // Count franchise inquiries
      const franchiseInquiries = applicationsRes.data.filter(i => i.type === 'franchise').length;

      setStats({
        franchises: franchiseeCount,
        students: studentsRes.data.length,
        courses: coursesRes.data.length,
        applications: franchiseInquiries
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    { 
      label: 'Total Franchises', 
      value: stats.franchises, 
      icon: Building2, 
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50'
    },
    { 
      label: 'Total Students', 
      value: stats.students, 
      icon: Users, 
      gradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50'
    },
    { 
      label: 'Active Courses', 
      value: stats.courses, 
      icon: BookOpen, 
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50'
    },
    { 
      label: 'Franchise Requests', 
      value: stats.applications, 
      icon: FileText, 
      gradient: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-600 to-[#0F172A] rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-red-100">Welcome back! Here's your system overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl ${stat.bgLight} flex items-center justify-center`}>
                  <Icon size={28} className={`text-${stat.gradient.split('-')[1].split(' ')[0]}-600`} />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => window.location.href = '/portal/admin/franchises'}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left group"
          >
            <Building2 className="text-blue-600 mb-3" size={24} />
            <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              Manage Franchises
            </h3>
            <p className="text-xs text-slate-600 mt-1">View and manage all franchisees</p>
          </button>

          <button
            onClick={() => window.location.href = '/portal/admin/students'}
            className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors text-left group"
          >
            <Users className="text-emerald-600 mb-3" size={24} />
            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Manage Students
            </h3>
            <p className="text-xs text-slate-600 mt-1">View all students across franchises</p>
          </button>

          <button
            onClick={() => window.location.href = '/portal/admin/courses'}
            className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left group"
          >
            <BookOpen className="text-purple-600 mb-3" size={24} />
            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
              Manage Courses
            </h3>
            <p className="text-xs text-slate-600 mt-1">Add, edit, or remove courses</p>
          </button>

          <button
            onClick={() => window.location.href = '/portal/admin/requests'}
            className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-left group"
          >
            <FileText className="text-orange-600 mb-3" size={24} />
            <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
              Franchise Requests
            </h3>
            <p className="text-xs text-slate-600 mt-1">Review new applications</p>
          </button>
        </div>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 mb-2">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">{stats.franchises + stats.students}</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 mb-2">Total Courses</p>
            <p className="text-2xl font-bold text-slate-900">{stats.courses}</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-600 mb-2">Pending Requests</p>
            <p className="text-2xl font-bold text-slate-900">{stats.applications}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

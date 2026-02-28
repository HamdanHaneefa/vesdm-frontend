import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  FileText,
  BookOpen,
  Clock,
  ChevronRight,
  Target,
  AlertCircle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import apiClient from '../../../api/apiClient'; // adjust path if needed

const StudentDashboard = () => {
  const { currentUser } = useOutletContext();
  const [dashboard, setDashboard] = useState(null);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dashRes, resultsRes] = await Promise.all([
          apiClient.get('/student/dashboard'),
          apiClient.get('/student/results')
        ]);

        setDashboard(dashRes.data);
        // Show latest 4 published results (already filtered in backend)
        setRecentResults(resultsRes.data.slice(0, 4));
      } catch (err) {
        console.error('Student dashboard error:', err);
        setError('Failed to load your dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="text-center py-12 text-red-600 bg-red-50 rounded-2xl">
        <AlertCircle size={48} className="mx-auto mb-4" />
        <p className="text-xl font-semibold">{error || 'No data available'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const stats = [
    {
      label: 'Enrolled Courses',
      value: dashboard.enrolledCount || 0,
      icon: BookOpen,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Ongoing Courses',
      value: dashboard.ongoingCount || 0,
      icon: Clock,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Certificates Earned',
      value: dashboard.certificatesCount || 0,
      icon: Award,
      gradient: 'from-amber-500 to-amber-600'
    },
    {
      label: 'Published Results',
      value: dashboard.resultsCount || 0,
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const quickActions = [
    {
      label: 'View Certificates',
      icon: Award,
      link: '/portal/student/certificates',
      color: 'text-amber-600'
    },
    {
      label: 'Check Results',
      icon: FileText,
      link: '/portal/student/results',
      color: 'text-purple-600'
    },
    {
      label: 'Browse Resources',
      icon: BookOpen,
      link: '/portal/student/resources',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, {currentUser?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-blue-100 text-lg md:text-xl opacity-90">
              Here's your learning progress overview • {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-blue-200 text-sm mb-1">Registration No.</p>
            <p className="text-3xl font-bold font-mono tracking-wide">
              {dashboard?.registrationNumber || '—'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}
                >
                  <Icon size={28} className="text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Results (most useful real content) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <FileText size={28} className="text-purple-600" />
          Latest Published Results
        </h2>

        {recentResults.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No results published yet.
          </div>
        ) : (
          <div className="space-y-4">
            {recentResults.map((result, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-slate-900">{result.examName}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {result.course?.name || '—'} • {result.subject || '—'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-emerald-600">
                    {result.marks} / {result.totalMarks || '—'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(result.publishedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Bottom section – Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
          <Target size={24} className="text-blue-600" />
          Quick Actions
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <a
                key={i}
                onClick={() => navigate(action.link)}
                className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group border border-slate-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Icon size={24} className={action.color} />
                  <span className="font-semibold text-slate-800">{action.label}</span>
                </div>
                <ChevronRight
                  size={24}
                  className="text-slate-400 group-hover:translate-x-1 transition-transform"
                />
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
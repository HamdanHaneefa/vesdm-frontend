import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  Calendar,
  ChevronRight,
  Target,
  FileText,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import apiClient from '../../../api/apiClient';

const FranchiseDashboard = () => {
  const { currentUser } = useOutletContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFranchiseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await apiClient.get('/franchise/dashboard');
        setData(res.data);
      } catch (err) {
        console.error('Franchise dashboard error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchFranchiseData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (error || !data) {
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

  // Prepare chart data
  const growthData = data.monthlyGrowth.map(item => ({
    month: item._id.slice(2).replace('-', ' '), // e.g. "25 09" → nicer labels
    students: item.count
  }));

  const programData = data.topCourses?.map(c => ({
    program: c.name.length > 18 ? c.name.substring(0, 15) + '...' : c.name,
    students: c.count   // ← note: using .count from backend
  })) || [];

  // Stats cards – real values
  const stats = [
    {
      label: 'Total Students',
      value: data.totalStudents,
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      change: data.totalStudents > 100 ? '+12%' : '+new',
      changeType: 'increase'
    },
    {
      label: 'Active Programs',
      value: data.ongoingCourses,
      icon: GraduationCap,
      gradient: 'from-purple-500 to-purple-600',
      change: '',
      changeType: ''
    },
    {
      label: 'Certificates Issued',
      value: data.certificatesIssued,
      icon: Award,
      gradient: 'from-amber-500 to-amber-600',
      change: '',
      changeType: ''
    },
    {
      label: 'Success Rate',
      value:
        data.totalStudents > 0
          ? Math.round((data.completedCourses / data.totalStudents) * 100) + '%'
          : '—',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-600',
      change: '',
      changeType: ''
    }
  ];

  const quickActions = [
    {
      label: 'Register New Student',
      icon: Users,
      link: '/portal/franchise/register-student',
      color: 'text-blue-600'
    },
    {
      label: 'Register for Exam',
      icon: FileText,
      link: '/portal/franchise/register-for-exam',
      color: 'text-purple-600'
    },
    {
      label: 'Published Results',
      icon: Award,
      link: '/portal/franchise/published-exams',
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome, {currentUser?.name?.split(' ')[0] || 'Franchisee'}
            </h1>
            <p className="text-purple-100 text-lg md:text-xl opacity-90">
              Here's your center's performance overview •{' '}
              {new Date().toLocaleDateString('en-IN')}
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-purple-200 text-sm mb-1">Center ID</p>
            <p className="text-3xl font-bold font-mono tracking-wide">
              {currentUser?._id?.toString().slice(-8).toUpperCase() ||
                'FR-XXXXXX'}
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
              <h3 className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                {stat.label}
              </p>
              {stat.change && (
                <p className="text-xs mt-2 font-medium text-emerald-600">
                  {stat.change}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Charts – 2×2 layout on large screens */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Growth */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <TrendingUp className="text-emerald-600" size={26} />
            Student Enrollment Trend
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#10b981"
                  fill="url(#colorStudents)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Programs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <GraduationCap className="text-purple-600" size={26} />
            Top Enrolled Programs
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="program"
                  stroke="#64748b"
                  fontSize={12}
                  angle={-25}
                  textAnchor="end"
                  height={70}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="students"
                  fill="#a855f7"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom section – Quick Actions + Upcoming Exams (full width now) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
              <Target size={24} className="text-purple-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <a
                    key={i}
                    onClick={() => navigate(action.link)}
                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 ">
                      <Icon size={20} className={action.color} />
                      <span className="font-semibold text-slate-700">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-slate-400 group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Upcoming Exams */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-3">
              <Calendar size={24} className="text-amber-600" />
              Upcoming Exams
            </h3>

            {data.upcomingExams.length === 0 ? (
              <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl">
                No upcoming exams scheduled at the moment.
              </div>
            ) : (
              <div className="space-y-4">
                {data.upcomingExams
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 6)
                  .map((exam, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {exam.name}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {new Date(exam.date).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-amber-600">
                          {exam.registered}
                        </div>
                        <div className="text-xs text-slate-500">registered</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FranchiseDashboard;
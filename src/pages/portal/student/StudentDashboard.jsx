import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, FileText, BookOpen, TrendingUp, Clock, Calendar, ChevronRight, Target, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StudentDashboard = () => {
  const { currentUser } = useOutletContext();

  const stats = [
    { 
      label: 'Enrolled Course', 
      value: 'Digital Marketing', 
      icon: BookOpen, 
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Progress', 
      value: '65%', 
      icon: TrendingUp, 
      gradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Certificates', 
      value: '2 Earned', 
      icon: Award, 
      gradient: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    { 
      label: 'Results', 
      value: '3 Published', 
      icon: FileText, 
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
  ];

  const quickActions = [
    { label: 'View Certificates', icon: Award, link: '/portal/student/certificates', color: 'text-amber-600' },
    { label: 'Check Results', icon: FileText, link: '/portal/student/results', color: 'text-purple-600' },
    { label: 'Browse Resources', icon: BookOpen, link: '/portal/student/resources', color: 'text-blue-600' },
  ];

  // Chart data
  const progressData = [
    { month: 'Sep', progress: 15 },
    { month: 'Oct', progress: 28 },
    { month: 'Nov', progress: 42 },
    { month: 'Dec', progress: 55 },
    { month: 'Jan', progress: 65 },
  ];

  const performanceData = [
    { subject: 'SEO', marks: 85 },
    { subject: 'Social Media', marks: 92 },
    { subject: 'Content', marks: 78 },
    { subject: 'Analytics', marks: 88 },
    { subject: 'Email Mktg', marks: 95 },
  ];

  const attendanceData = [
    { name: 'Present', value: 92, color: '#10b981' },
    { name: 'Absent', value: 8, color: '#ef4444' },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#007ACC] via-blue-600 to-[#0F172A] rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {currentUser?.name || 'Student'}! 👋
            </h1>
            <p className="text-blue-100 text-lg">Here's what's happening with your learning journey</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-blue-200 text-sm mb-1">Registration Number</p>
              <p className="text-2xl font-bold font-mono">{currentUser?.regNumber || 'VESDM-XXX'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
              <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wide">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" />
            Learning Progress
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#007ACC" 
                strokeWidth={3}
                dot={{ fill: '#007ACC', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Award size={24} className="text-purple-600" />
            Subject Performance
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="subject" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="marks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity size={28} className="text-blue-600" />
              Recent Activity
            </h2>
          </div>
          <div className="space-y-1">
            {[
              { action: 'Certificate downloaded', course: 'Digital Marketing Basics', date: 'Jan 3, 2026', time: '10:30 AM', type: 'success' },
              { action: 'Exam result published', course: 'SEO Fundamentals', date: 'Dec 28, 2025', time: '2:15 PM', type: 'info' },
              { action: 'Profile information updated', course: 'Account Settings', date: 'Dec 20, 2025', time: '4:45 PM', type: 'default' },
              { action: 'Resource downloaded', course: 'Social Media Marketing', date: 'Dec 15, 2025', time: '11:20 AM', type: 'default' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-emerald-100' :
                    activity.type === 'info' ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'info' ? 'bg-blue-500' : 'bg-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.course}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-xs font-medium text-slate-600">{activity.date}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          {/* Attendance Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock size={24} className="text-emerald-600" />
              Attendance
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {attendanceData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-slate-600">{entry.name}: <span className="font-bold text-slate-900">{entry.value}%</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target size={24} className="text-blue-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <a
                    key={i}
                    href={action.link}
                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={action.color} />
                      <span className="font-semibold text-slate-700">{action.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={24} />
              <h3 className="text-xl font-bold">Upcoming</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold text-sm">Final Exam - SEO</p>
                <p className="text-xs text-purple-100 mt-1">Jan 15, 2026</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="font-semibold text-sm">Assignment Due</p>
                <p className="text-xs text-purple-100 mt-1">Jan 10, 2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;

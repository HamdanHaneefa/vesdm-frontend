import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Award, TrendingUp, Calendar, Bell, ChevronRight, Target, Activity, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FranchiseDashboard = () => {
  const { currentUser } = useOutletContext();

  const stats = [
    { 
      label: 'Total Students', 
      value: '125', 
      icon: Users, 
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'increase'
    },
    { 
      label: 'Active Programs', 
      value: '8', 
      icon: GraduationCap, 
      gradient: 'from-purple-500 to-purple-600',
      change: '+2',
      changeType: 'increase'
    },
    { 
      label: 'Certificates Issued', 
      value: '45', 
      icon: Award, 
      gradient: 'from-amber-500 to-amber-600',
      change: '+8',
      changeType: 'increase'
    },
    { 
      label: 'Success Rate', 
      value: '94%', 
      icon: TrendingUp, 
      gradient: 'from-emerald-500 to-emerald-600',
      change: '+3%',
      changeType: 'increase'
    },
  ];

  const quickActions = [
    { label: 'Register New Student', icon: Users, link: '/portal/franchise/register-student', color: 'text-blue-600' },
    { label: 'Register for Exam', icon: FileText, link: '/portal/franchise/register-exam', color: 'text-purple-600' },
    { label: 'Publish Results', icon: Award, link: '/portal/franchise/publish-results', color: 'text-amber-600' },
  ];

  const recentActivities = [
    { action: 'New student registered', student: 'Rajesh Kumar', date: 'Jan 6, 2026', time: '10:30 AM', type: 'success' },
    { action: 'Exam results published', program: 'Digital Marketing', date: 'Jan 5, 2026', time: '3:15 PM', type: 'info' },
    { action: 'Certificate generated', student: 'Priya Sharma', date: 'Jan 4, 2026', time: '11:45 AM', type: 'success' },
    { action: 'Student enrolled', student: 'Amit Patel', date: 'Jan 3, 2026', time: '2:20 PM', type: 'default' },
  ];

  const upcomingExams = [
    { subject: 'Digital Marketing - Final', date: 'Jan 15, 2026', students: 24 },
    { subject: 'Web Development - Mid Term', date: 'Jan 20, 2026', students: 18 },
    { subject: 'Graphic Design - Final', date: 'Jan 25, 2026', students: 15 },
  ];

  // Chart data
  const studentGrowthData = [
    { month: 'Aug', students: 85 },
    { month: 'Sep', students: 92 },
    { month: 'Oct', students: 105 },
    { month: 'Nov', students: 112 },
    { month: 'Dec', students: 118 },
    { month: 'Jan', students: 125 },
  ];

  const programEnrollmentData = [
    { program: 'Digital Marketing', students: 35 },
    { program: 'Web Dev', students: 28 },
    { program: 'Data Analytics', students: 22 },
    { program: 'Graphic Design', students: 18 },
    { program: 'Mobile Dev', students: 15 },
    { program: 'Others', students: 7 },
  ];

  const revenueData = [
    { month: 'Aug', revenue: 45000 },
    { month: 'Sep', revenue: 52000 },
    { month: 'Oct', revenue: 58000 },
    { month: 'Nov', revenue: 63000 },
    { month: 'Dec', revenue: 68000 },
    { month: 'Jan', revenue: 72000 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-600 via-purple-700 to-[#0F172A] rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {currentUser?.name || 'Franchise'}! 🎯
            </h1>
            <p className="text-purple-100 text-lg">Here's your franchise performance overview</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-purple-200 text-sm mb-1">Franchise ID</p>
              <p className="text-2xl font-bold font-mono">FR-2026-001</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-emerald-600" />
            Student Growth Trend
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={studentGrowthData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area 
                type="monotone" 
                dataKey="students" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorStudents)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Program Enrollment Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <GraduationCap size={24} className="text-purple-600" />
            Program Enrollment
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={programEnrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="program" stroke="#64748b" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Bar dataKey="students" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
transition={{ delay: 0.8 }}
          
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 lg:col-span-2"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-600" />
            Revenue Analytics
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
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
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Activity size={28} className="text-purple-600" />
              Recent Activity
            </h2>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity, i) => (
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
                    <p className="text-xs text-slate-500">{activity.student || activity.program}</p>
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

        {/* Quick Actions & Upcoming */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target size={24} className="text-purple-600" />
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

          {/* Upcoming Exams */}
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={24} />
              <h3 className="text-xl font-bold">Upcoming Exams</h3>
            </div>
            <div className="space-y-3">
              {upcomingExams.map((exam, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="font-semibold text-sm">{exam.subject}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-amber-100">{exam.date}</p>
                    <p className="text-xs font-bold">{exam.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FranchiseDashboard;

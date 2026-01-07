import { motion } from 'framer-motion';
import { 
  Building2, Users, BookOpen, TrendingUp, DollarSign, Award,
  UserPlus, FileText, CheckCircle, Clock, AlertCircle, ArrowUp, ArrowDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    { 
      label: 'Total Franchises', 
      value: '45', 
      change: '+5',
      trend: 'up',
      icon: Building2, 
      gradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50'
    },
    { 
      label: 'Total Students', 
      value: '5,234', 
      change: '+234',
      trend: 'up',
      icon: Users, 
      gradient: 'from-emerald-500 to-emerald-600',
      bgLight: 'bg-emerald-50'
    },
    { 
      label: 'Active Courses', 
      value: '28', 
      change: '+3',
      trend: 'up',
      icon: BookOpen, 
      gradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50'
    },
    { 
      label: 'Revenue (Month)', 
      value: '₹12.5L', 
      change: '+18%',
      trend: 'up',
      icon: DollarSign, 
      gradient: 'from-amber-500 to-amber-600',
      bgLight: 'bg-amber-50'
    },
    { 
      label: 'Certificates Issued', 
      value: '1,842', 
      change: '+142',
      trend: 'up',
      icon: Award, 
      gradient: 'from-rose-500 to-rose-600',
      bgLight: 'bg-rose-50'
    },
    { 
      label: 'Pending Requests', 
      value: '12', 
      change: '+3',
      trend: 'down',
      icon: AlertCircle, 
      gradient: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50'
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 850000, students: 420 },
    { month: 'Feb', revenue: 920000, students: 485 },
    { month: 'Mar', revenue: 1050000, students: 532 },
    { month: 'Apr', revenue: 980000, students: 498 },
    { month: 'May', revenue: 1150000, students: 587 },
    { month: 'Jun', revenue: 1250000, students: 645 },
  ];

  const courseEnrollmentData = [
    { name: 'Digital Marketing', students: 1250, color: '#667eea' },
    { name: 'Web Development', students: 980, color: '#f093fb' },
    { name: 'Data Analytics', students: 850, color: '#4facfe' },
    { name: 'Business Mgmt', students: 720, color: '#fa709a' },
    { name: 'Others', students: 1434, color: '#a8edea' },
  ];

  const franchisePerformance = [
    { name: 'Mumbai Central', students: 450, revenue: 2250000, rating: 4.8 },
    { name: 'Delhi North', students: 385, revenue: 1925000, rating: 4.6 },
    { name: 'Bangalore Tech', students: 420, revenue: 2100000, rating: 4.9 },
    { name: 'Pune West', students: 310, revenue: 1550000, rating: 4.5 },
    { name: 'Chennai South', students: 295, revenue: 1475000, rating: 4.7 },
  ];

  const recentActivities = [
    { id: 1, type: 'franchise', title: 'New franchise request', desc: 'Kolkata East - Pending approval', time: '5 min ago', icon: Building2, color: 'blue' },
    { id: 2, type: 'student', title: 'Bulk student enrollment', desc: '45 students enrolled by Mumbai Central', time: '15 min ago', icon: UserPlus, color: 'emerald' },
    { id: 3, type: 'course', title: 'New course published', desc: 'AI & Machine Learning course live', time: '1 hour ago', icon: BookOpen, color: 'purple' },
    { id: 4, type: 'certificate', title: 'Certificates issued', desc: '28 certificates generated for batch DM-2025', time: '2 hours ago', icon: Award, color: 'amber' },
    { id: 5, type: 'result', title: 'Results published', desc: 'Web Development Dec 2025 batch', time: '3 hours ago', icon: FileText, color: 'rose' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Franchise Application', name: 'Kolkata East Branch', submitted: '2 days ago', priority: 'high' },
    { id: 2, type: 'Course Update', name: 'Digital Marketing Syllabus', submitted: '1 day ago', priority: 'medium' },
    { id: 3, type: 'Certificate Request', name: 'Batch DM-2026-01', submitted: '3 hours ago', priority: 'high' },
    { id: 4, type: 'Resource Upload', name: 'Web Development Module 8', submitted: '5 hours ago', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
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
                  <Icon size={28} className={`bg-gradient-to-br ${stat.gradient} text-transparent bg-clip-text`} />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Revenue & Student Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={3} name="Revenue (₹)" />
              <Line type="monotone" dataKey="students" stroke="#10b981" strokeWidth={3} name="Students" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Enrollment Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Course-wise Enrollment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseEnrollmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="students"
              >
                {courseEnrollmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Franchise Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-6">Top Performing Franchises</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Franchise Name</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Students</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Rating</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {franchisePerformance.map((franchise, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Building2 className="text-white" size={20} />
                      </div>
                      <span className="font-semibold text-slate-900">{franchise.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-slate-900">{franchise.students}</td>
                  <td className="py-4 px-4 text-right font-semibold text-slate-900">₹{(franchise.revenue / 100000).toFixed(1)}L</td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                      ⭐ {franchise.rating}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Activity & Approvals Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-${activity.color}-600`} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm">{activity.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{activity.desc}</p>
                    <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Pending Approvals</h2>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
              {pendingApprovals.length} Pending
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 border-2 border-slate-200 rounded-xl hover:border-red-200 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.priority === 'high' ? 'bg-red-100 text-red-600' :
                    item.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.priority.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">{item.submitted}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.type}</h3>
                <p className="text-xs text-slate-600 mb-3">{item.name}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors">
                    <CheckCircle size={14} className="inline mr-1" />
                    Approve
                  </button>
                  <button className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

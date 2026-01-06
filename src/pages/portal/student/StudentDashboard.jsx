import { useOutletContext } from 'react-router-dom';
import { Award, FileText, BookOpen, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const { currentUser } = useOutletContext();

  const stats = [
    { label: 'Enrolled Course', value: 'Digital Marketing', icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Completion', value: '65%', icon: TrendingUp, color: 'bg-emerald-500' },
    { label: 'Certificates', value: '2', icon: Award, color: 'bg-amber-500' },
    { label: 'Results', value: '3', icon: FileText, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {currentUser?.name || 'Student'}!
        </h1>
        <p className="text-slate-600">Registration Number: {currentUser?.regNumber || 'N/A'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
              <p className="text-sm text-slate-600 font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'Certificate downloaded', date: 'Jan 3, 2026', type: 'success' },
            { action: 'Exam result published', date: 'Dec 28, 2025', type: 'info' },
            { action: 'Profile updated', date: 'Dec 20, 2025', type: 'default' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-emerald-500' :
                  activity.type === 'info' ? 'bg-blue-500' : 'bg-slate-400'
                }`} />
                <p className="text-sm font-medium text-slate-900">{activity.action}</p>
              </div>
              <p className="text-xs text-slate-500">{activity.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

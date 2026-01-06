import { motion } from 'framer-motion';
import { Award, Download, Calendar, Shield, Star, CheckCircle, Clock } from 'lucide-react';

const StudentCertificates = () => {
  const certificates = [
    {
      id: 1,
      name: 'Diploma in Computer Science',
      type: 'Diploma',
      issueDate: '2025-12-15',
      certificateNumber: 'VESDM2025001234',
      status: 'issued',
      grade: 'A+',
    },
    {
      id: 2,
      name: 'Web Development Fundamentals',
      type: 'Course Completion',
      issueDate: '2025-06-20',
      certificateNumber: 'VESDM2025000987',
      status: 'issued',
      grade: 'A',
    },
    {
      id: 3,
      name: 'Python Programming',
      type: 'Course Completion',
      issueDate: '2025-03-10',
      certificateNumber: 'VESDM2025000765',
      status: 'issued',
      grade: 'B+',
    },
    {
      id: 4,
      name: 'Final Year Project',
      type: 'In Progress',
      issueDate: null,
      certificateNumber: null,
      status: 'pending',
      grade: null,
    },
  ];

  const stats = [
    { label: 'Total Certificates', value: '3', icon: Award, gradient: 'from-amber-500 to-amber-600' },
    { label: 'In Progress', value: '1', icon: Clock, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Average Grade', value: 'A', icon: Star, gradient: 'from-emerald-500 to-emerald-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Certificates 🎓</h1>
        <p className="text-slate-500 text-lg">Download and manage your earned certificates</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={32} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-4xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">All Certificates</h2>
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                    cert.status === 'issued' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-amber-500 to-amber-600'
                  }`}>
                    <Award size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{cert.type}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    cert.status === 'issued'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {cert.status === 'issued' ? '✓ Issued' : '⏳ Pending'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4">
                  {cert.certificateNumber && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Certificate No.</p>
                      <p className="font-mono text-sm font-bold text-slate-900">{cert.certificateNumber}</p>
                    </div>
                  )}
                  {cert.issueDate && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Issue Date</p>
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                  {cert.grade && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Grade</p>
                      <p className="text-2xl font-bold text-emerald-600">{cert.grade}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:min-w-[200px]">
                {cert.status === 'issued' && (
                  <>
                    <button className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30">
                      <Download size={18} />
                      Download
                    </button>
                    <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold border-2 border-slate-200 rounded-xl transition-all">
                      <Shield size={18} />
                      Verify
                    </button>
                  </>
                )}
                {cert.status === 'pending' && (
                  <button disabled className="px-5 py-3 bg-slate-100 text-slate-400 font-semibold rounded-xl cursor-not-allowed">
                    Processing...
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentCertificates;

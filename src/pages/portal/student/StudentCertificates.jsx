import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [certsRes, coursesRes] = await Promise.all([
          apiClient.get('/student/certificates'),
          apiClient.get('/student/courses')
        ]);

        setCertificates(certsRes.data || []);

        // Create map: courseId -> course details
        const map = (coursesRes.data || []).reduce((acc, course) => {
          acc[course.id] = course;
          return acc;
        }, {});
        setCoursesMap(map);

        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-purple-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6 flex items-center gap-3">
        <AlertCircle size={24} className="text-rose-600" />
        <p className="text-rose-800">{error}</p>
      </div>
    );
  }

  const totalCertificates = certificates.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Certificates</h1>
          <p className="text-slate-600 text-lg">View and download your earned certificates</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Award size={32} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Certificates</p>
                <p className="text-4xl font-bold text-slate-900 mt-1">{totalCertificates}</p>
              </div>
            </div>
          </motion.div>

          {/* Placeholder stats - can be extended later */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 opacity-60"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar size={32} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Latest Issued</p>
                <p className="text-4xl font-bold text-slate-900 mt-1">
                  {certificates.length > 0
                    ? new Date(Math.max(...certificates.map(c => new Date(c.issueDate).getTime()))).getFullYear()
                    : '-'}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 opacity-60"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Award size={32} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Completed Courses</p>
                <p className="text-4xl font-bold text-slate-900 mt-1">{totalCertificates}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certificates List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Issued Certificates</h2>

          {certificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No certificates yet</h3>
              <p className="text-slate-600">Certificates will appear here once you complete courses and they are issued.</p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {certificates.map((cert, index) => {
                const course = coursesMap[cert.course] || {};
                const courseName = course.name || 'Unknown Course';
                const courseType = course.type || '';

                return (
                  <motion.div
                    key={cert._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Award size={28} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{courseName}</h3>
                            {courseType && <p className="text-sm text-slate-500 font-medium">{courseType}</p>}
                          </div>
                          <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                            Issued
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4">
                          {cert.number && (
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Certificate No.</p>
                              <p className="font-mono text-sm font-bold text-slate-900">{cert.number}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Issue Date</p>
                            <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                              <Calendar size={16} className="text-slate-400" />
                              {cert.issueDate
                                ? new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Course</p>
                            <p className="text-sm font-bold text-slate-900">{courseName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 lg:min-w-[200px">
                        {cert.file ? (
                          <a
                            href={`/uploads/${cert.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
                          >
                            <Download size={18} />
                            Download Certificate
                          </a>
                        ) : (
                          <button disabled className="px-5 py-3 bg-slate-100 text-slate-400 font-semibold rounded-xl cursor-not-allowed">
                            File Not Available
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCertificates;
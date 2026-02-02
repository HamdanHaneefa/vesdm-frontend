import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen, Clock, Calendar, Activity, ArrowLeft, FileText, Loader2, AlertCircle
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentCourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/student/courses/${courseId}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError(err.response?.data?.msg || 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

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

  if (!data) {
    return <div className="text-center py-12 text-slate-500">Course not found</div>;
  }

  const { course, enrollment } = data;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/portal/student/courses')}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to My Courses
        </motion.button>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
        >
          <div className="h-48 p-8 flex flex-col justify-between bg-gradient-to-br from-purple-600 to-blue-600">
            <div className="flex items-center justify-between">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {course.type || 'General'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.name}</h1>
              <p className="text-white/90 text-sm">
                Enrolled on {new Date(enrollment.enrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-700 font-semibold">Overall Progress</span>
              <span className="text-2xl font-bold text-slate-900">{enrollment.progress || 0}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${enrollment.progress || 0}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
            <div className="mt-3 text-xs text-slate-600">
              Status: <span className="font-bold capitalize">{enrollment.status}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Clock className="text-blue-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Duration</p>
            <p className="text-xl font-bold text-slate-900">{course.duration || 'N/A'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
              <FileText className="text-emerald-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Fee</p>
            <p className="text-xl font-bold text-slate-900">₹{course.fee ?? 'N/A'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Enrolled On</p>
            <p className="text-sm font-bold text-slate-900">
              {new Date(enrollment.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <Activity className="text-amber-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Status</p>
            <p className="text-xl font-bold text-slate-900 capitalize">{enrollment.status}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 mb-8 inline-flex gap-2 overflow-x-auto"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {course.description && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Description</h2>
                  <p className="text-slate-600 leading-relaxed">{course.description}</p>
                </div>
              )}
              {course.eligibility && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Eligibility</h2>
                  <p classYear="text-slate-600 leading-relaxed">{course.eligibility}</p>
                </div>
              )}
            </div>
          )}

          {/* Modules */}
          {activeTab === 'modules' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Modules</h2>
              {course.modules && course.modules.length > 0 ? (
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {module.number || index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900">{module.title || 'Untitled Module'}</h3>
                          {module.duration && <p className="text-sm text-slate-600">{module.duration}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">No modules listed for this course.</p>
              )}
            </div>
          )}

          {/* Schedule */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Class Schedule</h2>
              {course.schedule && course.schedule.length > 0 ? (
                <div className="space-y-4">
                  {course.schedule.map((item, index) => (
                    <div key={index} className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-xl flex items-center justify-center text-white">
                          <Calendar size={28} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-1">{item.day || 'Day'}</h3>
                          <p className="text-sm text-slate-600 mb-1">{item.time || 'Time not specified'}</p>
                          <p className="text-sm font-semibold text-blue-600">{item.topic || 'Topic not specified'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center py-8">No schedule listed for this course.</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentCourseDetails;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, Clock, Calendar, TrendingUp,
  CheckCircle, PlayCircle, Award, Activity, Loader2, AlertCircle
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursesRes, certsRes] = await Promise.all([
          apiClient.get('/student/courses'),
          apiClient.get('/student/certificates')
        ]);
        console.log("coursesRes", coursesRes)
        setCourses(coursesRes.data || []);
        setCertificates(certsRes.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.msg || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const ongoingCount = courses.filter(c => c.status === 'ongoing').length;
  const completedCount = courses.filter(c => c.status === 'completed').length;

  const tabs = [
    { id: 'ongoing', label: 'Ongoing Courses', count: ongoingCount },
    { id: 'completed', label: 'Completed Courses', count: completedCount },
    { id: 'all', label: 'All Courses', count: courses.length }
  ];

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  const handleViewResources = (courseId) => {
    navigate(`/portal/student/resources?courseId=${courseId}`);
  };

  const handleManageCourse = (courseId) => {
    navigate(`/portal/student/courses/${courseId}`);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Courses</h1>
          <p className="text-slate-600">Track your learning journey and access course materials</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Total Enrolled</p>
            <p className="text-3xl font-bold text-slate-900">{courses.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
              <Activity className="text-emerald-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">In Progress</p>
            <p className="text-3xl font-bold text-slate-900">{ongoingCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-slate-900">{completedCount}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <Award className="text-amber-600" size={24} />
            </div>
            <p className="text-slate-600 text-sm mb-1">Certificates Earned</p>
            <p className="text-3xl font-bold text-slate-900">{certificates.length}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 mb-8 inline-flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${activeTab === tab.id
                ? 'bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white shadow-lg'
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Courses List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => {
            const hasCertificate = certificates.some(cert => cert.course === course.id);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="h-32 p-6 flex flex-col justify-between bg-gradient-to-br from-purple-600 to-blue-600">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                      {course.type || 'General'}
                    </span>
                    {course.status === 'completed' && hasCertificate && <Award className="text-white" size={24} />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-4">{course.name}</h3>
                </div>

                {/* Details */}
                <div className="p-6">
                  {course.description && <p className="text-slate-600 mb-6 line-clamp-3">{course.description}</p>}

                  {course.status === 'ongoing' && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600 font-medium">Progress</span>
                        <span className="text-sm font-bold text-slate-900">{course.progress || 0}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress || 0}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Duration</p>
                        <p className="font-bold text-slate-900">{course.duration || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Fee</p>
                        <p className="font-bold text-slate-900">₹{course.fee ?? 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Calendar className="text-purple-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Enrolled On</p>
                        <p className="font-bold text-slate-900">
                          {new Date(course.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Activity className="text-amber-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="font-bold text-slate-900 capitalize">{course.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleManageCourse(course.id)}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Activity size={18} />
                      Manage Course
                    </button>
                    {course.status === 'ongoing' && (
                      <button
                        onClick={() => handleManageCourse(course.id)}
                        className="py-3 px-6 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all flex items-center gap-2"
                      >
                        <PlayCircle size={18} />
                        Continue
                      </button>
                    )}
                    {hasCertificate && (
                      <button className="py-3 px-6 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all flex items-center gap-2">
                        <Award size={18} />
                        Certificate
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleViewResources(course.id)}
                    className="w-full mt-4 py-3 bg-white border-2 border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    View Resources
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No courses found</h3>
            <p className="text-slate-600">
              {activeTab === 'ongoing' && "You don't have any ongoing courses at the moment."}
              {activeTab === 'completed' && "You haven't completed any courses yet."}
              {activeTab === 'all' && "You haven't enrolled in any courses yet."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
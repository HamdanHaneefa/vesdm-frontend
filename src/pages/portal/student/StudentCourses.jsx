import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Clock, Calendar, TrendingUp, ChevronRight, 
  CheckCircle, PlayCircle, Lock, Award, Activity, Users 
} from 'lucide-react';

const StudentCourses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ongoing');

  const enrolledCourses = [
    {
      id: 1,
      title: 'Digital Marketing Professional',
      category: 'Marketing',
      enrollmentDate: '2025-09-15',
      status: 'ongoing',
      progress: 65,
      duration: '6 months',
      modules: {
        total: 12,
        completed: 8
      },
      instructor: 'Prof. Sarah Johnson',
      nextClass: '2026-01-10',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      resources: {
        total: 24,
        unlocked: 18,
        locked: 6
      },
      assessments: {
        completed: 5,
        pending: 2
      }
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      category: 'Technology',
      enrollmentDate: '2025-08-01',
      status: 'ongoing',
      progress: 45,
      duration: '8 months',
      modules: {
        total: 16,
        completed: 7
      },
      instructor: 'Dr. Michael Chen',
      nextClass: '2026-01-12',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      resources: {
        total: 32,
        unlocked: 14,
        locked: 18
      },
      assessments: {
        completed: 3,
        pending: 4
      }
    },
    {
      id: 3,
      title: 'Business Management Fundamentals',
      category: 'Business',
      enrollmentDate: '2024-11-20',
      status: 'completed',
      progress: 100,
      duration: '3 months',
      modules: {
        total: 8,
        completed: 8
      },
      instructor: 'Prof. Amanda Williams',
      completedDate: '2025-02-20',
      thumbnail: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      resources: {
        total: 16,
        unlocked: 16,
        locked: 0
      },
      assessments: {
        completed: 6,
        pending: 0
      },
      certificate: true
    },
    {
      id: 4,
      title: 'Data Analytics with Python',
      category: 'Data Science',
      enrollmentDate: '2024-09-10',
      status: 'completed',
      progress: 100,
      duration: '4 months',
      modules: {
        total: 10,
        completed: 10
      },
      instructor: 'Dr. Robert Taylor',
      completedDate: '2025-01-10',
      thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      resources: {
        total: 20,
        unlocked: 20,
        locked: 0
      },
      assessments: {
        completed: 8,
        pending: 0
      },
      certificate: true
    }
  ];

  const tabs = [
    { id: 'ongoing', label: 'Ongoing Courses', count: enrolledCourses.filter(c => c.status === 'ongoing').length },
    { id: 'completed', label: 'Completed Courses', count: enrolledCourses.filter(c => c.status === 'completed').length },
    { id: 'all', label: 'All Courses', count: enrolledCourses.length }
  ];

  const filteredCourses = enrolledCourses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  const handleViewResources = (courseId) => {
    navigate(`/portal/student/resources?courseId=${courseId}`);
  };

  const handleManageCourse = (courseId) => {
    navigate(`/portal/student/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Courses</h1>
          <p className="text-slate-600">Track your learning journey and access course materials</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Total Enrolled</p>
            <p className="text-3xl font-bold text-slate-900">{enrolledCourses.length}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Activity className="text-emerald-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">In Progress</p>
            <p className="text-3xl font-bold text-slate-900">
              {enrolledCourses.filter(c => c.status === 'ongoing').length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-slate-900">
              {enrolledCourses.filter(c => c.status === 'completed').length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Award className="text-amber-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Certificates</p>
            <p className="text-3xl font-bold text-slate-900">
              {enrolledCourses.filter(c => c.certificate).length}
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 mb-8 inline-flex gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Courses List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Course Header with Gradient */}
              <div 
                className="h-32 p-6 flex flex-col justify-between"
                style={{ background: course.thumbnail }}
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    {course.category}
                  </span>
                  {course.status === 'completed' && course.certificate && (
                    <Award className="text-white" size={20} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
              </div>

              {/* Course Details */}
              <div className="p-6">
                {/* Progress Bar (Only for ongoing) */}
                {course.status === 'ongoing' && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 font-medium">Course Progress</span>
                      <span className="text-sm font-bold text-slate-900">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#007ACC] to-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {/* Course Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Modules</p>
                      <p className="text-sm font-bold text-slate-900">
                        {course.modules.completed}/{course.modules.total}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Assessments</p>
                      <p className="text-sm font-bold text-slate-900">
                        {course.assessments.completed}/{course.assessments.completed + course.assessments.pending}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <Lock className="text-emerald-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Resources</p>
                      <p className="text-sm font-bold text-slate-900">
                        {course.resources.unlocked}/{course.resources.total}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                      <Clock className="text-amber-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="text-sm font-bold text-slate-900">{course.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Instructor & Date Info */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-full flex items-center justify-center">
                    <Users className="text-white" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{course.instructor}</p>
                    <p className="text-xs text-slate-500">
                      {course.status === 'ongoing' 
                        ? `Next class: ${new Date(course.nextClass).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                        : `Completed: ${new Date(course.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                      }
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => handleManageCourse(course.id)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Activity size={18} />
                    Manage Course
                  </button>
                  {course.status === 'ongoing' && (
                    <button 
                      onClick={() => handleManageCourse(course.id)}
                      className="px-4 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <PlayCircle size={18} />
                      Continue
                    </button>
                  )}
                  {course.certificate && (
                    <button className="px-4 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200 flex items-center justify-center">
                      <Award size={18} />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleViewResources(course.id)}
                  className="w-full px-4 py-2.5 bg-white border-2 border-blue-200 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} />
                  View Resources
                </button>

                {/* Resources Status (locked info) */}
                {course.resources.locked > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
                    <Lock className="text-amber-600 mt-0.5" size={16} />
                    <p className="text-xs text-amber-800">
                      <span className="font-semibold">{course.resources.locked} resources</span> are locked. 
                      Complete previous modules to unlock them.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200"
          >
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

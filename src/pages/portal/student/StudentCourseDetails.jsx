import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, Calendar, TrendingUp, ChevronRight, CheckCircle, 
  PlayCircle, Lock, Award, Activity, Users, FileText, Video, Download,
  Bell, Settings, ArrowLeft, Target, BarChart3, MessageSquare, Share2
} from 'lucide-react';

const StudentCourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data - In production, fetch by courseId
  const courseData = {
    '1': {
      id: 1,
      title: 'Digital Marketing Professional',
      category: 'Marketing',
      enrollmentDate: '2025-09-15',
      status: 'ongoing',
      progress: 65,
      duration: '6 months',
      completionDate: '2026-03-15',
      modules: {
        total: 12,
        completed: 8
      },
      instructor: {
        name: 'Prof. Sarah Johnson',
        email: 'sarah.johnson@vesdm.edu',
        phone: '+91 98765 43210',
        image: 'instructor1'
      },
      nextClass: '2026-01-10',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      description: 'Master the art of digital marketing with comprehensive training in SEO, social media, content marketing, and analytics.',
      syllabus: [
        { module: 1, title: 'Introduction to Digital Marketing', status: 'completed', duration: '2 weeks' },
        { module: 2, title: 'SEO & Search Engine Marketing', status: 'completed', duration: '3 weeks' },
        { module: 3, title: 'Social Media Marketing', status: 'completed', duration: '3 weeks' },
        { module: 4, title: 'Content Marketing Strategy', status: 'completed', duration: '2 weeks' },
        { module: 5, title: 'Email Marketing', status: 'completed', duration: '2 weeks' },
        { module: 6, title: 'Google Ads & PPC', status: 'completed', duration: '3 weeks' },
        { module: 7, title: 'Social Media Advertising', status: 'completed', duration: '2 weeks' },
        { module: 8, title: 'Analytics & Data Interpretation', status: 'completed', duration: '3 weeks' },
        { module: 9, title: 'Conversion Rate Optimization', status: 'in-progress', duration: '2 weeks' },
        { module: 10, title: 'Marketing Automation', status: 'locked', duration: '2 weeks' },
        { module: 11, title: 'Advanced Campaign Management', status: 'locked', duration: '3 weeks' },
        { module: 12, title: 'Final Project & Certification', status: 'locked', duration: '2 weeks' }
      ],
      schedule: [
        { day: 'Monday', time: '10:00 AM - 12:00 PM', topic: 'Live Class - CRO Techniques' },
        { day: 'Wednesday', time: '2:00 PM - 4:00 PM', topic: 'Workshop - Analytics Tools' },
        { day: 'Friday', time: '10:00 AM - 11:00 AM', topic: 'Doubt Clearing Session' }
      ],
      resources: {
        total: 24,
        unlocked: 18,
        locked: 6
      },
      assessments: {
        completed: 5,
        pending: 2,
        upcoming: 1
      },
      attendance: {
        total: 45,
        attended: 42,
        percentage: 93
      },
      assignments: [
        { id: 1, title: 'SEO Audit Report', dueDate: '2025-10-15', status: 'submitted', grade: 'A' },
        { id: 2, title: 'Social Media Campaign Plan', dueDate: '2025-11-20', status: 'submitted', grade: 'A+' },
        { id: 3, title: 'Content Calendar Creation', dueDate: '2025-12-10', status: 'submitted', grade: 'A' },
        { id: 4, title: 'Email Marketing Campaign', dueDate: '2026-01-05', status: 'submitted', grade: 'B+' },
        { id: 5, title: 'PPC Campaign Analysis', dueDate: '2026-01-15', status: 'pending', grade: null },
        { id: 6, title: 'CRO Strategy Document', dueDate: '2026-01-25', status: 'upcoming', grade: null }
      ],
      recentActivities: [
        { date: '2026-01-06', activity: 'Completed Module 8 Quiz', type: 'assessment' },
        { date: '2026-01-05', activity: 'Submitted Email Marketing Assignment', type: 'assignment' },
        { date: '2026-01-03', activity: 'Attended Live Class on Analytics', type: 'attendance' },
        { date: '2025-12-28', activity: 'Downloaded Module 9 Resources', type: 'resource' },
        { date: '2025-12-25', activity: 'Completed Module 7', type: 'module' }
      ]
    },
    '2': {
      id: 2,
      title: 'Full Stack Web Development',
      category: 'Technology',
      enrollmentDate: '2025-08-01',
      status: 'ongoing',
      progress: 45,
      duration: '8 months',
      completionDate: '2026-04-01',
      modules: {
        total: 16,
        completed: 7
      },
      instructor: {
        name: 'Dr. Michael Chen',
        email: 'michael.chen@vesdm.edu',
        phone: '+91 98765 43211',
        image: 'instructor2'
      },
      nextClass: '2026-01-12',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      description: 'Become a full stack developer with expertise in HTML, CSS, JavaScript, React, Node.js, databases, and deployment.',
      syllabus: [
        { module: 1, title: 'HTML & CSS Fundamentals', status: 'completed', duration: '2 weeks' },
        { module: 2, title: 'JavaScript Essentials', status: 'completed', duration: '3 weeks' },
        { module: 3, title: 'Advanced JavaScript & ES6', status: 'completed', duration: '3 weeks' },
        { module: 4, title: 'React.js Basics', status: 'completed', duration: '3 weeks' },
        { module: 5, title: 'React Advanced Concepts', status: 'completed', duration: '3 weeks' },
        { module: 6, title: 'State Management with Redux', status: 'completed', duration: '2 weeks' },
        { module: 7, title: 'Node.js & Express', status: 'completed', duration: '3 weeks' },
        { module: 8, title: 'RESTful API Development', status: 'in-progress', duration: '3 weeks' },
        { module: 9, title: 'MongoDB & Database Design', status: 'locked', duration: '3 weeks' },
        { module: 10, title: 'Authentication & Security', status: 'locked', duration: '2 weeks' },
        { module: 11, title: 'Testing & Debugging', status: 'locked', duration: '2 weeks' },
        { module: 12, title: 'DevOps & Deployment', status: 'locked', duration: '2 weeks' },
        { module: 13, title: 'Cloud Services (AWS/Azure)', status: 'locked', duration: '2 weeks' },
        { module: 14, title: 'Microservices Architecture', status: 'locked', duration: '3 weeks' },
        { module: 15, title: 'Capstone Project Part 1', status: 'locked', duration: '3 weeks' },
        { module: 16, title: 'Capstone Project Part 2 & Certification', status: 'locked', duration: '3 weeks' }
      ],
      schedule: [
        { day: 'Tuesday', time: '3:00 PM - 5:00 PM', topic: 'Live Class - API Development' },
        { day: 'Thursday', time: '3:00 PM - 5:00 PM', topic: 'Coding Session - Backend' },
        { day: 'Saturday', time: '11:00 AM - 1:00 PM', topic: 'Project Review & Feedback' }
      ],
      resources: {
        total: 32,
        unlocked: 14,
        locked: 18
      },
      assessments: {
        completed: 3,
        pending: 4,
        upcoming: 2
      },
      attendance: {
        total: 52,
        attended: 48,
        percentage: 92
      },
      assignments: [
        { id: 1, title: 'Portfolio Website', dueDate: '2025-09-15', status: 'submitted', grade: 'A' },
        { id: 2, title: 'React Todo App', dueDate: '2025-10-25', status: 'submitted', grade: 'A+' },
        { id: 3, title: 'E-commerce Frontend', dueDate: '2025-11-30', status: 'submitted', grade: 'A' },
        { id: 4, title: 'REST API Project', dueDate: '2026-01-20', status: 'pending', grade: null },
        { id: 5, title: 'Full Stack Blog Application', dueDate: '2026-02-10', status: 'upcoming', grade: null }
      ],
      recentActivities: [
        { date: '2026-01-06', activity: 'Started Module 8 - API Development', type: 'module' },
        { date: '2026-01-04', activity: 'Attended Coding Session', type: 'attendance' },
        { date: '2026-01-02', activity: 'Completed Module 7 Assessment', type: 'assessment' },
        { date: '2025-12-30', activity: 'Downloaded Backend Resources', type: 'resource' },
        { date: '2025-12-28', activity: 'Completed Module 7', type: 'module' }
      ]
    }
  };

  const course = courseData[courseId] || courseData['1'];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'modules', label: 'Modules & Content', icon: BookOpen },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'performance', label: 'Performance', icon: BarChart3 }
  ];

  const getModuleStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1"><CheckCircle size={12} />Completed</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full flex items-center gap-1"><PlayCircle size={12} />In Progress</span>;
      case 'locked':
        return <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full flex items-center gap-1"><Lock size={12} />Locked</span>;
      default:
        return null;
    }
  };

  const getAssignmentStatusBadge = (status) => {
    switch(status) {
      case 'submitted':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Submitted</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Pending</span>;
      case 'upcoming':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Upcoming</span>;
      default:
        return null;
    }
  };

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
          <div 
            className="h-48 p-8 flex flex-col justify-between relative"
            style={{ background: course.thumbnail }}
          >
            <div className="flex items-center justify-between">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {course.category}
              </span>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <Bell size={18} />
                </button>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-white/90 text-sm">Enrolled on {new Date(course.enrollmentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-700 font-semibold">Overall Progress</span>
              <span className="text-2xl font-bold text-slate-900">{course.progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#007ACC] to-emerald-500"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
              <span>{course.modules.completed} of {course.modules.total} modules completed</span>
              <span>Expected completion: {new Date(course.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Resources</p>
            <p className="text-2xl font-bold text-slate-900">{course.resources.unlocked}/{course.resources.total}</p>
            <p className="text-xs text-slate-500 mt-1">Unlocked</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Target className="text-emerald-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Attendance</p>
            <p className="text-2xl font-bold text-slate-900">{course.attendance.percentage}%</p>
            <p className="text-xs text-slate-500 mt-1">{course.attendance.attended}/{course.attendance.total} classes</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Assignments</p>
            <p className="text-2xl font-bold text-slate-900">{course.assessments.pending}</p>
            <p className="text-xs text-slate-500 mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calendar className="text-amber-600" size={24} />
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-1">Next Class</p>
            <p className="text-sm font-bold text-slate-900">{new Date(course.nextClass).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            <p className="text-xs text-slate-500 mt-1">{course.schedule[0].time}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200 mb-8 overflow-x-auto"
        >
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#007ACC] to-[#0F172A] text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Course Description */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Course Description</h2>
                  <p className="text-slate-600 leading-relaxed">{course.description}</p>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activities</h2>
                  <div className="space-y-3">
                    {course.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === 'assessment' && <FileText className="text-blue-600" size={18} />}
                          {activity.type === 'assignment' && <CheckCircle className="text-emerald-600" size={18} />}
                          {activity.type === 'attendance' && <Users className="text-purple-600" size={18} />}
                          {activity.type === 'resource' && <Download className="text-amber-600" size={18} />}
                          {activity.type === 'module' && <BookOpen className="text-blue-600" size={18} />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{activity.activity}</p>
                          <p className="text-xs text-slate-500">{new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Instructor Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Instructor</h2>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-full flex items-center justify-center mb-3">
                      <Users className="text-white" size={32} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{course.instructor.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{course.category} Expert</p>
                    <div className="w-full space-y-2">
                      <a href={`mailto:${course.instructor.email}`} className="block w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
                        Email
                      </a>
                      <a href={`tel:${course.instructor.phone}`} className="block w-full px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-colors">
                        Call
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    <Link to={`/portal/student/resources?courseId=${course.id}`} className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
                      <div className="flex items-center gap-3">
                        <BookOpen className="text-blue-600" size={18} />
                        <span className="text-sm font-semibold text-blue-600">View Resources</span>
                      </div>
                      <ChevronRight className="text-blue-600" size={16} />
                    </Link>
                    <button className="w-full flex items-center justify-between p-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors group">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-emerald-600" size={18} />
                        <span className="text-sm font-semibold text-emerald-600">Discussion Forum</span>
                      </div>
                      <ChevronRight className="text-emerald-600" size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
                      <div className="flex items-center gap-3">
                        <Settings className="text-purple-600" size={18} />
                        <span className="text-sm font-semibold text-purple-600">Course Settings</span>
                      </div>
                      <ChevronRight className="text-purple-600" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Modules</h2>
              <div className="space-y-4">
                {course.syllabus.map((module) => (
                  <div 
                    key={module.module}
                    className={`p-5 rounded-2xl border-2 transition-all ${
                      module.status === 'completed' ? 'bg-emerald-50 border-emerald-200' :
                      module.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                      'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                          module.status === 'completed' ? 'bg-emerald-500' :
                          module.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-slate-400'
                        }`}>
                          {module.module}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{module.title}</h3>
                          <p className="text-xs text-slate-500">{module.duration}</p>
                        </div>
                      </div>
                      {getModuleStatusBadge(module.status)}
                    </div>
                    {module.status !== 'locked' && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                          {module.status === 'completed' ? 'Review Module' : 'Continue Learning'}
                        </button>
                        <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all">
                          Resources
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Assignments</h2>
              <div className="space-y-4">
                {course.assignments.map((assignment) => (
                  <div key={assignment.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-2">{assignment.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {assignment.grade && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 font-semibold rounded">
                              Grade: {assignment.grade}
                            </span>
                          )}
                        </div>
                      </div>
                      {getAssignmentStatusBadge(assignment.status)}
                    </div>
                    {assignment.status === 'pending' && (
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                        Submit Assignment
                      </button>
                    )}
                    {assignment.status === 'submitted' && (
                      <button className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all">
                        View Submission
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Weekly Schedule</h2>
              <div className="space-y-4">
                {course.schedule.map((item, index) => (
                  <div key={index} className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#007ACC] to-[#0F172A] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">{item.day}</h3>
                        <p className="text-sm text-slate-600 mb-1">{item.time}</p>
                        <p className="text-sm font-semibold text-blue-600">{item.topic}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-all">
                        Join Class
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Attendance Overview</h2>
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mb-4">
                    <div className="text-4xl font-bold text-emerald-600">{course.attendance.percentage}%</div>
                  </div>
                  <p className="text-slate-600">
                    You've attended <span className="font-bold text-slate-900">{course.attendance.attended}</span> out of <span className="font-bold text-slate-900">{course.attendance.total}</span> classes
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Assessment Performance</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Completed</span>
                      <span className="text-2xl font-bold text-emerald-600">{course.assessments.completed}</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-200 rounded-full">
                      <div className="w-4/5 h-full bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Pending</span>
                      <span className="text-2xl font-bold text-amber-600">{course.assessments.pending}</span>
                    </div>
                    <div className="w-full h-2 bg-amber-200 rounded-full">
                      <div className="w-2/5 h-full bg-amber-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">Upcoming</span>
                      <span className="text-2xl font-bold text-blue-600">{course.assessments.upcoming}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentCourseDetails;

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Building2, MapPin, Phone, Mail, Calendar, Users, BookOpen,
  DollarSign, TrendingUp, Star, Edit, Ban, CheckCircle, Clock, FileText,
  Download, Lock, Unlock, AlertCircle, Activity, Award, BarChart3
} from 'lucide-react';

const FranchiseDetails = () => {
  const { franchiseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample franchise data (in real app, fetch based on franchiseId)
  const franchise = {
    id: franchiseId,
    name: 'VESDM Mumbai',
    owner: 'Rajesh Patel',
    email: 'rajesh@vesdmmumbai.com',
    phone: '+91 98765 43210',
    location: 'Andheri West, Mumbai, Maharashtra',
    address: '123 Main Street, Andheri West, Mumbai - 400053',
    joinedDate: '2023-06-15',
    status: 'active',
    students: 450,
    courses: 12,
    rating: 4.8,
    revenue: '₹22,50,000',
    description: 'Premier skill development center in Mumbai offering industry-standard courses with state-of-the-art infrastructure and experienced faculty.',
    infrastructure: {
      classrooms: 8,
      labs: 4,
      capacity: 500,
      wifi: true,
      library: true,
      cafeteria: true
    },
    performance: {
      placementRate: 85,
      studentSatisfaction: 92,
      courseCompletion: 88,
      averageGrade: 'A'
    }
  };

  const courses = [
    { id: 1, name: 'Digital Marketing Professional', students: 85, active: true, revenue: '₹4,25,000', completion: 92 },
    { id: 2, name: 'Web Development Bootcamp', students: 120, active: true, revenue: '₹6,00,000', completion: 88 },
    { id: 3, name: 'Business Management', students: 75, active: true, revenue: '₹3,75,000', completion: 95 },
    { id: 4, name: 'Data Analytics', students: 95, active: true, revenue: '₹4,75,000', completion: 90 },
    { id: 5, name: 'Graphic Design', students: 45, active: false, revenue: '₹2,25,000', completion: 85 },
    { id: 6, name: 'Mobile App Development', students: 30, active: true, revenue: '₹1,50,000', completion: 87 }
  ];

  const [resources, setResources] = useState([
    { id: 1, name: 'Digital Marketing Study Guide 2024', type: 'PDF', course: 'Digital Marketing', size: '5.2 MB', blocked: false, downloads: 245 },
    { id: 2, name: 'Web Development Video Tutorials', type: 'Video', course: 'Web Development', size: '850 MB', blocked: false, downloads: 320 },
    { id: 3, name: 'Business Case Studies Collection', type: 'PDF', course: 'Business Management', size: '12 MB', blocked: false, downloads: 156 },
    { id: 4, name: 'Python Programming Exercises', type: 'Code', course: 'Data Analytics', size: '2.5 MB', blocked: true, downloads: 198 },
    { id: 5, name: 'Design Software Tutorials', type: 'Video', course: 'Graphic Design', size: '1.2 GB', blocked: false, downloads: 89 },
    { id: 6, name: 'React Native Project Templates', type: 'Code', course: 'Mobile App Development', size: '45 MB', blocked: false, downloads: 67 },
    { id: 7, name: 'SEO Tools and Resources', type: 'PDF', course: 'Digital Marketing', size: '8.5 MB', blocked: false, downloads: 203 },
    { id: 8, name: 'SQL Database Practice Sets', type: 'Database', course: 'Data Analytics', size: '15 MB', blocked: false, downloads: 178 }
  ]);

  const students = [
    { id: 'STU-2023-045', name: 'Rahul Kumar', course: 'Digital Marketing', enrollment: '2023-07-01', status: 'Active', progress: 85 },
    { id: 'STU-2023-078', name: 'Priya Sharma', course: 'Web Development', enrollment: '2023-07-15', status: 'Active', progress: 72 },
    { id: 'STU-2024-012', name: 'Amit Patel', course: 'Business Management', enrollment: '2024-01-10', status: 'Active', progress: 45 },
    { id: 'STU-2023-156', name: 'Neha Gupta', course: 'Data Analytics', enrollment: '2023-09-01', status: 'Completed', progress: 100 },
    { id: 'STU-2024-034', name: 'Vikram Singh', course: 'Digital Marketing', enrollment: '2024-02-05', status: 'Active', progress: 38 }
  ];

  const activities = [
    { date: '2026-01-05', action: 'New student enrolled', details: '5 students enrolled in Web Development' },
    { date: '2026-01-03', action: 'Course completed', details: 'Business Management batch completed' },
    { date: '2025-12-28', action: 'Results published', details: 'Digital Marketing exam results published' },
    { date: '2025-12-20', action: 'Resource uploaded', details: 'New study materials added for Data Analytics' }
  ];

  const toggleResourceBlock = (resourceId) => {
    setResources(resources.map(r => 
      r.id === resourceId ? { ...r, blocked: !r.blocked } : r
    ));
  };

  const getResourceTypeColor = (type) => {
    const colors = {
      'PDF': 'bg-red-100 text-red-700',
      'Video': 'bg-purple-100 text-purple-700',
      'Code': 'bg-blue-100 text-blue-700',
      'Database': 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/portal/admin/franchises')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Franchises
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{franchise.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{franchise.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(franchise.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 ${
                  franchise.status === 'active' ? 'bg-green-100 text-green-700' :
                  franchise.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                } text-sm font-bold rounded-full`}>
                  {franchise.status === 'active' ? '● Active' : franchise.status === 'pending' ? '● Pending' : '● Suspended'}
                </span>
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full">
                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-bold text-yellow-700">{franchise.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Details
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Suspend Franchise
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.students}</p>
          <p className="text-sm text-gray-600">Total Students</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.courses}</p>
          <p className="text-sm text-gray-600">Active Courses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.revenue}</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.performance.placementRate}%</p>
          <p className="text-sm text-gray-600">Placement Rate</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'resources', label: 'Resources', icon: FileText },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'activities', label: 'Activities', icon: Activity }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Franchise Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Owner Name</p>
                      <p className="font-medium text-gray-900">{franchise.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{franchise.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{franchise.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{franchise.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{franchise.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Infrastructure</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Classrooms</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.classrooms}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Computer Labs</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.labs}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Capacity</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.capacity} students</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">WiFi Available</span>
                      <span className="font-medium text-green-600">{franchise.infrastructure.wifi ? '✓ Yes' : '✗ No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Placement Rate</span>
                        <span className="font-medium text-gray-900">{franchise.performance.placementRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${franchise.performance.placementRate}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Student Satisfaction</span>
                        <span className="font-medium text-gray-900">{franchise.performance.studentSatisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${franchise.performance.studentSatisfaction}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Course Completion</span>
                        <span className="font-medium text-gray-900">{franchise.performance.courseCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${franchise.performance.courseCompletion}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average Grade</span>
                      <span className="font-medium text-gray-900">{franchise.performance.averageGrade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Course Offerings</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Add Course
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <div key={course.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{course.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            course.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {course.active ? '● Active' : '● Inactive'}
                          </span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Students</p>
                        <p className="font-medium text-gray-900">{course.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium text-gray-900">{course.revenue}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-600 mb-1">Completion Rate</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${course.completion}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{course.completion}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Learning Resources</h3>
                  <p className="text-sm text-gray-600 mt-1">Manage and control resource access for this franchise</p>
                </div>
                <div className="text-sm text-gray-600">
                  Total: {resources.length} resources | Blocked: {resources.filter(r => r.blocked).length}
                </div>
              </div>
              <div className="space-y-3">
                {resources.map(resource => (
                  <div key={resource.id} className={`p-4 rounded-lg border-2 transition-all ${
                    resource.blocked 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${resource.blocked ? 'bg-red-200' : 'bg-gray-100'}`}>
                          <FileText className={`w-5 h-5 ${resource.blocked ? 'text-red-700' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900">{resource.name}</h4>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getResourceTypeColor(resource.type)}`}>
                              {resource.type}
                            </span>
                            {resource.blocked && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                BLOCKED
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Course: {resource.course}</span>
                            <span>Size: {resource.size}</span>
                            <span>Downloads: {resource.downloads}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleResourceBlock(resource.id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                            resource.blocked
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {resource.blocked ? (
                            <>
                              <Unlock className="w-4 h-4" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              Block
                            </>
                          )}
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    {resource.blocked && (
                      <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-700 mt-0.5" />
                        <p className="text-sm text-red-700">
                          This resource is currently blocked and cannot be accessed by students in this franchise.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Enrolled Students</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  View All Students
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{student.course}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(student.enrollment).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            student.status === 'Active' ? 'bg-green-100 text-green-700' :
                            student.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-600">{student.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activities</h3>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{activity.action}</p>
                      <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FranchiseDetails;

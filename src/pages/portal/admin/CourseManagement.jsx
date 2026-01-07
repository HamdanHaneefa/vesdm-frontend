import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, Plus, Edit, Trash2, Eye, EyeOff, Users, 
  DollarSign, Clock, TrendingUp, Award, MoreVertical, Calendar,
  CheckCircle, XCircle, AlertCircle, Settings, FileText
} from 'lucide-react';

const CourseManagementAdmin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Digital Marketing Professional',
      category: 'Marketing',
      duration: '6 months',
      price: '₹50,000',
      enrollments: 450,
      franchises: 8,
      rating: 4.8,
      status: 'published',
      visibility: 'public',
      description: 'Comprehensive digital marketing course covering SEO, SEM, Social Media, and Analytics',
      syllabus: 12,
      resources: 45,
      lastUpdated: '2026-01-05'
    },
    {
      id: 2,
      name: 'Web Development Bootcamp',
      category: 'Technology',
      duration: '8 months',
      price: '₹60,000',
      enrollments: 625,
      franchises: 10,
      rating: 4.9,
      status: 'published',
      visibility: 'public',
      description: 'Full-stack web development covering HTML, CSS, JavaScript, React, Node.js, and databases',
      syllabus: 16,
      resources: 68,
      lastUpdated: '2026-01-03'
    },
    {
      id: 3,
      name: 'Business Management',
      category: 'Business',
      duration: '5 months',
      price: '₹45,000',
      enrollments: 380,
      franchises: 7,
      rating: 4.6,
      status: 'published',
      visibility: 'public',
      description: 'Essential business management skills including leadership, finance, and operations',
      syllabus: 10,
      resources: 38,
      lastUpdated: '2025-12-28'
    },
    {
      id: 4,
      name: 'Data Analytics',
      category: 'Technology',
      duration: '7 months',
      price: '₹55,000',
      enrollments: 520,
      franchises: 9,
      rating: 4.7,
      status: 'published',
      visibility: 'public',
      description: 'Data analysis using Python, SQL, Excel, and visualization tools',
      syllabus: 14,
      resources: 52,
      lastUpdated: '2026-01-02'
    },
    {
      id: 5,
      name: 'Graphic Design Mastery',
      category: 'Design',
      duration: '4 months',
      price: '₹40,000',
      enrollments: 185,
      franchises: 5,
      rating: 4.5,
      status: 'published',
      visibility: 'hidden',
      description: 'Professional graphic design using Adobe Creative Suite',
      syllabus: 8,
      resources: 28,
      lastUpdated: '2025-12-15'
    },
    {
      id: 6,
      name: 'Mobile App Development',
      category: 'Technology',
      duration: '6 months',
      price: '₹52,000',
      enrollments: 95,
      franchises: 3,
      rating: 4.4,
      status: 'draft',
      visibility: 'hidden',
      description: 'Build iOS and Android apps using React Native',
      syllabus: 11,
      resources: 32,
      lastUpdated: '2026-01-01'
    },
    {
      id: 7,
      name: 'Financial Planning & Analysis',
      category: 'Finance',
      duration: '5 months',
      price: '₹48,000',
      enrollments: 210,
      franchises: 6,
      rating: 4.6,
      status: 'published',
      visibility: 'public',
      description: 'Professional financial planning, budgeting, and investment strategies',
      syllabus: 9,
      resources: 35,
      lastUpdated: '2025-12-20'
    },
    {
      id: 8,
      name: 'Cloud Computing Fundamentals',
      category: 'Technology',
      duration: '4 months',
      price: '₹45,000',
      enrollments: 0,
      franchises: 0,
      rating: 0,
      status: 'draft',
      visibility: 'hidden',
      description: 'AWS, Azure, and Google Cloud basics for beginners',
      syllabus: 8,
      resources: 20,
      lastUpdated: '2026-01-06'
    }
  ]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = [
    { 
      label: 'Total Courses', 
      value: courses.length, 
      icon: BookOpen, 
      color: 'blue',
      change: '+2 this month'
    },
    { 
      label: 'Published', 
      value: courses.filter(c => c.status === 'published').length, 
      icon: CheckCircle, 
      color: 'green',
      change: `${courses.filter(c => c.visibility === 'public').length} public`
    },
    { 
      label: 'Total Enrollments', 
      value: courses.reduce((acc, c) => acc + c.enrollments, 0), 
      icon: Users, 
      color: 'purple',
      change: '+145 this week'
    },
    { 
      label: 'Avg. Rating', 
      value: (courses.filter(c => c.rating > 0).reduce((acc, c) => acc + c.rating, 0) / courses.filter(c => c.rating > 0).length).toFixed(1), 
      icon: Award, 
      color: 'amber',
      change: '4.7/5.0'
    }
  ];

  const categories = ['all', ...new Set(courses.map(c => c.category))];

  const toggleVisibility = (courseId) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, visibility: c.visibility === 'public' ? 'hidden' : 'public' } 
        : c
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} />Published</span>;
      case 'draft':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full flex items-center gap-1"><FileText size={12} />Draft</span>;
      case 'archived':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><XCircle size={12} />Archived</span>;
      default:
        return status;
    }
  };

  const getVisibilityBadge = (visibility) => {
    return visibility === 'public' 
      ? <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded flex items-center gap-1"><Eye size={10} />Public</span>
      : <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded flex items-center gap-1"><EyeOff size={10} />Hidden</span>;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage courses, control public visibility, and track performance</p>
          </div>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium shadow-lg shadow-red-600/30">
            <Plus className="w-5 h-5" />
            Add New Course
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(course.status)}
                      {getVisibilityBadge(course.visibility)}
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {course.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Students</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.enrollments}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Duration</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.duration}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Price</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.price}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Award className="w-4 h-4" />
                    <span className="text-xs">Rating</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.rating > 0 ? course.rating : 'N/A'}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-4">
                  <span>{course.syllabus} modules</span>
                  <span>{course.resources} resources</span>
                  <span>{course.franchises} franchises</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {new Date(course.lastUpdated).toLocaleDateString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleVisibility(course.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    course.visibility === 'public'
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {course.visibility === 'public' ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide from Public
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show to Public
                    </>
                  )}
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No courses found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default CourseManagementAdmin;

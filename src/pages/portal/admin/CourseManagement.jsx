import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, Plus, Edit, Trash2, Eye, EyeOff, Users, 
  DollarSign, Clock, Award, Calendar,
  CheckCircle, XCircle, AlertCircle, FileText, X
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const CourseManagementAdmin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    duration: '',
    fee: '',
    eligibility: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  // Fetch courses from backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/courses');
      setCourses(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await apiClient.delete(`/courses/${courseId}`);
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (err) {
      console.error('Error deleting course:', err);
      alert('Failed to delete course');
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await apiClient.post('/courses', {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        duration: formData.duration,
        fee: parseFloat(formData.fee),
        eligibility: formData.eligibility
      });

      setCourses([...courses, response.data]);
      setShowAddModal(false);
      setFormData({
        name: '',
        type: '',
        description: '',
        duration: '',
        fee: '',
        eligibility: ''
      });
      alert('Course added successfully!');
    } catch (err) {
      console.error('Error adding course:', err);
      alert('Failed to add course');
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name || '',
      type: course.type || '',
      description: course.description || '',
      duration: course.duration || '',
      fee: course.fee || '',
      eligibility: course.eligibility || ''
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await apiClient.put(`/courses/${editingCourse._id}`, {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        duration: formData.duration,
        fee: parseFloat(formData.fee),
        eligibility: formData.eligibility
      });

      setCourses(courses.map(c => c._id === editingCourse._id ? response.data : c));
      setShowEditModal(false);
      setEditingCourse(null);
      setFormData({
        name: '',
        type: '',
        description: '',
        duration: '',
        fee: '',
        eligibility: ''
      });
      alert('Course updated successfully!');
    } catch (err) {
      console.error('Error updating course:', err);
      alert('Failed to update course');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleVisibility = async (courseId) => {
    const course = courses.find(c => c._id === courseId);
    const newVisibility = course.visibility === 'public' ? 'hidden' : 'public';

    try {
      await apiClient.put(`/courses/${courseId}`, {
        ...course,
        visibility: newVisibility
      });
      
      setCourses(courses.map(c => 
        c._id === courseId 
          ? { ...c, visibility: newVisibility } 
          : c
      ));
    } catch (err) {
      console.error('Error updating course visibility:', err);
      alert('Failed to update course visibility');
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      value: courses.reduce((acc, c) => acc + (c.enrollments || 0), 0), 
      icon: Users, 
      color: 'purple',
      change: '+145 this week'
    },
    { 
      label: 'Avg. Rating', 
      value: courses.filter(c => c.rating > 0).length > 0 
        ? (courses.filter(c => c.rating > 0).reduce((acc, c) => acc + c.rating, 0) / courses.filter(c => c.rating > 0).length).toFixed(1)
        : 'N/A', 
      icon: Award, 
      color: 'amber',
      change: '4.7/5.0'
    }
  ];

  const categories = ['all', ...new Set(courses.map(c => c.category).filter(Boolean))];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage courses, control public visibility, and track performance</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 font-medium shadow-lg shadow-red-600/30"
          >
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
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course._id}
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
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Enrollments</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.enrollments || 0}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Duration</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.duration || 'N/A'}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Price</span>
                  </div>
                  <p className="font-bold text-gray-900">{course.price || course.fees || 'N/A'}</p>
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
                  <span>{course.syllabus || 0} modules</span>
                  <span>{course.resources || 0} resources</span>
                  <span>{course.franchises || 0} franchises</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {course.lastUpdated ? new Date(course.lastUpdated).toLocaleDateString() : 
                   course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleVisibility(course._id)}
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
                <button 
                  onClick={() => handleEditClick(course)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course._id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
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

      {/* Add Course Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add New Course</h2>
                    <p className="text-sm text-gray-500">Fill in the course details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleAddCourse} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {/* Course Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Web Development Bootcamp"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Course Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select course type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Degree">Degree</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Describe the course content, objectives, and outcomes..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Duration and Fee - Side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 6 months"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fee
                      </label>
                      <input
                        type="number"
                        name="fee"
                        value={formData.fee}
                        onChange={handleInputChange}
                        placeholder="e.g., 50000"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Eligibility Criteria
                    </label>
                    <input
                      type="text"
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleInputChange}
                      placeholder="e.g., 10+2 or equivalent"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add Course
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Course Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Edit className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Course</h2>
                    <p className="text-sm text-gray-500">Update course details</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCourse(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdateCourse} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {/* Course Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Web Development Bootcamp"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  {/* Course Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select course type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Degree">Degree</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Describe the course content, objectives, and outcomes..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Duration and Fee - Side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 6 months"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Fee
                      </label>
                      <input
                        type="number"
                        name="fee"
                        value={formData.fee}
                        onChange={handleInputChange}
                        placeholder="e.g., 50000"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Eligibility Criteria
                    </label>
                    <input
                      type="text"
                      name="eligibility"
                      value={formData.eligibility}
                      onChange={handleInputChange}
                      placeholder="e.g., 10+2 or equivalent"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingCourse(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Update Course
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManagementAdmin;

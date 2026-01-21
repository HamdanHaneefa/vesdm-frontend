import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, BookOpen, Users, FolderOpen, Edit2, Trash2, 
  X, Upload, FileText, Video, Link as LinkIcon, Download,
  Search, Filter, MoreVertical, ArrowRight, Loader2, AlertCircle
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const CourseManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddResource, setShowAddResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch courses from backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching courses from:', apiClient.defaults.baseURL + '/courses');
      const response = await apiClient.get('/courses');
      console.log('✅ Courses received:', response.data);
      setCourses(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching courses:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.msg || err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    duration: '',
    description: '',
    status: 'active'
  });

  const [courseResources, setCourseResources] = useState({
    1: [
      { id: 1, name: 'Introduction to Digital Marketing.pdf', type: 'pdf', size: '2.4 MB', uploadedDate: '2025-11-20' },
      { id: 2, name: 'SEO Basics Video', type: 'video', size: '45 MB', uploadedDate: '2025-11-22' }
    ],
    2: [
      { id: 1, name: 'HTML & CSS Guide.pdf', type: 'pdf', size: '3.1 MB', uploadedDate: '2025-12-05' },
      { id: 2, name: 'JavaScript Tutorial', type: 'video', size: '120 MB', uploadedDate: '2025-12-08' }
    ]
  });

  const [enrolledStudents, setEnrolledStudents] = useState({
    1: [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', enrolledDate: '2025-11-15', status: 'active', progress: 45 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', enrolledDate: '2025-11-16', status: 'active', progress: 60 },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', enrolledDate: '2025-11-18', status: 'blocked', progress: 30 },
    ],
    2: [
      { id: 1, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+91 9876543213', enrolledDate: '2025-12-01', status: 'active', progress: 75 },
      { id: 2, name: 'David Brown', email: 'david@example.com', phone: '+91 9876543214', enrolledDate: '2025-12-02', status: 'active', progress: 50 },
    ]
  });

  const [newResource, setNewResource] = useState({
    name: '',
    type: 'pdf',
    url: '',
    file: null
  });

  const handleAddCourse = () => {
    // Franchises cannot add courses - this is admin only
    alert('Only administrators can create courses. Please contact admin to add new courses.');
  };

  const handleDeleteCourse = (courseId) => {
    // Franchises cannot delete courses - this is admin only
    alert('Only administrators can delete courses. Please contact admin.');
  };

  const handleAddResource = (courseId) => {
    if (newResource.name) {
      const resource = {
        id: (courseResources[courseId]?.length || 0) + 1,
        ...newResource,
        size: newResource.file ? `${(newResource.file.size / 1024 / 1024).toFixed(1)} MB` : 'N/A',
        uploadedDate: new Date().toISOString().split('T')[0]
      };
      
      setCourseResources(prev => ({
        ...prev,
        [courseId]: [...(prev[courseId] || []), resource]
      }));

      setCourses(courses.map(c => 
        c.id === courseId ? { ...c, resources: (c.resources || 0) + 1 } : c
      ));

      setNewResource({ name: '', type: 'pdf', url: '', file: null });
      setShowAddResource(null);
    }
  };

  const handleDeleteResource = (courseId, resourceId) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setCourseResources(prev => ({
        ...prev,
        [courseId]: prev[courseId].filter(r => r.id !== resourceId)
      }));

      setCourses(courses.map(c => 
        c.id === courseId ? { ...c, resources: Math.max(0, c.resources - 1) } : c
      ));
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name?.toLowerCase().includes(searchQuery.toLowerCase());
    // Backend courses don't have status field, they're all available
    return matchesSearch;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'link': return LinkIcon;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Course Management</h1>
          <p className="text-slate-600 mt-1">View available courses for student enrollment</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-rose-600 flex-shrink-0" />
          <p className="text-rose-800">{error}</p>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search courses by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

      {/* Courses Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{course.name}</h3>
                  <p className="text-sm text-slate-500">Type: {course.type || 'General'}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                Available
              </span>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                <Users size={16} className="text-blue-600" />
                <span className="text-slate-700 font-medium">Duration: {course.duration}</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                <BookOpen size={16} className="text-purple-600" />
                <span className="text-slate-700 font-medium">₹{course.fee?.toLocaleString()}</span>
              </div>
            </div>

            {course.eligibility && (
              <div className="mb-4 p-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600"><strong>Eligibility:</strong> {course.eligibility}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigate('/portal/franchise/register-student', { state: { selectedCourse: course } })}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Enroll Student
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && !loading && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">No courses found</p>
        </div>
      )}
    </>
  )}
    </div>
  );
};

export default CourseManagement;

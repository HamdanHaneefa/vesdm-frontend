import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, BookOpen, Users, FolderOpen, Edit2, Trash2, 
  X, Upload, FileText, Video, Link as LinkIcon, Download,
  Search, Filter, MoreVertical, ArrowRight, Loader2, AlertCircle, Eye
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const CourseManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch courses from backend
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/courses');
      setCourses(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching courses:', err);
      setError(err.response?.data?.msg || err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 p-0 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hidden md:block">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Course Management</h1>
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
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search courses by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
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
                  <div 
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => navigate(`/portal/franchise/courses/${course._id}`)}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm text-slate-500">Type: {course.type || 'General'}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    Available
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-slate-700 font-medium">Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <BookOpen size={16} className="text-purple-600" />
                    <span className="text-slate-700 font-medium">₹{course.fee?.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  {/* DETAIL BUTTON */}
                  <button
                    onClick={() => navigate(`/portal/franchise/courses/${course._id}`)}
                    className="flex-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>

                  {/* ENROLL BUTTON */}
                  <button
                    onClick={() => navigate('/portal/franchise/register-student', { state: { selectedCourse: course } })}
                    className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-md shadow-purple-200"
                  >
                    <Plus size={16} />
                    Enroll Student
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">No courses found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseManagement;
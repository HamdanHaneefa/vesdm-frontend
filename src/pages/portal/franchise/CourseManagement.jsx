import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, BookOpen, Users, FolderOpen, Edit2, Trash2, 
  X, Upload, FileText, Video, Link as LinkIcon, Download,
  Search, Filter, MoreVertical, ArrowRight
} from 'lucide-react';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Digital Marketing Fundamentals',
      code: 'DM-101',
      duration: '3 Months',
      enrolledStudents: 45,
      resources: 12,
      status: 'active',
      description: 'Learn the basics of digital marketing including SEO, SEM, and social media marketing.',
      createdDate: '2025-11-15'
    },
    {
      id: 2,
      name: 'Web Development Bootcamp',
      code: 'WD-201',
      duration: '6 Months',
      enrolledStudents: 32,
      resources: 24,
      status: 'active',
      description: 'Comprehensive web development course covering HTML, CSS, JavaScript, and React.',
      createdDate: '2025-12-01'
    }
  ]);

  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddResource, setShowAddResource] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
    if (newCourse.name && newCourse.code && newCourse.duration) {
      const course = {
        id: courses.length + 1,
        ...newCourse,
        enrolledStudents: 0,
        resources: 0,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, course]);
      setNewCourse({ name: '', code: '', duration: '', description: '', status: 'active' });
      setShowAddCourse(false);
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
      setCourseResources(prev => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
    }
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
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
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
          <p className="text-slate-600 mt-1">Create and manage your courses and resources</p>
        </div>
        <button
          onClick={() => setShowAddCourse(true)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30"
        >
          <Plus size={20} />
          Add New Course
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search courses by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Courses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
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
                  <p className="text-sm text-slate-500">Code: {course.code}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCourseDetails(course)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit2 size={18} className="text-slate-600" />
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="p-2 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-rose-600" />
                </button>
              </div>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <span className="flex items-center gap-1 text-slate-600">
                <Users size={16} />
                {course.enrolledStudents} Students
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <FolderOpen size={16} />
                {course.resources} Resources
              </span>
              <span className="text-slate-500">{course.duration}</span>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => navigate(`/portal/franchise/courses/${course.id}`)}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setShowAddResource(course.id)}
                className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Resource
              </button>
            </div>

            {/* Resources List */}
            {courseResources[course.id]?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Recent Resources:</h4>
                <div className="space-y-2">
                  {courseResources[course.id].slice(0, 2).map(resource => {
                    const Icon = getResourceIcon(resource.type);
                    return (
                      <div key={resource.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Icon size={16} className="text-purple-600" />
                          <span className="text-sm text-slate-700">{resource.name}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteResource(course.id, resource.id)}
                          className="p-1 hover:bg-rose-100 rounded transition-colors"
                        >
                          <Trash2 size={14} className="text-rose-600" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">No courses found</p>
          <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add Course Modal */}
      <AnimatePresence>
        {showAddCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCourse(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add New Course</h3>
                <button
                  onClick={() => setShowAddCourse(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="e.g., Digital Marketing Fundamentals"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Course Code</label>
                    <input
                      type="text"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                      placeholder="e.g., DM-101"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      placeholder="e.g., 3 Months"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Brief description of the course..."
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                  <select
                    value={newCourse.status}
                    onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddCourse(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Add Course
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Resource Modal */}
      <AnimatePresence>
        {showAddResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Add Resource</h3>
                <button
                  onClick={() => setShowAddResource(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Resource Name</label>
                  <input
                    type="text"
                    value={newResource.name}
                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    placeholder="e.g., Introduction to Marketing"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Resource Type</label>
                  <select
                    value={newResource.type}
                    onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="video">Video</option>
                    <option value="link">External Link</option>
                  </select>
                </div>

                {newResource.type === 'link' ? (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Resource URL</label>
                    <input
                      type="url"
                      value={newResource.url}
                      onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                      placeholder="https://example.com/resource"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-purple-500 transition-colors">
                      <Upload size={32} className="mx-auto text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600 mb-2">Click to upload or drag and drop</p>
                      <input
                        type="file"
                        onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                      >
                        Choose File
                      </label>
                      {newResource.file && (
                        <p className="text-sm text-slate-600 mt-2">{newResource.file.name}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddResource(null)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddResource(showAddResource)}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Add Resource
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseManagement;

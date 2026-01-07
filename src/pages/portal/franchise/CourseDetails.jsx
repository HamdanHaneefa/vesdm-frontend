import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, FolderOpen, BookOpen, Ban, CheckCircle, 
  UserX, Mail, Phone, FileText, Video, Link as LinkIcon, 
  Download, Trash2, Plus, Upload, X, Calendar, Award
} from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const [course, setCourse] = useState({
    id: courseId,
    name: 'Digital Marketing Fundamentals',
    code: 'DM-101',
    duration: '3 Months',
    description: 'Learn the basics of digital marketing including SEO, SEM, and social media marketing.',
    status: 'active',
    createdDate: '2025-11-15'
  });

  const [enrolledStudents, setEnrolledStudents] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', enrolledDate: '2025-11-15', status: 'active', progress: 45 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', enrolledDate: '2025-11-16', status: 'active', progress: 60 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', enrolledDate: '2025-11-18', status: 'blocked', progress: 30 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+91 9876543213', enrolledDate: '2025-11-20', status: 'active', progress: 75 },
    { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+91 9876543214', enrolledDate: '2025-11-22', status: 'active', progress: 50 },
  ]);

  const [resources, setResources] = useState([
    { id: 1, name: 'Introduction to Digital Marketing.pdf', type: 'pdf', size: '2.4 MB', uploadedDate: '2025-11-20' },
    { id: 2, name: 'SEO Basics Video', type: 'video', size: '45 MB', uploadedDate: '2025-11-22' },
    { id: 3, name: 'Social Media Strategy Guide', type: 'pdf', size: '3.1 MB', uploadedDate: '2025-11-25' },
  ]);

  const [showAddResource, setShowAddResource] = useState(false);
  const [newResource, setNewResource] = useState({
    name: '',
    type: 'pdf',
    url: '',
    file: null
  });

  const handleBlockStudent = (studentId) => {
    setEnrolledStudents(enrolledStudents.map(s => 
      s.id === studentId ? { ...s, status: s.status === 'blocked' ? 'active' : 'blocked' } : s
    ));
  };

  const handleRemoveStudent = (studentId) => {
    if (confirm('Are you sure you want to remove this student from the course?')) {
      setEnrolledStudents(enrolledStudents.filter(s => s.id !== studentId));
    }
  };

  const handleAddResource = () => {
    if (newResource.name) {
      const resource = {
        id: resources.length + 1,
        ...newResource,
        size: newResource.file ? `${(newResource.file.size / 1024 / 1024).toFixed(1)} MB` : 'N/A',
        uploadedDate: new Date().toISOString().split('T')[0]
      };
      
      setResources([...resources, resource]);
      setNewResource({ name: '', type: 'pdf', url: '', file: null });
      setShowAddResource(false);
    }
  };

  const handleDeleteResource = (resourceId) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== resourceId));
    }
  };

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
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/portal/franchise/courses')}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{course.name}</h1>
          <p className="text-slate-600 mt-1">Course Code: {course.code} | Duration: {course.duration}</p>
        </div>
        <div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
            course.status === 'active' 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-slate-100 text-slate-700'
          }`}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Course Description */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Course Description</h3>
        <p className="text-slate-600">{course.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-semibold">Enrolled Students</p>
            <Users size={24} className="text-purple-200" />
          </div>
          <p className="text-4xl font-bold">{enrolledStudents.length}</p>
          <p className="text-purple-100 text-sm mt-1">Active: {enrolledStudents.filter(s => s.status === 'active').length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-semibold">Course Resources</p>
            <FolderOpen size={24} className="text-blue-200" />
          </div>
          <p className="text-4xl font-bold">{resources.length}</p>
          <p className="text-blue-100 text-sm mt-1">Available materials</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-emerald-100 text-sm font-semibold">Avg Progress</p>
            <Award size={24} className="text-emerald-200" />
          </div>
          <p className="text-4xl font-bold">
            {Math.round(enrolledStudents.reduce((sum, s) => sum + s.progress, 0) / enrolledStudents.length)}%
          </p>
          <p className="text-emerald-100 text-sm mt-1">Course completion</p>
        </motion.div>
      </div>

      {/* Enrolled Students Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users size={24} className="text-purple-600" />
            Enrolled Students ({enrolledStudents.length})
          </h3>
        </div>

        <div className="space-y-3">
          {enrolledStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  student.status === 'blocked' ? 'bg-red-100' : 'bg-purple-100'
                }`}>
                  <Users size={24} className={student.status === 'blocked' ? 'text-red-600' : 'text-purple-600'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-slate-900 text-lg">{student.name}</p>
                    {student.status === 'blocked' && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Blocked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {student.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone size={14} />
                      {student.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Enrolled: {student.enrolledDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 min-w-[45px]">{student.progress}%</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleBlockStudent(student.id)}
                  className={`p-3 rounded-xl transition-colors ${
                    student.status === 'blocked' 
                      ? 'bg-emerald-100 hover:bg-emerald-200' 
                      : 'bg-amber-100 hover:bg-amber-200'
                  }`}
                  title={student.status === 'blocked' ? 'Unblock Student' : 'Block Student'}
                >
                  {student.status === 'blocked' ? (
                    <CheckCircle size={20} className="text-emerald-600" />
                  ) : (
                    <Ban size={20} className="text-amber-600" />
                  )}
                </button>
                <button
                  onClick={() => handleRemoveStudent(student.id)}
                  className="p-3 bg-rose-100 hover:bg-rose-200 rounded-xl transition-colors"
                  title="Remove from Course"
                >
                  <UserX size={20} className="text-rose-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {enrolledStudents.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No students enrolled yet</p>
          </div>
        )}
      </div>

      {/* Course Resources Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FolderOpen size={24} className="text-blue-600" />
            Course Resources ({resources.length})
          </h3>
          <button
            onClick={() => setShowAddResource(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Resource
          </button>
        </div>

        <div className="space-y-3">
          {resources.map((resource, index) => {
            const Icon = getResourceIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-lg">{resource.name}</p>
                    <p className="text-sm text-slate-500">{resource.size} - Uploaded {resource.uploadedDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                    <Download size={20} className="text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className="p-2 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} className="text-rose-600" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {resources.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">No resources added yet</p>
          </div>
        )}
      </div>

      {/* Add Resource Modal */}
      {showAddResource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Add Resource</h3>
              <button
                onClick={() => setShowAddResource(false)}
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Resource Type</label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
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
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
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
                onClick={() => setShowAddResource(false)}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Add Resource
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

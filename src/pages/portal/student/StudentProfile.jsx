import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit2, Save, X, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/student/profile');
        setStudent(response.data);
        setEditData({ name: response.data.name || '', email: response.data.email || '', phone: response.data.phone || '' });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditData({ name: student.name || '', email: student.email || '', phone: student.phone || '' });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await apiClient.put('/student/profile', editData);
      setStudent(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">View and update your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#007ACC] to-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg"
          >
            <Edit2 size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#007ACC] via-blue-600 to-[#0F172A] rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30">
            {student.name?.charAt(0) || '?'}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">{student.name || 'N/A'}</h2>
            <p className="text-blue-100 font-mono text-lg mb-3">{student.registrationNumber || 'N/A'}</p>
            {student.year && (
              <span className="px-4 py-1.5 bg-emerald-500 text-white text-sm font-semibold rounded-full">
                Year {student.year}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <User size={22} className="text-blue-600" />
          </div>
          Personal Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input name="name" value={editData.name} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input name="email" type="email" value={editData.email} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input name="phone" value={editData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Full Name</p>
                <p className="font-semibold text-slate-900 text-lg">{student.name || 'N/A'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Email</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Mail size={18} className="text-slate-400" />
                  {student.email || 'N/A'}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Phone</p>
                <p className="font-semibold text-slate-900 flex items-center gap-2">
                  <Phone size={18} className="text-slate-400" />
                  {student.phone || 'N/A'}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-slate-500 mb-2">Registration Number</p>
                <p className="font-mono font-bold text-slate-900 text-xl">{student.registrationNumber || 'N/A'}</p>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Enrolled Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
      >
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Enrolled Courses</h3>
        {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            {student.enrolledCourses.map((enrollment, index) => (
              <div key={index} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">{enrollment.course?.name || 'Unknown Course'}</h4>
                    <p className="text-sm text-slate-600">Progress: {enrollment.progress}% • Status: {enrollment.status}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    Enrolled {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No courses enrolled yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default StudentProfile;
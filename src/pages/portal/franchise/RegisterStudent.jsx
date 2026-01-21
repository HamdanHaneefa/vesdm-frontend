import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Upload, Save, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const RegisterStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: location.state?.selectedCourse?._id || '',
    year: new Date().getFullYear()
  });

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Pre-select course if passed from course management
  useEffect(() => {
    if (location.state?.selectedCourse) {
      setFormData(prev => ({ ...prev, course: location.state.selectedCourse._id }));
    }
  }, [location.state]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.course) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await apiClient.post('/students', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course: formData.course,
        year: formData.year,
        franchisee: user._id // Backend will use this if user is franchisee
      });

      console.log('Student registered:', response.data);
      setSuccess(true);
      
      // Show success message for 2 seconds then navigate
      setTimeout(() => {
        navigate('/portal/franchise/students');
      }, 2000);
    } catch (err) {
      console.error('Error registering student:', err);
      setError(err.response?.data?.msg || 'Failed to register student. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-center gap-3"
        >
          <CheckCircle size={24} className="text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-semibold text-emerald-800">Student Registered Successfully!</p>
            <p className="text-sm text-emerald-600">Redirecting to students list...</p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertCircle size={24} className="text-rose-600 flex-shrink-0" />
          <p className="text-rose-800">{error}</p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Register New Student</h1>
        <p className="text-slate-500 text-lg">Enroll a new student in your franchise</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Information */}
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
            Student Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name * <span className="text-slate-500 font-normal">(First and Last Name)</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter student's full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="student@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-purple-600" />
            </div>
            Course Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course *</label>
              {loading ? (
                <div className="flex items-center justify-center py-3 border border-slate-200 rounded-xl">
                  <Loader2 className="animate-spin text-purple-600" size={20} />
                  <span className="ml-2 text-slate-500">Loading courses...</span>
                </div>
              ) : (
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name} - {course.duration} (₹{course.fee?.toLocaleString()})
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Year *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  min="2020"
                  max="2030"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2026"
                />
              </div>
            </div>
          </div>

          {/* Selected Course Info */}
          {formData.course && courses.find(c => c._id === formData.course) && (
            <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Selected Course Details:</h4>
              {(() => {
                const selectedCourse = courses.find(c => c._id === formData.course);
                return (
                  <div className="text-sm text-purple-800 space-y-1">
                    <p><strong>Name:</strong> {selectedCourse.name}</p>
                    <p><strong>Type:</strong> {selectedCourse.type}</p>
                    <p><strong>Duration:</strong> {selectedCourse.duration}</p>
                    <p><strong>Fee:</strong> ₹{selectedCourse.fee?.toLocaleString()}</p>
                    {selectedCourse.eligibility && (
                      <p><strong>Eligibility:</strong> {selectedCourse.eligibility}</p>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <button
            type="button"
            onClick={() => navigate('/portal/franchise/courses')}
            className="flex-1 px-6 py-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || loading}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Registering...
              </>
            ) : (
              <>
                <Save size={20} />
                Register Student
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default RegisterStudent;

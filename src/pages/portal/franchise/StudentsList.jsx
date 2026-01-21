import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Eye, Edit2, Trash2, Download, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const StudentsList = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    course: 'all',
    year: 'all'
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students from backend
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching students...');
      const response = await apiClient.get('/students');
      console.log('✅ Students received:', response.data);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ Error fetching students:', err);
      setError(err.response?.data?.msg || err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filters.course === 'all' || student.course?.name === filters.course;
    const matchesYear = filters.year === 'all' || student.year?.toString() === filters.year;
    return matchesSearch && matchesCourse && matchesYear;
  });

  // Get unique courses and years for filters
  const courses = ['all', ...new Set(students.map(s => s.course?.name).filter(Boolean))];
  const years = ['all', ...new Set(students.map(s => s.year).filter(Boolean))].sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Students Directory</h1>
                <p className="text-purple-100 mt-1">Manage and view all registered students</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{loading ? '...' : filteredStudents.length}</p>
              <p className="text-purple-100 text-sm">Total Students</p>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-purple-600" size={48} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4 flex items-center gap-3"
          >
            <AlertCircle size={24} className="text-rose-600 flex-shrink-0" />
            <p className="text-rose-800">{error}</p>
          </motion.div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-emerald-100 text-sm mb-2">Total Students</p>
                <p className="text-4xl font-bold">{students.length}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-blue-100 text-sm mb-2">Unique Courses</p>
                <p className="text-4xl font-bold">{courses.length - 1}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-purple-100 text-sm mb-2">Current Year</p>
                <p className="text-4xl font-bold">{new Date().getFullYear()}</p>
              </div>
            </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <select
                value={filters.course}
                onChange={(e) => setFilters(prev => ({ ...prev, course: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course === 'all' ? 'All Courses' : course}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : `Year ${year}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Registration No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrollment Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-500 text-lg">No students found</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-purple-600">{student.registrationNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {student.email && (
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Mail className="w-3 h-3" />
                              {student.email}
                            </div>
                          )}
                          {student.phone && (
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <Phone className="w-3 h-3" />
                              {student.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">{student.course?.name || 'N/A'}</p>
                          <p className="text-xs text-slate-500">{student.course?.type || ''}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {student.year}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">
                          {new Date(student.enrollmentDate).toLocaleDateString('en-GB', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"
                            title="Edit Student"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
        </>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white rounded-t-3xl">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <p className="text-purple-100 mt-1">{selectedStudent.registrationNumber}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded"></div>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedStudent.email && (
                      <div>
                        <p className="text-sm text-slate-600">Email</p>
                        <p className="text-slate-900 font-semibold">{selectedStudent.email}</p>
                      </div>
                    )}
                    {selectedStudent.phone && (
                      <div>
                        <p className="text-sm text-slate-600">Phone</p>
                        <p className="text-slate-900 font-semibold">{selectedStudent.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded"></div>
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Course</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.course?.name}</p>
                      <p className="text-xs text-slate-500">{selectedStudent.course?.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Year</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Enrollment Date</p>
                      <p className="text-slate-900 font-semibold">
                        {new Date(selectedStudent.enrollmentDate).toLocaleDateString('en-GB', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;

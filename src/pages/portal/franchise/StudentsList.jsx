import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Eye,
  Edit2,
  Loader2,
  AlertCircle,
  BookOpen,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/students');
      setStudents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.msg || 'Failed to load students list');
    } finally {
      setLoading(false);
    }
  };

  // Derived filter options
  const allCourses = students.flatMap(s =>
    s.enrolledCourses?.map(ec => ec.course?.name).filter(Boolean) || []
  );
  const uniqueCourses = ['all', ...new Set(allCourses)];

  const uniqueYears = ['all', ...new Set(
    students.map(s => s.year).filter(y => y !== undefined && y !== null)
  )].sort((a, b) => (a === 'all' ? -1 : b === 'all' ? 1 : a - b));

  // Filtered students
  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      student.name?.toLowerCase().includes(searchLower) ||
      student.registrationNumber?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower);

    const studentCourses = student.enrolledCourses?.map(ec => ec.course?.name) || [];
    const matchesCourse =
      filters.course === 'all' ||
      studentCourses.includes(filters.course);

    const matchesYear =
      filters.year === 'all' ||
      student.year?.toString() === filters.year;

    return matchesSearch && matchesCourse && matchesYear;
  });

  // Helper: get display course info
  const getCourseDisplay = (enrolledCourses) => {
    if (!enrolledCourses?.length) return { name: 'N/A', type: '' };
    if (enrolledCourses.length === 1) {
      return {
        name: enrolledCourses[0].course?.name || 'Unknown',
        type: enrolledCourses[0].course?.type || ''
      };
    }
    return { name: `Multiple (${enrolledCourses.length})`, type: '' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30 p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-white/15 rounded-2xl backdrop-blur-md">
                <Users className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Students Directory</h1>
                <p className="text-indigo-100 mt-2 opacity-90">
                  {user.role === 'franchisee' ? 'Your franchise students' : 'All registered students'}
                </p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-4xl font-bold">{loading ? '…' : filteredStudents.length}</p>
              <p className="text-indigo-100 text-sm mt-1">Matching Students</p>
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-slate-600">Loading students...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-800 flex items-start gap-4">
            <AlertCircle className="flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold">Error loading data</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Filters & Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, reg no, email..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <select
                  value={filters.course}
                  onChange={e => setFilters(prev => ({ ...prev, course: e.target.value }))}
                  className="w-full py-3 px-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {uniqueCourses.map(c => (
                    <option key={c} value={c}>
                      {c === 'all' ? 'All Courses' : c}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.year}
                  onChange={e => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full py-3 px-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {uniqueYears.map(y => (
                    <option key={y} value={y}>
                      {y === 'all' ? 'All Years' : `Year ${y}`}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Students Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Reg. No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrolled</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-16 text-center">
                          <Users className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                          <p className="text-slate-600 text-lg font-medium">No students found</p>
                          <p className="text-slate-500 mt-2">
                            Try changing search term or filters
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, idx) => {
                        const courseInfo = getCourseDisplay(student.enrolledCourses);
                        return (
                          <motion.tr
                            key={student._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className="hover:bg-indigo-50/40 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="font-mono font-medium text-indigo-600">
                                {student.registrationNumber || '—'}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium text-slate-900">
                              {student.name}
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1 text-sm">
                                {student.email && (
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Mail size={14} />
                                    {student.email}
                                  </div>
                                )}
                                {student.phone && (
                                  <div className="flex items-center gap-2 text-slate-600">
                                    <Phone size={14} />
                                    {student.phone}
                                  </div>
                                )}
                                {!student.email && !student.phone && (
                                  <span className="text-slate-400 text-xs">No contact info</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-slate-500 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {courseInfo.name}
                                  </p>
                                  {courseInfo.type && (
                                    <p className="text-xs text-slate-500 mt-0.5">{courseInfo.type}</p>
                                  )}
                                  {student.enrolledCourses?.length > 1 && (
                                    <p className="text-xs text-indigo-600 mt-1 font-medium">
                                      +{student.enrolledCourses.length - 1} more
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {student.year ? (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                                  Year {student.year}
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">
                              {student.enrollmentDate ? (
                                new Date(student.enrollmentDate).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              ) : (
                                '—'
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}

        {/* Student Detail Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white rounded-t-2xl">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <p className="text-indigo-100 mt-1 font-mono">
                  {selectedStudent.registrationNumber || 'No Reg. Number'}
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Mail size={20} className="text-indigo-600" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{selectedStudent.email || '—'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <p className="font-medium">{selectedStudent.phone || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Academic */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-purple-600" />
                    Academic Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-slate-500">Year</p>
                        <p className="font-medium text-lg">{selectedStudent.year || '—'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Enrollment Date</p>
                        <p className="font-medium">
                          {selectedStudent.enrollmentDate
                            ? new Date(selectedStudent.enrollmentDate).toLocaleDateString('en-GB', {
                              day: '2-digit', month: 'long', year: 'numeric'
                            })
                            : '—'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-3 font-medium">Enrolled Courses ({selectedStudent.enrolledCourses?.length || 0})</p>
                      {selectedStudent.enrolledCourses?.length > 0 ? (
                        <div className="space-y-4">
                          {selectedStudent.enrolledCourses.map((ec, i) => (
                            <div
                              key={i}
                              className="bg-slate-50 border border-slate-100 p-4 rounded-xl hover:bg-slate-100/80 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {ec.course?.name || 'Unknown Course'}
                                  </p>
                                  {ec.course?.type && (
                                    <p className="text-sm text-slate-600 mt-0.5">{ec.course.type}</p>
                                  )}
                                </div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${ec.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                  ec.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                                    'bg-slate-100 text-slate-700'
                                  }`}>
                                  {ec.status}
                                </span>
                              </div>

                              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Progress</p>
                                  <p className="font-medium">{ec.progress || 0}%</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Enrolled</p>
                                  <p className="font-medium">
                                    {new Date(ec.enrollmentDate).toLocaleDateString('en-GB', {
                                      day: '2-digit', month: 'short', year: 'numeric'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl">
                          No courses enrolled yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-8 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors"
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
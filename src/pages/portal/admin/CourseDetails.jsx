import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, BookOpen, Ban, CheckCircle, 
  Mail, Phone, Calendar, Plus, Loader2, X, Search, GraduationCap
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useAuth } from '../../../contexts/AuthContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Access logged-in user info

  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [allMyStudents, setAllMyStudents] = useState([]); // For franchise enrollment
  const [loading, setLoading] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseRes, studentsRes] = await Promise.all([
        apiClient.get(`/courses/${courseId}`),
        apiClient.get(`/students/course/${courseId}/students`)
      ]);
      setCourse(courseRes.data);
      setEnrolledStudents(studentsRes.data);

      // If franchise, fetch all their students to allow enrollment
      if (!isAdmin) {
        const allStudentsRes = await apiClient.get('/students');
        setAllMyStudents(allStudentsRes.data);
      }
    } catch (err) {
      console.error("Error fetching course details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollExisting = async (studentId) => {
    try {
      await apiClient.post('/students/enroll-existing', { studentId, courseId });
      alert("Student enrolled successfully!");
      setIsEnrollModalOpen(false);
      fetchCourseData(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.msg || "Enrollment failed");
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-purple-600" size={48} />
    </div>
  );

  // Filter out students already in this course
  const availableStudents = allMyStudents.filter(s => 
    !enrolledStudents.some(es => es._id === s._id) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{course?.name}</h1>
            <p className="text-slate-500 font-medium">{course?.type} • {course?.duration}</p>
          </div>
        </div>

        {!isAdmin && (
          <button 
            onClick={() => setIsEnrollModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg transition-all"
          >
            <Plus size={20} /> Enroll Existing Student
          </button>
        )}
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
            <BookOpen size={20} className="text-purple-500" /> Course Overview
          </h3>
          <p className="text-slate-600 leading-relaxed">{course?.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-600">
              Fee: ₹{course?.fee}
            </div>
            <div className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-600">
              Eligibility: {course?.eligibility}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
          <p className="text-slate-400 font-medium mb-1">Total Enrollment</p>
          <h2 className="text-5xl font-bold mb-4">{enrolledStudents.length}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Current Franchise</span>
              <span className="font-bold">{isAdmin ? "System Wide" : user?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Students Enrolled</h3>
          <Users className="text-slate-300" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Student Details</th>
                <th className="px-8 py-4">Reg Number</th>
                <th className="px-8 py-4">Enrollment Date</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {enrolledStudents.map((student) => {
                const enrollment = student.enrolledCourses.find(e => e.course === courseId);
                return (
                  <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                          {student.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-mono text-sm text-slate-600">
                      {student.registrationNumber}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">
                      {new Date(enrollment?.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        enrollment?.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {enrollment?.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {enrolledStudents.length === 0 && (
            <div className="p-20 text-center text-slate-400">
              No students enrolled in this course yet.
            </div>
          )}
        </div>
      </div>

      {/* ENROLLMENT MODAL */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button onClick={() => setIsEnrollModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">Enroll Student</h2>
              <p className="text-slate-500 mb-6 text-sm">Add an existing student to <b>{course?.name}</b></p>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search registered students..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                {availableStudents.length > 0 ? (
                  availableStudents.map(student => (
                    <div key={student._id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all group">
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{student.registrationNumber}</p>
                      </div>
                      <button 
                        onClick={() => handleEnrollExisting(student._id)}
                        className="px-4 py-2 bg-purple-100 text-purple-600 text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 hover:bg-purple-600 hover:text-white transition-all"
                      >
                        Enroll
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400 text-sm italic">
                    No available students found.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;
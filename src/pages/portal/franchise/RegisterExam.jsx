import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Users, Search, Loader2 } from 'lucide-react';
import apiClient from '../../../api/apiClient';
import { useNavigate } from 'react-router-dom';

const RegisterExam = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    program: 'all',
    batch: 'all'
  });

  const [courses, setCourses] = useState([]);
  const [examDetails, setExamDetails] = useState({
    examName: '',
    subject: '',
    examDate: '',
    examTime: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    course: '', // NEW
  });

  // Fetch Students on Mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await apiClient.get('/students');
        console.log(response)
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleExamDetailChange = (e) => {
    const { name, value } = e.target;
    setExamDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const courseFilteredStudents = examDetails.course
    ? students.filter(student =>
      student.enrolledCourses.some(ec => ec.course && ec.course._id === examDetails.course)
    )
    : [];
  const filteredStudents = courseFilteredStudents.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s._id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/exams', {
        examName: examDetails.examName,
        subject: examDetails.subject,
        examDate: examDetails.examDate,
        examTime: examDetails.examTime,
        duration: examDetails.duration,
        totalMarks: examDetails.totalMarks,
        passingMarks: examDetails.passingMarks,
        courseId: examDetails.course,
        studentIds: selectedStudents
      });
      alert("Exam Registered Successfully!");
      navigate('/portal/franchise/exams'); // Or wherever you want to go
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to register exam");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Register Students for Examination</h1>
              <p className="text-purple-100 mt-1">Select students and configure exam details</p>
            </div>
          </div>
        </motion.div>

        {/* Exam Details Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Examination Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Name</label>
                <input
                  type="text"
                  name="examName"
                  value={examDetails.examName}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., Mid-Term Examination"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                <select
                  name="course"
                  value={examDetails.course}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>
                      {course.name} ({course.type})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={examDetails.subject}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Subject</option>
                  {/* {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))} */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Date</label>
                <input
                  type="date"
                  name="examDate"
                  value={examDetails.examDate}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Exam Time</label>
                <input
                  type="time"
                  name="examTime"
                  value={examDetails.examTime}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={examDetails.duration}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 180"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Total Marks</label>
                <input
                  type="number"
                  name="totalMarks"
                  value={examDetails.totalMarks}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 100"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Passing Marks</label>
                <input
                  type="number"
                  name="passingMarks"
                  value={examDetails.passingMarks}
                  onChange={handleExamDetailChange}
                  placeholder="e.g., 40"
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </form>
        </motion.div>

        {/* Student Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl shadow-xl p-8">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-4 py-3 border border-slate-200 rounded-xl mb-4"
          />

          {/* Table */}
          {!examDetails.course ? (
            <div className="text-center py-16 text-slate-500 text-lg">
              Please select a course to view enrolled students.
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-lg">
              No students are enrolled in the selected course.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input type="checkbox" onChange={handleSelectAll} checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} />
                    </th>
                    <th className="px-6 py-4 text-left">Reg No</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student._id} className="border-b hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => handleStudentSelect(student._id)}
                        />
                      </td>
                      <td className="px-6 py-4">{student.registrationNumber}</td>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.course?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting || selectedStudents.length === 0}
              className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50"
            >
              {submitting ? 'Registering...' : `Register ${selectedStudents.length} Students`}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterExam;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Search, Download, CheckCircle, XCircle, FileCheck, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const ViewExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState('');

  // Fetch published exams on mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await apiClient.get('/exams');
        setExams(res.data || []);
      } catch {
        setError('Failed to load exams');
      } finally {
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, []);

  // Fetch students when exam is selected
  useEffect(() => {
    if (!selectedExam) {
      setStudents([]);
      return;
    }
    const fetchStudents = async () => {
      setLoadingStudents(true);
      setError('');
      try {
        const res = await apiClient.get(`/exams/${selectedExam}/students`);
        const exam = exams.find(e => e._id === selectedExam);
        const mapped = (res.data || []).map(s => {
          const examRecord = s.exams?.find(e => e.examId?.toString() === selectedExam);
          const marks = examRecord?.marks ?? null;
          const percentage = marks !== null && exam?.totalMarks
            ? Math.round((marks / exam.totalMarks) * 100)
            : null;
          const isPassed = marks !== null && exam?.passingMarks != null
            ? marks >= exam.passingMarks
            : null;
          return {
            id: s._id,
            rollNo: s.registrationNumber,
            name: s.name,
            marks,
            grade: examRecord?.grade ?? null,
            percentage,
            status: isPassed === null ? null : (isPassed ? 'passed' : 'failed'),
          };
        });
        setStudents(mapped);
      } catch {
        setError('Failed to load student results');
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, [selectedExam, exams]);

  const selectedExamData = exams.find(e => e._id === selectedExam);

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'emerald', 'A': 'blue', 'B+': 'cyan', 'B': 'indigo',
      'C+': 'purple', 'C': 'amber', 'D': 'orange', 'F': 'rose'
    };
    return gradeColors[grade] || 'slate';
  };

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
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">View Examination Results</h1>
              <p className="text-purple-100 mt-1">Check published exam results for your students</p>
            </div>
          </div>
        </motion.div>

        {/* Exam Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
              {loadingExams ? (
                <div className="flex items-center gap-2 text-slate-500 text-sm py-3">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading exams...
                </div>
              ) : (
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Choose an exam</option>
                  {exams.map(exam => (
                    <option key={exam._id} value={exam._id}>
                      {exam.name} - {new Date(exam.date).toLocaleDateString('en-CA')}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {selectedExamData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Subject</p>
                  <p className="text-lg font-bold text-slate-800">{selectedExamData.subject || selectedExamData.course?.name || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Date</p>
                  <p className="text-lg font-bold text-slate-800">{new Date(selectedExamData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Marks</p>
                  <p className="text-lg font-bold text-slate-800">{selectedExamData.totalMarks}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Passing Marks</p>
                  <p className="text-lg font-bold text-slate-800">{selectedExamData.passingMarks}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Results Table */}
        {selectedExam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Student Results</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>
            </div>

            {loadingStudents ? (
              <div className="flex items-center justify-center py-16 text-slate-500 gap-2">
                <Loader2 className="w-6 h-6 animate-spin" /> Loading results...
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <FileCheck className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No results found for this exam.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Marks Obtained</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Percentage</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Grade</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredStudents.map((student) => {
                        const gradeColor = getGradeColor(student.grade);
                        const isPassed = student.status === 'passed';
                        const hasMarks = student.marks !== null;

                        return (
                          <tr key={student.id} className="hover:bg-purple-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.rollNo}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                            <td className="px-6 py-4">
                              {hasMarks ? (
                                <span className="text-sm font-semibold text-slate-800">
                                  {student.marks} / {selectedExamData?.totalMarks}
                                </span>
                              ) : (
                                <span className="text-sm text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {hasMarks ? (
                                <span className="text-sm font-semibold text-slate-800">{student.percentage}%</span>
                              ) : (
                                <span className="text-sm text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {student.grade ? (
                                <span className={`px-3 py-1 bg-${gradeColor}-100 text-${gradeColor}-700 rounded-lg text-sm font-semibold`}>
                                  {student.grade}
                                </span>
                              ) : (
                                <span className="text-sm text-slate-400">—</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {student.status === null ? (
                                <span className="text-sm text-slate-400">Pending</span>
                              ) : isPassed ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  <span className="text-emerald-700 font-semibold text-sm">Passed</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <XCircle className="w-5 h-5 text-rose-600" />
                                  <span className="text-rose-700 font-semibold text-sm">Failed</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-slate-800">{filteredStudents.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Passed</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {filteredStudents.filter(s => s.status === 'passed').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Failed</p>
                    <p className="text-2xl font-bold text-rose-600">
                      {filteredStudents.filter(s => s.status === 'failed').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Pass Rate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {filteredStudents.filter(s => s.status !== null).length > 0
                        ? Math.round((filteredStudents.filter(s => s.status === 'passed').length / filteredStudents.filter(s => s.status !== null).length) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewExamResults;

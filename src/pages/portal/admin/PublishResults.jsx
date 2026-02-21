import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Upload, CheckCircle, XCircle, Loader2, Search, Building2, AlertTriangle, Clock } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const PublishResults = () => {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState(null); // New state for validation

  // Fetch all exams for Admin
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await apiClient.get('/exams');
        setExams(res.data || []);
      } catch (err) {
        console.error("Error fetching exams", err);
      } finally {
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, []);

  // Fetch Students registered for the specific Exam
  const fetchExamStudents = async () => {
    if (!selectedExamId) {
      setStudents([]);
      return;
    }
    setLoadingStudents(true);
    setValidationError(null);
    try {
      const res = await apiClient.get(`/exams/${selectedExamId}/students`);
      const mappedStudents = res.data.map(s => {
        const examRecord = s.exams?.find(e => e.examId === selectedExamId);
        return {
          id: s._id,
          rollNo: s.registrationNumber,
          name: s.name,
          franchiseName: s.franchisee?.name || 'N/A',
          marks: examRecord?.marks ?? '',
          grade: examRecord?.grade ?? '',
        };
      });
      setStudents(mappedStudents);
    } catch (err) {
      console.error("Error fetching students for exam", err);
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchExamStudents();
  }, [selectedExamId]);

  const handleMarksChange = (studentId, value) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, marks: value } : student
    ));
    setValidationError(null); // Clear error when user types
  };

  const selectedExamData = exams.find(e => e._id === selectedExamId);

  const handlePublish = async () => {
    if (!selectedExamId || !selectedExamData) return alert('Select an exam');

    // 1. DATE CONSTRAINT CHECK
    const today = new Date();
    const examDate = new Date(selectedExamData.date);

    if (today < examDate) {
      setValidationError(`Locked: This exam is scheduled for ${examDate.toLocaleDateString()}. Results can only be published on or after the exam date.`);
      return;
    }

    // 2. PREVIOUS VALIDATION (Missing Marks)
    const studentsWithMissingMarks = students.filter(
      s => s.marks === '' || s.marks === null || isNaN(parseFloat(s.marks))
    );

    if (studentsWithMissingMarks.length > 0) {
      setValidationError(`Incomplete: ${studentsWithMissingMarks.length} student(s) do not have marks. Every student must be graded.`);
      return;
    }

    const resultsToPublish = students.map(s => ({
      studentId: s.id,
      marks: parseFloat(s.marks)
    }));

    setSubmitting(true);
    try {
      await apiClient.post(`/exams/${selectedExamId}/publish`, {
        results: resultsToPublish
      });

      alert("Results Published Successfully!");

      setExams(prev => prev.map(e =>
        e._id === selectedExamId
          ? { ...e, isPublished: true, publishedAt: new Date().toISOString() }
          : e
      ));
      await fetchExamStudents();
    } catch (err) {
      alert("Failed to publish results. Please verify your connection.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getGradeInfo = (student) => {
    if (student.grade) {
      const colors = { 'A+': 'emerald', 'A': 'teal', 'B+': 'blue', 'B': 'indigo', 'C': 'purple', 'D': 'amber', 'F': 'rose' };
      return { grade: student.grade, color: colors[student.grade] || 'gray' };
    }
    const marks = parseFloat(student.marks);
    if (isNaN(marks) || marks < 0 || !selectedExamData) return null;

    const percentage = (marks / selectedExamData.totalMarks) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'emerald' };
    if (percentage >= 80) return { grade: 'A', color: 'teal' };
    if (percentage >= 70) return { grade: 'B+', color: 'blue' };
    if (percentage >= 60) return { grade: 'B', color: 'indigo' };
    if (percentage >= 50) return { grade: 'C', color: 'purple' };
    if (percentage >= 40) return { grade: 'D', color: 'amber' };
    return { grade: 'F', color: 'rose' };
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.franchiseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isExamPublished = selectedExamData?.isPublished;

  const today = new Date();
  const examDate = selectedExamData ? new Date(selectedExamData.date) : null;
  const isFutureExam = examDate && today < examDate;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-700 rounded-3xl p-8 text-white shadow-lg flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl"><Award size={32} /></div>
            <div>
              <h1 className="text-3xl font-bold">Admin Result Management</h1>
              <p className="opacity-80">Grade all students from across the franchises</p>
            </div>
          </div>
        </motion.div>

        {/* Validation Alert */}
        {validationError && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3"
          >
            <AlertTriangle className="text-rose-600 flex-shrink-0" size={24} />
            <p className="font-semibold">{validationError}</p>
          </motion.div>
        )}

        {/* Exam Selector */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
          <select
            className="w-full md:w-1/2 p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
          >
            <option value="">-- Choose an Exam --</option>
            {exams.map(exam => (
              <option key={exam._id} value={exam._id}>
                {exam.name} {exam.isPublished ? '✓ (Published)' : ''}
              </option>
            ))}
          </select>

          {selectedExamData && (
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
              <span><strong>Total Marks:</strong> {selectedExamData.totalMarks}</span>
              <span><strong>Passing Marks:</strong> {selectedExamData.passingMarks}</span>
              <span className={isExamPublished ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                <strong>Status:</strong> {isExamPublished ? 'Results Live' : 'Pending Publication'}
              </span>
            </div>
          )}
        </div>

        {/* Students Table */}
        {selectedExamId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-800">Student Grading List ({students.length})</h2>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search name, roll no, or franchise..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-600 text-sm font-medium">
                  <tr>
                    <th className="px-6 py-4">Roll No</th>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Franchise</th>
                    <th className="px-6 py-4">Marks ({selectedExamData?.totalMarks})</th>
                    <th className="px-6 py-4">Grade</th>
                    <th className="px-6 py-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loadingStudents ? (
                    <tr><td colSpan={6} className="text-center py-10"><Loader2 className="animate-spin inline mr-2" /> Loading students...</td></tr>
                  ) : filteredStudents.map((student) => {
                    const gradeInfo = getGradeInfo(student);
                    const isPassed = parseFloat(student.marks) >= (selectedExamData?.passingMarks || 0);
                    const isMissing = student.marks === '' || student.marks === null;

                    return (
                      <tr key={student.id} className={`hover:bg-slate-50 transition-colors ${isMissing && !isExamPublished ? 'bg-rose-50/30' : ''}`}>
                        <td className="px-6 py-4 font-mono text-sm">{student.rollNo}</td>
                        <td className="px-6 py-4 font-medium">{student.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 flex items-center gap-1">
                          <Building2 size={14} /> {student.franchiseName}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={student.marks}
                            onChange={(e) => handleMarksChange(student.id, e.target.value)}
                            disabled={isExamPublished}
                            max={selectedExamData?.totalMarks}
                            placeholder="Required"
                            className={`w-20 p-2 border rounded-lg outline-none transition-all ${isMissing && !isExamPublished
                                ? 'border-rose-400 bg-white ring-2 ring-rose-100 placeholder:text-rose-300'
                                : 'border-slate-200 focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100'
                              }`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          {gradeInfo && (
                            <span className={`px-3 py-1 bg-${gradeInfo.color}-100 text-${gradeInfo.color}-700 rounded-full text-xs font-bold`}>
                              {gradeInfo.grade}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {student.marks !== '' && (
                            isPassed ? <CheckCircle className="text-emerald-500" size={20} /> : <XCircle className="text-rose-500" size={20} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-slate-50 border-t flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-sm text-slate-500 italic">
                {students.filter(s => s.marks !== '').length} of {students.length} students graded.
              </p>
              <div className="flex gap-4">
                {isExamPublished ? (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold px-6 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <CheckCircle size={20} /> Results Published
                  </div>
                ) : isFutureExam ? (
                  <div className="flex items-center gap-2 text-amber-600 font-bold px-6 py-2 bg-amber-50 border border-amber-200 rounded-xl cursor-not-allowed">
                    <Clock size={20} /> Exam Date Pending
                  </div>
                ) : (
                  <button
                    onClick={handlePublish}
                    disabled={submitting}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all flex items-center gap-2 active:scale-95"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                    Publish All Results
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublishResults;
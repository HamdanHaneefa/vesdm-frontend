import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const PublishExamResults = () => {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [selectedExamData, setSelectedExamData] = useState(null);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch all exams on mount
  useEffect(() => {
    apiClient.get('/exams')
      .then(res => setExams(res.data || []))
      .catch(err => setErrorMsg(err.response?.data?.msg || 'Failed to load exams'))
      .finally(() => setLoadingExams(false));
  }, []);

  // Fetch students whenever exam selection changes
  useEffect(() => {
    if (!selectedExamId) {
      setStudents([]);
      setMarks({});
      setSelectedExamData(null);
      return;
    }

    const exam = exams.find(e => e._id === selectedExamId);
    setSelectedExamData(exam || null);
    setMarks({});
    setSuccessMsg(null);
    setErrorMsg(null);
    setLoadingStudents(true);

    apiClient.get(`/exams/${selectedExamId}/students`)
      .then(res => {
        const list = res.data || [];
        setStudents(list);
        // Pre-fill marks from existing exam records if already published
        const prefilled = {};
        list.forEach(s => {
          const record = s.exams?.find(e => e.examId === selectedExamId || e.examId?._id === selectedExamId || e.examId?.toString() === selectedExamId);
          prefilled[s._id] = record?.marks !== undefined ? String(record.marks) : '';
        });
        setMarks(prefilled);
      })
      .catch(err => setErrorMsg(err.response?.data?.msg || 'Failed to load students'))
      .finally(() => setLoadingStudents(false));
  }, [selectedExamId, exams]);

  const calculateGrade = (m, totalMarks) => {
    const pct = (m / totalMarks) * 100;
    if (pct >= 90) return { grade: 'A+', color: 'emerald' };
    if (pct >= 80) return { grade: 'A', color: 'blue' };
    if (pct >= 70) return { grade: 'B+', color: 'cyan' };
    if (pct >= 60) return { grade: 'B', color: 'indigo' };
    if (pct >= 50) return { grade: 'C', color: 'purple' };
    if (pct >= 40) return { grade: 'D', color: 'amber' };
    return { grade: 'F', color: 'rose' };
  };

  const handlePublish = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const allEntered = students.every(s => marks[s._id] !== '' && marks[s._id] !== undefined);
    if (!allEntered) {
      setErrorMsg('Please enter marks for all students before publishing.');
      return;
    }

    const results = students.map(s => ({
      studentId: s._id,
      marks: Number(marks[s._id]),
    }));

    setPublishing(true);
    try {
      const res = await apiClient.post(`/exams/${selectedExamId}/publish`, { results });
      const passedCount = results.filter(r => r.marks >= selectedExamData.passingMarks).length;
      setSuccessMsg(`✅ ${res.data?.msg || 'Results published!'} — ${passedCount} passed, ${students.length - passedCount} failed out of ${students.length} students.`);
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || 'Failed to publish results.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Publish Examination Results</h1>
              <p className="text-red-100 mt-1">Enter marks and publish results for all registered students</p>
            </div>
          </div>
        </motion.div>

        {/* Alerts */}
        {errorMsg && (
          <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl">
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl">
            <CheckCircle size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Exam Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
          {loadingExams ? (
            <div className="flex items-center gap-2 text-slate-500 py-3">
              <Loader2 className="animate-spin" size={18} /> Loading exams...
            </div>
          ) : (
            <select
              value={selectedExamId}
              onChange={e => setSelectedExamId(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Choose an exam</option>
              {exams.map(exam => (
                <option key={exam._id} value={exam._id}>
                  {exam.name} — {new Date(exam.date).toLocaleDateString('en-GB')} (Total: {exam.totalMarks}, Pass: {exam.passingMarks})
                  {exam.isPublished ? ' ✓ Published' : ''}
                </option>
              ))}
            </select>
          )}

          {selectedExamData && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl">
              <div>
                <p className="text-xs text-slate-500 mb-1">Subject</p>
                <p className="font-bold text-slate-800">{selectedExamData.subject || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Course</p>
                <p className="font-bold text-slate-800">{selectedExamData.course?.name || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Exam Date</p>
                <p className="font-bold text-slate-800">{new Date(selectedExamData.date).toLocaleDateString('en-GB')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Total Marks</p>
                <p className="font-bold text-slate-800">{selectedExamData.totalMarks}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Passing Marks</p>
                <p className="font-bold text-slate-800">{selectedExamData.passingMarks}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Students Table */}
        {selectedExamId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Enter Student Marks</h2>

            {loadingStudents ? (
              <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
                <Loader2 className="animate-spin" size={28} /> Loading students...
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-medium">No students registered for this exam.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Franchise</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Marks Obtained</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Grade</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map(student => {
                        const m = marks[student._id];
                        const numMarks = m !== '' && m !== undefined ? parseInt(m) : null;
                        const gradeInfo = numMarks !== null && !isNaN(numMarks) ? calculateGrade(numMarks, selectedExamData.totalMarks) : null;
                        const isPassed = numMarks !== null && !isNaN(numMarks) && numMarks >= selectedExamData.passingMarks;

                        return (
                          <tr key={student._id} className="hover:bg-red-50/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.registrationNumber || '—'}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{student.franchisee?.name || '—'}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={m ?? ''}
                                  onChange={e => setMarks(prev => ({ ...prev, [student._id]: e.target.value }))}
                                  placeholder="0"
                                  min="0"
                                  max={selectedExamData.totalMarks}
                                  className="w-24 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                />
                                <span className="text-sm text-slate-500">/ {selectedExamData.totalMarks}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {gradeInfo && (
                                <span className={`px-3 py-1 bg-${gradeInfo.color}-100 text-${gradeInfo.color}-700 rounded-lg text-sm font-semibold`}>
                                  {gradeInfo.grade}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {numMarks !== null && !isNaN(numMarks) && (
                                <div className="flex items-center gap-2">
                                  {isPassed ? (
                                    <><CheckCircle className="w-5 h-5 text-emerald-600" /><span className="text-emerald-700 font-semibold text-sm">Passed</span></>
                                  ) : (
                                    <><XCircle className="w-5 h-5 text-rose-600" /><span className="text-rose-700 font-semibold text-sm">Failed</span></>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 p-6 bg-gradient-to-br from-slate-50 to-red-50 rounded-2xl">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-slate-800">{students.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Marks Entered</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {students.filter(s => marks[s._id] !== '' && marks[s._id] !== undefined).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Passed</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {students.filter(s => marks[s._id] !== '' && marks[s._id] !== undefined && parseInt(marks[s._id]) >= selectedExamData.passingMarks).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Failed</p>
                    <p className="text-2xl font-bold text-rose-600">
                      {students.filter(s => marks[s._id] !== '' && marks[s._id] !== undefined && parseInt(marks[s._id]) < selectedExamData.passingMarks).length}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {publishing ? <Loader2 className="animate-spin w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    {publishing ? 'Publishing...' : 'Publish Results'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublishExamResults;

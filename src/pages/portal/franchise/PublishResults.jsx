import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import apiClient from '../../../api/apiClient';

const PublishResults = () => {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [loadingExams, setLoadingExams] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Exams
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await apiClient.get('/exams');
        setExams(res.data);
      } catch (err) {
        console.error("Error fetching exams", err);
      } finally {
        setLoadingExams(false);
      }
    };
    fetchExams();
  }, []);

  // Fetch Students when Exam selected
  useEffect(() => {
    if (!selectedExamId) {
      setStudents([]);
      return;
    }
    const fetchExamStudents = async () => {
      setLoadingStudents(true);
      try {
        const res = await apiClient.get(`/exams/${selectedExamId}/students`);
        const mappedStudents = res.data.map(s => {
          const examRecord = s.exams.find(e => e.examId === selectedExamId);
          return {
            id: s._id,
            rollNo: s.registrationNumber,
            name: s.name,
            marks: examRecord?.marks ?? '',
            grade: examRecord?.grade ?? '',
          };
        });
        setStudents(mappedStudents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchExamStudents();
  }, [selectedExamId]);

  const handleMarksChange = (studentId, value) => {
    setStudents(prev => prev.map(student =>
      student.id === studentId ? { ...student, marks: value } : student
    ));
  };

  const selectedExamData = exams.find(e => e._id === selectedExamId);

  const handlePublish = async () => {
    if (!selectedExamId) return alert('Select an exam');

    const resultsToPublish = students
      .filter(s => s.marks !== '' && s.marks !== null && !isNaN(parseFloat(s.marks)))
      .map(s => ({ studentId: s.id, marks: parseFloat(s.marks) }));

    if (resultsToPublish.length === 0) return alert('Enter marks for at least one student');

    setSubmitting(true);
    try {
      await apiClient.post('/exams/publish', {
        examId: selectedExamId,
        results: resultsToPublish
      });

      alert("Results Published Successfully!");

      // Update local exams state to reflect published status
      setExams(prev => prev.map(e =>
        e._id === selectedExamId
          ? { ...e, isPublished: true, publishedAt: new Date().toISOString() }
          : e
      ));

      // Refetch students to get saved grades
      const res = await apiClient.get(`/exams/${selectedExamId}/students`);
      const mappedStudents = res.data.map(s => {
        const examRecord = s.exams.find(e => e.examId === selectedExamId);
        return {
          id: s._id,
          rollNo: s.registrationNumber,
          name: s.name,
          marks: examRecord?.marks ?? '',
          grade: examRecord?.grade ?? '',
        };
      });
      setStudents(mappedStudents);
    } catch (err) {
      alert("Failed to publish results");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Grade display logic (uses saved grade if exists, otherwise calculates live)
  const getGradeInfo = (student) => {
    if (student.grade) {
      const gradeColorMap = {
        'A+': 'emerald',
        'A': 'teal',
        'B+': 'blue',
        'B': 'indigo',
        'C': 'purple',
        'D': 'amber',
        'F': 'rose',
      };
      return { grade: student.grade, color: gradeColorMap[student.grade] || 'gray' };
    }

    const marks = parseFloat(student.marks);
    if (isNaN(marks) || marks < 0) return null;

    const percentage = (marks / selectedExamData.totalMarks) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'emerald' };
    if (percentage >= 80) return { grade: 'A', color: 'teal' };
    if (percentage >= 70) return { grade: 'B+', color: 'blue' };
    if (percentage >= 60) return { grade: 'B', color: 'indigo' };
    if (percentage >= 50) return { grade: 'C', color: 'purple' };
    if (percentage >= 40) return { grade: 'D', color: 'amber' };
    return { grade: 'F', color: 'rose' };
  };

  const isExamPublished = selectedExamData?.isPublished;

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
              <h1 className="text-3xl font-bold">Publish Examination Results</h1>
              <p className="text-purple-100 mt-1">Enter marks and publish results for students</p>
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
          <label className="block font-bold mb-2">Select Examination</label>
          {loadingExams ? <Loader2 className="animate-spin" /> : (
            <select
              className="w-full p-3 border rounded-xl"
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
            >
              <option value="">Choose an Exam</option>
              {exams.map(exam => (
                <option key={exam._id} value={exam._id}>
                  {exam.name} - {exam.course?.name || 'No Course'} ({new Date(exam.date).toLocaleDateString()}){exam.isPublished ? ' - Already Published' : ''}
                </option>
              ))}
            </select>
          )}

          {selectedExamData && (
            <>
              <div className="mt-4 grid grid-cols-4 gap-4 bg-purple-50 p-4 rounded-xl">
                <div><strong>Course:</strong> {selectedExamData.course?.name || 'N/A'}</div>
                <div><strong>Total Marks:</strong> {selectedExamData.totalMarks}</div>
                <div><strong>Passing:</strong> {selectedExamData.passingMarks}</div>
                <div><strong>Status:</strong> {selectedExamData.isPublished ? 'Published' : 'Not Published'}</div>
              </div>

              {isExamPublished && (
                <div className="mt-6 p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-4">
                  <CheckCircle className="w-10 h-10 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-800">Results Already Published</h3>
                    <p className="text-emerald-700">
                      Published on {new Date(selectedExamData.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Marks Entry Table */}
        {selectedExamId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Enter Student Marks</h2>
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors opacity-50 cursor-not-allowed"
                disabled>
                <Upload className="w-5 h-5" />
                Bulk Upload
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Marks Obtained</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Grade</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => {
                    const gradeInfo = getGradeInfo(student);
                    const marksNum = parseFloat(student.marks);
                    const isPassed = !isNaN(marksNum) && marksNum >= selectedExamData.passingMarks;

                    return (
                      <tr key={student.id} className="hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.rollNo}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={student.marks}
                              onChange={(e) => handleMarksChange(student.id, e.target.value)}
                              placeholder="0"
                              min="0"
                              max={selectedExamData.totalMarks}
                              disabled={isExamPublished}
                              className={`w-24 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${isExamPublished ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''}`}
                            />
                            <span className="text-sm text-slate-500">/ {selectedExamData.totalMarks}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {gradeInfo && (
                            <span className={`px-3 py-1 bg-${gradeInfo.color}-100 text-${gradeInfo.color}-800 rounded-lg text-sm font-semibold`}>
                              {gradeInfo.grade}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {!isNaN(marksNum) && (
                            <div className="flex items-center gap-2">
                              {isPassed ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  <span className="text-emerald-700 font-semibold text-sm">Passed</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-rose-600" />
                                  <span className="text-rose-700 font-semibold text-sm">Failed</span>
                                </>
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

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{students.length}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Marks Entered</p>
                <p className="text-2xl font-bold text-blue-600">
                  {students.filter(s => s.marks !== '' && !isNaN(parseFloat(s.marks))).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Passed</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {students.filter(s => !isNaN(parseFloat(s.marks)) && parseFloat(s.marks) >= selectedExamData.passingMarks).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-rose-600">
                  {students.filter(s => !isNaN(parseFloat(s.marks)) && parseFloat(s.marks) < selectedExamData.passingMarks).length}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                disabled
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold opacity-50 cursor-not-allowed"
              >
                Save Draft
              </button>

              {isExamPublished ? (
                <div className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Results Published
                </div>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={submitting}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  {submitting ? 'Publishing...' : 'Publish Results'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublishResults;
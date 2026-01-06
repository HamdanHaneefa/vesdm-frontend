import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Upload, CheckCircle, XCircle, Edit2, Save } from 'lucide-react';

const PublishResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [students, setStudents] = useState([
    { id: 1, rollNo: 'VESDM2026001', name: 'Amit Kumar', marks: '', status: 'pending' },
    { id: 2, rollNo: 'VESDM2026002', name: 'Priya Sharma', marks: '', status: 'pending' },
    { id: 3, rollNo: 'VESDM2026003', name: 'Rahul Verma', marks: '', status: 'pending' },
    { id: 4, rollNo: 'VESDM2027001', name: 'Sneha Patel', marks: '', status: 'pending' },
    { id: 5, rollNo: 'VESDM2026004', name: 'Vikram Singh', marks: '', status: 'pending' },
    { id: 6, rollNo: 'VESDM2026005', name: 'Anjali Gupta', marks: '', status: 'pending' }
  ]);

  const exams = [
    { id: 1, name: 'Mid-Term Exam - Programming Fundamentals', subject: 'Programming', date: '2024-01-15', totalMarks: 100, passingMarks: 40 },
    { id: 2, name: 'Mid-Term Exam - Web Technologies', subject: 'Web Tech', date: '2024-01-18', totalMarks: 100, passingMarks: 40 },
    { id: 3, name: 'Final Exam - Database Management', subject: 'DBMS', date: '2024-01-20', totalMarks: 100, passingMarks: 40 }
  ];

  const handleMarksChange = (studentId, value) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, marks: value }
        : student
    ));
  };

  const calculateGrade = (marks, totalMarks) => {
    const percentage = (marks / totalMarks) * 100;
    if (percentage >= 90) return { grade: 'A+', color: 'emerald' };
    if (percentage >= 80) return { grade: 'A', color: 'blue' };
    if (percentage >= 70) return { grade: 'B+', color: 'cyan' };
    if (percentage >= 60) return { grade: 'B', color: 'indigo' };
    if (percentage >= 50) return { grade: 'C+', color: 'purple' };
    if (percentage >= 40) return { grade: 'C', color: 'amber' };
    return { grade: 'F', color: 'rose' };
  };

  const handlePublish = () => {
    const selectedExamData = exams.find(e => e.id === parseInt(selectedExam));
    if (!selectedExamData) {
      alert('Please select an exam');
      return;
    }

    const allMarksEntered = students.every(s => s.marks !== '');
    if (!allMarksEntered) {
      alert('Please enter marks for all students');
      return;
    }

    const updatedStudents = students.map(student => {
      const marks = parseInt(student.marks);
      const isPassed = marks >= selectedExamData.passingMarks;
      return {
        ...student,
        status: isPassed ? 'passed' : 'failed'
      };
    });

    setStudents(updatedStudents);
    alert(`Results published successfully for ${selectedExamData.name}!`);
  };

  const selectedExamData = exams.find(e => e.id === parseInt(selectedExam));

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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose an exam</option>
                {exams.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} - {exam.date} (Total: {exam.totalMarks}, Passing: {exam.passingMarks})
                  </option>
                ))}
              </select>
            </div>

            {selectedExamData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Subject</p>
                  <p className="text-lg font-bold text-slate-800">{selectedExamData.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Date</p>
                  <p className="text-lg font-bold text-slate-800">{selectedExamData.date}</p>
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

        {/* Marks Entry Table */}
        {selectedExam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Enter Student Marks</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                  <Upload className="w-5 h-5" />
                  Bulk Upload
                </button>
              </div>
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
                    const gradeInfo = student.marks ? calculateGrade(parseInt(student.marks), selectedExamData.totalMarks) : null;
                    const isPassed = student.marks && parseInt(student.marks) >= selectedExamData.passingMarks;
                    
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
                              className="w-24 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                          {student.marks && (
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
                  {students.filter(s => s.marks !== '').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Passed</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {students.filter(s => s.marks && parseInt(s.marks) >= selectedExamData.passingMarks).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-rose-600">
                  {students.filter(s => s.marks && parseInt(s.marks) < selectedExamData.passingMarks).length}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Publish Results
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublishResults;

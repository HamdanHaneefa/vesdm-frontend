import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Search, Filter, Download, Eye, CheckCircle, XCircle, FileCheck } from 'lucide-react';

const ViewExamResults = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const exams = [
    { id: 1, name: 'Mid-Term Exam - Programming Fundamentals', subject: 'Programming', date: '2026-03-15', totalMarks: 100, passingMarks: 40, published: true },
    { id: 2, name: 'Mid-Term Exam - Web Technologies', subject: 'Web Tech', date: '2026-03-18', totalMarks: 100, passingMarks: 40, published: true },
    { id: 3, name: 'Final Exam - Database Management', subject: 'DBMS', date: '2026-03-20', totalMarks: 100, passingMarks: 40, published: false }
  ];

  const students = [
    { id: 1, rollNo: 'VESDM2026001', name: 'Amit Kumar', marks: 85, grade: 'A', status: 'passed', percentage: 85, certificateAvailable: true },
    { id: 2, rollNo: 'VESDM2026002', name: 'Priya Sharma', marks: 72, grade: 'B+', status: 'passed', percentage: 72, certificateAvailable: true },
    { id: 3, rollNo: 'VESDM2026003', name: 'Rahul Verma', marks: 58, grade: 'B', status: 'passed', percentage: 58, certificateAvailable: true },
    { id: 4, rollNo: 'VESDM2027001', name: 'Sneha Patel', marks: 45, grade: 'C', status: 'passed', percentage: 45, certificateAvailable: true },
    { id: 5, rollNo: 'VESDM2026004', name: 'Vikram Singh', marks: 35, grade: 'F', status: 'failed', percentage: 35, certificateAvailable: false },
    { id: 6, rollNo: 'VESDM2026005', name: 'Anjali Gupta', marks: 91, grade: 'A+', status: 'passed', percentage: 91, certificateAvailable: true }
  ];

  const selectedExamData = exams.find(e => e.id === parseInt(selectedExam));
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'emerald',
      'A': 'blue',
      'B+': 'cyan',
      'B': 'indigo',
      'C+': 'purple',
      'C': 'amber',
      'F': 'rose'
    };
    return gradeColors[grade] || 'slate';
  };

  const handleDownloadCertificate = (student) => {
    alert(`Downloading certificate for ${student.name} (${student.rollNo})`);
    // In real implementation, this would generate/download the certificate PDF
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Examination</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose an exam</option>
                {exams.filter(exam => exam.published).map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} - {exam.date}
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => {
                    const gradeColor = getGradeColor(student.grade);
                    const isPassed = student.status === 'passed';
                    
                    return (
                      <tr key={student.id} className="hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.rollNo}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-800">
                            {student.marks} / {selectedExamData.totalMarks}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-800">{student.percentage}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 bg-${gradeColor}-100 text-${gradeColor}-700 rounded-lg text-sm font-semibold`}>
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4">
                          {student.certificateAvailable ? (
                            <button
                              onClick={() => handleDownloadCertificate(student)}
                              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                              <FileCheck className="w-4 h-4" />
                              Download
                            </button>
                          ) : (
                            <span className="text-sm text-slate-400">Not Available</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 p-6 bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl">
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
                <p className="text-sm text-slate-600 mb-1">Certificates Available</p>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredStudents.filter(s => s.certificateAvailable).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Pass Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((filteredStudents.filter(s => s.status === 'passed').length / filteredStudents.length) * 100)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ViewExamResults;

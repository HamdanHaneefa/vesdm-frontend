import { motion } from 'framer-motion';
import { TrendingUp, Award, FileText, Download, BarChart3, Target } from 'lucide-react';

const StudentResults = () => {
  const semesters = [
    {
      id: 1,
      name: 'Semester 1',
      year: '2025',
      status: 'completed',
      sgpa: 8.9,
      totalMarks: 890,
      maxMarks: 1000,
      subjects: [
        { code: 'CS101', name: 'Programming Fundamentals', marks: 92, maxMarks: 100, grade: 'A+' },
        { code: 'CS102', name: 'Data Structures', marks: 88, maxMarks: 100, grade: 'A' },
        { code: 'CS103', name: 'Database Management', marks: 85, maxMarks: 100, grade: 'A' },
        { code: 'CS104', name: 'Web Technologies', marks: 90, maxMarks: 100, grade: 'A+' },
        { code: 'CS105', name: 'Mathematics', marks: 82, maxMarks: 100, grade: 'B+' },
        { code: 'CS106', name: 'Communication Skills', marks: 88, maxMarks: 100, grade: 'A' },
        { code: 'CS107', name: 'Lab - Programming', marks: 95, maxMarks: 100, grade: 'A+' },
        { code: 'CS108', name: 'Lab - Database', marks: 90, maxMarks: 100, grade: 'A+' },
        { code: 'CS109', name: 'Seminar', marks: 45, maxMarks: 50, grade: 'A+' },
        { code: 'CS110', name: 'Project', marks: 45, maxMarks: 50, grade: 'A+' },
      ],
    },
    {
      id: 2,
      name: 'Semester 2',
      year: '2026',
      status: 'in-progress',
      sgpa: null,
      totalMarks: null,
      maxMarks: 1000,
      subjects: [
        { code: 'CS201', name: 'Object Oriented Programming', marks: null, maxMarks: 100, grade: null },
        { code: 'CS202', name: 'Computer Networks', marks: null, maxMarks: 100, grade: null },
        { code: 'CS203', name: 'Operating Systems', marks: null, maxMarks: 100, grade: null },
        { code: 'CS204', name: 'Software Engineering', marks: null, maxMarks: 100, grade: null },
      ],
    },
  ];

  const overallStats = {
    cgpa: 8.9,
    totalCredits: 24,
    completedSemesters: 1,
    totalSemesters: 4,
  };

  const getGradeColor = (grade) => {
    if (!grade) return 'bg-slate-100 text-slate-600';
    if (grade === 'A+' || grade === 'A') return 'bg-emerald-100 text-emerald-700';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-700';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Examination Results 📊</h1>
        <p className="text-slate-500 text-lg">View your academic performance and grades</p>
      </motion.div>

      {/* Overall Performance */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#007ACC] to-blue-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Award size={28} />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider">Overall CGPA</p>
          </div>
          <p className="text-5xl font-bold">{overallStats.cgpa}</p>
          <p className="text-blue-200 text-sm mt-2">Out of 10.0</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <FileText size={28} className="text-emerald-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Credits</p>
          </div>
          <p className="text-4xl font-bold text-slate-900">{overallStats.totalCredits}</p>
          <p className="text-slate-500 text-sm mt-2">Earned credits</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={28} className="text-purple-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Semesters</p>
          </div>
          <p className="text-4xl font-bold text-slate-900">{overallStats.completedSemesters}<span className="text-2xl text-slate-400">/{overallStats.totalSemesters}</span></p>
          <p className="text-slate-500 text-sm mt-2">Completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center justify-center"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 w-full justify-center">
            <Download size={20} />
            Report
          </button>
        </motion.div>
      </div>

      {/* Semester Results */}
      <div className="space-y-6">
        {semesters.map((semester, i) => (
          <motion.div
            key={semester.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{semester.name}</h2>
                  <p className="text-slate-500">Academic Year {semester.year}</p>
                </div>
                <div className="flex items-center gap-4">
                  {semester.sgpa && (
                    <div className="bg-white rounded-xl px-6 py-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">SGPA</p>
                      <p className="text-3xl font-bold text-emerald-600">{semester.sgpa}</p>
                    </div>
                  )}
                  {semester.totalMarks && (
                    <div className="bg-white rounded-xl px-6 py-3 shadow-sm">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Total Marks</p>
                      <p className="text-3xl font-bold text-slate-900">{semester.totalMarks}<span className="text-lg text-slate-400">/{semester.maxMarks}</span></p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Code</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Subject</th>
                      <th className="text-center py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Marks</th>
                      <th className="text-center py-3 px-4 text-sm font-bold text-slate-700 uppercase tracking-wide">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semester.subjects.map((subject, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-semibold text-slate-600">{subject.code}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-900">{subject.name}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {subject.marks !== null ? (
                            <span className="font-bold text-slate-900 text-lg">{subject.marks}<span className="text-sm text-slate-400">/{subject.maxMarks}</span></span>
                          ) : (
                            <span className="text-slate-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {subject.grade ? (
                            <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentResults;

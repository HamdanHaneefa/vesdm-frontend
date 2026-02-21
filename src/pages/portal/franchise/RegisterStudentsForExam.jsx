import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Users, Search, Filter, AlertCircle } from 'lucide-react';

const RegisterStudentsForExam = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Available exams (published by admin)
  const exams = [
    { id: 1, name: 'Mid-Term Exam - Programming Fundamentals', subject: 'Programming', date: '2026-03-15', deadline: '2026-03-10', totalMarks: 100 },
    { id: 2, name: 'Mid-Term Exam - Web Technologies', subject: 'Web Tech', date: '2026-03-18', deadline: '2026-03-13', totalMarks: 100 },
    { id: 3, name: 'Final Exam - Database Management', subject: 'DBMS', date: '2026-03-20', deadline: '2026-03-15', totalMarks: 100 }
  ];

  // Sample student data
  const students = [
    { id: 1, name: 'Amit Kumar', program: 'Diploma in Computer Science', batch: '2026-2028', rollNo: 'VESDM2026001', status: 'Active', registered: false },
    { id: 2, name: 'Priya Sharma', program: 'Digital Marketing', batch: '2026-2027', rollNo: 'VESDM2026002', status: 'Active', registered: false },
    { id: 3, name: 'Rahul Verma', program: 'Web Development', batch: '2026-2028', rollNo: 'VESDM2026003', status: 'Active', registered: true },
    { id: 4, name: 'Sneha Patel', program: 'Diploma in Computer Science', batch: '2027-2029', rollNo: 'VESDM2027001', status: 'Active', registered: false },
    { id: 5, name: 'Vikram Singh', program: 'Data Analytics', batch: '2026-2027', rollNo: 'VESDM2026004', status: 'Active', registered: false },
    { id: 6, name: 'Anjali Gupta', program: 'Graphic Design', batch: '2026-2028', rollNo: 'VESDM2026005', status: 'Active', registered: false }
  ];

  const selectedExamData = exams.find(e => e.id === parseInt(selectedExam));
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    const availableStudents = filteredStudents.filter(s => !s.registered);
    if (selectedStudents.length === availableStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(availableStudents.map(s => s.id));
    }
  };

  const handleSubmit = () => {
    if (!selectedExam) {
      alert('Please select an exam');
      return;
    }
    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }
    console.log('Registering students:', selectedStudents, 'for exam:', selectedExam);
    alert(`Successfully registered ${selectedStudents.length} student(s) for the exam!`);
    setSelectedStudents([]);
  };

  const isDeadlinePassed = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
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
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Register Students for Examination</h1>
              <p className="text-purple-100 mt-1">Apply for exams before the deadline</p>
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
                  <option key={exam.id} value={exam.id} disabled={isDeadlinePassed(exam.deadline)}>
                    {exam.name} - {exam.date} (Deadline: {exam.deadline}) {isDeadlinePassed(exam.deadline) ? '- CLOSED' : ''}
                  </option>
                ))}
              </select>
            </div>

            {selectedExamData && (
              <>
                {isDeadlinePassed(selectedExamData.deadline) ? (
                  <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-900">Registration Closed</p>
                      <p className="text-sm text-rose-700">The deadline for this exam has passed. You can no longer register students.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Subject</p>
                      <p className="text-lg font-bold text-slate-800">{selectedExamData.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Exam Date</p>
                      <p className="text-lg font-bold text-slate-800">{selectedExamData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Total Marks</p>
                      <p className="text-lg font-bold text-slate-800">{selectedExamData.totalMarks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Deadline</p>
                      <p className="text-lg font-bold text-rose-600">{selectedExamData.deadline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Days Left</p>
                      <p className="text-lg font-bold text-purple-600">
                        {Math.max(0, Math.ceil((new Date(selectedExamData.deadline) - new Date()) / (1000 * 60 * 60 * 24)))}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Student Selection */}
        {selectedExam && !isDeadlinePassed(selectedExamData.deadline) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Select Students</h2>
              <span className="ml-auto px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold">
                {selectedStudents.length} Selected
              </span>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedStudents.length === filteredStudents.filter(s => !s.registered).length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Program</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Batch</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className={`hover:bg-purple-50/50 transition-colors ${student.registered ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                          disabled={student.registered}
                          className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.rollNo}</td>
                      <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{student.program}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{student.batch}</td>
                      <td className="px-6 py-4">
                        {student.registered ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                            Already Registered
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
                            {student.status}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={() => setSelectedStudents([])}
                className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Clear Selection
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedStudents.length === 0}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Register {selectedStudents.length} Student(s)
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RegisterStudentsForExam;

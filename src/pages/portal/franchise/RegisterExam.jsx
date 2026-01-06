import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Users, Search, Filter } from 'lucide-react';

const RegisterExam = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    program: 'all',
    batch: 'all'
  });
  const [examDetails, setExamDetails] = useState({
    examName: '',
    subject: '',
    examDate: '',
    examTime: '',
    duration: '',
    totalMarks: '',
    passingMarks: ''
  });

  // Sample student data
  const students = [
    { id: 1, name: 'Amit Kumar', program: 'Diploma in Computer Science', batch: '2026-2028', rollNo: 'VESDM2026001', status: 'Active' },
    { id: 2, name: 'Priya Sharma', program: 'Digital Marketing', batch: '2026-2027', rollNo: 'VESDM2026002', status: 'Active' },
    { id: 3, name: 'Rahul Verma', program: 'Web Development', batch: '2026-2028', rollNo: 'VESDM2026003', status: 'Active' },
    { id: 4, name: 'Sneha Patel', program: 'Diploma in Computer Science', batch: '2027-2029', rollNo: 'VESDM2027001', status: 'Active' },
    { id: 5, name: 'Vikram Singh', program: 'Data Analytics', batch: '2026-2027', rollNo: 'VESDM2026004', status: 'Active' },
    { id: 6, name: 'Anjali Gupta', program: 'Graphic Design', batch: '2026-2028', rollNo: 'VESDM2026005', status: 'Active' }
  ];

  const programs = ['all', 'Diploma in Computer Science', 'Digital Marketing', 'Web Development', 'Graphic Design', 'Data Analytics', 'Mobile App Development'];
  const batches = ['all', '2026-2028', '2026-2027', '2027-2029'];
  const subjects = ['Programming Fundamentals', 'Web Technologies', 'Database Management', 'Data Structures', 'Digital Marketing Basics', 'SEO & Analytics'];

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

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exam Details:', examDetails);
    console.log('Selected Students:', selectedStudents);
    alert(`Successfully registered ${selectedStudents.length} students for the exam!`);
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filters.program === 'all' || student.program === filters.program;
    const matchesBatch = filters.batch === 'all' || student.batch === filters.batch;
    return matchesSearch && matchesProgram && matchesBatch;
  });

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
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={examDetails.subject}
                  onChange={handleExamDetailChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
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

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-1">
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

            <div>
              <select
                value={filters.program}
                onChange={(e) => setFilters(prev => ({ ...prev, program: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {programs.map(prog => (
                  <option key={prog} value={prog}>
                    {prog === 'all' ? 'All Programs' : prog}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filters.batch}
                onChange={(e) => setFilters(prev => ({ ...prev, batch: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch === 'all' ? 'All Batches' : batch}
                  </option>
                ))}
              </select>
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
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
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
                  <tr key={student.id} className="hover:bg-purple-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleStudentSelect(student.id)}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{student.rollNo}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{student.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.program}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.batch}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">
                        {student.status}
                      </span>
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
              className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedStudents.length === 0 || !examDetails.examName}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Register {selectedStudents.length} Students
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterExam;

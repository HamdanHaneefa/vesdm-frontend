import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Eye, Edit2, Trash2, Download, Mail, Phone } from 'lucide-react';

const StudentsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    program: 'all',
    batch: 'all',
    status: 'all'
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Sample students data
  const students = [
    { 
      id: 1, 
      rollNo: 'VESDM2026001', 
      name: 'Amit Kumar', 
      email: 'amit.kumar@example.com',
      phone: '+91 98765 43210',
      program: 'Diploma in Computer Science', 
      batch: '2026-2028', 
      status: 'Active',
      cgpa: '8.5',
      attendance: '92%',
      joinDate: '2026-01-15',
      fatherName: 'Rajesh Kumar',
      address: 'New Delhi'
    },
    { 
      id: 2, 
      rollNo: 'VESDM2026002', 
      name: 'Priya Sharma', 
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43211',
      program: 'Digital Marketing', 
      batch: '2026-2027', 
      status: 'Active',
      cgpa: '9.0',
      attendance: '95%',
      joinDate: '2026-01-16',
      fatherName: 'Suresh Sharma',
      address: 'Mumbai'
    },
    { 
      id: 3, 
      rollNo: 'VESDM2026003', 
      name: 'Rahul Verma', 
      email: 'rahul.verma@example.com',
      phone: '+91 98765 43212',
      program: 'Web Development', 
      batch: '2026-2028', 
      status: 'Active',
      cgpa: '7.8',
      attendance: '88%',
      joinDate: '2026-01-17',
      fatherName: 'Anil Verma',
      address: 'Bangalore'
    },
    { 
      id: 4, 
      rollNo: 'VESDM2027001', 
      name: 'Sneha Patel', 
      email: 'sneha.patel@example.com',
      phone: '+91 98765 43213',
      program: 'Diploma in Computer Science', 
      batch: '2027-2029', 
      status: 'Active',
      cgpa: '8.9',
      attendance: '94%',
      joinDate: '2027-01-15',
      fatherName: 'Kiran Patel',
      address: 'Ahmedabad'
    },
    { 
      id: 5, 
      rollNo: 'VESDM2026004', 
      name: 'Vikram Singh', 
      email: 'vikram.singh@example.com',
      phone: '+91 98765 43214',
      program: 'Data Analytics', 
      batch: '2026-2027', 
      status: 'Active',
      cgpa: '8.2',
      attendance: '90%',
      joinDate: '2026-01-18',
      fatherName: 'Ranjit Singh',
      address: 'Jaipur'
    },
    { 
      id: 6, 
      rollNo: 'VESDM2026005', 
      name: 'Anjali Gupta', 
      email: 'anjali.gupta@example.com',
      phone: '+91 98765 43215',
      program: 'Graphic Design', 
      batch: '2026-2028', 
      status: 'Inactive',
      cgpa: '7.5',
      attendance: '75%',
      joinDate: '2026-01-19',
      fatherName: 'Manoj Gupta',
      address: 'Kolkata'
    }
  ];

  const programs = ['all', 'Diploma in Computer Science', 'Digital Marketing', 'Web Development', 'Graphic Design', 'Data Analytics', 'Mobile App Development'];
  const batches = ['all', '2026-2028', '2026-2027', '2027-2029'];
  const statuses = ['all', 'Active', 'Inactive', 'Suspended'];

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filters.program === 'all' || student.program === filters.program;
    const matchesBatch = filters.batch === 'all' || student.batch === filters.batch;
    const matchesStatus = filters.status === 'all' || student.status === filters.status;
    return matchesSearch && matchesProgram && matchesBatch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'emerald';
      case 'Inactive': return 'amber';
      case 'Suspended': return 'rose';
      default: return 'slate';
    }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Students Directory</h1>
                <p className="text-purple-100 mt-1">Manage and view all registered students</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{filteredStudents.length}</p>
              <p className="text-purple-100 text-sm">Total Students</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-emerald-100 text-sm mb-2">Active Students</p>
            <p className="text-4xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-blue-100 text-sm mb-2">Programs Offered</p>
            <p className="text-4xl font-bold">6</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-purple-100 text-sm mb-2">Average CGPA</p>
            <p className="text-4xl font-bold">8.3</p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <div>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Roll No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Program</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Batch</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">CGPA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Attendance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-purple-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{student.rollNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                          <Phone className="w-3 h-3" />
                          {student.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{student.program}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-700">{student.batch}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 ${
                        parseFloat(student.attendance) >= 90 ? 'bg-emerald-100 text-emerald-700' :
                        parseFloat(student.attendance) >= 75 ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      } rounded-lg text-sm font-semibold`}>
                        {student.attendance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 bg-${getStatusColor(student.status)}-100 text-${getStatusColor(student.status)}-700 rounded-lg text-sm font-semibold`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-purple-100 rounded-lg transition-colors group"
                          title="Edit Student"
                        >
                          <Edit2 className="w-5 h-5 text-slate-600 group-hover:text-purple-600" />
                        </button>
                        <button
                          className="p-2 hover:bg-emerald-100 rounded-lg transition-colors group"
                          title="Download Report"
                        >
                          <Download className="w-5 h-5 text-slate-600 group-hover:text-emerald-600" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">No students found</p>
              <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>

        {/* Student Detail Modal */}
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white rounded-t-3xl">
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <p className="text-purple-100 mt-1">{selectedStudent.rollNo}</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded"></div>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Father's Name</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.fatherName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Address</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.address}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-500 rounded"></div>
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Program</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.program}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Batch</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.batch}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">CGPA</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.cgpa}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Attendance</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.attendance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Join Date</p>
                      <p className="text-slate-900 font-semibold">{selectedStudent.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Status</p>
                      <span className={`px-3 py-1 bg-${getStatusColor(selectedStudent.status)}-100 text-${getStatusColor(selectedStudent.status)}-700 rounded-lg text-sm font-semibold inline-block`}>
                        {selectedStudent.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Edit Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentsList;

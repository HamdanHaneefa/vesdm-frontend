import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Search, Filter, Download, Eye, Edit, Ban, CheckCircle,
  XCircle, Mail, Phone, MapPin, Calendar, BookOpen, Award,
  TrendingUp, Clock, AlertCircle, MoreVertical, Building2
} from 'lucide-react';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [franchiseFilter, setFranchiseFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');

  // Sample students data
  const students = [
    {
      id: 'STU-2023-045',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 98765 43210',
      franchise: 'VESDM Mumbai',
      course: 'Digital Marketing Professional',
      enrollmentDate: '2023-07-01',
      status: 'active',
      progress: 85,
      attendance: 92,
      grade: 'A',
      certificates: 2,
      lastActive: '2026-01-05'
    },
    {
      id: 'STU-2023-078',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98123 45678',
      franchise: 'VESDM Delhi',
      course: 'Web Development Bootcamp',
      enrollmentDate: '2023-07-15',
      status: 'active',
      progress: 72,
      attendance: 88,
      grade: 'B+',
      certificates: 1,
      lastActive: '2026-01-06'
    },
    {
      id: 'STU-2024-012',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 97654 32109',
      franchise: 'VESDM Bangalore',
      course: 'Business Management',
      enrollmentDate: '2024-01-10',
      status: 'active',
      progress: 45,
      attendance: 78,
      grade: 'B',
      certificates: 0,
      lastActive: '2026-01-07'
    },
    {
      id: 'STU-2023-156',
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      phone: '+91 96543 21098',
      franchise: 'VESDM Pune',
      course: 'Data Analytics',
      enrollmentDate: '2023-09-01',
      status: 'completed',
      progress: 100,
      attendance: 95,
      grade: 'A+',
      certificates: 3,
      lastActive: '2025-12-20'
    },
    {
      id: 'STU-2024-034',
      name: 'Vikram Singh',
      email: 'vikram.singh@email.com',
      phone: '+91 95432 10987',
      franchise: 'VESDM Chennai',
      course: 'Digital Marketing Professional',
      enrollmentDate: '2024-02-05',
      status: 'inactive',
      progress: 38,
      attendance: 45,
      grade: 'C',
      certificates: 0,
      lastActive: '2025-11-15'
    },
    {
      id: 'STU-2024-067',
      name: 'Ananya Reddy',
      email: 'ananya.reddy@email.com',
      phone: '+91 94321 09876',
      franchise: 'VESDM Mumbai',
      course: 'Web Development Bootcamp',
      enrollmentDate: '2024-03-12',
      status: 'active',
      progress: 68,
      attendance: 90,
      grade: 'A-',
      certificates: 1,
      lastActive: '2026-01-06'
    },
    {
      id: 'STU-2023-198',
      name: 'Karan Mehta',
      email: 'karan.mehta@email.com',
      phone: '+91 93210 98765',
      franchise: 'VESDM Delhi',
      course: 'Data Analytics',
      enrollmentDate: '2023-11-20',
      status: 'completed',
      progress: 100,
      attendance: 97,
      grade: 'A+',
      certificates: 2,
      lastActive: '2025-12-28'
    },
    {
      id: 'STU-2024-089',
      name: 'Sneha Joshi',
      email: 'sneha.joshi@email.com',
      phone: '+91 92109 87654',
      franchise: 'VESDM Bangalore',
      course: 'Graphic Design',
      enrollmentDate: '2024-04-18',
      status: 'suspended',
      progress: 25,
      attendance: 35,
      grade: 'D',
      certificates: 0,
      lastActive: '2025-10-05'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesFranchise = franchiseFilter === 'all' || student.franchise === franchiseFilter;
    const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
    
    return matchesSearch && matchesStatus && matchesFranchise && matchesCourse;
  });

  const stats = [
    { 
      label: 'Total Students', 
      value: students.length, 
      icon: Users, 
      color: 'blue',
      change: '+12%'
    },
    { 
      label: 'Active Students', 
      value: students.filter(s => s.status === 'active').length, 
      icon: CheckCircle, 
      color: 'green',
      change: '+8%'
    },
    { 
      label: 'Completed', 
      value: students.filter(s => s.status === 'completed').length, 
      icon: Award, 
      color: 'purple',
      change: '+15%'
    },
    { 
      label: 'Avg. Attendance', 
      value: Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length) + '%', 
      icon: TrendingUp, 
      color: 'amber',
      change: '+3%'
    }
  ];

  const franchises = ['all', ...new Set(students.map(s => s.franchise))];
  const courses = ['all', ...new Set(students.map(s => s.course))];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} />Active</span>;
      case 'inactive':
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full flex items-center gap-1"><Clock size={12} />Inactive</span>;
      case 'completed':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1"><Award size={12} />Completed</span>;
      case 'suspended':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><XCircle size={12} />Suspended</span>;
      default:
        return status;
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
        <p className="text-gray-600">Manage and monitor all students across franchises</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, student ID, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
              <option value="suspended">Suspended</option>
            </select>

            {/* Franchise Filter */}
            <select
              value={franchiseFilter}
              onChange={(e) => setFranchiseFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {franchises.map(f => (
                <option key={f} value={f}>
                  {f === 'all' ? 'All Franchises' : f}
                </option>
              ))}
            </select>

            {/* Course Filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {courses.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Courses' : c}
                </option>
              ))}
            </select>

            <button className="ml-auto px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Franchise</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{student.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{student.franchise}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{student.course}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${
                            student.progress >= 80 ? 'bg-green-600' :
                            student.progress >= 50 ? 'bg-blue-600' :
                            student.progress >= 30 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">{student.progress}%</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Attendance: {student.attendance}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Student"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More Actions"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;

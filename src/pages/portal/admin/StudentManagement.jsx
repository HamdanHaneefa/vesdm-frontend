import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, Search, Filter, Download, Eye, Edit, Ban, CheckCircle,
  XCircle, Mail, Phone, MapPin, Calendar, BookOpen, Award,
  TrendingUp, Clock, AlertCircle, MoreVertical, Building2
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [franchiseFilter, setFranchiseFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [students, setStudents] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [studentsRes, franchisesRes] = await Promise.all([
        apiClient.get('/students'),
        apiClient.get('/users')
      ]);
      
      setStudents(studentsRes.data);
      setFranchises(franchisesRes.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.registrationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFranchise = franchiseFilter === 'all' || student.franchisee === franchiseFilter;
    const matchesCourse = courseFilter === 'all' || student.course?._id === courseFilter;
    
    return matchesSearch && matchesFranchise && matchesCourse;
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
      label: 'This Year', 
      value: students.filter(s => {
        const enrollYear = new Date(s.enrollmentDate).getFullYear();
        return enrollYear === new Date().getFullYear();
      }).length, 
      icon: CheckCircle, 
      color: 'green',
      change: '+8%'
    },
    { 
      label: 'Courses', 
      value: new Set(students.map(s => s.course?._id).filter(Boolean)).size, 
      icon: BookOpen, 
      color: 'purple',
      change: '+15%'
    },
    { 
      label: 'Franchises', 
      value: new Set(students.map(s => s.franchisee).filter(Boolean)).size, 
      icon: Building2, 
      color: 'amber',
      change: '+3%'
    }
  ];

  const franchisesList = ['all', ...new Set(students.map(s => s.franchisee).filter(Boolean))];
  const coursesList = ['all', ...new Set(students.map(s => s.course?._id).filter(Boolean))];

  const getFranchiseName = (franchiseeId) => {
    const franchise = franchises.find(f => f._id === franchiseeId);
    return franchise ? franchise.name || franchise.email : 'N/A';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

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
            {/* Franchise Filter */}
            <select
              value={franchiseFilter}
              onChange={(e) => setFranchiseFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Franchises</option>
              {franchisesList.filter(f => f !== 'all').map(franchiseeId => {
                const franchise = franchises.find(f => f._id === franchiseeId);
                return (
                  <option key={franchiseeId} value={franchiseeId}>
                    {franchise ? (franchise.name || franchise.email) : franchiseeId}
                  </option>
                );
              })}
            </select>

            {/* Course Filter */}
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Courses</option>
              {coursesList.filter(c => c !== 'all').map(courseId => {
                const course = students.find(s => s.course?._id === courseId)?.course;
                return (
                  <option key={courseId} value={courseId}>
                    {course ? course.name : courseId}
                  </option>
                );
              })}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Enrolled</th>
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
                        <span className="text-white font-bold text-sm">{student.name?.charAt(0) || '?'}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.registrationNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs">{student.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">{student.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{getFranchiseName(student.franchisee)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-900 block">{student.course?.name || 'N/A'}</span>
                        <span className="text-xs text-gray-500">{student.course?.type || ''}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{student.year || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => navigate(`/portal/admin/students/${student._id}`)}
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

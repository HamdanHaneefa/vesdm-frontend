import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Building2, MapPin, Phone, Mail, Calendar, Users, BookOpen,
  TrendingUp, Edit, Trash2, FileText,
  Download, AlertCircle, X
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const FranchiseDetails = () => {
  const { franchiseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [franchise, setFranchise] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchFranchiseData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch franchise data (user with role 'franchisee')
      const usersResponse = await apiClient.get('/users');
      const franchiseUser = usersResponse.data.find(user => user._id === franchiseId);
      
      if (!franchiseUser) {
        setError('Franchise not found');
        return;
      }

      // Fetch students for this franchise
      let franchiseStudents = [];
      
      try {
        // Get all students - the backend may already filter by user role
        const studentsResponse = await apiClient.get('/students');
        
        if (studentsResponse.data.length > 0) {
          // Check if franchisee field is available in the response
          const hasfranchiseeField = studentsResponse.data[0].franchisee !== undefined;
          
          if (hasfranchiseeField) {
            // Filter students by franchisee ID if the field is available
            franchiseStudents = studentsResponse.data.filter(student => {
              if (!student.franchisee) return false;
              
              const studentFranchiseeId = typeof student.franchisee === 'object' 
                ? student.franchisee._id 
                : student.franchisee;
              
              return studentFranchiseeId === franchiseId;
            });
          } else {
            // If no franchisee field, fetch individual student details to get franchisee info
            const studentsWithDetails = await Promise.all(
              studentsResponse.data.map(async (student) => {
                try {
                  const detailResponse = await apiClient.get(`/students/${student._id}`);
                  return detailResponse.data;
                } catch (error) {
                  console.error(`Failed to fetch details for student ${student._id}:`, error);
                  return null;
                }
              })
            );
            
            // Filter out null responses and then filter by franchisee
            franchiseStudents = studentsWithDetails
              .filter(student => student !== null)
              .filter(student => {
                if (!student.franchisee) return false;
                
                const studentFranchiseeId = typeof student.franchisee === 'object' 
                  ? student.franchisee._id 
                  : student.franchisee;
                
                return studentFranchiseeId === franchiseId;
              });
          }
        }
      } catch (err) {
        console.error('Error fetching students:', err);
        franchiseStudents = [];
      }

      // Fetch all courses
      const coursesResponse = await apiClient.get('/courses');
      
      // Set the franchise data with computed values
      setFranchise({
        ...franchiseUser,
        owner: franchiseUser.name || 'Name not set', // Use 'name' field from User model
        status: 'active', // Default since not in DB
        location: 'Location not set',
        address: 'Address not provided',
        phone: 'Not provided',
        joinedDate: franchiseUser.createdAt || franchiseUser.updatedAt || new Date().toISOString(), // Try multiple date fields
        students: franchiseStudents.length,
        courses: coursesResponse.data.length,
        revenue: '₹0', // Would need to calculate from actual data
        description: 'Professional skill development franchise',
        infrastructure: {
          classrooms: 'N/A',
          labs: 'N/A',
          capacity: 'N/A',
          wifi: true,
          library: false,
          cafeteria: false
        },
        performance: {
          placementRate: 0,
          studentSatisfaction: 0,
          courseCompletion: 0,
          averageGrade: 'N/A'
        }
      });
      
      setStudents(franchiseStudents);
      setCourses(coursesResponse.data);

      // Fetch real resources
      try {
        const resourcesResponse = await apiClient.get('/resources');
        setResources(resourcesResponse.data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setResources([]);
      }
      
    } catch (err) {
      console.error('Error fetching franchise data:', err);
      setError('Failed to load franchise data');
    } finally {
      setLoading(false);
    }
  }, [franchiseId]);

  useEffect(() => {
    fetchFranchiseData();
  }, [fetchFranchiseData]);

  const handleDeleteFranchise = async () => {
    try {
      setDeleting(true);
      await apiClient.delete(`/users/${franchiseId}`);
      navigate('/portal/admin/franchises');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete franchise');
      setDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const getResourceTypeColor = (type) => {
    const colors = {
      'PDF': 'bg-red-100 text-red-700',
      'Video': 'bg-purple-100 text-purple-700',
      'Code': 'bg-blue-100 text-blue-700',
      'Database': 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-8">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="large" />
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button 
            onClick={() => navigate('/portal/admin/franchises')}
            className="mt-2 text-red-700 underline hover:no-underline"
          >
            Back to Franchises
          </button>
        </div>
      )}

      {!loading && !error && franchise && (
        <>
          {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/portal/admin/franchises')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Franchises
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{franchise.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{franchise.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {franchise.joinedDate ? new Date(franchise.joinedDate).toLocaleDateString() : 'Date not available'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 ${
                  franchise.status === 'active' ? 'bg-green-100 text-green-700' :
                  franchise.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                } text-sm font-bold rounded-full`}>
                  {franchise.status === 'active' ? '● Active' : franchise.status === 'pending' ? '● Pending' : '● Suspended'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Details
            </button>
            <button
              onClick={() => setDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Franchise
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.students}</p>
          <p className="text-sm text-gray-600">Total Students</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.courses}</p>
          <p className="text-sm text-gray-600">Active Courses</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{franchise.students}</p>
          <p className="text-sm text-gray-600">Enrolled Students</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-1 p-2">
            {[
              { id: 'overview', label: 'Overview', icon: Building2 },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'resources', label: 'Resources', icon: FileText },
              { id: 'students', label: 'Students', icon: Users }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Franchise Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Owner Name</p>
                      <p className="font-medium text-gray-900">{franchise.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{franchise.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{franchise.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{franchise.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{franchise.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Infrastructure</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Classrooms</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.classrooms}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Computer Labs</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.labs}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Total Capacity</span>
                      <span className="font-medium text-gray-900">{franchise.infrastructure.capacity} students</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">WiFi Available</span>
                      <span className="font-medium text-green-600">{franchise.infrastructure.wifi ? '✓ Yes' : '✗ No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Metrics</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Placement Rate</span>
                        <span className="font-medium text-gray-900">{franchise.performance.placementRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${franchise.performance.placementRate}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Student Satisfaction</span>
                        <span className="font-medium text-gray-900">{franchise.performance.studentSatisfaction}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${franchise.performance.studentSatisfaction}%` }}></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Course Completion</span>
                        <span className="font-medium text-gray-900">{franchise.performance.courseCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${franchise.performance.courseCompletion}%` }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average Grade</span>
                      <span className="font-medium text-gray-900">{franchise.performance.averageGrade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">Course Offerings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map(course => (
                  <div key={course._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{course.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                            ● Active
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Type</p>
                        <p className="font-medium text-gray-900">{course.type || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium text-gray-900">{course.duration || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fee</p>
                        <p className="font-medium text-gray-900">₹{course.fee || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Students</p>
                        <p className="font-medium text-gray-900">
                          {students.filter(s => {
                            const courseId = typeof s.course === 'object' ? s.course._id : s.course;
                            return courseId === course._id;
                          }).length}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Learning Resources</h3>
                  <p className="text-sm text-gray-600 mt-1">Resources available for this franchise</p>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {resources.length} resource{resources.length !== 1 ? 's' : ''}
                </div>
              </div>
              {resources.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>No resources available yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resources.map(resource => (
                    <div key={resource._id} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded ${getResourceTypeColor(resource.type)}`}>
                                {resource.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {resource.course?.name && <span>Course: {resource.course.name}</span>}
                              {resource.size && <span>Size: {resource.size}</span>}
                              {resource.category && <span className="capitalize">{resource.category}</span>}
                              {resource.uploadDate && (
                                <span>Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}</span>
                              )}
                            </div>
                            {resource.description && (
                              <p className="text-xs text-gray-400 mt-1">{resource.description}</p>
                            )}
                          </div>
                        </div>
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4 text-gray-600" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Enrolled Students</h3>
                  <p className="text-sm text-gray-600 mt-1">Students currently enrolled in this franchise ({students.length} total)</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  View All Students
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Student ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {students.length > 0 ? (
                      students.map(student => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.registrationNumber || student._id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.course && typeof student.course === 'object' 
                              ? student.course.name 
                              : student.course 
                              ? 'Course ID: ' + student.course
                              : 'No course assigned'}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                          No students enrolled in this franchise yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => !deleting && setDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <button
                  onClick={() => !deleting && setDeleteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Franchise</h2>
              <p className="text-gray-600 mb-1">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">{franchise?.name}</span>?
              </p>
              <p className="text-sm text-gray-500 mb-6">
                This will permanently remove the franchise account and their login access. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(false)}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteFranchise}
                  disabled={deleting}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {deleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Franchise
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FranchiseDetails;

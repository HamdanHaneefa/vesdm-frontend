import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FileText, Search, Filter, Download, Eye, CheckCircle, XCircle,
    Clock, TrendingUp, AlertCircle, MoreVertical, BookOpen, Calendar, Users
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AdmissionManagement = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [courseFilter, setCourseFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await apiClient.get('/admissions');
            setAdmissions(res.data);
            setError('');
        } catch (err) {
            console.error('Error fetching admissions:', err);
            setError('Failed to load admissions');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await apiClient.patch(`/admissions/${id}/status`, { status });
            fetchData();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const filteredAdmissions = admissions.filter(admission => {
        const matchesSearch =
            admission.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admission.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admission.phone?.includes(searchQuery);

        const matchesCourse = courseFilter === 'all' || admission.course?._id === courseFilter;
        const matchesStatus = statusFilter === 'all' || admission.status === statusFilter;

        return matchesSearch && matchesCourse && matchesStatus;
    });

    const stats = [
        { label: 'Total Applications', value: admissions.length, icon: FileText, color: 'blue', change: '+12%' },
        { label: 'Pending', value: admissions.filter(a => a.status === 'pending').length, icon: Clock, color: 'amber', change: '+5%' },
        { label: 'Approved', value: admissions.filter(a => a.status === 'approved').length, icon: CheckCircle, color: 'green', change: '+8%' },
        { label: 'Rejected', value: admissions.filter(a => a.status === 'rejected').length, icon: XCircle, color: 'red', change: '-2%' },
    ];

    const coursesList = ['all', ...new Set(admissions.map(a => a.course?._id).filter(Boolean))];
    const getCourseName = (courseId) => {
        const admission = admissions.find(a => a.course?._id === courseId);
        return admission?.course?.name || 'N/A';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="large" /></div>;

    return (
        <div className="p-8">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admission Management</h1>
                <p className="text-gray-600">Review and manage new student admission applications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                            <option value="all">All Programs</option>
                            {coursesList.filter(c => c !== 'all').map(id => (
                                <option key={id} value={id}>{getCourseName(id)}</option>
                            ))}
                        </select>

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button className="ml-auto px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Study Mode</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied On</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredAdmissions.map((admission, index) => (
                                <motion.tr key={admission._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">{admission.fullName?.charAt(0) || '?'}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{admission.fullName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{admission.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{admission.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{admission.course?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 capitalize">{admission.studyMode}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(admission.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(admission.status)}`}>
                                            {admission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {admission.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(admission._id, 'approved')}
                                                        className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    </button>
                                                    <button onClick={() => handleStatusUpdate(admission._id, 'rejected')}
                                                        className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Reject">
                                                        <XCircle className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Showing {filteredAdmissions.length} of {admissions.length} applications
                    </div>
                    {/* Pagination similar to StudentManagement */}
                </div>
            </div>

            {filteredAdmissions.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No admission applications found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default AdmissionManagement;
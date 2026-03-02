import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, User, Mail, Phone, BookOpen, Calendar, FileText,
    CheckCircle, XCircle, Clock, AlertCircle, Download, MessageSquare
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const AdmissionDetails = () => {
    const { applicationId } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchApplication();
    }, [applicationId]);

    const fetchApplication = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await apiClient.get(`/admissions/${applicationId}`);
            setApplication(res.data);
        } catch (err) {
            console.error('Error fetching application:', err);
            setError('Failed to load application details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status) => {
        try {
            setActionLoading(true);
            await apiClient.patch(`/admissions/${applicationId}/status`, { status });
            await fetchApplication();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update status');
        } finally {
            setActionLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'approved': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'approved': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="large" />
        </div>
    );

    if (error) return (
        <div className="p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
            </div>
        </div>
    );

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Application ID: {application?._id}</p>
                    </div>
                </div>

                <span className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(application?.status)}`}>
                    {getStatusIcon(application?.status)}
                    {application?.status?.charAt(0).toUpperCase() + application?.status?.slice(1)}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column — applicant info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Applicant Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                            <User className="w-5 h-5 text-red-500" />
                            Applicant Information
                        </h2>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-2xl">
                                    {application?.fullName?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{application?.fullName}</h3>
                                <p className="text-sm text-gray-500">Applicant</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="text-sm font-medium text-gray-900">{application?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="text-sm font-medium text-gray-900">{application?.phone || '—'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Program Applied</p>
                                    <p className="text-sm font-medium text-gray-900">{application?.course?.name || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Applied On</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(application?.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Date of Birth</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {application?.dob ? new Date(application.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Study Mode</p>
                                    <p className="text-sm font-medium text-gray-900 capitalize">{application?.studyMode || '—'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-gray-500">Preferred Start Date</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {application?.startDate ? new Date(application.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Academic Background Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-red-500" />
                            Academic Background
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Highest Qualification</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{application?.qualification || '—'}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Institution</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{application?.institution || '—'}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Year of Passing</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{application?.yearOfPassing || '—'}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500">Percentage / Grade</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{application?.percentage || '—'}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Documents Card */}
                    {application?.documents?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-red-500" />
                                Submitted Documents
                            </h2>
                            <div className="space-y-2">
                                {application.documents.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm text-gray-700">{doc}</span>
                                        </div>
                                        <a
                                            href={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${doc}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4 text-gray-500" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right column — actions */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">Actions</h2>

                        {application?.status === 'pending' ? (
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleStatusUpdate('approved')}
                                    disabled={actionLoading}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {actionLoading ? 'Processing...' : 'Approve Application'}
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('rejected')}
                                    disabled={actionLoading}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <XCircle className="w-4 h-4" />
                                    {actionLoading ? 'Processing...' : 'Reject Application'}
                                </button>
                            </div>
                        ) : (
                            <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium ${getStatusColor(application?.status)}`}>
                                {getStatusIcon(application?.status)}
                                Application has been {application?.status}
                            </div>
                        )}
                    </motion.div>

                    {/* Course Info Card */}
                    {application?.course && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Info</h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500">Course Name</p>
                                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{application.course.name}</p>
                                </div>
                                {application.course.duration && (
                                    <div>
                                        <p className="text-xs text-gray-500">Duration</p>
                                        <p className="text-sm font-medium text-gray-900 mt-0.5">{application.course.duration}</p>
                                    </div>
                                )}
                                {application.course.fee && (
                                    <div>
                                        <p className="text-xs text-gray-500">Fee</p>
                                        <p className="text-sm font-medium text-gray-900 mt-0.5">₹{application.course.fee}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdmissionDetails;

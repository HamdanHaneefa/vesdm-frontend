import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Search, Filter, Calendar, CheckCircle, XCircle, 
  Clock, Eye, MoreVertical, Building2, AlertCircle
} from 'lucide-react';

const FranchiseRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample requests data
  const requests = [
    {
      id: 1,
      franchiseName: 'VESDM Kolkata',
      ownerName: 'Rajesh Sharma',
      email: 'rajesh@vesdmkolkata.com',
      phone: '+91 98765 43210',
      location: 'Kolkata, West Bengal',
      requestDate: '2026-01-05',
      status: 'pending',
      type: 'new_franchise',
      documents: ['License', 'ID Proof', 'Address Proof'],
      expectedStudents: 300,
      investment: '₹15,00,000'
    },
    {
      id: 2,
      franchiseName: 'VESDM Jaipur',
      ownerName: 'Priya Mehta',
      email: 'priya@vesdmjaipur.com',
      phone: '+91 98123 45678',
      location: 'Jaipur, Rajasthan',
      requestDate: '2026-01-04',
      status: 'under_review',
      type: 'new_franchise',
      documents: ['License', 'ID Proof', 'Address Proof', 'Bank Statement'],
      expectedStudents: 250,
      investment: '₹12,00,000'
    },
    {
      id: 3,
      franchiseName: 'VESDM Mumbai',
      ownerName: 'Amit Patel',
      email: 'amit@vesdmmumbai.com',
      phone: '+91 98765 00001',
      location: 'Mumbai, Maharashtra',
      requestDate: '2026-01-03',
      status: 'approved',
      type: 'course_addition',
      documents: ['Request Letter', 'Infrastructure Proof'],
      coursesRequested: ['Advanced Data Science', 'Cloud Computing'],
      investment: '₹5,00,000'
    },
    {
      id: 4,
      franchiseName: 'VESDM Ahmedabad',
      ownerName: 'Neha Gupta',
      email: 'neha@vesdmahmedabad.com',
      phone: '+91 99887 76655',
      location: 'Ahmedabad, Gujarat',
      requestDate: '2026-01-02',
      status: 'rejected',
      type: 'new_franchise',
      documents: ['License', 'ID Proof'],
      expectedStudents: 150,
      investment: '₹8,00,000',
      rejectionReason: 'Incomplete documentation'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.franchiseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Requests', value: requests.length, icon: FileText, color: 'blue' },
    { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, icon: Clock, color: 'amber' },
    { label: 'Under Review', value: requests.filter(r => r.status === 'under_review').length, icon: AlertCircle, color: 'purple' },
    { label: 'Approved', value: requests.filter(r => r.status === 'approved').length, icon: CheckCircle, color: 'green' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Clock size={12} />Pending</span>;
      case 'under_review':
        return <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full flex items-center gap-1"><AlertCircle size={12} />Under Review</span>;
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} />Approved</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><XCircle size={12} />Rejected</span>;
      default:
        return status;
    }
  };

  const getRequestTypeBadge = (type) => {
    switch (type) {
      case 'new_franchise':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">New Franchise</span>;
      case 'course_addition':
        return <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">Course Addition</span>;
      default:
        return type;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Franchise Requests</h1>
        <p className="text-gray-600">Review and manage franchise applications</p>
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
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by franchise name, owner, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {['all', 'pending', 'under_review', 'approved', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{request.franchiseName}</h3>
                    <p className="text-gray-600 mb-2">{request.ownerName}</p>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(request.status)}
                      {getRequestTypeBadge(request.type)}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Location:</span> {request.location}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Investment:</span> {request.investment}
                </div>
                {request.expectedStudents && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Expected Students:</span> {request.expectedStudents}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Documents Submitted:</p>
                <div className="flex flex-wrap gap-2">
                  {request.documents.map((doc, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {request.status === 'rejected' && request.rejectionReason && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <span className="font-medium">Rejection Reason:</span> {request.rejectionReason}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {request.status === 'pending' && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Request Review
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                {request.status === 'under_review' && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </>
                )}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No requests found</p>
        </div>
      )}
    </div>
  );
};

export default FranchiseRequests;

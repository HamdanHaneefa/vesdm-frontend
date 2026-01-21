import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Search, Calendar, CheckCircle, XCircle,
  Clock, MoreVertical, Building2, AlertCircle, Mail, Phone, Loader2
} from 'lucide-react';
import apiClient from '../../../api/apiClient';

const FranchiseRequests = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch franchise inquiries from backend
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/inquiries');
      // Filter only franchise type inquiries
      const franchiseInquiries = response.data.filter(
        (inquiry) => inquiry.type === 'franchise'
      );
      setRequests(franchiseInquiries);
      setError('');
    } catch (err) {
      console.error('Error fetching franchise requests:', err);
      setError('Failed to load franchise requests');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const stats = [
    { label: 'Total Requests', value: requests.length, icon: FileText, color: 'blue' },
    { label: 'This Week', value: requests.filter(r => {
      const requestDate = new Date(r.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return requestDate >= weekAgo;
    }).length, icon: Clock, color: 'amber' },
    { label: 'This Month', value: requests.filter(r => {
      const requestDate = new Date(r.date);
      return requestDate.getMonth() === new Date().getMonth();
    }).length, icon: AlertCircle, color: 'purple' },
    { label: 'All Time', value: requests.length, icon: CheckCircle, color: 'green' }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Franchise Requests</h1>
        <p className="text-gray-600">Review and manage franchise applications</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      ) : (
        <>
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

          {/* Search */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request._id}
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
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{request.name}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {request.email}
                          </div>
                          {request.phone && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              {request.phone}
                            </div>
                          )}
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1 inline-flex">
                          <Clock size={12} />
                          New Inquiry
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(request.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                    <p className="text-sm text-gray-600">{request.message}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      title="Contact this applicant via email or phone"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Contact Applicant
                    </button>
                    <button 
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                      onClick={() => window.location.href = `mailto:${request.email}`}
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRequests.length === 0 && !loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No franchise requests found</p>
              <p className="text-gray-400 text-sm mt-2">New applications will appear here</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FranchiseRequests;

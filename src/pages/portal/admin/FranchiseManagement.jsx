import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Search, Filter, MapPin, Phone, Mail, Users, DollarSign,
  CheckCircle, XCircle, Edit, Eye, MoreVertical, TrendingUp, Calendar, Clock, Plus, X
} from 'lucide-react';
import apiClient from '../../../api/apiClient';
import LoadingSpinner from '../../../components/LoadingSpinner';

const FranchiseManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchFranchises();
  }, []);

  const fetchFranchises = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/users');
      setFranchises(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching franchises:', err);
      setError('Failed to load franchises');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFranchise = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await apiClient.post('/users', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      await fetchFranchises();
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '' });
      alert('Franchisee created successfully!');
    } catch (err) {
      console.error('Error creating franchisee:', err);
      alert(err.response?.data?.msg || 'Failed to create franchisee');
    } finally {
      setFormLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredFranchises = franchises.filter(franchise => {
    const matchesSearch = 
      franchise.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      franchise.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || franchise.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Franchises', value: franchises.filter(f => f.role === 'franchisee').length, icon: Building2, color: 'blue' },
    { label: 'Active Users', value: franchises.length, icon: Users, color: 'emerald' },
    { label: 'Registered', value: franchises.length, icon: CheckCircle, color: 'purple' },
    { label: 'This Month', value: franchises.filter(f => {
      const created = new Date(f.createdAt);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length, icon: TrendingUp, color: 'amber' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Franchise Management</h1>
          <p className="text-gray-600 mt-1">Manage franchisee accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Franchisee
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`text-${stat.color}-600`} size={24} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Franchises Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFranchises.map((franchise, index) => (
          <motion.div
            key={franchise._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Building2 size={28} />
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <CheckCircle size={12} />Franchisee
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{franchise.name || 'Unnamed'}</h3>
              <p className="text-blue-100 text-sm">Role: {franchise.role}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-slate-400" size={16} />
                  <span className="text-slate-600">{franchise.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-600">
                    Joined: {franchise.createdAt ? new Date(franchise.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/portal/admin/franchises/${franchise._id}`)}
                  className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View Details
                </button>
                <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFranchises.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-lg border border-slate-200"
        >
          <Building2 size={64} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No franchises found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Add Franchisee Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Add New Franchisee</h2>
                    <p className="text-sm text-blue-100">Create franchisee account</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleAddFranchise} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="franchisee@example.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Minimum 6 characters"
                      minLength="6"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">Password will be sent to the franchisee</p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The franchisee will receive an email with login credentials. They can change their password after first login.
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Create Franchisee
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FranchiseManagement;

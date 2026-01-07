import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, Search, Filter, MapPin, Phone, Mail, Users, DollarSign,
  CheckCircle, XCircle, Edit, Eye, MoreVertical, TrendingUp, Calendar, Clock
} from 'lucide-react';

const FranchiseManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const franchises = [
    {
      id: 1,
      name: 'Mumbai Central Branch',
      owner: 'Rajesh Kumar',
      email: 'rajesh@mumbaicentral.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, Maharashtra',
      students: 450,
      revenue: 2250000,
      status: 'active',
      joined: '2023-01-15',
      rating: 4.8,
      courses: 15
    },
    {
      id: 2,
      name: 'Delhi North Branch',
      owner: 'Priya Sharma',
      email: 'priya@delhinorth.com',
      phone: '+91 98765 43211',
      location: 'Delhi, NCR',
      students: 385,
      revenue: 1925000,
      status: 'active',
      joined: '2023-03-20',
      rating: 4.6,
      courses: 12
    },
    {
      id: 3,
      name: 'Bangalore Tech Hub',
      owner: 'Amit Patel',
      email: 'amit@bangaloretechhub.com',
      phone: '+91 98765 43212',
      location: 'Bangalore, Karnataka',
      students: 420,
      revenue: 2100000,
      status: 'active',
      joined: '2023-02-10',
      rating: 4.9,
      courses: 18
    },
    {
      id: 4,
      name: 'Pune West Branch',
      owner: 'Sneha Desai',
      email: 'sneha@punewest.com',
      phone: '+91 98765 43213',
      location: 'Pune, Maharashtra',
      students: 310,
      revenue: 1550000,
      status: 'active',
      joined: '2023-05-12',
      rating: 4.5,
      courses: 10
    },
    {
      id: 5,
      name: 'Chennai South Branch',
      owner: 'Karthik Reddy',
      email: 'karthik@chennaisouth.com',
      phone: '+91 98765 43214',
      location: 'Chennai, Tamil Nadu',
      students: 295,
      revenue: 1475000,
      status: 'active',
      joined: '2023-04-08',
      rating: 4.7,
      courses: 11
    },
    {
      id: 6,
      name: 'Kolkata East Branch',
      owner: 'Debashish Roy',
      email: 'debashish@kolkataeast.com',
      phone: '+91 98765 43215',
      location: 'Kolkata, West Bengal',
      students: 0,
      revenue: 0,
      status: 'pending',
      joined: '2026-01-05',
      rating: 0,
      courses: 0
    },
    {
      id: 7,
      name: 'Hyderabad Branch',
      owner: 'Lakshmi Naidu',
      email: 'lakshmi@hyderabad.com',
      phone: '+91 98765 43216',
      location: 'Hyderabad, Telangana',
      students: 245,
      revenue: 1225000,
      status: 'suspended',
      joined: '2023-06-15',
      rating: 3.8,
      courses: 8
    },
  ];

  const filteredFranchises = franchises.filter(franchise => {
    const matchesSearch = franchise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         franchise.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         franchise.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || franchise.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Franchises', value: franchises.filter(f => f.status === 'active').length, icon: Building2, color: 'blue' },
    { label: 'Pending Approval', value: franchises.filter(f => f.status === 'pending').length, icon: Clock, color: 'amber' },
    { label: 'Total Students', value: franchises.reduce((sum, f) => sum + f.students, 0).toLocaleString(), icon: Users, color: 'emerald' },
    { label: 'Total Revenue', value: `₹${(franchises.reduce((sum, f) => sum + f.revenue, 0) / 100000).toFixed(1)}L`, icon: DollarSign, color: 'purple' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} />Active</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Clock size={12} />Pending</span>;
      case 'suspended':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><XCircle size={12} />Suspended</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
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
              placeholder="Search by name, owner, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'pending', 'suspended'].map((status) => (
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
            key={franchise.id}
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
                {getStatusBadge(franchise.status)}
              </div>
              <h3 className="text-xl font-bold mb-1">{franchise.name}</h3>
              <p className="text-blue-100 text-sm">{franchise.owner}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="text-slate-400" size={16} />
                  <span className="text-slate-600">{franchise.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-slate-400" size={16} />
                  <span className="text-slate-600">{franchise.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="text-slate-400" size={16} />
                  <span className="text-slate-600">{franchise.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-slate-400" size={16} />
                  <span className="text-slate-600">Joined: {new Date(franchise.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Stats */}
              {franchise.status !== 'pending' && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-2xl font-bold text-slate-900">{franchise.students}</p>
                    <p className="text-xs text-slate-600">Students</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-2xl font-bold text-slate-900">{franchise.courses}</p>
                    <p className="text-xs text-slate-600">Courses</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-xl">
                    <p className="text-xl font-bold text-slate-900">⭐{franchise.rating}</p>
                    <p className="text-xs text-slate-600">Rating</p>
                  </div>
                </div>
              )}

              {/* Revenue */}
              {franchise.status !== 'pending' && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-emerald-700">Total Revenue</span>
                    <span className="text-2xl font-bold text-emerald-900">₹{(franchise.revenue / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              {franchise.status === 'pending' ? (
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors">
                    <CheckCircle size={16} className="inline mr-2" />
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors">
                    <XCircle size={16} className="inline mr-2" />
                    Reject
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/portal/admin/franchises/${franchise.id}`)}
                    className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                  <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              )}
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
    </div>
  );
};

export default FranchiseManagement;

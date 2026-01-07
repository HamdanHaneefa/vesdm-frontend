import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, Search, Filter, Download, Eye, CheckCircle, XCircle,
  Calendar, User, Building2, FileText, Printer
} from 'lucide-react';

const CertificatesAdmin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sample certificates data
  const certificates = [
    {
      id: 'CERT-2026-001',
      studentName: 'Rahul Kumar',
      studentId: 'STU-2023-045',
      courseName: 'Digital Marketing Professional',
      franchise: 'VESDM Mumbai',
      issueDate: '2026-01-05',
      expiryDate: '2029-01-05',
      grade: 'A+',
      status: 'issued',
      verificationCode: 'DM-2026-RK-001'
    },
    {
      id: 'CERT-2026-002',
      studentName: 'Priya Sharma',
      studentId: 'STU-2023-078',
      courseName: 'Web Development Bootcamp',
      franchise: 'VESDM Delhi',
      issueDate: '2026-01-04',
      expiryDate: '2029-01-04',
      grade: 'A',
      status: 'issued',
      verificationCode: 'WD-2026-PS-002'
    },
    {
      id: 'CERT-2026-003',
      studentName: 'Amit Patel',
      studentId: 'STU-2024-012',
      courseName: 'Business Management',
      franchise: 'VESDM Bangalore',
      issueDate: null,
      expiryDate: null,
      grade: 'A',
      status: 'pending',
      verificationCode: null
    },
    {
      id: 'CERT-2026-004',
      studentName: 'Neha Gupta',
      studentId: 'STU-2023-156',
      courseName: 'Data Analytics',
      franchise: 'VESDM Pune',
      issueDate: '2026-01-03',
      expiryDate: '2029-01-03',
      grade: 'B+',
      status: 'issued',
      verificationCode: 'DA-2026-NG-004'
    },
    {
      id: 'CERT-2026-005',
      studentName: 'Vikram Singh',
      studentId: 'STU-2024-089',
      courseName: 'Digital Marketing Professional',
      franchise: 'VESDM Chennai',
      issueDate: null,
      expiryDate: null,
      grade: null,
      status: 'rejected',
      verificationCode: null,
      rejectionReason: 'Failed final assessment'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Certificates', value: certificates.length, icon: Award, color: 'blue' },
    { label: 'Issued', value: certificates.filter(c => c.status === 'issued').length, icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: certificates.filter(c => c.status === 'pending').length, icon: FileText, color: 'amber' },
    { label: 'This Month', value: certificates.filter(c => c.issueDate?.startsWith('2026-01')).length, icon: Calendar, color: 'purple' }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'issued':
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle size={12} />Issued</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><FileText size={12} />Pending</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full flex items-center gap-1"><XCircle size={12} />Rejected</span>;
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Management</h1>
        <p className="text-gray-600">Issue and manage student certificates</p>
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
              placeholder="Search by student name, course, or certificate ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {['all', 'issued', 'pending', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Certificate ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Franchise</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCertificates.map((cert, index) => (
                <motion.tr
                  key={cert.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-900">{cert.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cert.studentName}</p>
                      <p className="text-xs text-gray-500">{cert.studentId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{cert.courseName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{cert.franchise}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cert.grade ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{cert.grade}</span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cert.issueDate ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{new Date(cert.issueDate).toLocaleDateString()}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(cert.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {cert.status === 'issued' && (
                        <>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Certificate">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Print">
                            <Printer className="w-4 h-4 text-gray-600" />
                          </button>
                        </>
                      )}
                      {cert.status === 'pending' && (
                        <button className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors">
                          Issue Certificate
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCertificates.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No certificates found</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesAdmin;
